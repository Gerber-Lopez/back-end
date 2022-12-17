const { createPool } = require("mysql");
const  mysqlConnection = require("./../database/database");

const getcategorias= async (req, res)=> {
    try {       
        const result = await mysqlConnection.query("SELECT *FROM categoria;");        
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }   
};
const getcategoria= async (req, res)=> {
    try {
        console.log(req.params);
        const { id } = req.params;
        const result = await mysqlConnection.query("SELECT id_categoria, categoria FROM categoria WHERE id_categoria=?", id);        
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }   
};

const addcategoria= async (req, res)=> {
    try {
        const categoria= req.body;

        if (categoria === undefined) {
            res.status(400).json({ message: "Bad Request. llene todos los campos." });
        }

        await mysqlConnection.query("INSERT INTO categoria SET ?", categoria);      
        res.json({ message: "Categoria añadida" });
    } catch (error) {
        res.status(500);
        res.send(error.message);
    } 
};

const updatecategoria=async(req, res)=>{
    try {
        const { id } = req.params;
        const categoria= req.body;

        if (id === undefined || categoria === undefined) {
            res.status(400).json({ message: "Bad Request. llene todos los campos." });
        }
        const categ= categoria;
        const result = await mysqlConnection.query("UPDATE categoria SET ? WHERE id_categoria= ?", [categ, id]);
        res.json(result);
    } catch (error) {
        res.statu(500);
        res.send(error.message);
    }
};

const deletecategoria=async(req, res)=>{
    try {
        const { id } = req.params;
        const result = await mysqlConnection.query("DELETE FROM categoria WHERE id_categoria= ?",id);
        res.json(result);
    } catch (error) {
        res.statu(500);
        res.send(error.message);
    }
};
const methods={
    getcategorias,
    getcategoria,
    addcategoria,
    updatecategoria,
    deletecategoria
};
module.exports= methods;