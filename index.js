const express = require('express');
require('dotenv').config();
const cors = require('cors');
const port = process.env.PORT;

const app = express();
app.use(cors());
app.use(express.json());

app.use( require('./src/routes/productos'), require('./src/routes/usuarios'));

app.listen(port, (err) => {
    if (err) throw console.log(err);
    console.log('servidor en el puerto', port);
})