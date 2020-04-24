const db = require('../models');
const bcrypt = require('bcrypt');
const utility = require('../utility');

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


async function login(req, res){
  try{
    if (!req.body.email || !req.body.password){
      utility.throw4xx(401); // Unauthorized
    }

    let user = await db.User.findOne({email: req.body.email});
    if (!user){
      utility.throw4xx(401); // Unauthorized
    }

    let passMatch = await bcrypt.compare(req.body.password, user.password);
    if (!passMatch){
      utility.throw4xx(401); // Unauthorized
    }

    req.session.currentUser = { id: user._id };
    res.json({
      id: user._id,
      name: user.name,
      city: user.city,
      joinDate: user.createdAt,
    });
  }
  catch(err){
    utility.handleError(err, res);
  }
}


//verify current User
const verify = (req,res) => {
  if (!authorized(req)){
    utility.throwAuthError();
  }
  res.status(200).json({
    status:200,
    message: `Verification successful. Welcome. User ID: ${req.session.currentUser.id}`
  });
};

async function verifyDebug(req, res){
  console.log('verifyDebug');
  try{
    let user = await db.User.findOne();
    res.json({
      status: 200,
      data: user
    });
  }
  catch(err){
    utility.handleError(err, res);
  }
}

//Logout current user
const logout = (req,res) => {
  if (!req.session.currentUser) return res.status(401).json({status: 401, message: 'Unauthorized'});
  req.session.destroy((err) => {
    if (err) return res.status(500).json({status:500, message: 'Something went wrong, please try again.'});
    res.sendStatus(200);
  });
};

function authorized(req){
  return (!!req.session.currentUser);
}

module.exports = {
  register,
  login,
  verify,
  logout,
  verifyDebug,
  authorized
}
