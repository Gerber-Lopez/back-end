const { Router } = require ('express');
const router= Router();
const productosController = require('./../controller/producto.controller')

router.get('/listar',productosController.getproductos);
router.get("/pedir:id", productosController.getproducto);
router.post("/agregar", productosController.addproductos);
router.put("/modificar/:id", productosController.updateproducto);
router.delete("/eliminar/:id", productosController.deleteproducto);
/*router.get('/', (req, res)=>{
    try {
        const result =  mysqlConnection.query("select *from product;");        
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }   
});*/

module.exports = router;