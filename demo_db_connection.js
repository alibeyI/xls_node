
var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "yourusername",
  password: "yourpassword",
  database: "mydb"
});

let db = con.connect(function () {
  try {
    console.log("Connected!");

    var sql = "CREATE TABLE if not exists datas(id INT primary key auto_increment, first-name VARCHAR(255),last-name VARCHAR(255),gender VARCHAR(255), address VARCHAR(255),country VARCHAR(255), age INT(64) )";

    con.query(sql, (err, result) => {
      err && res.send(err);
      console.log("table created");
    })
  } catch (err) {
    console.log(err);
  }
});