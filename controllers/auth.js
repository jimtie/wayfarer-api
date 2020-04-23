const db = require('../models')
const bcrypt = require('bcrypt')

//Creating new user

const register = (req,res) => {
  //Make sure that data being posted has the required fields
  if(!req.body.name || !req.body.email || !req.body.password) {
    return res.status(400).json({
      status:400,
      message: "One or more fields have not been filled out. Please enter a name, email, and password and try again."
    })
  }
  db.User.findOne({email: req.body.email}, (err,foundUser) => {
    if (err) return res.status(500).json({
      status:500,
      message: "Something went wrong, please try again."
    })
    if (foundUser) return res.status(400).json({
      status: 400,
      message:"User with that email already exists!"
    })
    bcrypt.genSalt(10, (err, salt) => {
      if (err) return res.status(500).json({
        status:500,
        message: "Something went wrong, please try again."
      })
      bcrypt.hash(req.body.password, salt, (err,hash) => {
        if (err) return res.status(500).json({
          status: 500,
          message: 'Something went wrong, please try again.'
        })
        const newUser = {
          name: req.body.name,
          email: req.body.email,
          password: hash
        }
        db.User.create(newUser, (err, savedUser) => {
          if (err) return res.status(500).json({ status: 500, message: err})
          return res.status(200).json({status:200, message: "User registered!"})
        })
      })
    })
  })
};

//Post-Login user
// POST - login user
const login = (req, res) => {
    // console.log(req.body);
    if (!req.body.email || !req.body.password) {
        return res.status(400).json({ status: 400, message: 'Please enter your email and password' });
    }

    db.User.findOne({email: req.body.email}, (err, foundUser) => {
        if (err) return res.status(500).json({ status: 500, message: 'Something went wrong, please try again' });

        if (!foundUser) {
            return res.status(400).json({ status: 400, message: 'Email or password is incorrect, please try again.'});
        }

        bcrypt.compare(req.body.password, foundUser.password, (err, isMatch) => {
            if (err) return res.status(500).json({ status: 500, message: 'Something went wrong, please try again' });

            if (isMatch) {
                req.session.currentUser = { id: foundUser._id };
                return res.status(200).json({ status: 200, message: 'Success!', data: foundUser._id });
            } else {
                return res.status(400).json({ status: 400, message: 'Email or password is incorrect, please try again.' });
            }
        });
    });
};

//verify current User
const verify = (req,res) => {
  if (!req.session.currentUser) return res.status(401).json({
    status: 401, message: 'Unauthorized'
  });
  res.status(200).json({
    status:200,
    message: `Verification successful. Welcome. User ID: ${req.session.currentUser.id}`
  });
};

//Logout current user
const logout = (req,res) => {
  if (!req.session.currentUser) return res.status(401).json({status: 401, message: 'Unauthorized'});
  req.session.destroy((err) => {
    if (err) return res.status(500).json({status:500, message: 'Something went wrong, please try again.'});
    res.sendStatus(200);
  });
};

module.exports = {
  register,
  login,
  verify,
  logout
}
