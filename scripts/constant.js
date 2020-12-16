const path = require('path');

const PROJECT_PATH = path.resolve(__dirname, '../');
const PROJECT_NAME = path.parse(PROJECT_PATH).name;
const SERVER_PORT = '8080';
const SERVER_HOST = '127.0.0.1';
const isDev = process.env.NODE_ENV !== 'production';

module.exports = {
    PROJECT_NAME,
    PROJECT_PATH,
    SERVER_PORT,
    SERVER_HOST,
    isDev,
};
