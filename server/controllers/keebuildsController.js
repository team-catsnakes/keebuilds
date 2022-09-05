const db = require('../models/keebuildsModel');

const errorCreator = (methodName, description) => ({
  log: `Error occurred in keebuildsController.${methodName}.\nDescription: ${description}`,
  message: `Error occurred in keebuildsController.${methodName}. See server logs for more details.`,
});

const generateInnerSelect = (k, v) => {
  if (k === 'switchType') return `(SELECT _id FROM switch WHERE name='${v}')`;
  return `(SELECT _id FROM ${k} WHERE name='${v}'), `;
};

const keebuildsController = {};

keebuildsController.getBuildsForSession = (req, res, next) => {
  //size, pcb, switch, plate, keycap need to be queried by Joining
  const queryString = `SELECT build.name, build.color, s.name as size, pcb.name as pcb, switch.name as switch, plate.name as plate, k.name as keycap FROM build INNER JOIN size s ON build.size=s._id INNER JOIN pcb ON build.pcb=pcb._id INNER JOIN switch ON build.switch=switch._id INNER JOIN plate ON build.plate=plate._id INNER JOIN keycap k ON build.keycap=k._id WHERE session=${req.query.id};`;
  console.log({queryString});

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
  console.log({query});
  db.query(query)
    .then((dbResponse) => (res.locals.dbResponse = dbResponse.rowCount))
    .then(() => next())
    .catch(() => errorCreator('createBuild', 'Failed to insert Build'));
};

module.exports = keebuildsController;
