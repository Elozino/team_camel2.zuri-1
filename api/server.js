const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const userRoute = require("./routes/userRoute")
const mongoose = require("mongoose");
let DB_CONNECT = process.env.DB_CONNECT;


// New line
const passport = require('passport');
const cookieSession = require('cookie-session');
require('./utils/passport');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// New Line
app.use(cookieSession({
  name: 'google-auth-session',
  keys: ['key1', 'key2']
}));
app.use(passport.initialize());
app.use(passport.session());




//database
// (async function connection() {
//   try {
//     mongoose.connect(
//       DB_CONNECT,
//       {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//       },
//       (error) => {
//         if (error) {
//           throw new Error("Failed to connect to database");
//         }
//         console.log("Successfuly connected to the database");
//       }
//     );
//   } catch (error) {
//     console.log(error);
//   }
// })()

//Routes
app.get("/user", userRoute);

//welcome note
app.get("/", (req, res) => {
  res.send("Here you get you get appropriate T &C, you are welcome 🙌 <button><a href='auth'>Sign with Google</a></button>");
});

// Auth 
app.get('/auth' , passport.authenticate('google', { scope:
  [ 'email', 'profile' ]
}));

// Auth Callback
app.get( '/auth/callback',
  passport.authenticate( 'google', {
      successRedirect: '/auth/callback/success',
      failureRedirect: '/auth/callback/failure'
}));

// Success 
app.get('/auth/callback/success' , (req , res) => {
  if(!req.user)
      res.redirect('/auth/callback/failure');
  res.send("Welcome " + req.user.email);
});

// failure
app.get('/auth/callback/failure' , (req , res) => {
  res.send("Error");
})

//404 error
app.use((req, res, next) => {
  res.status(404).json({
    message: "Ohh you are lost, go back now!!!!",
  });
});


// Database
const dbURI = "";

PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`App is running on port ${PORT}`));