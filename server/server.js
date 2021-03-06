
const express = require('express');
require('dotenv').config();

const app = express();
const bodyParser = require('body-parser');
const sessionMiddleware = require('./modules/session-middleware');

const passport = require('./strategies/user.strategy');

// Route includes
const userRouter = require('./routes/user.router');
const plantsRouter = require('./routes/plants.router');
const waterRouter = require('./routes/water.router');
const fertilizeRouter = require('./routes/fertilize.router')
const taskRouter = require('./routes/tasks.router')
const taskObjRouter = require('./routes/taskObj.router')
const imageRouter = require('./routes/image.router')
const UploaderS3Router = require('react-dropzone-s3-uploader/s3router')

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use('/api/user', userRouter);
app.use('/api/plants', plantsRouter);
app.use('/api/water', waterRouter);
app.use('/api/fertilize', fertilizeRouter);
app.use('/api/tasks', taskRouter);
app.use('/api/tasks2', taskObjRouter);
app.use('/api/image', imageRouter)
app.use('/s3', UploaderS3Router({
  bucket: 'veggiebucket',                           // required
  region: 'us-east-1',                            // optional
  headers: {'Access-Control-Allow-Origin': '*'},  // optional
  ACL: 'public-read',                                 
}));

// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
