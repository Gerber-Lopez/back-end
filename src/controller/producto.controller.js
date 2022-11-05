const { createPool } = require("mysql");
const  mysqlConnection = require("./../database/database");

const getproductos= async (req, res)=> {
    try {       
        const result = await mysqlConnection.query("SELECT *FROM product;");        
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
        const result = await mysqlConnection.query("SELECT IdProducto, nombre, precio, cantidad FROM product WHERE IdProducto=?", id);        
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }   
};

const addproductos= async (req, res)=> {
    try {
        const{ nombre, precio, cantidad }= req.body;

        if (nombre === undefined || precio === undefined || cantidad === undefined) {
            res.status(400).json({ message: "Bad Request. llene todos los campos." });
        }

        const producto={nombre, precio, cantidad }; 
        await mysqlConnection.query("INSERT INTO product SET ?", producto);      
        res.json({ message: "producto añadido" });
    } catch (error) {
        res.status(500);
        res.send(error.message);
    } 
};

const updateproducto=async(req, res)=>{
    try {
        const { id } = req.params;
        const{ nombre, precio, cantidad }= req.body;

        if (id === undefined || nombre === undefined || precio === undefined || cantidad === undefined) {
            res.status(400).json({ message: "Bad Request. llene todos los campos." });
        }
        
        const producto= {nombre,precio,cantidad};
        const result = await mysqlConnection.query("UPDATE product SET ? WHERE IdProducto= ?", [producto, id]);
        res.json(result);
    } catch (error) {
        res.statu(500);
        res.send(error.message);
    }
};

const deleteproducto=async(req, res)=>{
    try {
        const { id } = req.params;
        const result = await mysqlConnection.query("DELETE FROM product WHERE IdProducto= ?",id);
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