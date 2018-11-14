
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('Milestones', function (table) {
      table.string('description');
      table.date('date_achieved');
      table.increments();
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable("Milestones")
  ]);
};
