const { createPool } = require("mysql");
const  mysqlConnection = require("./../database/database");

const getproductos= async (req, res)=> {
    try {       
        const result = await mysqlConnection.query("SELECT *FROM producto");        
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }   
};

const getproducto= async (req, res)=> {
    try {
        console.log(req.params);
        const { id } = req.params;
        const result = await mysqlConnection.query("SELECT id_producto, nombre_producto, precio, id_categoria FROM producto WHERE id_producto=?", id);        
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }   
};

const addproductos= async (req, res)=> {
    try {
        const{ nombre_producto, precio, id_categoria }= req.body;

        if (nombre_producto === undefined || precio === undefined || id_categoria === undefined) {
            res.status(400).json({ message: "Bad Request. llene todos los campos." });
        }

        const producto={nombre_producto, precio, id_categoria }; 
        await mysqlConnection.query("INSERT INTO producto SET ?", producto);      
        res.json({ message: "producto añadido" });
    } catch (error) {
        res.status(500);
        res.send(error.message);
    } 
};

const updateproducto=async(req, res)=>{
    try {
        const { id } = req.params;
        const{ nombre_producto, precio, id_categoria }= req.body;

        if (id === undefined || nombre_producto === undefined || precio === undefined || id_categoria === undefined) {
            res.status(400).json({ message: "Bad Request. llene todos los campos." });
        }
        
        const producto= {nombre_producto,precio,id_categoria};
        const result = await mysqlConnection.query("UPDATE producto SET ? WHERE id_producto= ?", [producto, id]);
        res.json(result);
    } catch (error) {
        res.statu(500);
        res.send(error.message);
    }
};

const deleteproducto=async(req, res)=>{
    try {
        const { id } = req.params;
        const result = await mysqlConnection.query("DELETE FROM producto WHERE id_producto= ?",id);
        res.json(result);
    } catch (error) {
        res.statu(500);
        res.send(error.message);
    }
};
const methods={
    getproductos,
    getproducto,
    addproductos,
    updateproducto,
    deleteproducto
};
module.exports= methods;