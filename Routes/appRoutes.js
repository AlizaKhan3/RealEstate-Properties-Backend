import { Router } from "express";
import { getProductsController, postProductsController, getCategoriessController, deleteProductController } from "../Controllers/productsController.js";


const router = Router();

router.get('/', getProductsController)
router.get('/categories', getCategoriessController)
router.post('/add', postProductsController)
router.delete("/:id", deleteProductController)

export default router;