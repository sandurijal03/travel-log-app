const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(`${process.env.DB_URI}/${process.env.DB_NAME}`, {
      useCreateIndex: true,
      useFindAndModify: false,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    // eslint-disable-next-line no-console
    console.log('db connected');
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
  }
};

module.exports = {
  connectDB,
};
