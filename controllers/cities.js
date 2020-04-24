const db = require('../models');


//All City Shown
const index = (req, res) => {
  db.City.find({}, (err, allCity) => {
    if (err) {
      return res.status(400).json({status: 400, error: 'Something went wrong, please try again'});
    }
    res.json(allCity);
  });
};

//Show City By ID
async function show(req, res){
  try{
    let foundCity = await db.City.findById(req.params.id).populate('posts');
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
