const { createPool } = require("mysql");
const  mysqlConnection = require("./../database/database");

const getclientes= async (req, res)=> {
    try {       
        const result = await mysqlConnection.query("SELECT *FROM cliente;");        
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }   
};

const getcliente= async (req, res)=> {
    try {
        console.log(req.params);
        const { id } = req.params;
        const result = await mysqlConnection.query("SELECT id_cliente, nombre_cliente, ci FROM cliente WHERE id_cliente=?", id);        
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }   
};

const addcliente= async (req, res)=> {
    try {
        const{ nombre_cliente, ci }= req.body;

        if (nombre_cliente === undefined || ci === undefined ) {
            res.status(400).json({ message: "Bad Request. llene todos los campos." });
        }

        const clientedatos={nombre_cliente, ci }; 
        await mysqlConnection.query("INSERT INTO cliente SET ?", clientedatos);      
        res.json({ message: "Cliente añadido" });
    } catch (error) {
        res.status(500);
        res.send(error.message);
    } 
};

const updatecliente=async(req, res)=>{
    try {
        const { id } = req.params;
        const{ nombre_cliente, ci }= req.body;

        if (id === undefined || nombre_cliente === undefined || ci === undefined ) {
            res.status(400).json({ message: "Bad Request. llene todos los campos." });
        }
        
        const clientedatos= {nombre_cliente,ci};
        const result = await mysqlConnection.query("UPDATE cliente SET ? WHERE id_cliente= ?", [clientedatos, id]);
        res.json(result);
    } catch (error) {
        res.statu(500);
        res.send(error.message);
    }
};

const deletecliente=async(req, res)=>{
    try {
        const { id } = req.params;
        const result = await mysqlConnection.query("DELETE FROM cliente WHERE id_cliente= ?",id);
        res.json(result);
    } catch (error) {
        res.statu(500);
        res.send(error.message);
    }
};
const methods={
    getclientes,
    getcliente,
    addcliente,
    updatecliente,
    deletecliente
};
module.exports= methods;