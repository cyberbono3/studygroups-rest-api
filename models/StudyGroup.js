var Waterline = require('waterline');
var moment = require('moment');

var StudyGroup = Waterline.Collection.extend({
  identity: 'studygroup',
  connection: 'myPostgres',

  attributes: {
  	title: {
  		type: 'string',
  		required: true,
  	},

  	description: {
  		type: 'string',
  		required: true,
  	},

  	course: {
  		type: 'string',
  		required: true,
  	},

  	owner: {
  		model: 'User'
  	},

  	location: {
  		type: 'string',
  		required: true,
  	},

  	startTime: {
  		type: 'time',
  		required: true
  	},

  	endTime: {
  		type: 'time',
  		required: true
  	},

  	date: {
  		type: 'date',
  		required: true
  	},

  	maxMembers: {
  		type: 'integer',
  		required: true,
  		defaultsTo: 0
  	},
    members: {
      collection: 'user'
    }
  },
});

module.exports = StudyGroup;