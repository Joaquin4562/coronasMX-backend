const express = require('express');
const router = express.Router();
const connection = require('../config/databse');
const Stripe = require('stripe');
const stripe = Stripe('sk_test_51HvSPsBJt2QKX5ofZUa1638x6Soe91DogXCoiMXLtKsVerQFadQqLiKLDtzA3XqOlYiYx52nhBr84nxeyW2Oj1GR00ZAqhL2Cx');

router.post('/registro', (request, response) => {
    const sql = 'INSERT INTO usuarios SET ?';
    const usuario = {
        nombres: request.body.nombres,
        apellidos: request.body.apellidos,
        correo: request.body.correo,
        contrasena: request.body.contrasena
    };
    connection.query(sql, usuario, (error, _) => {
        if (error) throw error;
        response.json({
            error: false,
            msg: 'Usuario registrado'
        });
    });
});

router.post('/login', (request, response) => {
    const { correo, contrasena } = request.body;
    const sql = `SELECT * FROM usuarios WHERE correo = '${correo}'`;
    connection.query(sql, (error, result) => {
        if (error) throw error;
        if (result.length > 0) {
            const pass = result[0].contrasena;
            if (contrasena !== pass) {
                response.json({
                    auth: false,
                    msg: 'Contraseña o correo incorrectos'
                });
            } else {
                response.json({
                    auth: true,
                    usuario: {
                        id_usuarios: result[0].id_usuarios,
                        nombres: result[0].nombres,
                        apellidos: result[0].apellidos,
                        correo: result[0].correo
                    }
                });
            }
        } else {
            response.json({
                auth: false,
                msg: 'correo no encontrado'
            });
        }
    })
});

router.post('/pay-card', async (request, response) => {
    try {
        const { token, amount } = request.body;
        const payment = await stripe.paymentIntents.create({
            amount,
            currency: 'MXN',
            description: 'Descripcion X',
            payment_method: token,
            confirm: true
        });
        console.log(payment);
        response.json({ 
            error: false,
            msg: 'El pago se realizo correctamente' 
        });
    } catch (error) {
        response.json({
            error: true,
            msg: error
        });
    }
});
module.exports = router;