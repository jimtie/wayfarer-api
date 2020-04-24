const db = require('../models');
const utility = require('../utility');


async function show(req,res){
  try{
    if(!auth.authorized(req)){
      utility.throwAuthError();
    }
    let foundUser = await db.User.findById(req.params.id);
    if (!foundUser) {
      return res.sendStatus(404);
    }
    res.json(foundUser);
  }
  catch(err){
    utility.handleError(err,res);
  }
}


async function update(req, res){
  try{
    if(!auth.authorized(req)){
      utility.throwAuthError();
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
