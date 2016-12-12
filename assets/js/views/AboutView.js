define([
  'jquery',
  'underscore',
  'backbone',
  'views/PageView',
  'collections/SkillsCollection',
  'text!../../../about/index.html?v=1.1'

], function ($, _, Backbone, PageView, SkillsCollection, AboutTemplate) {
	
	var AboutView = PageView.extend({

		className: 'about-view page-view',
		collection: null,
		skillsLiIndex : -1,
		skillTemplate: _.template('<li class="last"><em class="left"><svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="192px" height="320px" viewBox="160 96 192 320" enable-background="new 160 96 192 320" xml:space="preserve"><polygon points="352,115.4 331.3,96 160,256 331.3,416 352,396.7 201.5,256 "/></svg></em><%= skill %><em class="right"><svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="192px" height="320px" viewBox="160 96 192 320" enable-background="new 160 96 192 320" xml:space="preserve"><polygon points="160,115.4 180.7,96 352,256 180.7,416 160,396.7 310.5,256 "/></svg></em></li>'),

		initialize : function () {
		    this.$el.prepend($(AboutTemplate).find('.page-view').html());

		    this.model.set({ 'title': 'About' });
		},

		before : function(callback) {
			this.skillsList = new SkillsCollection();
			this.skillsList.fetch({
				success: function(c, r) {
					window.ga('send', 'event', 'SkillsList', 'Loaded' );
				},
				error: function(c, r) {
					console.log('error', r);

					window.ga('send', 'event', 'SkillsList', 'Error' );
				}
			})
				.then(_.bind(function( collection, response ) {
					callback(collection, response);
			}, this) );
		},

		render : function() {
			this.before( _.bind( function(collection, response) {

				this.collection = collection;

				_.defer( _.bind( function() {
					this.resizeImageBackground();

					this.showSkill();

					$(window).on('resize', _.bind( this.resizeImageBackground, this) );
				}, this ) );
			}, this ) );

			return this;
		},

		showContent : function() {
			this.$el.find('.content ul li').css({ 'top': '30%' });

			TweenMax.to( this.$el.find('.content h1'), this.model.get('tweenAnimDuration'), { opacity: 1, scale: 1, perspective: 200, y: 0, z: .1, rotationX: 0, ease: Expo.easeInOut } );
			_.delay( _.bind( function() { this.$el.find('.content h1').addClass('lined'); }, this), 800 );
			TweenMax.to( this.$el.find('.content h2:eq(0)'), this.model.get('tweenAnimDuration'), { delay: .1, opacity: 1, scale: 1, perspective: 200, y: 0, z: .1, rotationX: 0, ease: Expo.easeInOut } );
			TweenMax.to( this.$el.find('.content ul.love'), this.model.get('tweenAnimDuration'), { delay: .2, opacity: 1, scale: 1, y: 0, z: .1, rotationX: 0, ease: Expo.easeInOut } );
			_liDelay = .2;
			_.each( this.$el.find('.content ul.love li'), _.bind(function(li) {
				TweenMax.set( li, { rotationX: 0, z: 1 } );
				TweenMax.to( li, this.model.get('tweenAnimDuration'), { delay: _liDelay += .1, opacity: 1, scale: 1, y: 0, z: 1, rotationX: 0, ease: Expo.easeInOut } );
			}, this) );
			TweenMax.to( this.$el.find('.content h2:eq(1)'), this.model.get('tweenAnimDuration'), { delay: 1, opacity: 1, scale: 1, perspective: 200, y: 0, z: .1, rotationX: 0, ease: Expo.easeInOut } );
			TweenMax.to( this.$el.find('.content ul.skills'), this.model.get('tweenAnimDuration'), { delay: 1.4, opacity: 1, scale: 1, perspective: 200, y: 0, z: .1, rotationX: 0, ease: Expo.easeInOut } );
			TweenMax.to( this.$el.find('.content p:eq(0)'), this.model.get('tweenAnimDuration'), { delay: 1.6, opacity: 1, scale: 1, perspective: 200, y: 0, z: .1, rotationX: 0, ease: Expo.easeInOut } );
		},

		showSkill : function() {

			if( this.skillsLiIndex < this.collection.data.length-1 ) this.skillsLiIndex++;
			else this.skillsLiIndex = 0;

			this.$el.find('.content ul.skills').append( this.skillTemplate( this.collection.data[this.skillsLiIndex] ) );

			TweenMax.to( this.$el.find('.content ul.skills li.last'), 1, { 'top': 0, 'opacity': 1, 'ease': Expo.easeInOut, onComplete: _.bind( function(el) {
				this.$el.find('.content ul.skills li.last').removeClass('last');

				_.delay( _.bind(function() { this.showSkill(); }, this), 3500 );

			}, this) } );
			TweenMax.to( this.$el.find('.content ul.skills li:not(.last)'), 1, { 'opacity': 0, 'top': '-100%', 'ease': Expo.easeInOut, onComplete: function() {
				$(this.target).remove();
			} } );
		}

	});

  	return AboutView;

});
