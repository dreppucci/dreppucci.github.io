define([
	'jquery',
	'underscore',
	'backbone'

], function ($, _, Backbone) {

	'use strict';

	var SkillModel = Backbone.Model.extend({
		defaults : {
			'skill': null
		},

		initialize : function () {
			return this;
		}
	});

	return SkillModel;

});
