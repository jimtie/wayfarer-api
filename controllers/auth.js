const db = require('../models');
const bcrypt = require('bcrypt');
const utility = require('../utility');

/**
 * Register a new user
 * @param  {[type]} req HTTP Request
 * @param  {[type]} res HTTP Response
 * @return {[type]}     The new user
 */
async function register(req, res) {
  try{
    if(!req.body.name || !req.body.email || !req.body.password) {
      utility.throw4xx(401);
    }

    let existingEmail = await db.User.findOne({email: req.body.email});
    if (existingEmail){
      utility.throw4xx(401);
    }

    let salt = await bcrypt.genSalt(10);
    let hash = await bcrypt.hash(req.body.password, salt);

    const newUser = {
      name: req.body.name,
      email: req.body.email,
      password: hash
    }

    let user = await db.User.create(newUser);
    res.json(utility.clientUser(user));
  }
  catch(err){
    utility.handleError(err, res);
  }
}

/**
 * Logs the user in
 * @param  {[type]} req HTTP Request
 * @param  {[type]} res HTTP Response
 * @return {[type]}     The logged-in user
 */
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

    req.session.currentUser = utility.clientUser(user);
    res.json(utility.clientUser(user));
  }
  catch(err){
    utility.handleError(err, res);
  }
}


/**
 * Verify the current user
 * @param  {[type]} req HTTP Request
 * @param  {[type]} res HTTP Response
 * @return {[type]}     The verified user
 */
async function verify(req,res){
  try{
    if (!authorized(req)){
      utility.throw4xx(401);
    }

    let user = await db.User.findById(req.session.currentUser.id);
    if (!user){
      utility.throw4xx(400);
    }

    res.json(utility.clientUser(user));
  }
  catch(err){
    utility.handleError(err, res);
  }
};

/**
 * Log out the current user
 * @param  {[type]} req HTTP Request
 * @param  {[type]} res HTTP Response
 * @return {[type]}     Status 200
 */
async function logout(req, res){
  try{
    if (authorized(req)){
      utility.throw4xx(401);
    }

    await req.session.destroy();
    res.sendStatus(200);

  }
  catch(err){
    utility.handleError(err, res);
  }
}

function authorized(req){
  return(!!req.session.currentUser);
}

module.exports = {
  register,
  login,
  verify,
  logout,
  authorized
}
