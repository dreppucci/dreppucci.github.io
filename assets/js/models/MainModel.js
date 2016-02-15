define([
	'jquery',
	'underscore',
	'backbone'

], function ($, _, Backbone) {

	'use strict';

	var MainModel = Backbone.Model.extend({
		defaults : {
			'window': null,
			'body': null,
			'width': null,
			'height': null,
			'current': null,
			'prev': null,
			'title': null,
			'defaultTitle': ' | Davide Reppucci | Team leader, technical project manager, front-end developer',
			'tweenAnimDuration': 1.5
		},

		initialize : function () {
			return this;
		}
	});

	return MainModel;

});
