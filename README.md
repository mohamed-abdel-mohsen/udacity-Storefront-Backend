# Storefront Backend Project

## Getting Started
first off all  i have used npm Package Manager by runing  npm install to install all packages, then npm update to update all the packages to the latest version.

## Required Technologies
In this project i have been used many libraries to complete the requirement. 

1- dotenv: zero-dependency module that loads environment variables from a .env file into process.env . Storing configuration in the environment separate from code is based on The Twelve-Factor App methodology.

2- pg (pool): postgres DATABASE library that helps node.js to connect the pg with nodejs.

3- db-migrate : to follow any changes happens in the DATABASE schema since DATABASE in not async.

4- bcrypt : to hash the password that the user will enter since the password cant be just passed as it's in the DATABASE we use it for Authentication.

5- json web token (jwt): we used the jsonwebtoken to create token for every user have signed-in or singed-up then we make a middleware to protect the sensitive endPoints by checking the tokens.

6- jasmine(integration): checks how the individual pieces of my application logic work together.


## Steps to Completion

### 1. Connected to the DATABASE: 
after we wrote our sensiteve information in .env we start to connect to our DATABASE on server: localhost (127.0.0.1),port :5432 and we have made two DATABASE on the schema one for devoloping and the another one for testing purpose. 
PG_DATABASE = store_dev;
PG_TEST_DATABASE = store_test



### 2.  DB-Migrations

Since the database in not sync we used DB-migrate for any changes on the schema (tables-columns-rows). 
Migrations are a record of a change made to the schema of a database, with documented instructions to implement and rollback that change.
I have creates 3 tables on the store_dev DATABASE (users/products/orders) by using migration not from the database.


### 3. Models

i have Create the models for each database table.using CRUD methods for each endpoints (index() - show() - create() - delete() - update())


### 4. Express Handlers

i have Set up the Express handlers to route incoming requests to the correct models for each method.  

### 5. JWTs
we used the jsonwebtoken to create token for every user have signed-in or singed-up
then make a middleware to protect the sensiteve routes.




### 6. EndPoints 

+ app.get('/orders',verifyAuthrization ,index);
+ app.get('/orders/:id',verifyAuthrization ,show);
+ app.post('/orders' ,verifyAuthrization ,create);
+ app.post('/orders/:id/products',verifyAuthrization , addProduct)
+ app.get('/products' ,verifyAuthrization ,index);
+ app.get('/products/:id',verifyAuthrization , show);
+ app.post('/products',verifyAuthrization, create);
+ app.get('/users' ,verifyAuthrization, index);
+ app.get('/users/:id',verifyAuthrization, show);
+ app.post('/users' ,create);
+ app.post('/users/authenticate' , authenticate);