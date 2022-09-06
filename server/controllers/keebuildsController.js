const db = require('../models/keebuildsModel');

const errorCreator = (methodName, description) => ({
  log: `Error occurred in keebuildsController.${methodName}.\nDescription: ${description}`,
  message: `Error occurred in keebuildsController.${methodName}. See server logs for more details.`,
});

const generateInnerSelect = (k, v) => {
  if (k === 'switchType') return `(SELECT _id FROM public.switch WHERE name='${v}')`;
  return `(SELECT _id FROM public.${k} WHERE name='${v}'), `;
};

const keebuildsController = {};

keebuildsController.getBuildsForSession = (req, res, next) => {
  //size, pcb, switch, plate, keycap need to be queried by Joining
  const queryString = `SELECT b._id, b.name, b.color, s.name as size, pcb.name as pcb, switch.name as switch, plate.name as plate, k.name as keycap FROM public.build b INNER JOIN public.size s ON b.size=s._id INNER JOIN public.pcb pcb ON b.pcb=pcb._id INNER JOIN public.switch switch ON b.switch=switch._id INNER JOIN public.plate plate ON b.plate=plate._id INNER JOIN public.keycap k ON b.keycap=k._id WHERE session=${req.params.id};`;
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

keebuildsController.deleteBuild = (req, res, next) => {
  const query = `DELETE FROM public.build b WHERE b._id=${req.params.id}`;
  console.log({query});
  db.query(query)
    .then(() => next())
    .catch(() => errorCreator('deleteBuild', 'Failed to DELETE Build'));
};





module.exports = keebuildsController;
