define([
  'jquery',
  'underscore',
  'backbone',
  'views/PageView',
  'views/LoaderView',
  'text!../../../about/index.html'

], function ($, _, Backbone, PageView, LoaderView, AboutTemplate) {
	
	var AboutView = PageView.extend({

		skillsLiIndex : 0,
		skillsLiCount : 0,

		initialize : function () {
		    this.$el.prepend($(AboutTemplate).find('.page-view').html());

		    this.model.set({ 'title': 'About' });
		},

		showContent : function() {
			this.$el.find('.content ul li').css({ 'top': '30%' });
			this.skillsLiCount = this.$el.find('.content ul.skills li').length;

			TweenMax.to( this.$el.find('.content h1'), this.model.get('tweenAnimDuration'), { opacity: 1, scale: 1, perspective: 200, y: 0, z: .1, rotationX: 0, ease: Expo.easeInOut } );
			_.delay( _.bind( function() { this.$el.find('.content h1').addClass('lined'); }, this), 1000 );
			TweenMax.to( this.$el.find('.content h2:eq(0)'), this.model.get('tweenAnimDuration'), { delay: .1, opacity: 1, scale: 1, perspective: 200, y: 0, z: .1, rotationX: 0, ease: Expo.easeInOut } );
			TweenMax.to( this.$el.find('.content ul:eq(0)'), this.model.get('tweenAnimDuration'), { delay: .2, opacity: 1, scale: 1, perspective: 200, y: 0, z: .1, rotationX: 0, ease: Expo.easeInOut } );
			_liDelay = .2;
			_.each( this.$el.find('.content ul.love li'), _.bind(function(li) {
				TweenMax.set( li, { rotationX: 0 } );
				TweenMax.to( li, this.model.get('tweenAnimDuration'), { delay: _liDelay += .1, opacity: 1, scale: 1, perspective: 200, y: 0, z: .1, rotationX: 0, ease: Expo.easeInOut } );
			}, this) );
			TweenMax.to( this.$el.find('.content h2:eq(1)'), this.model.get('tweenAnimDuration'), { delay: 1, opacity: 1, scale: 1, perspective: 200, y: 0, z: .1, rotationX: 0, ease: Expo.easeInOut } );
			TweenMax.to( this.$el.find('.content ul.skills'), this.model.get('tweenAnimDuration'), { delay: 1.4, opacity: 1, scale: 1, perspective: 200, y: 0, z: .1, rotationX: 0, ease: Expo.easeInOut } );
			TweenMax.to( this.$el.find('.content p:eq(0)'), this.model.get('tweenAnimDuration'), { delay: 1.6, opacity: 1, scale: 1, perspective: 200, y: 0, z: .1, rotationX: 0, ease: Expo.easeInOut } );

			//this.showSkill();
			
			$(window).on('resize', _.bind( function() { this.resizeSkill(); }, this ) );
			$(window).trigger('resize');
		},

		showSkill : function() {
			this.$el.find('.content ul.skills li').eq(this.skillsLiIndex).css({ 'width': 'auto' });

			var _width = this.$el.find('.content ul.skills li').eq(this.skillsLiIndex).width(),
				_marginLeft = -(_width/2)+'px';
			TweenMax.to( this.$el.find('.content ul.skills'), .3, { 'width': 0, 'marginLeft': 0, 'ease': Expo.easeInOut } );
			TweenMax.to( this.$el.find('.content ul.skills li').not(this.skillsLiIndex), .3, { 'width': 0, 'ease': Expo.easeInOut } );
			TweenMax.to( this.$el.find('.content ul.skills'), 1, { 'delay': .3, 'width': _width, 'marginLeft': _marginLeft, 'ease': Expo.easeInOut } );
			TweenMax.to( this.$el.find('.content ul.skills li').eq(this.skillsLiIndex), 1, { 'delay': .6, 'opacity': 1, 'top': 0, 'width': 'auto', 'ease': Expo.easeInOut, onComplete: _.bind( function() {
				this.$el.find('.content ul.skills li').not(':eq('+this.skillsLiIndex+')').css({ 'opacity': 0, 'top': '30%'});

				if( this.skillsLiIndex < this.skillsLiCount-1 ) this.skillsLiIndex++;
				else this.skillsLiIndex = 0;
			}, this) } );

			_.delay( _.bind(function() { this.showSkill(); }, this), 3500 );
		},

		resizeSkill : function() {
			this.$el.find('.content ul.skills li').eq(this.skillsLiIndex-1).css('width', 'auto');
			var _width = this.$el.find('.content ul.skills li').eq(this.skillsLiIndex-1).width(),
				_marginLeft = -(_width/2)+'px';
			this.$el.find('.content ul.skills').css({ 'width': _width, 'marginLeft': _marginLeft });
		}

	});

  	return AboutView;

});
