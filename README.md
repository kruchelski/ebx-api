<h1 align="center">
  ebx-api 📬
</h1>
<p align="center">
A simple bank like API for testing purposes
</p>

<!-- Infos -->
<p align="center">
  <img src="https://img.shields.io/static/v1?labelColor=381838&color=777777&label=created%20at&message=Sep%202021" alt="Creation Date" />

  <img src="https://img.shields.io/github/last-commit/kruchelski/ebx-api?label=updated%20at&labelColor=381838&color=777777" alt="Update Date" />

</p>

<div style="color:#333333">

## 😶 What is this and why creating it?

This is a simple API to simulate some bank transactions events, like deposits, withdraws or transfers between accounts. All of the interactions are made through HTTP requests (at this moment the requests are limited only go GET and POST). The available routes and their info are described in the **Available Routes** below in this README.  
The purpose of this project is to serve as a test and to evaluate some knowledge.

> Note: As this is for evaluation, there is no persistance mechanism (like a database). Once the application is stopped, the application's data will be lost.

## 🖥 How do these stuff work?

Using some API Platform, like [Postman](https://www.postman.com/) the user can make the requests to some specific routes, using the correct method and the correct body schema and query strings parameters. The idea is that through the requests, the user can add an account, deposit or withdraw from accounts, transfer between accounts and reset the accounts list.

## 🚜 What is under the hood?

To implement this application, it was possible to use any language available. In this case, it was chosen **NodeJS** with the **Express** framework. The main libs and tools are the folowing:

- [NodeJS](https://nodejs.org/en/) - The version used to implement the application was the 18.12.1, but you should be fine with version 16, for example
- [NPM](https://www.npmjs.com/) - Used for the package management. The version used to implement the application was 8.19.2
- [Express](https://expressjs.com/pt-br/) - To implement the server
- [Jest](https://jestjs.io/pt-BR/) - For the unit tests

> Note: Instead of using CommonJS (and therefore the require syntax), it was used the ES Modules (and therefore the import syntax)

## 🎛 So... How to set up the environment?

- Install the dependencies
- Run the app locally with nodemon for faster refreshes
- (Optionally) Run the tests

```bash
npm install     # This will install the dependencies
npm run dev     # This will run the application with nodemon in the port 3000

# optionally
npm start       # Starts the application without nodemon. If any changes occurs in the code, you  will need to manually stop the application and then start again
npm run test    # Runs the unit tests in a verbose way generating the coverage report
```

The application is served in the port 3000. If everything goes well, when you start the application you should see in the terminal "app running on port 3000"

> Note: In case you want to manually run the tests (for example only a specific suite) you can use the command `NODE_OPTIONS=--experimental-vm-modules npx jest --coverage --verbose`

## Available routes

### health

```
-> GET /health
<- 200 'Server is up and running'
To check if the server is up and running.
```

### account

```
-> GET /account
<- 200 '[{id: '123', balance: 130}]'
Lists all added accounts. The response is an array of objects
```

### reset

```
-> POST /reset {}
<- 200 'OK'
Reset the accounts's list removing all existing accounts
```

### balance

```
-> GET /balance?account_id=123
<- 200 100                        // if the account exists
<- 404 0                          // if the account does not exists
<- 400 'account_id not provided'  // if no account_id is provided
```

### event

The event route can perform three actions according to the `type` property in the body of the request. The three actions are: deposit, withdraw and transfer

```
-> POST /event {type: 'deposit', destination: '123', amount: 50}
<- 201 {id: 123, balance: 50}     // the balance is the updated value

-> POST /event {type: 'withdraw' origin: '123', amount: 10}
<- 201 {id: 123, balance: 40}     // the balance is the updated value
<- 404 0                          // if the account does not exist

-> POST /event {type: 'transfer' origin: '123', amount: 20, destination: '321}
<- 201 {origin: {id: '123, balance: 20}, destination: {id: '321', balance: 20}}     // the balance is the updated value
<- 404 0                          // if the origin account does not exist
```

</div>
