const db = require('../models');


//All City Shown
async function index(req,res){
  try{
    let allCity = await db.City.find();
    res.json(allCity);
  }
  catch(err){
    res.status(500).json({
      status:500,
      error: 'Something went wrong, please try again.'
    });
  }
}


//Show City By ID
async function show(req, res){
  try{
    let foundCity = await db.City.findById(req.params.id).populate({
      path: 'posts',
      populate: {
        path: 'user',
        select: 'name'
      }
    });
    res.json(foundCity);
  }
  catch(err) {
    console.log(err);
    res.status(500).json({
      status: 500,
      error: 'Something went wrong, please try again'}
    );
  }
};

module.exports = {
  index,
  show,
};
