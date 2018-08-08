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

connection.query("SELECT * FROM products", function(err, res) {

    for (var i = 0; i < res.length; i++) {
        console.log("Item ID: " + res[i].id + "\nName of Product: " + res[i].product_name + "\nName of Product Department:"  + res[i].department_name + "\nPrice: " + "$" + res[i].price + "Stock Quantity:" + res[i].stock_quantity + "\n=======================");
    }
});

connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;

    inquirer.prompt([{
        name: "productList",
        list: function() {
            var productsArr = [];
            for (var i = 0; i < res.length; i++) {
                productsArr.push(res[i].id);
            }
            return productsArr;
        },
        message: "What would you like to buy? (Please type in the Item ID).",
    }, {
        name: "unitNum",
        message: "How many would you like to buy?",

    }]).then(function(custAnswer) {

        // stores the customer's answer to a var
        var custChoiceID = custAnswer.productList.trim();

        //gets the index of the item choice
        var arrNum = custChoiceID - 1;

        var chosenProduct = res[arrNum];

        //shows the customer which product they chose
        console.log("You chose:  " + custChoiceID + " | " + chosenProduct.product_name);

        //how many the customer would like to purchase 
        var unitNum = custAnswer.unitNum.trim();
        console.log("# of items you wanted to purchase: " + unitNum);

        //num of stocks available in store
        var itemStocks = chosenProduct.stock_quantity;
        var sales = product_sales + unitNum * chosenProduct.price;
        if (unitNum < chosenProduct.stock_quantity) {
            var newQuantity = chosenProduct.stock_quantity - unitNum

            connection.query("UPDATE products SET ? WHERE ?", [{
                stock_quantity: newQuantity,
                product_sales: sales
            }, {
                id: chosenProduct.id
            }], function(err) {
                if (err) throw err;
                console.log("Thank you for your order!");
                console.log("Total cost: $" + (unitNum * chosenProduct.price));
            });

        } else {
        	console.log("Unfortunately, we currently do not have enough of that item in stock. Please check back soon."); 
        };
    });
});