define([
  'jquery',
  'underscore',
  'backbone',
  'views/PageView',
  'views/LoaderView',
  'text!../../../contact/index.html'

], function ($, _, Backbone, PageView, LoaderView, ContactTemplate) {
	
	var ContactView = PageView.extend({

		initialize : function () {
			this.$el.prepend($(ContactTemplate).find('.page-view').html());

		    this.model.set({ 'title': 'Contact' });
		},

		showContent : function() {
			TweenMax.to( this.$el.find('.content h1'), this.model.get('tweenAnimDuration'), { opacity: 1, scale: 1, perspective: 200, y: 0, z: .1, rotationX: 0, ease: Expo.easeInOut } );
			_.delay( _.bind( function() { this.$el.find('.content h1').addClass('lined'); }, this), 500 );
			TweenMax.to( this.$el.find('.content h2'), this.model.get('tweenAnimDuration'), { delay: .3, opacity: 1, scale: 1, perspective: 200, y: 0, z: .1, rotationX: 0, ease: Expo.easeInOut } );
			TweenMax.to( this.$el.find('.content ul:eq(0)'), { rotationX: 0 } );
			TweenMax.to( this.$el.find('.content ul:eq(0)'), this.model.get('tweenAnimDuration'), { delay: .4, opacity: 1, scale: 1, perspective: 200, y: 0, z: .1, rotationX: 0, ease: Expo.easeInOut } );

			_liDelay = .2;
			_.each( this.$el.find('.content ul:eq(0) li'), _.bind(function(li) {
				TweenMax.set( li, { rotationX: 0 } );
				TweenMax.to( li, this.model.get('tweenAnimDuration'), { delay: _liDelay += .1, opacity: 1, scale: 1, perspective: 200, y: 0, z: .1, rotationX: 0, ease: Expo.easeInOut } );
			}, this) );

			TweenMax.to( this.$el.find('.content p:eq(0)'), this.model.get('tweenAnimDuration'), { delay: _liDelay += .2, opacity: 1, scale: 1, perspective: 200, y: 0, z: .1, rotationX: 0, ease: Expo.easeInOut } );
			TweenMax.to( this.$el.find('.content ul:eq(1) li'), 0, { delay: _liDelay, opacity: 1, scale: 1, perspective: 200, y: 0, z: .1, rotationX: 0, ease: Expo.easeInOut } );
			TweenMax.to( this.$el.find('.content ul:eq(1)'), this.model.get('tweenAnimDuration'), { delay: _liDelay += .2, opacity: 1, scale: 1, perspective: 200, y: 0, z: .1, rotationX: 0, ease: Expo.easeInOut } );
		}

	});

  	return ContactView;

});