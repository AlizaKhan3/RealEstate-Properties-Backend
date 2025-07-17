import { displayProducts, addProduct, displayCategories, addCategory, deleteProduct, updateProduct, findProductById } from "../utils/productsCRUD.js"
import { v4 as uuidv4 } from 'uuid';

export const getProductsController = async (req, res) => {
    const products = await displayProducts()
    res.status(200).json({ success: true, data: products })
}

export const getCategoriessController = async (req, res) => {
    const categories = await displayCategories()
    res.status(200).json({ success: true, data: categories })
}

export const postProductsController = async (req, res) => {
    const { title, slug, price, description, categoryName, images } = req.body;

    const categories = await displayCategories();
    // check karo if category mentioned when adding product matches our categories or not.
    let category = categories.find((category) => category.name.toLowerCase() === categoryName.toLowerCase())

    //if category match nhi kar rahi
    if (!category) {
        category = { id: uuidv4(), name: categoryName }
        // categories.push(isCategory);
        await addCategory(category)
        res.status(200).json({ success: true, message: `New Category Added!: ${category.name}` })
    }

    const newProduct = {
        id: uuidv4(),
        title,
        slug,
        price,
        description,
        category: {
            id: category.id,
            name: category.name,
        },
        images: [
            images[0], images[1], images[2]
        ]
    }

    await addProduct(newProduct);

    res.status(200).json({ success: true, data: newProduct })
}

export const deleteProductController = async (req, res) => {
    // const products = await displayProducts();
    const id = req.params.id;

    const deletedProd = await deleteProduct(id)

    if (!deletedProd) {
        res.status(404).json({ success: false, message: "Product not found!" })
    }
    res.status(200).json({ success: true, message: "Product Deleted!" })
}

export const putProductController = async (req, res) => {
    const id = req.params.id;
    const payload = req.body;

    const updatedProduct = await updateProduct(id, payload);

    if (!updatedProduct) {
        res.status(404).json({ success: false, message: "Product not found!" })
    }
    res.status(200).json({ success: true, message: "Product Updated" })

}

export const getProductsById = async (req, res) => {
    const id = req.params.id
    const product = await findProductById(id)
    if (!product) {
        return res.status(402).json({ message: "product not found!" });
    }
    res.status(200).json({ success: true, data: product })
}