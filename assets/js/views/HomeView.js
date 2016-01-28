define([
  'jquery',
  'underscore',
  'backbone',
  'views/PageView',
  'views/LoaderView',
  'text!templates/home.php'

], function ($, _, Backbone, PageView, LoaderView, HomeTemplate) {
	
	var HomeView = PageView.extend({

		className: 'home-view page-view clearfix',

		initialize : function () {
			var template = _.template(HomeTemplate);
		    this.$el.prepend(template);
		    this.model.set({ 'title': 'Home' });
		},

		showContent : function() {
			TweenMax.to( this.$el.find('.content h1'), this.model.get('tweenAnimDuration'), { opacity: 1, scale: 1, perspective: 200, y: 0, z: .1, rotationX: 0, ease: Expo.easeInOut } );
			_.delay( _.bind( function() { this.$el.find('.content h1').addClass('lined'); }, this), 1000 );
			TweenMax.to( this.$el.find('.content h2'), this.model.get('tweenAnimDuration'), { delay: .1, opacity: 1, scale: 1, perspective: 200, y: 0, z: .1, rotationX: 0, ease: Expo.easeInOut } );
			TweenMax.to( this.$el.find('.content h3'), this.model.get('tweenAnimDuration'), { delay: .2, opacity: 1, scale: 1, perspective: 200, y: 0, z: .1, rotationX: 0, ease: Expo.easeInOut } );
			TweenMax.to( this.$el.find('.content h4'), this.model.get('tweenAnimDuration'), { delay: .3, opacity: 1, scale: 1, perspective: 200, y: 0, z: .1, rotationX: 0, ease: Expo.easeInOut } );
			TweenMax.to( this.$el.find('.content p'), this.model.get('tweenAnimDuration'), { delay: .4, opacity: 1, scale: 1, perspective: 200, y: 0, z: .1, rotationX: 0, ease: Expo.easeInOut } );
			TweenMax.to( this.$el.find('.content ul'), this.model.get('tweenAnimDuration'), { delay: .5, opacity: 1, scale: 1, perspective: 200, y: 0, z: .1, rotationX: 0, ease: Expo.easeInOut } );
			_liDelay = .5;
			_.each( this.$el.find('.content ul li'), _.bind(function(li) {
				TweenMax.to( li, this.model.get('tweenAnimDuration'), { delay: _liDelay += .1, opacity: 1, scale: 1, perspective: 200, y: 0, z: .1, rotationX: 0, ease: Expo.easeInOut } );
			}, this) );
		}

	});

  	return HomeView;

});
