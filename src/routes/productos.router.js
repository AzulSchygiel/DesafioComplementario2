import { Router} from 'express';
import adoptionsController from '../controllers/productos.controller.js';

const router = Router();

router.get('/',productosController.getAllProductos);
router.get('/:aid',productosController.getProducto);
router.post('/:uid/:pid',productosController.createProducto);

export default router;
