const db = require('../models');
const utility = require('../utility');

const show = (req, res) => {
    db.User.findById(req.params.id, (err, foundUser) => {
        if (err) return res.status(500).json({
            status: 500,
            message: err
        })

        res.status(200).json({
            status: 200,
            data: foundUser
        })
    })
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
