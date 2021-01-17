var fs = require('fs');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var PRODUCTS_FILE = path.join(__dirname, 'src/assets/js/components/product-data.json');

app.set('port', (process.env.PORT || 3000));

app.use('/', express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


app.use(function(req, res, next) {
   
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,PATCH,POST,DELETE');


    res.setHeader('Cache-Control', 'no-cache');
    next();
});

app.get('/api/products', function(req, res) {
    fs.readFile(PRODUCTS_FILE, function(err, data) {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        res.json(JSON.parse(data));      
    });
});


app.get('/api/product/:id', function(req, res) {

    fs.readFile(PRODUCTS_FILE, function(err, data) {
        if (err) {
            console.error(err);
            process.exit(1);
        }

        var json = JSON.parse(data);

        for(var i = 0; i <= json.length; i++)
        {
            if(json[i]['id'] == req.params.id)
            {
                res.json(json[i]);
                break;
            }
        }
    });
});

app.post('/api/product/create', function(req, res) {

    fs.readFile(USER_FILE, function(err, data) {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        res.json(JSON.parse(data));       
    });
});

app.patch('/api/product/edit/:id', function(req, res) {
    fs.readFile(PRODUCTS_FILE, function(err, data) {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        var products = JSON.parse(data);

        for(var i = 0; i <= products.length; i++)
        {
            if(products[i]['id'] == req.params.id)
            {
                var product = products[i];
                product.sirket_ismi = req.body.sirket_ismi;
                product.sirket_adresi = req.body.sirket_adresi;
                product.sirket_email = req.body.sirket_email;
                product.sirket_gsm = req.body.sirket_gsm;
               
               
                products.splice(i, 1);
                products.push(product);

                fs.writeFile(PRODUCTS_FILE, JSON.stringify(products, null, 4), function(err) {
                    if (err) {
                        console.error(err);
                        process.exit(1);
                    }
                    res.json(products);
                });
                break;
            }
        }
    });
});

app.delete('/api/product/delete/:id', function(req, res) {
    fs.readFile(PRODUCTS_FILE, function(err, data) {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        var products = JSON.parse(data);

        for(var i = 0; i <= products.length; i++)
        {
            if(products[i]['id'] == req.params.id)
            {
                products.splice(i, 1);

                fs.writeFile(PRODUCTS_FILE, JSON.stringify(products, null, 4), function(err) {
                    if (err) {
                        console.error(err);
                        process.exit(1);
                    }
                    res.json(products);
                });
                break;
            }
        }
    });
});


app.listen(app.get('port'), function() {
    console.log('Server started: http://localhost:' + app.get('port') + '/');
});