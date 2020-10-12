const express = require('express');
const bodyParser = require('body-parser');
const { check, validationResult } = require('express-validator');
// Init App
const app = express();


// Set Template Engine
app.set('view engine', 'ejs');

// Body parser Middleware
const urlEncodedParser = bodyParser.urlencoded({ extended:false });



app.get('/', (req, res) => {
    res.render('index');
});

app.get('/register', (req, res) => {
    res.render('register');
});


app.post('/register', urlEncodedParser,
    [ 
        check('username', 'This username must be 3 characters long').exists().isLength({ min:3 }),
        check('email', 'Email is not valid').isEmail().normalizeEmail(),
        check('password', 'Password is required').isLength({ min: 6 })
          
    ], (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            // return res.status(422).jsonp(errors.array());
            const alert = errors.array();
            res.render('register', {
                alert
                
            });
        }

    // res.json(req.body);
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on PORT ${PORT}`));