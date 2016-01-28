/********************************************/
/*  config.js
/*
/*  latest update: 21/10/2014
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
      external : 'plugins/external',
      validate : 'plugins/jquery.tools.min',
      dragdealer : 'plugins/dragdealer',
      iscroll : 'plugins/iscroll',
      svgloader : 'plugins/svgloader',
      snapsvg : 'plugins/snapsvg',
      classie : 'plugins/classie',
      caching : 'plugins/caching',
      templates:  'templates',
      main: 'views/MainView'
    },
    shim : {
      'easing' : {
        deps : [
          'jquery'
        ]
      },
      'external' : {
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
          'snapsvg',
          'classie'
        ]
      },
      'caching' : {
        deps : [
          'jquery'
        ]
      },
      'validate' : {
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