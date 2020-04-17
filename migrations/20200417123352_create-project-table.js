
exports.up = function(knex) {
    return knex.schema
    .createTable('projects', tbl => {
        tbl.increments().unique();

        tbl.string('name').notNullable();
        tbl.string('description').notNullable();
        tbl.boolean('completed').defaultTo(false);
    })

    .createTable('tasks', tbl => {
        tbl.increments().unique();
        tbl.string('description').notNullable();
        tbl.string('notes');
        tbl.boolean('completed').defaultTo(false);
        tbl.string("project_id", 255)
            .notNullable()
            .references('id')
            .inTable('projects')
            .onUpdate('RESTRICT')
            .onDelete('CASCADE');
    })

    .createTable('resources', tbl => {
        tbl.increments().unique();
        tbl
            .string('name')
            .notNullable()
            .unique();
        tbl.string('description');
        tbl.string("project_id", 255)
            .notNullable()
            .references('id')
            .inTable('projects')
            .onUpdate('RESTRICT')
            .onDelete('CASCADE');
    });
};

exports.down = function(knex) {
    return knex.schema
    .dropTableIfExists('resources')
    .dropTableIfExists('tasks')
    .dropTableIfExists('projects');
};
