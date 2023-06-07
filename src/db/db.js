import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize('postgres://root:orF4LpnNIKeCqEaKVhzeov5M0hjpYnHw@dpg-chvmmb64dad1r0d69gdg-a.oregon-postgres.render.com/prueba_db_j1zf', {
    dialect: 'postgres',
    protocol: 'postgres',
    schema: 'public',
    dialectOptions: {
        ssl: true,
        native: true
    }
});

const testConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log('Conected!');

    } catch (error) {
        console.error('Db error: ', error);
    }
}

await testConnection(); 