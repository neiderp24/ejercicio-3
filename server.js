const { app } = require('./app');

//Models
const { Repair } = require('./models/repair.model');
const { User } = require('./models/user.model');

//Utils
const { db } = require('./utils/database');

db.authenticate()
  .then(() => console.log('Database authenticated'))
  .catch(err => console.log(err));

//Relations models
User.hasMany(Repair);
Repair.belongsTo(User);

db.sync()
  .then(() => console.log('Database synced'))
  .catch(err => console.log(err));

//Port server
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Express app running on port: ${PORT}`);
});
