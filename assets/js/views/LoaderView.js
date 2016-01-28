define([
  'jquery',
  'underscore',
  'backbone',
  'tweenmax',
  'snapsvg',
  'svgloader'

], function ($, _, Backbone, TweenMax, Snapsvg, SVGLoader) {
	
	var LoaderView = Backbone.View.extend({
		className: 'loader-view',

		initialize : function () {
			this.loader = new window.SVGLoader( document.getElementById( 'loader' ), { speedIn : 500, easingIn : mina.easeinout } );
			this.on('preloadStarted', this.showPreload, this);
			this.on('preloadCompleted', this.hidePreload, this);
		},

		showPreload : function() {
			TweenMax.to(this.loader, .3, { 'opacity': 1, 'ease': Expo.easeInOut });
			this.loader.show();
		},

		hidePreload : function() {
			this.loader.hide();
		}

	});

  	return new LoaderView();

});
