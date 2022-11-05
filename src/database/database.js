const mysql= require ('mysql');
const {promisify}= require('util');

const mysqlConnection = mysql.createPool({
    host: 'us-east.connect.psdb.cloud',
    user: 'wh68n3segv6ywnv40199',
    password: 'pscale_pw_bgoes0QOhYjxq4NzAZp7UbFCNXXyb4p2GiTpFuOFcdO',
    database: 'backend',
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