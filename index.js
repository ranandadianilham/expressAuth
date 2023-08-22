const express = require('express');
const db = require("./database/pgsql.connection");
const app = express();
var cors = require('cors')
const cookieParser = require("cookie-parser");
const sessions = require('express-session');

const port = 3002;
const oneDay = 1000 * 60 * 60 * 24;
let homeRoute = require('./routes/home.route');
let authRoute = require('./routes/auth.route');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors())
app.use(sessions({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false 
}));


app.use("/home", homeRoute);
app.use('/auth', authRoute);



app.get('/', (req, res) => {
  let session = req.session;
  console.log('sess', session)
    if(session.userid){
        res.send("Welcome User <a href=\'/logout'>click to logout</a>");
    }else
    //res.sendFile('views/index.html',{root:__dirname})
    res.send('wtf');
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