import mongoose from 'mongoose';

const MONGO_URI = `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@ds125821.mlab.com:25821/orobosa`;

mongoose.connect(MONGO_URI, (err) => {
  if (err) console.log(err);
});

mongoose.connection.once('open', (err) => {
  if (err) console.log(err);
});
