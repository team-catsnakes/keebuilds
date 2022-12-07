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
  try {
    const { username, password } = req.body;
    // create an env file
    // SALT = 10
    // const salt = await bcrypt.genSalt(Number(process.env.SALT))
    const salt = 10; //create process.env.SALT file with salt value to increase security
    const hashedPassword = await bcrypt.hash(password, salt);
    const queryString = `INSERT INTO public.account(username, password) VALUES ('${username}', '${hashedPassword}')`;
    //create query string for SQL database
    //const queryString = `INSERT INTO public.account (username, password) VALUES (${username}, ${hashedPassword})`;
    //db.query to create the new account
    const response = await db.query(queryString);
    res.locals.newUser = username;
    return next();
  } catch (err) {
    return next(errorCreator('createUser', 'response failed'));
  }
};

keebuildsController.verifyUser = async (req, res, next) => {
  const { username, password } = req.body;
  const queryString = `SELECT _id, username, password FROM public.account WHERE username = '${username}'`;
  // { _id, username, password }
  const response = await db.query(queryString);
  // const hashedPassword = await bcrypt.hash(password, 10);
  const verifiedPassword = await bcrypt.compare(
    password,
    response.rows[0].password
  );
  if (!verifiedPassword)
    return next(errorCreator('verifyUser', 'verifiedPassword failed'));
  //compare hashed password with returned password
  res.locals.verifiedUser = response.rows[0].username;
  return next();
};

keebuildsController.getBuildsForSession = (req, res, next) => {
  //todo: Query builds by username via the query parameters
  //size, pcb, switch, plate, keycap need to be queried by Joining
  const queryString = `SELECT b._id, b.name, b.color, s.name as size, pcb.name as pcb, switch.name as switch, plate.name as plate, k.name as keycap, a.username as username
  FROM public.build b INNER JOIN public.size s ON b.size=s._id 
  INNER JOIN public.pcb pcb ON b.pcb=pcb._id 
  INNER JOIN public.switch switch ON b.switch=switch._id 
  INNER JOIN public.plate plate ON b.plate=plate._id 
  INNER JOIN public.keycap k ON b.keycap=k._id 
  INNER JOIN public.account a ON b.account=a.username
  WHERE username='${req.params.username}';`;

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
  const { session, name, size, pcb, plate, keycap, color, account } = req.body;
  console.log('CREATE BUILD 1', req.body);
  const switchType = req.body.switch;
  const rowsRequiringSelect = { size, pcb, plate, keycap, switchType };
  let query = `INSERT INTO build (session, name, color, size, pcb, plate, keycap, switch) VALUES (${session}, '${name}', '${color}', 'catsnakes',`;
  for (const [k, v] of Object.entries(rowsRequiringSelect)) {
    query = query + generateInnerSelect(k, v);
  }
  query = query + ')';
  console.log('query in create build',query);
  db.query(query)
    .then((dbResponse) => {
      console.log('dbResponse', dbResponse);
      res.locals.dbResponse = dbResponse.rowCount;
    })
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
