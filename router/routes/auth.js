var express = require('express');
var router = express.Router();
// var models = require('../../models/');
var bcrypt = require('bcrypt');
var AuthServices = require('../../services/AuthService.js');
var Redis = require('../../services/Redis.js');

// var app = require('../../app');

router.get('/', function(req, res){
	res.status(200).json({message: "Wow!!"});
});

router.post('/login', function(req, res){
	app.models.user.findOneByEmail(req.body.email).exec(function(err, user){
		// Send error if find results in error
		if(err){
			res.status(500).json({error: 'Error when trying to find user.'});
		}

		/*
		 * If a user is found, compare hashes of the password. Then, generate a session
		 * ID and send it to the user. Additionally, store the session in our session-store.
		 */
		if(user){
			bcrypt.compare(req.body.password, user.password, function(err, match){
				if(match){
					var token = AuthServices.generateUserToken(user);
					if (token != null){
						// req.session.user = user;
						console.log(user);
						Redis.setSession(token, user.id);

						res.status(200).json({sid: token});
					}
					else {
						res.status(401).json({error: "Error creating a session."});
					}
				}

				// If it's an invalid password, send an error response
				else{
					res.status(401).json({error: "Email or password incorrect."});
				}
			})
		} else {
			res.status(401).json({error: "Email or password incorrect."});
		}
	});
});

router.post('/create', function(req, res){
	console.log(req.body);
	app.models.user.findOneByEmail(req.body.email).exec(function(err, user){
		// Send error if find results in error
		if(err){
			res.status(500).json({error: 'Error creating user.'});
		}

		/*
		 * If a user is found, compare hashes of the password. Then, generate a session
		 * ID and send it to the user. Additionally, store the session in our session-store.
		 */
		if(user){
			res.status(401).json({error: "User already exists!"});
		} else {
			app.models.user.create(req.body, function(err, model) {
	    		if(err){
	    			return res.status(500).json({ err: err });
	    		}
	    		else{
	    			res.json(model);
	    		}
	  		});
		}
	});
});

module.exports = router;