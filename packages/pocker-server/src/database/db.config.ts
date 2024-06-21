import { Player } from './entity/player';
import { Post } from './entity/post';

const devDbConfig = {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'zjf012511',
    database: 'pocker',
    // entities: [Player, Post],
    entities: [__dirname, '/entity/*.ts'],
    migrations: [__dirname, '/migration/*.ts'],
    synchronize: true,
    // migrationsTableName: 'migrations_typeorm',
    // cli: {
    //     migrationsDir: 'src/database/migrations',
    // },
};

const prodDbConfig = {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'zjf012511',
    database: 'pocker',
    // entities: [__dirname + '/entities/*.ts'],
    entities: [],
    synchronize: true,
    // migrationsTableName: 'migrations_typeorm',
    // migrations: ['src/database/migrations/*.ts'],
    // cli: {
    //     migrationsDir: 'src/database/migrations',
    // },
};

const dbConfigMap = new Map([
    ['prod', prodDbConfig],
    ['dev', devDbConfig],
]);

const dbConfig = dbConfigMap.get(process.env.NODE_ENV) || devDbConfig;

export default dbConfig;
