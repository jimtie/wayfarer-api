const db = require('./models');

const cities = [
  {
    name: 'San Francisco',
    description: 'City by the sea.',
    image:'https://images.unsplash.com/photo-1534050359320-02900022671e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80',
  },
  {
    name: 'London',
    description: 'London, the capital of England and the United Kingdom, is a 21st-century city with history stretching back to Roman times',
    image: 'https://www.cityam.com/wp-content/uploads/2020/02/London_Tower_Bridge_City.jpg',
  },
  {
    name: 'Gibraltar',
    description: "Gibraltar is a British Overseas Territory and headland, on Spain's south coast.",
    image: 'https://www.marketplace.org/wp-content/uploads/2018/10/gibraltar1.jpg?fit=1800%2C1000',
  },
  {
    name: 'Paris',
    description: "Paris, France's capital, is a major European city and a global center for art, fashion, gastronomy and culture.",
    image: 'https://static.neweuropetours.eu/wp-content/uploads/2018/09/paris-free-tours-1600x900.jpg',
  },
];

// DELETE BELOW

// console.log('Deleting all data');
//
// db.City.deleteMany({}, (err,res) => {
//   if (err) {
//     console.log(err)
//     process.exit();
//   }
//   console.log(`Deleted all ${res.deleteCount}`);
// }
