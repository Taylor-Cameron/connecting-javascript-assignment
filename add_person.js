const settings = require("./setting"); //setting.json
let firstName = process.argv[2];
let lastName = process.argv[3];
let birthDate = process.argv[4];

// console.log(firstName);
// console.log(lastName);
// console.log(birthDate);
const config = {
  user: settings.user,
  password: settings.password,
  database: settings.database,
  host: settings.hostname,
  port: settings.port,
  ssl: settings.ssl
};

const knex = require("knex")({
  client: "pg",
  connection: config
});

let insertValue = {
  first_name: firstName,
  last_name: lastName,
  birthdate: birthDate
};

knex('famous_people')
  .insert(insertValue)
  .into('famous_people')
  .finally(function() {
    knex.destroy();
  });




