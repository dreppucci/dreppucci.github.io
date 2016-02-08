define([
  'jquery',
  'underscore',
  'backbone',
  'views/PageView',
  'views/LoaderView',
  'text!../../../index.html'

], function ($, _, Backbone, PageView, LoaderView, HomeTemplate) {
	
	var HomeView = PageView.extend({

		initialize : function () {
			this.$el.prepend($(HomeTemplate).find('.page-view').html());
		    this.model.set({ 'title': 'Home' });
		},

		showContent : function() {
			TweenMax.to( this.$el.find('.content h1'), this.model.get('tweenAnimDuration'), { opacity: 1, scale: 1, perspective: 200, y: 0, z: .1, rotationX: 0, ease: Expo.easeInOut } );
			_.delay( _.bind( function() { this.$el.find('.content h1').addClass('lined'); }, this), 700 );
			TweenMax.to( this.$el.find('.content h2'), this.model.get('tweenAnimDuration'), { delay: .3, opacity: 1, scale: 1, perspective: 200, y: 0, z: .1, rotationX: 0, ease: Expo.easeInOut } );
			TweenMax.to( this.$el.find('.content h3'), this.model.get('tweenAnimDuration'), { delay: .4, opacity: 1, scale: 1, perspective: 200, y: 0, z: .1, rotationX: 0, ease: Expo.easeInOut } );
			TweenMax.to( this.$el.find('.content h4'), this.model.get('tweenAnimDuration'), { delay: .5, opacity: 1, scale: 1, perspective: 200, y: 0, z: .1, rotationX: 0, ease: Expo.easeInOut } );
			TweenMax.to( this.$el.find('.content p:eq(0)'), this.model.get('tweenAnimDuration'), { delay: .6, opacity: 1, scale: 1, perspective: 200, y: 0, z: .1, rotationX: 0, ease: Expo.easeInOut } );

			_spanDelay = .6;
			_.each( this.$el.find('.content p:eq(0) span'), _.bind(function(li) {
				TweenMax.set( li, { rotationX: 0 } );
				TweenMax.to( li, this.model.get('tweenAnimDuration'), { delay: _spanDelay += .1, opacity: 1, scale: 1, perspective: 200, y: 0, z: .1, rotationX: 0, ease: Expo.easeInOut } );
			}, this) );

			TweenMax.to( this.$el.find('.content p:eq(1)'), this.model.get('tweenAnimDuration'), { delay: 1, opacity: 1, scale: 1, perspective: 200, y: 0, z: .1, rotationX: 0, ease: Expo.easeInOut } );

			TweenMax.to( this.$el.find('.content ul'), this.model.get('tweenAnimDuration'), { delay: 1, opacity: 1, scale: 1, perspective: 200, y: 0, z: .1, rotationX: 0, ease: Expo.easeInOut } );
			_liDelay = 1;
			_.each( this.$el.find('.content ul li'), _.bind(function(li) {
				TweenMax.set( li, { rotationX: 0 } );
				TweenMax.to( li, this.model.get('tweenAnimDuration'), { delay: _liDelay += .1, opacity: 1, scale: 1, perspective: 200, y: 0, z: .1, rotationX: 0, ease: Expo.easeInOut } );
			}, this) );
		}

	});

  	return HomeView;

});