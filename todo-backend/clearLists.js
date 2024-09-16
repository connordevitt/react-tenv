const mongoose = require('mongoose');
const List = require('./models/List');  // Adjust the path to your List model

mongoose
  .connect('mongodb://127.0.0.1:27017/todoapp', {  // Use your database name
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB');
    return List.deleteMany({});  // Deletes all lists
  })
  .then(() => {
    console.log('All lists deleted');
    mongoose.connection.close();
  })
  .catch((err) => {
    console.error('Error:', err);
  });
