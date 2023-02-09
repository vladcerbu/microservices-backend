'use strict';
const storage = require('node-persist');

const read = async (key) => {
    const value = await storage.getItem(key);
    if(value){
        return JSON.parse(value);
    }
    return [];
}

const write = async (key, value) => {
    await storage.updateItem(key, JSON.stringify(value));
}

const repository = {

    getAllProducts: async () => {
        return await read('products');
    },

    addProductToCart: async (productId) => {
        let productsInCart = await read('cart');
        let result = 0;
        for(let i = 0; i < productsInCart.length; i++){
            if(productsInCart[i].productId.toString() === productId.toString()) {
                productsInCart[i] = { productId, number: productsInCart[i].number + 1 }
                result = productsInCart[i].number
            }
        }
        if(result === 0){
            productsInCart.push({productId, number: 1});
            result = 1;
        }
        await write('cart', productsInCart);
        return result;
    },

    getProductsFromCart: async () => {
        return await read('cart');
    }
};

module.exports = repository;
