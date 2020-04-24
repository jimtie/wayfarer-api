const mongoose = require('mongoose');
const db = require('./models');
const fs = require('fs');

const logFile = './seed-log.txt';
const logMessage = `Seed Instance ${Date.now()}\n\n`;

const log = (message) => {
  fs.appendFileSync(logFile, `${message}\n`);
}

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

const users = [
  {
    name: "Seanny Phoenix",
    email: "seannyphoenix@gmail.com",
    password: "testing123"
  },
  {
    name: "Sri Subramanian",
    email: "srirang97@gmail.com",
    password: "123coder"
  },
  {
    name: "Laura Sack",
    email: "lauragsack@gmail.com",
    password: "dev01"
  },
  {
    name: "Jimmy Chen",
    email: "jimmychen.xin@gmail.com",
    password: "jimmy000"
  }
];

const posts = [
  {
    title: "Here is a post",
    content: "I say some stuff",
    user: "Seanny Phoenix",
    city: "San Francisco"
  },
  {
    title: "Some fuckery here.",
    content: "I'm just trying to survive, man.",
    user: "Sri Subramanian",
    city: "Paris"
  },
];

async function seed(){
  try{

    fs.appendFileSync(logFile, logMessage);

    // Delete all cities, and seed
    console.log('Seeding cities...');
    let cityDelete = await db.City.deleteMany();
    log(`Deleted ${cityDelete.n} cities.`);
    let cityCreate = await db.City.create(cities);
    log(`Created ${cityCreate.length} cities.`);

    // Delete all users, and seed
    console.log('Seeding users...');
    let userDelete = await db.User.deleteMany();
    log(`Deleted ${userDelete.n} cities.`);
    let userCreate = await db.User.create(users);
    log(`Created ${userCreate.length} cities.`);

    // Delete all posts and seed
    console.log('Seeding posts...');
    let postDelete = await db.Post.deleteMany();
    log(`Deleted ${postDelete.n} posts.`)
    let postCount = 0;
    for (let post of posts){
      // Get id of the named user
      let user = await db.User.findOne({
        name: post.user
      });
      post.user = user._id;

      // Get id of the named city
      let city = await db.City.findOne({
        name: post.city
      });
      post.city = city._id;

      await db.Post.create(post);
      postCount++;
    }
    log(`Created ${postCount} posts.`)
    console.log('Seed complete.');
  }
  catch(err){
      log(err);
      console.log('Seed failed. See seed-log.txt for details.');
  }
  finally{
    log('\n\n')
    mongoose.disconnect();
  }
}



seed();
