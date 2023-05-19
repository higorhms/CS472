const express = require("express");
const cookieParser = require("cookie-parser");
const sessions = require("express-session");
const app = express();
const uuid = require("uuid");

const ONE_DAY = 1000 * 60 * 60;
const answers = [9, 8, 36, 13, 32];
const questions = [
  "3,1,4,1,5", // π
  "1,1,2,3,5", // fibonacci
  "1,4,9,16,25", // squares
  "2,3,5,7,11", // primes
  "1,2,4,8,16", // powers of 2
];

var uuidV4 = uuid.v4();

app.use(
  sessions({
    secret: "default",
    saveUninitialized: true,
    cookie: { maxAge: ONE_DAY },
    resave: false,
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));
app.use(cookieParser());
app.set("view engine", "pug");

var session = new Array();

app.get("/", (req, res) => {
  uuidV4 = uuid.v4();
  session[uuidV4] = req.session;
  session[uuidV4].count = 1;
  session[uuidV4].SCORE = 0;

  res.render("question", {
    SCORE: session[uuidV4].SCORE,
    QUESTION: questions[session[uuidV4].count - 1],
    SESSION: uuidV4,
    count: session[uuidV4].count,
  });
});

app.post("/question", (req, res) => {
  uuidV4 = req.body.SESSION;
  session[uuidV4].count++;
  var count = session[uuidV4].count;
  if (req.body.answer == answers[session[uuidV4].count - 2]) {
    session[uuidV4].SCORE++;
  }
  var SCORE = session[uuidV4].SCORE;
  if (count <= 5) {   
    res.render("question", {
      SCORE: SCORE,
      QUESTION: questions[count - 1],
      SESSION: uuidV4,
      count: count,
    });
  } else {    
    session[uuidV4].destroy();
    req.session.destroy();
    res.render("result", {
      SCORE,      
    });
  }
});

app.listen(8080)
