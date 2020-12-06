const express = require('express');
const connection = require('../config/databse');
const router = express.Router();

router.get('/productos', (resquest, response) => {
    const sql = 'SELECT * FROM productos';

    connection.query(sql, (error, result) => {
        if (error) throw error;
        if (result.length > 0) {
            const productos = result;
            response.json({
                error: false,
                productos: productos
            });
        } else {
            response.json({
                error: true,
                msg: 'No hay productos'
            });
        }
    });
});

module.exports = router;