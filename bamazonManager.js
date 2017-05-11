var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection ({
	host: 'localhost',
	port: 3306,
	user: 'root',
	password: 'Coffee@1978S',
	database: 'Bamazon'
});

connection.connect(function(error) {
  if (error) throw error;
  runSearch();
});

// this function to display the Main Menu which is a list of options for the user to choose from
var runSearch = function() {
  inquirer.prompt({
    name: "options",
    type: "rawlist",
    message: "\nMain Menu:\n",
    choices: [
      "View Products for Sale",
      "View Low Inventory",
      "Add to Inventory",
      "Add new Product"
    ]
  }).then(function(answer) {
    switch (answer.options) {
      	case "View Products for Sale":
        	forSale();
        	break;

      	case "View Low Inventory":
         	lowInventory();
         	break;

        case "Add to Inventory":
        	addToInventory();
        	break;	

        case "Add new Product":
        	addNewProduct();
        	break;

    }// end of switch
}) // end of then
}// end of runSearch function

// this function list every available item for sale
function forSale() {
	//Select item_id, product_name and price from products table.
	connection.query("SELECT item_id, product_name, price, stock_quantity FROM products", function(error, results) {
		if (error) throw error;
		console.log("\n");
		//the below code displays the item_id, product_name and the price for all of items that available for sale. 
		for ( var index = 0; index < results.length; index++) {
			console.log("Product Id: " + results[index].item_id + "\n" +
			             "Product Name: " + results[index].product_name + "\n" +
			             "Price: $" + results[index].price + "\n" + "Quantity: " + results[index].stock_quantity + "\n" + 
			             "--------------------------------------------------------------------------\n");
		}// end for loop
		runSearch();
	});// end of query.
	
} // end of forSale function

// This function list all items with inventory count lower than five.
function lowInventory() {

	connection.query("SELECT item_id, product_name, price, stock_quantity FROM products WHERE stock_quantity < 5", 
			   function(error, results) {
					if (error) throw error;
					console.log("\n");
					//the below code displays the items with quentity less than 5 
					for ( var index = 0; index < results.length; index++) {
						console.log("Product Id: " + results[index].item_id + "\n" +
							        "Product Name: " + results[index].product_name + "\n" +
							        "Price: $" + results[index].price + "\n" + "Quantity: " + results[index].stock_quantity + "\n" + 
							        "--------------------------------------------------------------------------\n");
					}// end for loop
					runSearch();
	});// end of query.
} // end of lowInventory function

// This function updates inventory -- the function lets the manager add more of any item curently in the store.
function addToInventory() {
	// the below code prompt two messages for the user.
	inquirer.prompt([
	 	
		 // First message:
		{
			type: "input",
			name: "id",
			message: "Please enter the ID of the product that you would like to add inventory: "
		},
		// Second message:
		{
			type: "input",
			name: "quantity",
			message: "Please enter the quentity that will be added: "
		}
	]).then(function(answers) {
		connection.query("SELECT stock_quantity FROM products WHERE ?", {item_id:answers.id},
				     	function(error, results) {
				            if (error) throw error;
				            var stock_quantity = results[0].stock_quantity;
				            //Updating the inventory.
				            connection.query("UPDATE products SET ? WHERE ?", 
				            [ {stock_quantity: stock_quantity + parseInt(answers.quantity)}, {item_id: answers.id}],
				            function(error, results) {
				             	if (error) throw error;
				             	runSearch();
					})// end of query()
			})//end (answers)
	})// end then()
} // end of addToInventory function

// This function adds new product to the products table by a manager
function addNewProduct() {
	inquirer.prompt([
		//product_name colmun
		{ type: "input",
		  name: "productName",
		  message: "Enter a Product Name: " 
		},

		//department_name column
		{
		  type: "input",
		  name: "departmentName",
		  message: "Enter a department Name: "
		},

		//price column
		{
		  type: "input",
		  name: "price",
		  message: "Enter a price: "
		},

		//stock_quentity column
		{
		  type: "input",
		  name: "quentity",
		  message: "Enter a Quentity: "
		}

	]).then(function (answers) {
		connection.query("INSERT INTO products SET ?", 
						{
							product_name: answers.productName,
							department_name: answers.departmentName,
						    price: answers.price, 
						    stock_quantity: answers.quentity
						},
						function(error, results) { if (error) throw error;})
			runSearch();

	})// end answers 
	
}// end of addNewProduct function
