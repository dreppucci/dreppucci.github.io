/********************************************/
/*	app.js
/*
/*  latest update: 17/10/2014
/*******************************************/

requireWithRetry(
  'config',
  function () {
    requireWithRetry( 'router', function(Router) {
		this.router = new Router();
		Backbone.history.start({ pushState: true });
    }
  )}
);