# Node-Express-Mongo-Assignment

# About

This application provides end points to create blog application using node, express, jwt and mongo as database. 

# Features:

1. User can signup using email and password. On signup user gets access token with 5 days validity.
2. User with appropriate token can Update/Delete his account.
3. User can create blog which can have multiple categories.
4. The user who has created the blog has permission to Update/Delete his blog.
5. Any user can get the blog.


# Getting started
1. npm install
2. node start.js

# To Test
You can test the application using postman.

### To begin with create user

endpoint : http://localhost:3000/user

#### Payload :

{
	"firstName": "Lovish",
	"lastName": "Sachdeva",
	"email": "sachdeva@gmail.com",
	"password" : "hello123"
}

#### Note: Email should be unique.

This will generate access token for that user to perform further crud operation on the user.

To update user make 'PUT' request using endpoint:  http://localhost:3000/user/:userId.

In headers set the following:-

x-access-token :  [access-token-generated-from-the- create-user]

Content-Type : application/json

#### User Endpoints
	GET http://localhost:3000/user
	GET http://localhost:3000/user/:userid
	GET http://localhost:3000/user/me
	POST http://localhost:3000/user
	PUT http://localhost:3000/user/:userid
	DEl http://localhost:3000/user/:userid

### Auth signin

endpoint : http://localhost:3000/auth/signin

#### Payload

{
   "email" : "sachdeva@gmail.com".,
   "password" : "hello123"
}


### To create blogpost:

enpoint: http://localhost:3000/post

header: 

x-access-token :  [access-token-generated-from-the- create-user]
Content-Type : application/json

payload:

  {
     "categories": [
           "5e03a0657e1e30293dc4131e"
      ],
      "title": "New Post",
     "text": "Check out this post"
  }
  
#### Post Endpoints
	GET http://localhost:3000/post
	GET http://localhost:3000/post/:postId
	POST http://localhost:3000/post
	PUT http://localhost:3000/post/:postId
	DEl http://localhost:3000/post/:postId

### To create category

enpoint: http://localhost:3000/categiry

header: 

x-access-token :  [access-token-generated-from-the- create-user]
Content-Type : application/json

payload:

  {
     "name": "Entertainment"
  }
  
#### Note: name should be unique

#### Category Endpoints
	GET http://localhost:3000/category
	GET http://localhost:3000/category/:categoryId
	POST http://localhost:3000/category
	PUT http://localhost:3000/category/:categoryId
	DEl http://localhost:3000/category/:categoryId


### Refer 
You can import postman endpoints from Blog.postman_collection.json