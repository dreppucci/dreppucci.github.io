/********************************************/
/*	app.js
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