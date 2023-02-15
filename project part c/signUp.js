const sql = require("./db");
const signUp = function(req,res){
    // Validate request
    if (!req.body) {
        res.status(400).send({
        message: "Content can not be empty!"
        });
        return;
    }
    const newUser = {
        "name": req.body.UserName,
        "password": req.body.UserEmail,
        "email": req.body.UserPassword,


    };
    sql.query("INSERT INTO users SET ?", newUser, (err, mysqlres) => {
        if (err) {
        console.log("error: ", err);
        res.status(400).send({message: "error in sign up: " + err});
        return;
    }
    console.log("new user: ", { id: mysqlres.insertId, ...newUser });
        res.render('Home-page', { message: "You have signed up successfully" });
        return;
        });
    };
module.exports = {signUp};