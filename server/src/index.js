const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const { connectDB } = require('./connectDB');

const { errorHandler, notFound } = require('./middleware');
const logsRouter = require('./api/logs');

const app = express();

connectDB();

app.use(express.json());
app.use(
  cors({
    origin: 'http://localhost:3000',
  }),
);
app.use(morgan('common'));
app.use(helmet());

app.use('/api/logs', logsRouter);

app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 3001;

// eslint-disable-next-line no-console
app.listen(port, () => console.log('listening on port ', port));
