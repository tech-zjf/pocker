import { DataSource, DataSourceOptions } from 'typeorm';
import { Player } from './entityes/player.entity';
import { RoomsEntity } from './entityes/rooms-entity';
import { RoomPlayersEntity } from './entityes/room-players.entity';

// 基础配置
const baseConfig: DataSourceOptions = {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'zjf012511',
    database: 'pocker',
};

// 该对象用于 nestjs typeorm 初始化
export const ormConfig: DataSourceOptions = {
    ...baseConfig,
    // entities: ['dist/**/entityes/*.entity{.js,.ts}'],
    entities: [Player, RoomsEntity, RoomPlayersEntity],
};

// 该对象 typeorm cli 迁移时使用
const ormConfigForCli: DataSourceOptions = {
    ...baseConfig,
    entities: ['src/**/entities/*.entity{.js,.ts}'],
    migrations: ['src/**/migrations/*{.js,.ts}'], // migration:run时查找的文件夹
    logger: 'file',
    logging: true,
};

// 实例化dataSource，用以之后cli使用
const dataSource = new DataSource(ormConfigForCli);

// 此处的dataSource需要 export default才可以使用
export default dataSource;
