const settings = require('./setting'); //setting.json
const moment = require('moment');
let arg = process.argv[2];

const config = ({
  user: settings.user,
  password: settings.password,
  database: settings.database,
  host: settings.hostname,
  port: settings.port,
  ssl: settings.ssl
});

const knex = require("knex")({
  client: "pg",
  connection: config
});

function listPeople(result) {
  console.log('Found ' + result.length+ ' person(s) by the name ' + "'" + arg + "'");
  for (var i = 0; i < result.length; i++) {
    console.log("-" + (i + 1) + " " + result[i].first_name,
      result[i].last_name + ', born ' +
      moment(result[i].birthdate).format('YYYY-MM-DD'));
  }
  knex.destroy();
}

function createList(search) {
  console.log('Searching...');
  knex.select('*').from('famous_people')
    .where('first_name', search)
    .asCallback(function(err, result) {
      if(err) {
        return console.error('error: ', err);
      }
      listPeople(result);
    });
}

createList(arg);