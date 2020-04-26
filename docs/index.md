# API Documentation

## Versioning

This API is versioned with a URL prefix. For all controllers in the current version of the API, the path is prefixed with ```/api/v1```.

## Auth

### GET `/auth/verify`

This controller retrieves the current user, if one is logged in. If no user is logged in, an HTTP Status of 401 is returned.

Sample response:
```
{
  "_id": "5ea1dc3fb266f21dae6c3940",
  "name": "My Name",
  "email": "myname@example.com",
  "city": "5ea1d30d1332071875d21806",
  "posts": [
    {
      "_id": "5ea216b087967f39c9cf617b",
      "title": "Beautiful Views"
    },
    {
      "_id": "5ea217d9c0776f3a7d67c05e",
      "title": "Awesome Transit"
    }
  ]
}
```

### POST `/auth/register`

This controller registers a new user.

Sample request:

*all fields are required*
```
{
  "name": "My Name",
  "email": "myname@example.com",
  "password": "password1"
}
```

Sample response:
```
{
  "_id": "5ea1dc3fb266f21dae6c3940",
  "name": "My Name",
  "email": "myname@example.com",
}
```

#### Errors

An HTTP Status 400 is returned if any of the fields in the request are missing, or if a user with that email already exists.

### POST `/auth/login`

This controller logs a user in, given an email and plaintext password.

Sample request:
```
{
  "email": "myname@example.com",
  "password": "password1"
}
```

Sample response:
```
{
  "_id": "5ea1dc3fb266f21dae6c3940",
  "name": "My Name",
  "email": "myname@example.com",
  "city": "5ea1d30d1332071875d21806",
  "posts": [
    {
      "_id": "5ea216b087967f39c9cf617b",
      "title": "Beautiful Views"
    },
    {
      "_id": "5ea217d9c0776f3a7d67c05e",
      "title": "Awesome Transit"
    }
  ]
}
```

#### Errors

An HTTP Status 400 is returned if the username or password is incorrect.

### DELETE `/auth/logout`

This controller logs a user out.

## Cities

### GET `/cities`

This controller returns an array of all cities.

Sample response:
```
[
  {
    "_id": "5ea1d06b1332071875d21804"
    "name": "San Francisco",
    "description": "Some information about San Francisco.",
    "image": "https://upload.wikimedia.org/wikipedia/commons/1/1e/San_Francisco_from_the_Marin_Headlands_in_March_2019.jpg",
    posts: [
      "5ea216b087967f39c9cf617b",
      "5ea217d9c0776f3a7d67c05e"
    ],
    "__v": 10
  },
  {
    "_id": "5ea1d30d1332071875d21806"
    "name": "Los Angeles",
    "description": "Famous people live here.",
    "image": "https://upload.wikimedia.org/wikipedia/commons/3/32/20190616154621%21Echo_Park_Lake_with_Downtown_Los_Angeles_Skyline.jpg",
    posts: [
    ],
    "__v": 5
  }
]
```

### GET `/cities/:id`

This controller returns the city specified by `id`.

Sample path:
```
http://localhost:3001/api/v1/cities/5ea1d06b1332071875d21804
```

Sample response:
```
{
  "_id": "5ea1d06b1332071875d21804"
  "name": "San Francisco",
  "description": "Some information about San Francisco.",
  "image": "https://upload.wikimedia.org/wikipedia/commons/1/1e/San_Francisco_from_the_Marin_Headlands_in_March_2019.jpg",
  posts: [
    {
      "_id": "5ea216b087967f39c9cf617b",
      "title": "Beautiful Views",
      "content": "I love the views we have here in San Francisco! Meander along the Embarcadero, or climb Twin Peaks. You'll be amazed by the beauty",
      "city": "5ea1d06b1332071875d21804",
      "user": {
        "_id": "5ea1dc3fb266f21dae6c3940",
        "name": "My Name"
      },
      "__v": 0
    },
    {
      "_id": "5ea217d9c0776f3a7d67c05e",
      "title": "Awesome Transit",
      "content": "OMG I love MUNI! I got to ride the old cable car to the top of Lombard St, and I took the light rail to Ocean Beach.",
      "city": "5ea1d06b1332071875d21804",
      "user": {
        "_id": "5ea1dc3fb266f21dae6c3940",
        "name": "My Name"
      },
      "__v": 0
    }
  ],
  "__v": 10
}
```

## Posts

### GET `/posts/user`

This controller returns all posts made by the currently logged in user.

#### Errors

An HTTP Status 403 is returned if no user is logged in.

### GET `/posts/:id`

This controller returns the post specified by `id`.

Sample path:
```
http://localhost:3001/api/v1/posts/5ea216b087967f39c9cf617b
```

Sample response:
```
{
  "_id": "5ea217d9c0776f3a7d67c05e",
  "title": "Awesome Transit",
  "content": "OMG I love MUNI! I got to ride the old cable car to the top of Lombard St, and I took the light rail to Ocean Beach.",
  "city": "5ea1d06b1332071875d21804",
  "user": "5ea1dc3fb266f21dae6c3940",
  "__v": 0
}
```

### POST `/posts`

Not yet implemented.

### PUT `/posts/:id`

Not yet implemented.

## Users

### GET `/users/:id`

Not yet implemented.

### PUT `users/`

This controller updates a user and returns the updated data.

Sample request:

*all fields optional*
```
{
  "name": "New Name",
  "city": "5ea1d06b1332071875d21804"
}
```

Sample response:
```
{
  "_id": "5ea1dc3fb266f21dae6c3940",
  "name": "New Name",
  "email": "myname@example.com",
  "city": "5ea1d06b1332071875d21804",
  "posts": [
    {
      "_id": "5ea216b087967f39c9cf617b",
      "title": "Beautiful Views"
    },
    {
      "_id": "5ea217d9c0776f3a7d67c05e",
      "title": "Awesome Transit"
    }
  ]
}
```
