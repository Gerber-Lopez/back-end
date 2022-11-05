const { Router } = require ('express');
const router= Router();
const productosController = require('./../controller/producto.controller')

router.get('/',productosController.getproductos);
router.get("/:id", productosController.getproducto);
router.post("/", productosController.addproductos);
router.put("/:id", productosController.updateproducto);
router.delete("/:id", productosController.deleteproducto);
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