const { Router } = require ('express');
const router= Router();
const productosController = require('../controller/producto.controller');
const categoriaController =require('../controller/categoria.controller');
const clienteController =require('../controller/cliente.controller');
const empleadoController =require('../controller/empleado.controller');
const notaventaController =require('../controller/notaventa.controller');
const detalleventaController =require('../controller/detalleventa.controller')

// tabla categoria
router.get('/categoria/', categoriaController.getcategorias);
router.get('/categoria/:id', categoriaController.getcategoria);
router.post('/categoria/', categoriaController.addcategoria);
router.put('/categoria/:id', categoriaController.updatecategoria);
router.delete('/categoria/:id', categoriaController.deletecategoria);

// tabla producto
router.get('/producto/',productosController.getproductos);
router.get("/producto/:id", productosController.getproducto);
router.post("/producto/", productosController.uploadimage, productosController.uploadfile);
router.put("/producto/:id", productosController.updateproducto);
router.delete("/producto/:id", productosController.deleteproducto);

//tabla cliente
router.get('/cliente/', clienteController.getclientes);
router.get('/cliente/:id', clienteController.getcliente);
router.post('/cliente/', clienteController.addcliente);
router.put('/cliente/:id', clienteController.updatecliente);
router.delete('/cliente/:id', clienteController.deletecliente);

//tabla empleado
router.get('/empleado/',empleadoController.getempleados);
router.get('/empleado/:id',empleadoController.getempleado);
router.post('/empleado/',empleadoController.addempleado);
router.put('/empleado/:id',empleadoController.updateempleado);
router.delete('/empleado/:id',empleadoController.deleteempleado);

// tabla notaventa
router.get('/notaventa/',notaventaController.getnotaventas);
router.get('/notaventa/:id',notaventaController.getnotaventa);
router.post('/notaventa/',notaventaController.addnotaventa);
router.put('/notaventa/:id',notaventaController.updatenotaventa);
router.delete('/notaventa/:id',notaventaController.deletenotaventa);

// tabla detalle venta
router.get('/DetalleVenta/', detalleventaController.getdetalleventas);
router.get('/DetalleVenta/:id', detalleventaController.getdetalleventa);
router.post('/DetalleVenta/', detalleventaController.addDetalleventa);
router.put('/DetalleVenta/:id', detalleventaController.updateDetalleventa);
router.delete('/DetalleVenta/:id', detalleventaController.deleteDetalleventa);

module.exports = router;