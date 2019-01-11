var express = require('express');
var router = express.Router();
var AuthService = require('../../services/AuthService.js');

router.get('/', function(req, res){
	console.log(req.headers);
	var user = AuthService.getUser(req.headers['authorization'], function(user){
		console.log("User: " + user);
		app.models.studygroup.findByCourseIn(user.classes)
			.then(function(groups){
				return res.status(200).json(groups);
			})
			.catch(function(err){
				return res.status(500).json({err: err});
			});
	});
});

router.post('/', function(req, res){
	app.models.studygroup.create(req.body, function(err, model) {
		if(err){
			console.log(err);
			return res.status(500).json(err);
		}
		else{
			// return res.status(200).json(err["invalidAttributes"]);
			return res.json(model);
		}
	});
});

/*
 * Gets the details for the study group called [id]
 */
router.get('/:id', function(req, res){
	app.models.studygroup.findOne({id: req.params.id}).populate('members')
		.then(function(group){
			return res.status(200).json(group);
		})
		.catch(function(err){
			return res.status(500).json(err.invalidAttributes);
			// return res.status(500).json({err: err});
		})
})

/**
 * Joins a group with the [id]
 *
 * TODO: Make sure users can't join their own group
 */
router.post('/:id', function(req, res){
	// Use the user service to find the user based on session.
	var user = AuthService.getUser(req.headers['authorization'], function(user){
		// Then, if we can find a user, try to find the corresponding study group.
		app.models.studygroup.findOne({id: req.params.id}).populate('members')
			.then(function(group){
				// Add the current user to the members list.
				if(group.owner != user.id){
					group.members.push(user);
					group.save()
						.then(function(group){
							return res.status(200).json(group);
						})
						.catch(function(err){
							return res.status(500).json(err);
						});
				}
				else {
					res.status(200).json({error: "You're the owner of this group!"});
				}
			})
			.catch(function(err){
				return res.status(500).json(err);
			});
	});
})

/**
 * Deletes a group with [id]. Makes sure they are the owner before doing so.
 */
router.delete('/:id', function(req, res){
	// Use the user service to find the user based on session.
	var user = AuthService.getUser(req.headers['authorization'], function(user){
		// Then, if we can find a user, try to find the corresponding study group.
		app.models.studygroup.findOne({id: req.params.id})
			.then(function(group){
				// Delete the group ONLY if they are the owner.
				if(group.owner == user.id){
					group.destroy();
					res.status(200).json({success: "Deleted."});
				}
				// Otherwise return an unauthorized response.
				else {
					res.status(403).json({error: "Sorry, you're not the owner of this group."});
				}
			})
			.catch(function(err){
				return res.status(500).json(err);
			});
	});
})

module.exports = router;