const db = require('../models')

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

//Updating name, city, and post associated with user
//Broken down into two functions

const updateCity = (req, res) => {
  try{
    let foundUser = await db.User.find(req.body.name);
    if (err){
      return res.status(400).json({
        status:400, error: 'Something went wrong, please try again'
      });
      //Finding City by Id
      let cityUpdate = foundUser.user.id(req.params.id);
      if (!cityUpdate) {
        return res.status(400).json({status: 400, error: 'City not Found, try again'});
      }
      //Changes associated city with user by changing name
      cityUpdate.name = req.body.name;
      //saving new city associated with user
    let savedNewCity = await foundUser.save();
    //rendering new city
    let updatingCity = await db.User.findByIdAndUpdate(req.params.userId, req.body, {new: true});
    if (err){
      return res.status(400).json({status:400, error: 'Something went wrong, please try again'});
    }
    res.json(updatingCity);

  }
  catch(err)
  res.status(500).json({
    status: 500,
    error: 'Server error.'
  });


module.exports = {
    show,
    update,
}
