define([
	'jquery',
	'underscore',
	'backbone',
	'models/SkillModel'

], function ($, _, Backbone, SkillModel) {

	'use strict';

	var SkillsList = Backbone.Collection.extend({
		url: '/api/skills.json',
		model: SkillModel
	});
	
	return SkillsList;

});