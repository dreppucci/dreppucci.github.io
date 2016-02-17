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
		pace: 'plugins/pace.min',
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
		'pace' : {
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
		'underscore' : {
			exports : '_'
		}
	}
});