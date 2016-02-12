define([
	'jquery',
	'underscore',
	'backbone',
	'views/PageView',
	'views/LoaderView',
	'text!../../../404.html'

], function ($, _, Backbone, PageView, LoaderView, ErrorTemplate) {
	
	var ErrorView = PageView.extend({

		className: 'page-view error-view',

		initialize : function () {
			this.$el.append($(ErrorTemplate).find('.page-view').html());
			this.model.set({ 'title': '404' });
		},

		showContent : function() {
			TweenMax.to( this.$el.find('.content h1'), this.model.get('tweenAnimDuration'), { opacity: 1, scale: 1, perspective: 200, y: 0, z: .1, rotationX: 0, ease: Expo.easeInOut } );
			_.delay( _.bind( function() { this.$el.find('.content h1').addClass('lined'); }, this), 800 );
			TweenMax.to( this.$el.find('.content h2'), this.model.get('tweenAnimDuration'), { delay: .1, opacity: 1, scale: 1, perspective: 200, y: 0, z: .1, rotationX: 0, ease: Expo.easeInOut } );

			TweenMax.to( this.$el.find('.content p'), this.model.get('tweenAnimDuration'), { delay: .2, opacity: 1, scale: 1, perspective: 200, y: 0, z: .1, rotationX: 0, ease: Expo.easeInOut } );
			TweenMax.to( this.$el.find('.content ul'), this.model.get('tweenAnimDuration'), { delay: .3, opacity: 1, scale: 1, perspective: 200, y: 0, z: .1, rotationX: 0, ease: Expo.easeInOut } );
			_liDelay = .3;
			_.each( this.$el.find('.content ul li'), _.bind(function(li) {
				TweenMax.set( li, { rotationX: 0 } );
				TweenMax.to( li, this.model.get('tweenAnimDuration'), { delay: _liDelay += .1, opacity: 1, scale: 1, perspective: 200, y: 0, z: .1, rotationX: 0, ease: Expo.easeInOut } );
			}, this) );
		}

	});

	return ErrorView;

});