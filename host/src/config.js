const dotenv = require('dotenv');
dotenv.config();

const PORT = process.env.PORT || 8080;
const PRODUCTS_MS_URL = process.env.PRODUCTS_MS_URL || '';
const ORDER_MS_URL = process.env.ORDER_MS_URL || '';

module.exports = {
    PORT, PRODUCTS_MS_URL, ORDER_MS_URL
}
