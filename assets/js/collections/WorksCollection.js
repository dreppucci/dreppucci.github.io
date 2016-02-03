define([
	'jquery',
	'underscore',
	'backbone',
	'models/WorkModel'

], function ($, _, Backbone, WorkModel) {

	'use strict';

	var WorksList = Backbone.Collection.extend({
		url: '/api/works/',
		model: WorkModel
	});
	
	return WorksList;

});
