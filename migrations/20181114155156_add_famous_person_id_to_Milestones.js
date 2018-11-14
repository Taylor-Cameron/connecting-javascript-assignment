
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table("Milestones", function(table) {
      table.integer('famous_person_id');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table("Milestones", function (table) {
      table.drop('famous_person_id');
    })
  ]);
};
