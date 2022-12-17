const { createPool } = require("mysql");
const  mysqlConnection = require("./../database/database");

const getempleados= async (req, res)=> {
    try {       
        const result = await mysqlConnection.query("SELECT *FROM empleado;");        
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }   
};

const getempleado= async (req, res)=> {
    try {
        console.log(req.params);
        const { id } = req.params;
        const result = await mysqlConnection.query("SELECT id_empleado, nombre_empleado, telefono, direccion, correo, contra FROM empleado WHERE id_empleado=?", id);        
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }   
};

const addempleado= async (req, res)=> {
    try {
        const{ nombre_empleado, telefono, direccion, correo, contra }= req.body;

        if (nombre_empleado === undefined || telefono === undefined || direccion === undefined || correo === undefined || contra === undefined) {
            res.status(400).json({ message: "Bad Request. llene todos los campos." });
        }

        const empleadodatos={nombre_empleado, telefono, direccion, correo, contra }; 
        await mysqlConnection.query("INSERT INTO empleado SET ?", empleadodatos);      
        res.json({ message: "Empleado añadido" });
    } catch (error) {
        res.status(500);
        res.send(error.message);
    } 
};

const updateempleado=async(req, res)=>{
    try {
        const { id } = req.params;
        const{ nombre_empleado, telefono, direccion, correo, contra}= req.body;

        if (id === undefined || nombre_empleado === undefined || telefono === undefined || direccion === undefined || correo === undefined || contra === undefined) {
            res.status(400).json({ message: "Bad Request. llene todos los campos." });
        }
        
        const empleadodatos= {nombre_empleado, telefono, direccion, correo, contra};
        const result = await mysqlConnection.query("UPDATE empleado SET ? WHERE id_empleado= ?", [empleadodatos, id]);
        res.json(result);
    } catch (error) {
        res.statu(500);
        res.send(error.message);
    }
};

const deleteempleado=async(req, res)=>{
    try {
        const { id } = req.params;
        const result = await mysqlConnection.query("DELETE FROM empleado WHERE id_empleado= ?",id);
        res.json(result);
    } catch (error) {
        res.statu(500);
        res.send(error.message);
    }
};
const methods={
    getempleados,
    getempleado,
    addempleado,
    updateempleado,
    deleteempleado
};
module.exports= methods;