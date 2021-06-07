const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser');
const userRouter = require('./routes/users');
const authRouter = require('./routes/auth');
const worksheetRouter = require('./routes/worksheet');
const managerSheetRouter = require('./routes/managerSheet');
const logger = require('./utils/logger');
const passport = require('passport');
const User = require('./models/user');
const cors = require('cors')
const app = express();
require('dotenv').config({ path: './configurations/env/.env' });
require('./configurations/mongo');
const googleRouter = require('./routes/google');
const facebookRouter = require('./routes/facebook');
const localRouter = require('./routes/local');

app.use(express.static('public'));
app.use(cookieParser('sample'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(require('express-session')({ 
  secret: 'yolo 123',
  resave: true,
  saveUninitialized: false,
  cookie: { maxAge : 24*60*60*1000 }, 
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(cors());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use('/api', function(req, res, next){
  if(req.isAuthenticated() || req.path.includes("/auth/") ){
    next();
  } else {
    res.status(400).send('Not Authorized');
  }
}, localRouter, facebookRouter, googleRouter, authRouter, worksheetRouter, managerSheetRouter, userRouter);



app.use((err, req, res, next) => {
  logger.error(err);
  next();
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  logger.info(`Server running on port ${port}`)
});
