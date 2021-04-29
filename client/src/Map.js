import React, { useEffect, useState } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import { MdRoom } from 'react-icons/md';

import { listLogEntries } from './Api';
import LogEntryForm from './LogEntryForm';

const Map = () => {
  const [logEntries, setLogEntries] = useState([]);
  const [showPopup, setShowPopup] = useState({});
  const [addEntryLocaction, setAddEntryLocation] = useState(null);
  const [viewport, setViewPort] = useState({
    width: '100vw',
    height: '100vh',
    latitude: 38.02130234000692,
    longitude: -96.52454556339762,
    zoom: 3,
  });

  const getEntries = async () => {
    const logEntries = await listLogEntries();
    setLogEntries(logEntries);
  };

  useEffect(() => {
    getEntries();
  }, []);

  const showAddMarkerPopup = (e) => {
    const [longitude, latitude] = e.lngLat;
    setAddEntryLocation({
      latitude,
      longitude,
    });
  };

  return (
    <ReactMapGL
      {...viewport}
      mapStyle={'mapbox://styles/sandurijal03/ckns0j8bj007i17rxfo53pduc'}
      onViewportChange={setViewPort}
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      onDblClick={showAddMarkerPopup}
    >
      {logEntries.map((entry) => (
        <React.Fragment key={entry._id}>
          <Marker
            latitude={entry.latitude}
            longitude={entry.longitude}
            offsetLeft={-20}
            offsetTop={-20}
            onClick={() => setShowPopup({ ...showPopup, [entry._id]: true })}
          >
            <MdRoom color='yellow' size='1.5rem' />
          </Marker>
          {showPopup[entry._id] ? (
            <Popup
              latitude={entry.latitude}
              longitude={entry.longitude}
              closeButton={true}
              closeOnClick={false}
              anchor='top'
              dynamicPosition={true}
              onClose={() => setShowPopup({})}
            >
              <div style={{ maxWidth: '300px' }}>
                <h3>{entry.title}</h3>
                <p>{entry.comments}</p>
                <small>
                  Visited on: {new Date(entry.visitDate).toLocaleDateString()}
                </small>
              </div>
            </Popup>
          ) : null}
        </React.Fragment>
      ))}
      {addEntryLocaction ? (
        <>
          <Marker
            latitude={addEntryLocaction.latitude}
            longitude={addEntryLocaction.longitude}
            offsetLeft={-20}
            offsetTop={-20}
          >
            <MdRoom color='red' size='1.5rem' />
          </Marker>
          <Popup
            latitude={addEntryLocaction.latitude}
            longitude={addEntryLocaction.longitude}
            closeButton={true}
            closeOnClick={false}
            anchor='top'
            dynamicPosition={true}
            onClose={() => setShowPopup({})}
          >
            <div style={{ maxWidth: '300px', padding: '1rem' }}>
              <LogEntryForm
                onClose={() => {
                  setAddEntryLocation(null);
                  getEntries();
                }}
                location={addEntryLocaction}
              />
            </div>
          </Popup>
        </>
      ) : null}
    </ReactMapGL>
  );
};

export default Map;
