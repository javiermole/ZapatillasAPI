const express = require("express");
const SneaksAPI = require("sneaks-api");
const cors = require("cors");

const app = express();
const sneaks = new SneaksAPI();

app.use(cors());

// 1 Obtener información de una zapatilla por su ID
app.get('/id/:id', (req, res) => {
    sneaks.findOne(req.params.id, (error, shoe) => {
        if (error) {
            res.status(404).json({ error: "Product Not Found" });
        } else {
            res.json(shoe);
        }
    });
});

// 2 Obtener precios de una zapatilla específica
app.get('/id/:id/prices', (req, res) => {
    sneaks.getProductPrices(req.params.id.toUpperCase(), (error, prices) => {
        if (error) {
            res.status(404).json({ error: "Product Not Found" });
        } else {
            res.json(prices);
        }
    });
});

// 3 Obtener las zapatillas más populares
app.get('/home', (req, res) => {
    const count = req.query.count || 40; // Si no hay parámetro, devuelve 40 resultados
    sneaks.getMostPopular(count, (error, products) => {
        if (error) {
            res.status(500).json({ error: "Error fetching popular products" });
        } else {
            res.json(products);
        }
    });
});

// 4 Buscar zapatillas por palabra clave
app.get('/search/:shoe', (req, res) => {
    const count = req.query.count || 40;
    sneaks.getProducts(req.params.shoe, count, (error, products) => {
        if (error) {
            res.status(500).json({ error: "Error fetching products" });
        } else {
            res.json(products);
        }
    });
});


app.get('/shoes2', function(req, res){
    sneaks.findAll( function(error, products){
        if (error) {
            console.log(error)
            res.send("No Products In Database");
          } else {
            res.json(products);
          }
    })
});
// 5 Obtener todas las zapatillas en la base de datos
app.get('/shoes', (req, res) => {
    sneaks.findAll((error, products) => {
        if (error) {
            res.status(500).json({ error: "No Products In Database" });
        } else {
            res.json(products);
        }
    });
});

// 6 Redirección de la ruta raíz a /home
app.get('/', (req, res) => {
    res.redirect('/home');
});

app.get('/docs', (req, res) => {
    res.json({
        "API Name": "Sneaks API",
        "Version": "1.0",
        "Description": "API para obtener información y precios de zapatillas.",
        "Base URL": "https://sneaks.onrender.com",
        "Endpoints": {
            "/id/:id": {
                "description": "Obtener información de una zapatilla por su ID.",
                "example": "/id/CW2288-111"
            },
            "/id/:id/prices": {
                "description": "Obtener precios de una zapatilla específica.",
                "example": "/id/CW2288-111/prices"
            },
            "/home": {
                "description": "Obtener las zapatillas más populares.",
                "example": "/home?count=20"
            },
            "/search/:shoe": {
                "description": "Buscar zapatillas por palabra clave.",
                "example": "/search/nike"
            },
            "/shoes": {
                "description": "Obtener todas las zapatillas en la base de datos.",
                "example": "/shoes"
            },
            "/": {
                "description": "Redirección a /home.",
                "example": "/"
            }
        }
    });
});

app.get('/docs/html', (req, res) => {
    res.send(`
        <html>
        <head>
            <title>Documentación de Sneaks API</title>
            <style>
                body { font-family: Arial, sans-serif; margin: 20px; }
                h1 { color: #333; }
                code { background: #f4f4f4; padding: 3px 6px; border-radius: 4px; }
            </style>
        </head>
        <body>
            <h1>📌 Sneaks API - Documentación</h1>
            <p>Esta API permite obtener información y precios de zapatillas.</p>
            <p><strong>Base URL:</strong> <code>https://sneaks.onrender.com</code></p>

            <h2>🔹 Endpoints Disponibles</h2>
            <ul>
                <li><strong>/id/:id</strong> - Obtener información de una zapatilla por su ID.
                    <br>Ejemplo: <code>/id/CW2288-111</code>
                </li>
                <li><strong>/id/:id/prices</strong> - Obtener precios de una zapatilla.
                    <br>Ejemplo: <code>/id/CW2288-111/prices</code>
                </li>
                <li><strong>/home</strong> - Obtener las zapatillas más populares.
                    <br>Ejemplo: <code>/home?count=20</code>
                </li>
                <li><strong>/search/:shoe</strong> - Buscar zapatillas por palabra clave.
                    <br>Ejemplo: <code>/search/nike</code>
                </li>
                <li><strong>/shoes</strong> - Obtener todas las zapatillas en la base de datos.
                    <br>Ejemplo: <code>/shoes</code>
                </li>
                <li><strong>/</strong> - Redirección a /home.</li>
            </ul>

            <p>📌 Puedes probar los endpoints directamente desde tu navegador o con herramientas como <a href="https://www.postman.com/">Postman</a>.</p>
        </body>
        </html>
    `);
});


// Iniciar el servidor en el puerto 3000 o el que Render asigne
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));

