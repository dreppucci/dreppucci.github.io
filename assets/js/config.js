/********************************************/
/*	config.js
/*******************************************/

require.config({
	baseUrl: '/assets/js/',
	urlArgs : "v=" + (new Date()).getTime(),
	waitSeconds: 60,
	paths: {
		jquery: 'framework/jquery',
		tweenmax : 'framework/TweenMax',
		underscore : 'framework/underscore',
		backbone : 'framework/backbone',
		text : 'framework/text',
		easing : 'plugins/easing',
		dragdealer : 'plugins/dragdealer',
		iscroll : 'plugins/iscroll',
		svgloader : 'plugins/svgloader',
		snapsvg : 'plugins/snapsvg',
		vivus : 'plugins/vivus',
		templates: 'templates',
		main: 'views/MainView'
	},
	shim : {
		'easing' : {
			deps : [
				'jquery'
			]
		},
		'dragdealer' : {
			deps : [
				'jquery'
			]
		},
		'svgloader' : {
			deps : [
				'snapsvg'
			]
		},
		'vivus' : {
			deps : [
				'jquery'
			]
		},
		'text' : {
			deps : [
				'underscore'
			]
		},
		'templates' : {
			deps : [
				'text'
			]
		},
		'tweenmax' : {
			exports : 'TweenMax'
		},
		'iscroll' : {
			exports : 'IScroll'
		},
		'underscore' : {
			exports : '_'
		}
	}
});