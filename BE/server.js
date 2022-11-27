const app = require('./app');
const db = require('./models');
const {createServer} = require('http');
const httpServer = createServer(app);
const {Op} = require('sequelize');

const initDatabase = async () => {
    try {
        await db.sequelize.authenticate();
        console.log('Connection has been established successfully.');

        // await sequelize.sync({ alter: true }); // alter can break association
        //await db.sequelize.sync({force: true}); // force can break association
        console.log('All models were synchronized successfully.');
    } catch (error) {
        console.error('Error at database init:', error);
    }
};

const port = process.env.PORT || 5000;

const server = httpServer.listen(port, async () => {
    console.log(`App đang chạy trên port ${port}...`);
    await initDatabase()
});