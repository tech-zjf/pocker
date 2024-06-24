## 迁移

```ts
import { DataSource, DataSourceOptions } from 'typeorm';

// 基础配置
const baseConfig: DataSourceOptions = {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'zjf012511',
    database: 'pocker',
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
```

## 创建迁移文件

```
 npx typeorm migration:create ./src/database/migrations/<create/update-user>
```

## 生成迁移文件后，编辑迁移文件

1. 添加表

    迁移文件： await queryRunner.createTable...

    添加对应表的实体文件

    执行：pnpm run migration:run

2. 添加字段/删除字段

    迁移文件： await queryRunner.addColumn...

    对应表实体文件也需要添加响应的实体字段

    执行：pnpm run migration:run
