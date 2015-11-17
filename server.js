var express = require('express');
var bodyParser = require('body-parser');
var validator = require('validator');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var mongoUri = process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://localhost/test';
var MongoClient = require('mongodb').MongoClient, format = require('util').format;
var db = MongoClient.connect(mongoUri, function(error, databaseConnection) {
	db = databaseConnection;
});

app.post('/addRating', function(request, response) {
	
	response.header("Access-Control-Allow-Origin", "*");
  	response.header("Access-Control-Allow-Headers", "X-Requested-With");
	

	console.log("posting bitches");
	if(request.body.foodID && request.body.rating){
		var ID = Number(request.body.foodID);
		var ratingToAdd = parseInt(request.body.rating);
		var toInsert;
		console.log("11111111111");

		db.collection('menus', function(error1, menus) {
			if(error1){
				console.log('Error: database collection not found');
				response.sendStatus(500);
			}
			console.log("222222222");
			menus.find( { foodid: ID } ).toArray(function(err2, cursor){

				if (err2) {
					console.log("first Find failed");
					response.sendStatus(500);
				}
					console.log("3333333");
					console.log("The id is: " + ID);
					console.log(cursor[0]);
					var newRating = (cursor[0].rating + ratingToAdd);
						console.log("new rating: " + newRating);

					var newCount = (cursor[0].total) + 1;
						console.log("new count: " + newCount);

					console.log("666 SATAN WAS HERE");

					menus.update(
						{ foodid: ID },
						{ $set: 
							{
								rating : newRating,
								total : newCount
							}	
						}, function(err3, updated) {
							if (err3) {
								console.log("Update Failed!");
								response.sendStatus(500);
							} else {
								console.log("Update Succeeded! Rating Updated");
								response.sendStatus(200);
							}
						});


					// menus.update({ foodid : ID }, toInsert, {upsert: false}, function(err3, saved) { //Upsert
					console.log("777");

					
			});

		});

			//Make sure upsert works if there are missing fields!!
			

	} else {
		response.send( { "error" : "Whoops, something is wrong with your data!"} );
	}
});


app.get('/', function(request, response) {

	response.set('Content-Type', 'text/html');
	response.header("Access-Control-Allow-Origin", "*");
	response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

	var indexPage = '';
	indexPage += "<!DOCTYPE HTML><html><head><title>TBD</title></head><body><h1>Welcome to TBD</h1>";				
	indexPage += "</body></html>"
					response.send(indexPage);
	
});

//send /search.json/lookup=????
app.get('/search.json', function(request, response){
	
	response.header("Access-Control-Allow-Origin", "*");
  	response.header("Access-Control-Allow-Headers", "X-Requested-With");

  	//for now will only really work with 1 word terms

  	var searchTerm = String(request.query.lookup);
  	searchTerm = searchTerm.toLowerCase();
  	console.log(searchTerm);
  	if (searchTerm != undefined && searchTerm != ""){
  		//console.log("searchTerm OKAY!");
  		//console.log(searchTerm);
  		
  		var menus = db.collection("menus");
  		
  		info = menus.find({$or: [{foodname: {$regex : searchTerm}}, {description: {$regex : searchTerm}}] }).toArray(function(err2,cursor2){

  			if(err2){
  				console.log("find.toArray not working");
			 	response.send(500);
  			}
  			//console.log(cursor2);
  			//console.log(cursor2[1]);
  			if(cursor2[0] == undefined){
  				response.send({});
  			}else{
  				response.send(cursor2);
  			}
  			
  		});
 		
  	// 	menus.find({ $or: [{"FoodName" : searchTerm}, {"Description" : searchTerm}]}).toArray(function(err,cursor){

  	} else {
  		console.log("lookup undefined");
  		response.send({});
  	}
  	
});

app.get('/restaurant', function(request, response) {

	response.header("Access-Control-Allow-Origin", "*");
  	response.header("Access-Control-Allow-Headers", "X-Requested-With");

  	var findRest =  String(request.query.searchRest);

	db.collection('menus', function(error1, coll) {
		if(error1){
			console.log('Error: database collection not found');
			response.send(500);
		}
		
		var id = coll.find({"yelpid": findRest}).toArray(function (error2, cursor) {
			if (error2) {
				console.log("Find failed :(");
				response.send(500);
			} else {
				console.log("Find succeeded!");
				console.log(cursor);
				response.send(cursor);
			}
		});
	});
});

app.use(express.static('public'));

app.listen(process.env.PORT || 3000);