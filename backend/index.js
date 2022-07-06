const express = require('express');
const bodyParser = require('body-Parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());
const mysql = require('mysql2');

//database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'sample',
    port: 3306,
});
//check database connection 
db.connect(err => {
    if (err) {
        console.log(err, 'dberr');
    }

    console.log('database connected ...');
});
//get multiple data
app.get('/user', (req, res) => {
    let qr = 'select * from user';
    db.query(qr, (err, result) => {
        console.log(result);
        if (err) {
            console.log(err, 'errs');

        }
        if (result.length) {
            res.send({
                message: 'all user data',
                data: result,
            });
        }
    });

});
//get single data 
app.get('/user/:id', (req, res) => {
    let gId = req.params.id;
    let qr = `select * from user where id = ${gId}`;
    console.log(qr);
    db.query(qr, (err, result) => {
        console.log(result);
        if (err) {
            console.log('errs');
        }
        console.log(result);
        if (result.length > 0) {
            res.send({
                message: 'get single date ',
                data: result,
            });
        }
        else {
            res.send({
                message: 'no single date ',
            });
        }
    });
});
//post data 
app.post('/user', (req, res) => {
    console.log(req.body, 'createdata');
    let fullName = req.body.name;
    let eMail = req.body.email;
    let mb = req.body.mobile;
    let qr = `insert into user(name,email,mobile)values('${fullName}','${eMail}','${mb}')`;
    db.query(qr, (err, result) => {
        if (err) {
            console.log(err);
        }
        console.log(result, 'result');
        res.send({
            message: 'data inserted',
            data: result,
        });
    });
});
//update data
app.put('/user/:id', (req, res) => {
    console.log(req.body, "update data");
    let gId = req.params.id;
    let fullName = req.body.name;
    let eMail = req.body.email;
    let mb = req.body.mobile;
    let qr = `update user set name ='${fullName}',email='${eMail}',mobile='${mb} 'where id =' ${gId}'`;
    db.query(qr, (err, result) => {
        if (err) {
            console.log(err);
        }
        console.log(result, 'result');
        res.send({
            message: 'data updated',
        });
    });
});
//delete data 
app.delete('/user/:id', (req, res) => {
    console.log(req.body, "delete data");
    let gId = req.params.id;
    let qr = `delete from user where id  = '${gId}'`;
    db.query(qr, (err, result) => {
        if (err) {
            console.log(err);
        };
        res.send({
            message: 'data deleted',
        });
    });
});
app.listen(3000, () => {
    console.log('server running');
});
