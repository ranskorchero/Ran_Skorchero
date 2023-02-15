const sql = require("./db_Config");
const logIn = function(req,res){
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    const userDtls = {
        "email": req.body.email,
        "password": req.body.password,
    };
    sql.query(`SELECT email, password from users where email = '${userDtls.email}' AND password = '${userDtls.password}'`, (err, mysqlres) => {
        if (err) {
            console.log("error: ", err);
            res.status(400).send({message: "Error in logging in: " + err});
            return;
        }
        if (mysqlres.length) {
            console.log("Logged in");
            res.render('priorities', { message: "You have logged in successfully" });
            return;
        } else {
            res.status(401).send({message: "Invalid username or password"});
            return;
        }
    });
};

module.exports = {logIn};