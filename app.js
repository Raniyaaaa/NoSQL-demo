const path = require('path');
const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
// const mongoConnect = require('./util/database').mongoConnect;
const errorController = require('./controllers/error');
const User = require('./models/user');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  User.findById('67f8aaa9b13063d6e4667feb')
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoose.connect('mongodb+srv://Raniyaaa:test12345@cluster0.bevbcwx.mongodb.net/shop?retryWrites=true&w=majority&appName=Cluster0')
.then(result => {
  User.findOne().then(user => {
    if(!user){
      const user = new User({
        name: 'Raniya',
        email: 'raniya182002@gmail.com',
        cart: {
          items: []
        }
      });
      user.save();
    }
  })
  app.listen(3000);
})
.catch(err => {
  console.log(err);
})