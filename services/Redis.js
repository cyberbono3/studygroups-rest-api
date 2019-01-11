var redis = require("redis");
var client = redis.createClient();

module.exports = {
	setSession: function(token, id){
		client.set(token, id);
	},

	getSession: function(token){
		return client.get(token, function(err, reply){
			if(err){
				console.log("User not found with token " + token);
				return null;
			}
			else {
				return reply;
			}
		});
	}
}