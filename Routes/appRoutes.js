import { Router } from "express";
import { getProductsController, postProductsController, getCategoriessController, deleteProductController, putProductController, getProductsById } from "../Controllers/productsController.js";
import { authMiddleware, roleMiddleware } from "../middleware/middleware.js";
import multer from "multer"
const upload = multer({ dest: '../images' })

const router = Router();

// both user and admin routes.
router.get('/', getProductsController)
router.get('/:id', getProductsById) //get specific product by id.

router.get('/categories', getCategoriessController)

//only admin routes.
// router.post('/add', authMiddleware, roleMiddleware("admin"), postProductsController)
router.post('/add', upload.fields([
    { name: 'image1', maxCount: 1 },
    { name: 'image2', maxCount: 1 },
    { name: 'image3', maxCount: 1 },
]), authMiddleware, roleMiddleware("admin"), postProductsController)

// app.post('/add/upload', upload.array('images', 3), authMiddleware, roleMiddleware("admin"),postProductsController)
// req.files is array of `photos` files
// req.body will contain the text fields, if there were any
// })

router.delete("/:id", authMiddleware, roleMiddleware("admin"), deleteProductController)
router.put("/:id", authMiddleware, roleMiddleware("admin"), putProductController)

export default router;