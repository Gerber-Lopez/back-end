const multer = require("multer");
const path = require("path");
const { createPool } = require("mysql");
const  mysqlConnection = require("./../database/database");

exports.getproductos= async (req, res)=> {
    try {       
        const result = await mysqlConnection.query("SELECT *FROM producto");        
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }   
};

exports.getproducto= async (req, res)=> {
    try {
        console.log(req.params);
        const { id } = req.params;
        const result = await mysqlConnection.query("SELECT id_producto, imagen, nombre_producto, precio, id_categoria FROM producto WHERE id_producto=?", id);        
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }   
};

/*const addproductos= async (req, res)=> {
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
};*/

const storage =multer.diskStorage({
     destination:path.join(__dirname, "../public"),
     filename: (req,file, cb) =>{
        cb(null, `${file.originalname}`);
     }
});

const upload= multer({storage: storage})

exports.uploadimage= upload.single('image')

exports.uploadfile= async(req, res)=>{
    try {
        const nombre_producto= req.body.nombre_producto;
        const precio= req.body.precio;
        const id_categoria= req.body.id_categoria;
        const imagen= req.file.originalname;

        if (nombre_producto === undefined || precio === undefined || id_categoria === undefined || imagen === undefined ) {
            res.status(400).json({ message: "Bad Request. llene todos los campos." });
        }

        const produc= {imagen, nombre_producto, precio, id_categoria};
        await mysqlConnection.query("INSERT INTO producto SET ?", produc);
        res.json({message: "Producto Añadido"})
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
}






exports.updateproducto=async(req, res)=>{
    try {
        const { id } = req.params;
        const{ imagen,nombre_producto, precio, id_categoria }= req.body;

        if (id === undefined || imagen === undefined || nombre_producto === undefined || precio === undefined || id_categoria === undefined) {
            res.status(400).json({ message: "Bad Request. llene todos los campos." });
        }
        
        const producto= {imagen,nombre_producto,precio,id_categoria};
        const result = await mysqlConnection.query("UPDATE producto SET ? WHERE id_producto= ?", [producto, id]);
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};
 
exports.deleteproducto=async(req, res)=>{
    try {
        const { id } = req.params;
        const result = await mysqlConnection.query("DELETE FROM producto WHERE id_producto= ?",id);
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

