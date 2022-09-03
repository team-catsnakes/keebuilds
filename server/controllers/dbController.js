const db = require('../models/keebuildsModel');

const errorCreator = (methodName, description) => ({
  log: `Error occurred in keebuildsController.${methodName}.\nDescription: ${description}`,
  message: `Error occurred in keebuildsController.${methodName}. See server logs for more details.`
});

const generateInnerSelect = (k, v) => {
  if(k === 'switchType') return `(SELECT _id FROM 'switch' WHERE name='${v}')`;
  return `(SELECT _id FROM '${k}' WHERE name='${v}')`;
};

const keebuildsController = {};

keebuildsController.getBuildsForSession = (req, res, next) => {
  const queryString = `SELECT * FROM builds WHERE session=${req.query.id}`;
  db.query(queryString)
    .then(result => result.rows)
    .then(result => {
      res.locals.builds = result;
    })
    .then(() => next())
    .catch(() => next(errorCreator('getBuildsForSession', 'Error fetching builds from DB')));
};

keebuildsController.createBuild = (req, res, next) => {
  const {session, name, size, pcb, plate, keycap, color} = req.body;
  const switchType = req.body.switch;

  const rowsRequiringSelect = {size, pcb, plate, keycap, switchType};
  
  let query = `INSERT INTO build (session, name, color, size, pcb, plate, keycap, switch) VALUES (${session}, '${name}', '${color}', `;
  for(const [k,v] of rowsRequiringSelect){
    query = query + generateInnerSelect(k, v);
  }
  query = query + ')';
  console.log(query);
  db.query(query)
    .then(dbResponse => res.locals.dbResponse = dbResponse)
    .then(() => next())
    .catch(() => errorCreator('createBuild', 'Failed to insert Build'));
};

module.exports = keebuildsController;

