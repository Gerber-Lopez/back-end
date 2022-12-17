const { createPool } = require("mysql");
const  mysqlConnection = require("../database/database");

const getdetalleventas= async (req, res)=> {
    try {       
        const result = await mysqlConnection.query("select n.id_venta, p.id_producto, p.nombre_producto, p.precio, d.cantidad, p.id_categoria, n.fecha, d.precio_v from notaventa as n, detalleventa as d, producto as p where n.id_venta=d.id_venta and p.id_producto=d.id_producto;");        
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }   
};

const getdetalleventa= async (req, res)=> {
    try {
        console.log(req.params);
        const { id } = req.params;
        const result = await mysqlConnection.query("select n.id_venta, p.id_producto, p.nombre_producto, p.precio, d.cantidad, p.id_categoria, n.fecha, d.precio_v from notaventa as n, detalleventa as d, producto as p where n.id_venta=d.id_venta and p.id_producto=d.id_producto and n.id_venta=?", id);        
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }   
};

const addDetalleventa= async (req, res)=> {
    try {
        const{ id_venta, id_producto, cantidad, precio_v }= req.body;

        if (id_venta === undefined || id_producto === undefined || cantidad === undefined || precio_v === undefined ) {
            res.status(400).json({ message: "Bad Request. llene todos los campos." });
        }

        const detalleventadatos={id_venta, id_producto, cantidad, precio_v }; 
        await mysqlConnection.query("INSERT INTO detalleventa SET ?", detalleventadatos);      
        res.json({ message: "Detalleventa añadido" });
    } catch (error) {
        res.status(500);
        res.send(error.message);
    } 
};

const updateDetalleventa=async(req, res)=>{
    try {
        const { id } = req.params;
        const{ id_venta, id_producto, cantidad, precio_v }= req.body;

        if (id_venta === undefined || id_producto === undefined || cantidad === undefined || precio_v === undefined ) {
            res.status(400).json({ message: "Bad Request. llene todos los campos." });
        }
        
        const detalleventadatos={id_venta, id_producto, cantidad, precio_v }; 
        const result = await mysqlConnection.query("UPDATE detalleventa SET ? WHERE id_venta= ?", [detalleventadatos, id]);
        res.json(result);
    } catch (error) {
        res.statu(500);
        res.send(error.message);
    }
};

const deleteDetalleventa=async(req, res)=>{
    try {
        const { id } = req.params;
        const result = await mysqlConnection.query("DELETE FROM detalleventa WHERE id_venta= ?",id);
        res.json(result);
    } catch (error) {
        res.statu(500);
        res.send(error.message);
    }
};

const methods={
    getdetalleventas,
    getdetalleventa,
    addDetalleventa,
    updateDetalleventa,
    deleteDetalleventa
};
module.exports= methods;