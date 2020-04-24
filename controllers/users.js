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
    let updatedUser = await db.User.findByIdAndUpdate(user, req.body, {new: true});
    res.json(updatedUser);
  }
  catch(err) {
    utility.handleError(err, res);
  }
}

module.exports = {
    show,
    update,
}
