const express = require('express');
const db = require("./database/pgsql.connection");
const app = express();
var cors = require('cors')

const port = 3002
let homeRoute = require('./routes/home.route');
let authRoute = require('./routes/auth.route');
app.use(express.json());
app.use(cors())


app.use("/home", homeRoute);
app.use('/auth', authRoute);



app.get('/', (req, res) => {
  res.send('Hello World!')
})



app.listen(port, async () => {
  console.log(`Example app listening on port ${port}`);
  try {
    await db.postgresqlConnect.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})