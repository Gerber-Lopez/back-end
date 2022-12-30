const express = require ('express');
const app = express();
const morgan = require('morgan');
const path= require('path');

//settings
app.set('port',process.env.PORT || 4000);
app.set('json spaces', 2);

//middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

//router
app.use(require('./routes/routes'));

//starting the server
app.listen(app.get('port'),()=>{
    console.log(`servidor en el puerto ${app.get('port')}`);
});