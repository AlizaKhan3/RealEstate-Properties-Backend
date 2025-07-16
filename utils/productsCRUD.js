import fs from 'fs'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const filePathProd = path.join(__dirname, 'db/products.json')
const filePathCat = path.join(__dirname, 'db/categories.json')

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
    await fs.promises.writeFile(filePathProd, stringifyData, 'utf-8');
}

export const deleteProduct = async (id) => {
    //reading all products
    const products = await displayProducts();
    const initialLength = products.length;

    const filterProd = products.filter((prod) => prod.id !== id)
    
    if(filterProd.length ===initialLength ){
        return false; //no deletion here.
    }

    const stringifyData = JSON.stringify(filterProd)
    await fs.promises.writeFile(filePathProd, stringifyData, 'utf-8')

    return true;
}