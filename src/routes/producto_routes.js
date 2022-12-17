const { Router } = require ('express');
const router= Router();
const productosController = require('./../controller/producto.controller')

// tabla categoria

// tabla producto
router.get('/producto/',productosController.getproductos);
router.get("/producto/:id", productosController.getproducto);
router.post("/producto/", productosController.addproductos);
router.put("/producto/:id", productosController.updateproducto);
router.delete("/producto/:id", productosController.deleteproducto);


module.exports = router;