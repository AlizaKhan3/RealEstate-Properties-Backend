import { Router } from "express";
import { getProductsController, postProductsController, getCategoriessController, deleteProductController, putProductController, getProductsById } from "../Controllers/productsController.js";
import { authMiddleware, roleMiddleware } from "../middleware/middleware.js";

const router = Router();

// both user and admin routes.
router.get('/', getProductsController)
router.get('/:id', getProductsById) //get specific product by id.

router.get('/categories', getCategoriessController)

//only admin routes.
router.post('/add', authMiddleware, roleMiddleware("admin"), postProductsController)
router.delete("/:id", authMiddleware, roleMiddleware("admin"), deleteProductController)
router.put("/:id", authMiddleware, roleMiddleware("admin"), putProductController)

export default router;