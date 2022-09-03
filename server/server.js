const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const PORT = process.env.PORT || 3000;
const keebuildsController = require('./controllers/keebuildsController');
app.use(cors());
app.use(express.json());

// serve files on production mode
if (process.env.NODE_ENV !== 'development') {
  app.use('/build', express.static(path.resolve(__dirname, '../build')));
  app.get('/', (req, res) => {
    return res
      .status(200)
      .sendFile(path.resolve(__dirname, '../build/index.html'));
  });
}
const buildRouter = express.Router();
app.use('/', buildRouter);

// Post a build to the database
buildRouter.post('/build', keebuildsController.createBuild, (req, res) => {
  return res.status(201).json(res.locals.dbResponse);
});

//Get build from database
buildRouter.get(
  '/sessions',
  keebuildsController.getBuildsForSession,
  (req, res) => {
    return res.status(200).json(res.locals.builds);
  }
);
// catch all handler for all unknown routes
app.use((req, res) => {
  res.status(404).send('404');
});

// global error handler catches all errors
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => console.log(`Server listening on port: ${PORT}...`));

module.exports = app;
