const mongoose = require('mongoose');

mongoose.connect(
  'mongodb+srv://goalUser:' +
  process.env.MONGO_ATLAS_PW +
  '@goals-app-p9rxi.mongodb.net/todolist?retryWrites=true&w=majority',
  {
    // mongodb+srv://<username>:<password>@goals-app-p9rxi.mongodb.net/<dbname>?retryWrites=true&w=majority
    // useMongoClient: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => {
    console.log('Mongodb connected...............')
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });


// o:
// mongoose
//   .connect(
//     'mongodb+srv://goalUser:' +
//     process.env.MONGO_ATLAS_PW +
//     '@goals-app-p9rxi.mongodb.net/goalUserDB?retryWrites=true&w=majority',
//     { useNewUrlParser: true }
//   )
//   .then(x => {
//     console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
//   })
//   .catch(err => {
//     console.error('Error connecting to mongo', err)
//   });

mongoose.Promise = global.Promise;