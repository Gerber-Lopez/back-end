const mysql= require ('mysql');
const {promisify}= require('util');

const mysqlConnection = mysql.createPool({
    host: 'db4free.net',
    user: 'rootgerber12',
    password: 'gerberter1220',
    database: 'bdrestaurant',
    ssl:true
});
mysqlConnection.getConnection((err, connection)=>{
    if(err){
        if(err.code === 'PROTOCOL_CONNECTION_LOST'){
            console.error('Coneccion cerrada');
        }
        if(err.code === 'ER_CON_COUNT_ERROR'){
            console.error('database has to many connections');
        }
        if(err.code === 'ECONNREFUSED'){
            console.error('database connection was refused');
        }
    }
    if(connection) connection.release();
    console.log('DB conectada');
    return;
});
mysqlConnection.query= promisify(mysqlConnection.query);
module.exports = mysqlConnection;