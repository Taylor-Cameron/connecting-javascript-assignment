const pg = require('pg');
const settings = require('./setting'); //setting.json
let arg = process.argv[2];

const client = new pg.Client({
  user: settings.user,
  password: settings.password,
  database: settings.database,
  host: settings.hostname,
  port: settings.port,
  ssl: settings.ssl
});

client.connect((err) => {
  if(err) {
    return console.error('Connection error: ', err);
  }
  console.log('Searching...');
  const query = `SELECT * FROM famous_people
                 WHERE first_name LIKE '%${arg}%';
                `
  client.query(query, (err, result) => {
    if(err) {
      return console.error('error: ', err);
    }
    console.log('Found ' + result.rowCount + ' person(s) by the name ' + "'" + arg + "'");
    for(var i = 0; i < result.rowCount; i++) {
      console.log("-" + (i + 1) + " " + result.rows[i].first_name, result.rows[i].last_name + ', born ' + result.rows[i].birthdate);
    }
    client.end();
  });
});