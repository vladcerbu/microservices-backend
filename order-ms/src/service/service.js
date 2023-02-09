'use strict';
const axios = require("axios");
const send_email = require("../utils");
const {USER_EMAIL, MS_URL} = require("../config");

const service = {
    order: async (formDetails) => {

        const getProducts = async () => {
            const products = [];
            await axios.get(`${MS_URL}/products/productsInCart`)
                .then((res) => {
                    products.push(...res.data);
                });
            return products;
        }

        const getAllProducts = async () => {
            const allProducts = [];
            await axios.get(`${MS_URL}/products`)
                .then((res) => {
                    allProducts.push(...res.data);
                });
            return allProducts;
        }

        const composeHtmlContent = (products, allProducts) => {

            let productListHTML = '';
            if(products.length > 0){
                productListHTML = productListHTML.concat(`<ul>`);
            }
            products.forEach((product) => {
                productListHTML = productListHTML.concat(`<li>${product.number}x ${product.title}</li>`);
            });
            if(products.length > 0){
                productListHTML = productListHTML.concat(`</ul>`);
            }

            const totalPrice = products.reduce((sum, product) => {
                let price = 0;
                for(let i = 0; i < allProducts.length; i ++){
                    if(product.productId === allProducts[i].productId){
                        price = Number(allProducts[i].price.slice(0, -4));
                    }
                }
                return sum + price * product.number;
            }, 0)


            return `
                <div>
                    <h1>New Order</h1>
                    <hr>
                    ${productListHTML}
                    <h4>Total: ${totalPrice} EUR</h6>
                    <h2>Shipping Details</h2>
                    <hr>
                    <p> <b>Full Name:</b> ${formDetails.fullName} </p>
                    <p> <b>Phone Number:</b> ${formDetails.phoneNumber} </p>
                    <p> <b>Address:</b> ${formDetails.address} </p>
                </div>
            `
        }

        const products = await getProducts();
        const allProducts = await getAllProducts();
        const htmlContent = composeHtmlContent(products, allProducts);
        try {
            await send_email(USER_EMAIL, formDetails.email, "New Order - Online Book Shopping", htmlContent);
        }
        catch(e) {
            return 200;
        }
        return 200;
    },
};

module.exports = service;
