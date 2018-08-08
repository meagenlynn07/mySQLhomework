var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 8889,
    user: "root",
    password: "root",
    database: "bamazon_db"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id" + connection.threadId);

});

function start(){
    inquirer.prompt([{
      type: "list",
      name: "doThing",
      message: "What would you like to do?",
      choices: ["View Product Sales by Department", "Create New Department", "End Session"]
    }]).then(function(ans){
      switch(ans.doThing){
        case "View Product Sales by Department": viewProductByDept();
        break;
        case "Create New Department": createNewDept();
        break;
        case "End Session": console.log('See ya!');
      }
    });
  }
  
  //view product sales by department
  function viewProductByDept(){
    //prints the items for sale and their details
    connection.query("SELECT * FROM products", function(err, res) {

      
        for(var i = 0; i < res.length; i++) {
            console.log("Department ID: " + res[i].department_id + " | " + "Department Name: " + res[i].department_name + " | " + "Over Head Cost: " + (res[i].over_head_costs).toFixed(2) + " | " + "Product Sales: " + (res[i].TotalSales).toFixed(2) + " | " + "Total Profit: " + (res[i].TotalSales - res[i].over_head_costs).toFixed(2));
        }
    });
  }
  
    //create a new department
    function createNewDept(){
      
      //prompts to add deptName and numbers. if no value is then by default = 0
      inquirer.prompt([
      {
        type: "input",
        name: "department_name",
        message: "Department Name: "
      }, {
        type: "input",
        name: "over_head_costs",
        message: "Over Head Cost: ",
        default: 0,
        validate: function(val){
          if(isNaN(val) === false){return true;}
          else{return false;}
        }
      }, {
        type: "input",
        name: "product_sales",
        message: "Product Sales: ",
        default: 0,
        validate: function(val){
          if(isNaN(val) === false){return true;}
          else{return false;}
        }
      }
      ]).then(function(ans){
        connection.query('INSERT INTO departments SET ?',{
          DepartmentName: ans.department_name,
          OverHeadCosts: ans.over_head_costs,
          TotalSales: ans.product_sales
        }, function(err, res){
          if(err) throw err;
          console.log('Another department was added.');
        })
        start();
      });
    }
  
  start();