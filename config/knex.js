const knex = require('knex');
require('dotenv/config');

const DB_NAME = process.env.DB_NAME;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_HOST = process.env.DB_HOST;
const DB_PORT = process.env.DB_PORT;

const instance = knex({
    client: 'pg',
    connection: {
        host: DB_HOST,
        port: DB_PORT,
        user: DB_USER,
        password: DB_PASSWORD,
        database: DB_NAME,
    },
});

instance.schema.hasTable('stages').then((exists) => {
    if (!exists) {
        return instance.schema.createTable('stages', t => {
            t.increments('id').primary().notNullable();
            t.integer('stage').notNullable().defaultTo(0);
            t.integer('step').notNullable().defaultTo(0);
            t.string('phone').unique().notNullable();
            t.json('payload').notNullable();
            t.timestamps(true, true);
        });
    }
});

module.exports = instance;
