const db = require('../models');
const auth = require('./auth');
const utility = require('../utility');


async function show(req,res){
  try{
    if(!auth.authorized(req)){
      utility.throwAuthError();
    }

    let user = await db.User.findById(req.params.id);
    if (!user) {
      utility.throw4xx(404);
    }

    res.json(utility.clientUser(user));
  }
  catch(err){
    utility.handleError(err, res);
  }
}


async function update(req, res){
  try{
    if(!auth.authorized(req)){
      utility.throw4xx(401);
    }

    let user = req.session.currentUser.id;
    req.body.city = await db.City.findById(req.body.city);
    let updatedUser = await db.User.findByIdAndUpdate(
      user,
      req.body,
      {new: true}
    );
    res.json(utility.clientUser(updatedUser));
  }
  catch(err) {
    utility.handleError(err, res);
  }
}

module.exports = {
    show,
    update,
}
