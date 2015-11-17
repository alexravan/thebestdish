
function yelp (yelpname) { 

	var auth = {
		//
		// Update with your auth tokens.
		//
			consumerKey : 'ZOg1zJXufWwal7o-e9DX3g',
			consumerSecret : "YDy_HjtvFcWDfTAdV7byvN0M0r4",
			accessToken : "NfSGRjo-91bjzaKOo9v6qaFTAPZb8oX1",
			// This example is a proof of concept, for how to use the Yelp v2 API with javascript.
			// You wouldn't actually want to expose your access token secret like this in a real application.
			accessTokenSecret : "Zg7NX9jMHPw79RjlHTKCYthmICk",
			serviceProvider : {
					signatureMethod : "HMAC-SHA1"
			}
		};

			// searchFood = $("#searchfood").val();
			// searchLoc = $("#location").val();
				// console.log(searchFood);
			 var terms = "'" + yelpname + "'";
			//var terms = yelpname;
			var near = "somerville, ma";

			var accessor = {
					consumerSecret : auth.consumerSecret,
					tokenSecret : auth.accessTokenSecret
				};


			parameters = [];
			parameters.push(['term', terms]);
			parameters.push(['location', near]);
			parameters.push(['callback', 'cb']);
			parameters.push(['oauth_consumer_key', auth.consumerKey]);
			parameters.push(['oauth_consumer_secret', auth.consumerSecret]);
			parameters.push(['oauth_token', auth.accessToken]);
			parameters.push(['oauth_signature_method', 'HMAC-SHA1']);

			var message = {
					'action' : 'http://api.yelp.com/v2/search',
					'method' : 'GET',
					'parameters' : parameters
			};

			OAuth.setTimestampAndNonce(message);
			OAuth.SignatureMethod.sign(message, accessor);

			var parameterMap = OAuth.getParameterMap(message.parameters);

			var Resname;
			var phone;
			var rating;
			var reviewCount;
			var address;
			var citystate;
			var restStruct;
			return $.ajax({
					'url' : message.action,
					'data' : parameterMap,
					'dataType' : 'jsonp',
					'jsonpCallback' : 'cb',
					'success' : function(data, textStats, XMLHttpRequest) {
							console.log(data);
							// console.log(data.busindvesses[1].);
								

							    Resname = data.businesses[0].name;
							    Resphone = data.businesses[0].display_phone;
								Resrating = data.businesses[0].rating;
								ResreviewCount = data.businesses[0].review_count;
								Resaddress = data.businesses[0].location.address[0];
								Rescitystate = data.businesses[0].location.city + ", " + data.businesses[0].location.state_code + " " + data.businesses[0].location.postal_code;
								lng = data.businesses[0].location.longitude;
								lat = data.businesses[0].location.lattitude;
								// console.log(Resaddress);
								// printRes (Resname, phone, rating, reviewCount, address, citystate);

								 restStruct = {
									name : "'" + Resname + "'",
									phone: Resphone,
									rating : Resrating,
									address : Resaddress,
									citystate : Rescitystate };	
								
								// console.log(restStruct.address);


					}

			})
				// xmlreq.done(function( restStruct) {
					return restStruct;
				// });

			
			
	}







