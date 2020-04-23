const db = require('../models');


//All City Shown
async function index(req,res){
  try{
    let allCity = await db.City.find()
    res.json(allCity)
  }
  catch(err){
    res.status(500).json({
      status:500,
      error: 'Something went wrong, please try again.'
    })
  }
}
// const index = (req, res) => {
//   db.City.find({}, (err, allCity) => {
//     if (err) {
//       return res.status(400).json({status: 400, error: 'Something went wrong, please try again'});
//     }
//     res.json(allCity);
//   });
// };

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


//Create New Item (POST)

async function create(req,res){
  try{
    let newCity = await db.City.create(req.body);
    res.status(201).json(newCity);
  }
  catch{
    res.status(500).json({
      status: 500,
      error: 'Somethign went wrong, please try again.'
    })
  }
}
// const create = (req, res) => {
//   db.City.create(req.body, (err, newCity) => {
//     if (err) {
//       return res.status(400).json({status: 400, error: 'Something went wrong, please try again'});
//     }
//     res.status(201).json(newCity);
//   });
// };


module.exports = {
  index,
  show,
  create,
};
