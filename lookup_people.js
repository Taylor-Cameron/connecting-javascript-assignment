const pg = require('pg');
const settings = require('./setting'); //setting.json
const moment = require('moment');
let arg = process.argv[2];

const client = new pg.Client({
  user: settings.user,
  password: settings.password,
  database: settings.database,
  host: settings.hostname,
  port: settings.port,
  ssl: settings.ssl
});

function listPeople(result) {
  console.log('Found ' + result.rowCount + ' person(s) by the name ' + "'" + arg + "'");
  for (var i = 0; i < result.rowCount; i++) {
    console.log("-" + (i + 1) + " " + result.rows[i].first_name,
      result.rows[i].last_name + ', born ' +
      moment(result.rows[i].birthdate).format('YYYY-MM-DD'));
  }
  client.end();
}

function createList(search) {
  console.log('Searching...');
  client.query(`SELECT * FROM famous_people
                WHERE first_name LIKE $1::text;
               `, [search], (err, result) => {
    if (err) {
      return console.error('error: ', err);
    }
    listPeople(result);
  });
}


client.connect((err) => {
  if(err) {
    return console.error('Connection error: ', err);
  }
  createList(arg);
});