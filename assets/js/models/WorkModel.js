define([
	'jquery',
	'underscore',
	'backbone'

], function ($, _, Backbone) {

	'use strict';

	var WorkModel = Backbone.Model.extend({
		defaults : {
			'title': null,
			'abstract': null,
			'body': null,
			'link': null,
			'gallery': null
		},

		initialize : function () {
			return this;
		}
	});

	return WorkModel;

});
