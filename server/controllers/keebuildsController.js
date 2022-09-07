const db = require('../models/keebuildsModel');
const bcrypt = require('bcrypt');

const errorCreator = (methodName, description) => ({
  log: `Error occurred in keebuildsController.${methodName}.\nDescription: ${description}`,
  message: `Error occurred in keebuildsController.${methodName}. See server logs for more details.`,
});

const generateInnerSelect = (k, v) => {
  if (k === 'switchType')
    return `(SELECT _id FROM public.switch WHERE name='${v}')`;
  return `(SELECT _id FROM public.${k} WHERE name='${v}'), `;
};

const keebuildsController = {};

// userSchema.pre('save', async function(next){
//   const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
//   this.password = await bcrypt.hash(this.password, salt);
//   next();
// })
// const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
//   this.password = await bcrypt.hash(this.password, salt);

keebuildsController.createUser = async (req, res, next) => {
  const { username, password } = req.body;
  // create an env file
  // SALT = 10
  // const salt = await bcrypt.genSalt(Number(process.env.SALT))
  const salt = 10; //create process.env.SALT file with salt value to increase security
  const hashedPassword = await bcrypt.hash(password, salt);
  // const hashedPassword = await bcrypt.genSalt(saltRounds, function(err, salt) {  
  //   bcrypt.hash(password, salt, function(err, hash) {
  //     // Store hash in database here
  //     if (err) throw (err); 
  //     return hash;
  //   });
  // });
  const queryString = `INSERT INTO public.account(username, password) VALUES ('${username}', '${hashedPassword}')`;
  //create query string for SQL database
  //const queryString = `INSERT INTO public.account (username, password) VALUES (${username}, ${hashedPassword})`;
  //db.query to create the new account
  const response = await db.query(queryString); 
  if(!response){ 
    return next(errorCreator('createUser', 'response failed'));
  }
  return next();
};

keebuildsController.verifyUser = (req, res, next) => {
  const { username, password } = req.body;
  const hashedPassword = bcrypt.hash(password, 10);
  const queryString = `SELECT public.account FROM user WHERE username = ${username} AND password = ${hashedPassword}`; // find the user account

  db.query(queryString)
    // .then(() => res.locals.verifiedUser = true)
    .then(() => next())
    .catch(() => next(errorCreator('createUser', 'FAILED to verify USER')));
};

////////login controller not complete -- pls feel free to complete the login
//1. create the SQL query
//2. pass that query to db.query

// keebuildsController.verifyUser = (req, res, next) => {
//   const { username, password } = req.body;
//   const queryUsername = ''
//   const queryPassword = ''

//   if(db.queryUsername === username) {
//   bcrypt.compare(password, db.queryUsername, function(err, result) {
// if (result === true) {
// next() or render open sesame
// }
// })
// }

keebuildsController.getBuildsForSession = (req, res, next) => {
  console.log('REQ', req.params.id);
  //size, pcb, switch, plate, keycap need to be queried by Joining
  const queryString = `SELECT b._id, b.name, b.color, s.name as size, pcb.name as pcb, switch.name as switch, plate.name as plate, k.name as keycap, a.username as username
  FROM public.build b INNER JOIN public.size s ON b.size=s._id 
  INNER JOIN public.pcb pcb ON b.pcb=pcb._id 
  INNER JOIN public.switch switch ON b.switch=switch._id 
  INNER JOIN public.plate plate ON b.plate=plate._id 
  INNER JOIN public.keycap k ON b.keycap=k._id 
  INNER JOIN public.account a ON b.account=a.username
  WHERE username='catsnakes';`;

  db.query(queryString)
    .then((result) => result.rows)
    .then((result) => {
      res.locals.builds = result;
    })
    .then(() => next())
    .catch(() =>
      next(errorCreator('getBuildsForSession', 'Error fetching builds from DB'))
    );
};

keebuildsController.createBuild = (req, res, next) => {
  const { session, name, size, pcb, plate, keycap, color } = req.body;
  const switchType = req.body.switch;
  const rowsRequiringSelect = { size, pcb, plate, keycap, switchType };
  let query = `INSERT INTO build (session, name, color, size, pcb, plate, keycap, switch) VALUES (${session}, '${name}', '${color}', `;
  for (const [k, v] of Object.entries(rowsRequiringSelect)) {
    query = query + generateInnerSelect(k, v);
  }
  query = query + ')';
  db.query(query)
    .then((dbResponse) => (res.locals.dbResponse = dbResponse.rowCount))
    .then(() => next())
    .catch(() => errorCreator('createBuild', 'Failed to insert Build'));
};

keebuildsController.deleteBuild = (req, res, next) => {
  const query = `DELETE FROM public.build b WHERE b._id=${req.params.id}`;
  db.query(query)
    .then(() => next())
    .catch(() => errorCreator('deleteBuild', 'Failed to DELETE Build'));
};

module.exports = keebuildsController;
