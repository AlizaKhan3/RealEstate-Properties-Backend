import fs from 'fs'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'
import { v4 as uuidv4 } from 'uuid';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const filePathProd = path.join(__dirname, 'db/products.json')
const filePathCat = path.join(__dirname, 'db/categories.json')
//add images statically in images folder
const filePathImages = path.join(__dirname, '../images');

export const displayProducts = async () => {
    const products = await fs.promises.readFile(filePathProd, 'utf-8')
    const parseProducts = JSON.parse(products);

    return parseProducts;
}

export const displayCategories = async () => {
    const categories = await fs.promises.readFile(filePathCat, 'utf-8')
    const parseCategories = JSON.parse(categories);

    return parseCategories;
}


export const addCategory = async (newCat) => {
    const categories = await displayCategories()
    categories.push(newCat);
    const stringifyData = JSON.stringify(categories)
    await fs.promises.writeFile(filePathCat, stringifyData, 'utf-8')
}


export const addProduct = async (newProduct) => {
    const allProducts = await displayProducts();
    allProducts.push(newProduct)
    const stringifyData = JSON.stringify(allProducts);
    await fs.promises.writeFile(filePathProd && filePathImages, stringifyData, 'utf-8');
}

export const deleteProduct = async (id) => {
    //reading all products
    const products = await displayProducts();
    const initialLength = products.length;

    const filterProd = products.filter((prod) => prod.id !== id)

    if (filterProd.length === initialLength) {
        return false; //no deletion here.
    }

    const stringifyData = JSON.stringify(filterProd)
    await fs.promises.writeFile(filePathProd, stringifyData, 'utf-8')

    return true;
}

export const updateProduct = async (id, payload) => {
    const products = await displayProducts();
    const categories = await displayCategories()
    // index dhundna hei sbse pehle 
    const prodIndex = products.findIndex((prod) => prod.id === id);

    if (prodIndex === -1) {
        return false;
    }

    let updatedProduct = { ...products[prodIndex] };

    if (payload.categoryName) {
        let category = categories.find((cat) => cat.name === payload.categoryName);

        //ager category new hei phle se nahi toh uska new object banadou inside categories.
        if (!category) {
            category = {
                id: uuidv4(),
                name: payload.categoryName
            }
            categories.push(category);
            await fs.promises.writeFile(filePathCat, JSON.stringify(categories, null, 2));
        }

        updatedProduct.category = {
            id: category.id,
            name: category.name
        }
    }


    const { categoryName, ...otherPayload } = payload;
    updatedProduct = { ...updatedProduct, ...otherPayload }

    products[prodIndex] = updatedProduct;


    const stringifyData = JSON.stringify(products)

    await fs.promises.writeFile(filePathProd, stringifyData, 'utf-8')
    return true;
}


export const findProductById = async (id) => {
    const products = await displayProducts();
    const findProduct = products.find((prod)=> prod.id === id)
    return findProduct;
}