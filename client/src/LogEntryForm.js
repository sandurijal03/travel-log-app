import React, { useState } from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';

import { createLogEntry } from './Api';

const LogEntryForm = ({ location, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      data.latitude = location.latitude;
      data.longitude = location.longitude;
      await createLogEntry(data);
      onClose();
    } catch (error) {
      console.error(error);
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <FormStyled onSubmit={handleSubmit(onSubmit)}>
      {error ? <h3 className='error'>{error}</h3> : null}
      <label htmlFor='apiKey'>API KEY</label>
      <input
        type='password'
        name='apiKey'
        required
        ref-setter={register('apiKey')}
      />
      <label htmlFor='title'>Title</label>
      <input name='title' required ref-setter={register('title')} />
      <label htmlFor='comments'>Comments</label>
      <textarea
        name='comments'
        rows={3}
        ref-setter={register('comments')}
      ></textarea>
      <label htmlFor='description'>Description</label>
      <textarea
        name='description'
        rows={3}
        ref-setter={register('description')}
      ></textarea>
      <label htmlFor='image'>Image</label>
      <input name='image' ref-setter={register('image')} />
      <label htmlFor='visitDate'>Visit Date</label>
      <input
        name='visitDate'
        type='date'
        required
        ref-setter={register('visitDate')}
      />
      <button disabled={loading}>
        {loading ? 'Loading...' : 'Create Entry'}
      </button>
    </FormStyled>
  );
};

const FormStyled = styled.form`
  label,
  input,
  textarea,
  button {
    margin: 0.5rem 0;
    display: block;
    width: 100%;
    font-size: 2rem;
  }
  .error {
    color: #f05305;
  }
`;

export default LogEntryForm;
