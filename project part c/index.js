const express = require('express');
const app = express();
const http = require('http');
const fs = require('fs');
const path = require('path');
const sql = require('mysql2');
const connect = require('./db');
const sql1 = require("./db_Config");
const sql3 = require("./db");
const port = 3000;


app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'static')));

app.get('/static/css.css', (req, res) => {
  res.set({ 'Content-Type': 'text/css' });
  res.sendFile(__dirname + '/static/css.css');
});

app.use(express.static(path.join(__dirname, '/static/img')));


app.get('/', (req, res) => {
  res.render('sign up');
});

// Define routes
app.get('/signup', (req, res) => {
  res.render('signup'); // render the Pug template for the sign up page
});

app.get('/home', (req, res) => {
  res.render('home'); // render the Pug template for the home page
});

app.get('/art.html', (req, res) => {
  res.render('art');
});

app.get('/history.html', (req, res) => {
  res.render('history');
});

app.get('/philosophy.html', (req, res) => {
  res.render('philosophy');
});

app.get('/physics.html', (req, res) => {
  res.render('physics');
});

app.get('/priorities', (req, res) => {
  res.render('priorities');
});


app.get("/getall", (req, res) =>{
  let q = "select * from users";
  sql3.query(q, (err,result) => {
    if(err) throw err;
    res.send(result);
  })
});

app.listen(port, () => {
  console.log(`Express server listening on port ${port}`);
});

app.use(express.static(path.join(__dirname, 'views')));
app.get('/static/js.js', (req, res) => {
  res.set('Content-Type', 'application/javascript');
  res.sendFile(__dirname + '/static/js.js');
});

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

// app.get('/', (req, res) => {
//   res.send(`
//     <form action="/submit-form" method="post">
//       <input type="file" name="type">
//       <button type="submit">Submit</button>
//     </form>
//   `);
// });
const signIn = require("./logIn");
app.post("/signIn", signIn.logIn);

const signUp = require("./signUp");
app.post("/signup",signUp.signUp);

// app.post('/submit-form', (req, res) => {
//   const namesel = req.body.name;
//   const types = req.body.type;SS
//   const texts = req.body.text;
//   var query;

//   sql.connect(dbConfig, function(err) {
//     if (err) {
//         console.log(err);
//         return;
//     }
//     console.log(`Form submitted. type: ${types}  text: ${texts} name: ${namesel}`);  
//     const request = new sql.Request();
//     request.input('type', sql.VarChar, types);
//     request.input('text', sql.VarChar, texts);
//     request.input('name', sql.VarChar, namesel);
//     query = `SELECT * FROM articles WHERE type = @types`;
//     request.query(query, function (err, result) {
//       if (err) {
//           console.error('Error occurred while executing the query: ', err);
//       } else {
//           console.log(result.recordset);
//       }

//       if (typeof result.recordset === "undefined") {
//         res.send('No matching article');
//       } else {
//         var names = "";
//         result.recordset.forEach((row) => {
//           console.log(row.name);
//           const article = `<h1>${namesel}</h1> <br>
//                             <p>${texts}</p>`;
//           names += `<div> ${article} </div>`;
//         });
//         res.send(`<center><h2> recommended articles: </h2>
//                 <div> ${names} </div></center>`);
//       }
//     });
//   });
// });

app.post('/signup-submit', (req, res) => {
  const name = req.body.name;
  const password = req.body.password;
  const email = req.body.email;

  sql.connect(dbConfig, function(err) {
    if (err) {
        console.log(err);
        return;
    }
    console.log(`Signup Form submitted. username: ${name}  email: ${email}`);  
    
    const request = new sql.Request();
    request.input('name', sql.VarChar, name);
    request.input('pass', sql.VarChar, password);
    request.input('email', sql.VarChar, email);

    request.query(`INSERT INTO users VALUES (@name, @pass, @email,);`, function (err, result) {
      if (err) {
          console.error('Error occurred while executing the query: ', err);
      } else {
          console.log(result.recordset);

          res.send(`<a class="active" href="/">דף הבית</a>
                  <center><h2> user ${username} has been signed up successfully :) </h2>`);
      }
    });
  });
});

// sql.connect(dbConfig, function(err) {
//   if (err) {
//       console.log(err);
//       return;
//   }

//   const request = new sql.Request();

//   fs.readFile('./web.sql', 'utf8', function (err, data) {
//       if (err) {
//           console.log(err);
//       } else {
//           // Execute the commands in the .sql file
//           request.query(data, function(err, result) {
//               if (err) {
//                   console.log(err);
//               } else {
//                   console.log(result);
//               }
//               sql.close();
//           });
//       }
//   });
// });



