var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection ({
	host: 'localhost',
	port: 3306,
	user: 'root',
	password: 'Coffee@1978S',
	database: 'Bamazon'
});

connection.connect(function(err){
	if (err) throw err;
});

start();

function start() {

	//Select item_id, product_name and price from products table.
	connection.query("SELECT item_id, product_name, price FROM products", function(error, results) {
		if (error) throw error;
		console.log("\n");
		//the below code displays the item_id, product_name and the price for all of items that available for sale. 
		for ( var index = 0; index < results.length; index++) {
			console.log("Product Id: " + results[index].item_id + "  |  " +
			             "Product Name: " + results[index].product_name + "  |  " +
			             "Price: $" + results[index].price + "\n");
		}
	});// end of query.

	// the below code prompt two messages for the user.
	    inquirer.prompt([
	 	
		    // First message:
			{
				type: "input",
				name: "id",
				message: "Please enter the ID of the product that you would like to buy: "
			},
			// Second message:
			{
				type: "input",
				name: "quantity",
				message: "Please enter how many units of the product you would like to buy: "
			}
		]).then(function(answers) {
			connection.query("SELECT stock_quantity, price FROM products WHERE ?", 
				             {item_id:answers.id},
				             function(error, results) {
				             	if (error) throw error;
				             	var stock_quantity = results[0].stock_quantity;
				             	var price = results[0].price;
				             	console.log("The price is " + price);
				             	// we are looking to see if we have enough quantity in the stock to fill the customer order or not
				             	if(answers.quantity > stock_quantity) {
				             		console.log("Insufficient quantity!");
				             	}
				             	else {
				             		console.log("Your totle is $" + answers.quantity * price);
				             		connection.query("UPDATE products SET ? WHERE ?", 
				             		[ {stock_quantity: stock_quantity - parseInt(answers.quantity)},
				             		  {item_id: answers.id}
				             		],
				             		function(error, results) {
				             			if (error) throw error;
				             		})// end of query()
				             	}// end of else
				             	console.log("\n ................\n");
								start();
				            })//end (answers)

		})// end then()
		
	}// end of start function
