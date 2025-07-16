import { Router } from "express";
import { getProductsController, postProductsController, getCategoriessController, deleteProductController, putProductController } from "../Controllers/productsController.js";


const router = Router();

router.get('/', getProductsController)
router.get('/categories', getCategoriessController)
router.post('/add', postProductsController)
router.delete("/:id", deleteProductController)
router.put("/:id", putProductController)

export default router;