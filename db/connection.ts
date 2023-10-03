import { Sequelize } from "sequelize";

const db = new Sequelize('clinicApp', 'root', 'If030495', {
    host: 'localhost',
    dialect: 'mysql',
    // logging: false
});

export default db;