const mongoose = require("mongoose");
const db = require("./models");
const fs = require("fs");

const logFile = "./seed.log";
const logMessage = `Seed Instance ${Date.now()}\n\n`;

const log = (message) => {
  fs.appendFileSync(logFile, `${message}\n`);
}

console.log(db);

const cities = [
  {
    name: "San Francisco",
    description: "City by the sea.",
    images: {
      carousel: {
        src: "https://images.unsplash.com/photo-1490598000245-075175152d25?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1110&h=740&q=80",
        credit: {
          name: "Joshua Sortino",
          url: "https://unsplash.com/@sortino?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText",
          site: "https://unsplash.com/?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
        },
      },
      icon: {
        src: "https://images.unsplash.com/photo-1565354886821-203cb17878fd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=90&h=90&q=80",
      },
      header: {
        src: "https://images.unsplash.com/photo-1423347673683-ccdb7f6a948f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=375&q=80",
      },
    }
  },
  {
    name: "London",
    description: "London, the capital of England and the United Kingdom, is a 21st-century city with history stretching back to Roman times",
    images: {
      carousel: {
        src: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1110&h=740&q=80",
      },
      icon: {
        src: "https://images.unsplash.com/photo-1527259047647-731b8be6fd42?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=90&h=90&q=80",
      },
      header: {
        src: "https://images.unsplash.com/photo-1514729797186-944d57303199?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=375&q=80",
      },
    }
  },
];
//   {
//     name: "Gibraltar",
//     description: "Gibraltar is a British Overseas Territory and headland, on Spain"s south coast.",
//     images: {
//       carousel: {
//         src: "",
//         credit: ""
//       },
//       icon: {
//         src: "https://images.unsplash.com/photo-1556715077-6779e7b5a75f?ixlib=rb-1.2.1&auto=format&fit=crop&h=125&w=125&q=100",
//         credit: ""
//       },
//       header: {
//         src: "",
//         credit: ""
//       },
//     }
//   },
//   {
//     name: "Sydney",
//     description: "",
//     images: {
//       icon: {
//         src: "https://images.unsplash.com/photo-1560748952-1d2d768c2337?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&h=125&w=125&q=100",
//         credit: {
//
//         }
//       }
//     }
//   }
//   {
//     name: "Paris",
//     description: "Paris, France"s capital, is a major European city and a global center for art, fashion, gastronomy and culture.",
//     images: {
//       carousel: {
//         src: "",
//         credit: ""
//       },
//       icon: {
//         src: "",
//         credit: ""
//       },
//       header: {
//         src: "",
//         credit: ""
//       },
//     }
//   },
// ];
//
const users = [
  {
    name: "Seanny Phoenix",
    email: "seannyphoenix@gmail.com",
    password: "$2b$10$b/19NiIVUPQID99p7YK62ugLD3skR0daNcVu4yGSz/4kw1yCCkQSS",
    plaintext: "testing123",
  },
  {
    name: "Sri Subramanian",
    email: "srirang97@gmail.com",
    password: "$2b$10$Xt9LeIQgvAaH2A1UH/20m.nCd/rmb/4HC0zJyhhXbpXFSGn030R6y",
    plaintext: "123coder",
  },
  {
    name: "Laura Sack",
    email: "lauragsack@gmail.com",
    password: "$2b$10$kwzbhqrPugfHMLBuslu39OiKs9CC1gD4pfVFQkcHWhUj9mpnqcsKu",
    plaintext: "dev01",
  },
  {
    name: "Jimmy Chen",
    email: "jimmychen.xin@gmail.com",
    password: "$2b$10$7m24zqpRGOsSYywIuRJAVujwmENHYnDx4Udv/vc8zUCGIR2zIVsy2",
    plaintext: "jimmy000",
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
  {
    title: "Get the croissants!",
    content: "Paris is for croissant lovers.",
    user: "Laura Sack",
    city: "Paris"
  },
  {
    title: "London Eye",
    content: "An expensive thrill and not for everyone, but the view is spectacular.",
    user: "Jimmy Chen",
    city: "London"
  },
  {
    title: "Gibraltar is a must",
    content: "Little known gem. Highly recommend.",
    user: "Seanny Phoenix",
    city: "Gibraltar"
  },
  {
    title: "Pass on Ghirardelli Square",
    content: "Total tourist trap, chocolate is nothing to write home about.",
    user: "Sri Subramanian",
    city: "San Francisco"
  },
];

async function seed(){
  try{

    fs.appendFileSync(logFile, logMessage);

    // Delete all cities and images, and seed
    console.log("Seeding cities and images...");
    let cityDelete = await db.City.deleteMany();
    log(`Deleted ${cityDelete.n} cities.`);
    let imageDelete = await db.Image.deleteMany();
    log(`Deleted ${imageDelete.n} images`);

    let cityCreate = await db.City.create(cities);
    log(`Created ${cityCreate.length} cities.`);

    // Delete all users, and seed
    console.log("Seeding users...");
    let userDelete = await db.User.deleteMany();
    log(`Deleted ${userDelete.n} cities.`);
    let userCreate = await db.User.create(users);
    log(`Created ${userCreate.length} cities.`);

    // Delete all posts and seed
    console.log("Seeding posts...");
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

      let newPost = await db.Post.create(post);
      city.posts.push(newPost._id);
      await city.save();
      postCount++;
    }
    log(`Created ${postCount} posts.`)
    console.log("Seed complete. See seed.log for details.");
  }
  catch(err){
      log(err);
      console.log("Seed failed. See seed.log for details.");
  }
  finally{
    log("\n\n")
    mongoose.disconnect();
  }
}



seed();
