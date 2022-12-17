const { createPool } = require("mysql");
const  mysqlConnection = require("../database/database");

const getnotaventas= async (req, res)=> {
    try {       
        const result = await mysqlConnection.query("SELECT *FROM notaventa");        
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }   
};

const getnotaventa= async (req, res)=> {
    try {
        console.log(req.params);
        const { id } = req.params;
        const result = await mysqlConnection.query("SELECT fecha, monto, estado, id_cliente, id_empleado FROM notaventa WHERE id_venta=?", id);        
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }   
};

const addnotaventa= async (req, res)=> {
    try {
        const{ fecha, monto, estado, id_cliente, id_empleado }= req.body;

        if (fecha === undefined || monto === undefined || estado === undefined || id_cliente === undefined || id_empleado === undefined) {
            res.status(400).json({ message: "Bad Request. llene todos los campos." });
        }

        const notaventadatos={fecha, monto, estado, id_cliente, id_empleado }; 
        await mysqlConnection.query("INSERT INTO notaventa SET ?", notaventadatos);      
        res.json({ message: "Notaventa añadida" });
    } catch (error) {
        res.status(500);
        res.send(error.message);
    } 
};

const updatenotaventa=async(req, res)=>{
    try {
        const { id } = req.params;
        const{ fecha, monto, estado, id_cliente, id_empleado}= req.body;

        if (fecha === undefined || monto === undefined || estado === undefined || id_cliente === undefined || id_empleado === undefined) {
            res.status(400).json({ message: "Bad Request. llene todos los campos." });
        }
        
        const notaventadatos={fecha, monto, estado, id_cliente, id_empleado }; 
        const result = await mysqlConnection.query("UPDATE notaventa SET ? WHERE id_venta= ?", [notaventadatos, id]);
        res.json(result);
    } catch (error) {
        res.statu(500);
        res.send(error.message);
    }
};

const deletenotaventa=async(req, res)=>{
    try {
        const { id } = req.params;
        const result = await mysqlConnection.query("DELETE FROM notaventa WHERE id_venta= ?",id);
        res.json(result);
    } catch (error) {
        res.statu(500);
        res.send(error.message);
    }
};
const methods={
    getnotaventas,
    getnotaventa,
    addnotaventa,
    updatenotaventa,
    deletenotaventa
};
module.exports= methods;