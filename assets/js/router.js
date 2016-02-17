define([
	'jquery',
	'underscore',
	'backbone',
	'pace',
	'tweenmax',
	'views/MainView',
	'views/PageView',
	'views/HeaderView',
	'views/HomeView',
	'views/AboutView',
	'views/WorkView',
	'views/ContactView',
	'views/ErrorView',
	'models/MainModel'

], function($, _, Backbone, pace, TweenMax, MainView, PageView, HeaderView, HomeView, AboutView, WorkView, ContactView, ErrorView, MainModel){
	
	var Router = Backbone.Router.extend({

		routes: {
			'': 'getHome',
			'home': 'getHome',
			'home/': 'getHome',
			'about': 'getAbout',
			'about/': 'getAbout',
			'works': 'getWorksList',
			'works/': 'getWorksList',
			'works/:id': 'getWorksList',
			'works/:id/': 'getWorksList',
			'contact': 'getContact',
			'contact/': 'getContact',
			'*notFound': 'notFound'
		},

		initialize: function(){

			pace.start({
				ajax: {
					ignoreURLs: [
						'www.google-analytics.com',
						'favicon',
						'collect'
					]
				}
			});

			this.initializeGA();

			this.mainModel = new MainModel();
			this.mainView = new MainView({ model: this.mainModel });
			this.pageView = new PageView();
			this.headerView = new HeaderView({ model: this.mainModel });

			this.mainModel.set({'window': window, 'body': $('body'), 'width': this.pageView.GetClientWindowSize('width'), 'height': this.pageView.GetClientWindowSize('height') });

			this.mainModel.get('body').append(this.mainView.render().$el);
			this.mainModel.on('change', _.bind(this.updateTitle, this) );
			this.mainModel.on('change', _.bind(this.updateBodyClass, this) );

			window.transitionEvent = this.pageView.whichTransitionEvent();

			TweenMax.lagSmoothing(0);
			TweenMax.force3D = true;

			$(window).on('resize', _.bind(this.updateWinSize, this) );

			_.extend(this.events, Router.prototype.events);
		},

		initializeGA : function() {
			(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
			(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
			m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
			})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

			window.ga('create', 'UA-73037711-1', 'auto');
			window.ga('send', 'pageview');
		},

		getHome : function() {
			this.controller( new HomeView({ model: this.mainModel }) );
		},

		getAbout : function() {
			this.controller( new AboutView({ model: this.mainModel }) );
		},

		getWorksList : function(id) {
			this.controller( new WorkView({ model: this.mainModel, section: id }) );
		},

		getContact : function() {
			this.controller( new ContactView({ model: this.mainModel }) );
		},

		notFound : function() {
			this.controller( new ErrorView({ model: this.mainModel }) );
		},

		controller : function( view ) {

			window.ga('send', 'event', 'Page', 'Requested', this.mainModel.get('title') );
			if( this.mainModel.get('current') === null ) {
				$('.page-view').remove();
				$('body').removeClass('no-js');
			}

			if( this.mainModel.get('current') !== null ) {
				this.mainModel.previous('current').$el.removeClass('enter');
				this.mainModel.set({ 'prev': this.mainModel.previous('current') });
				this.mainModel.previous('current').unrender();
			}

			this.mainModel.set({'current': view });
			this.mainView.$el.append(view.render().$el);
			window.ga('send', 'event', 'Page', 'Loaded', this.mainModel.get('title') );

			if( Modernizr.csstransitions ) {
				if( this.mainModel.get('prev') !== null ) {
					$('body').one(transitionEvent, this.mainModel.get('prev'), _.bind( function() {
						this.showPageView();
					}, this ) );
				} else this.showPageView();
			} else {
				_.delay( _.bind( function() {
					this.showPageView();
				}, this ), 600, 'view changed');
			}
		},

		showPageView : function() {
			_.delay( _.bind( function() {
				this.mainModel.get('current').$el.addClass('enter');
				window.ga('send', 'event', 'Page', 'Loaded', this.mainModel.get('title') );
			}, this ), 500);

			this.headerView.$el.find('ul li a').removeClass('active');
			this.headerView.$el.find('ul li a[href*="'+Backbone.history.fragment.split('/')[0]+'"]').addClass('active');
		},

		updateTitle : function() {
			document.title = this.mainModel.get('title') + this.mainModel.get('defaultTitle');
		},

		updateBodyClass : function() {
			if( this.mainModel.get('current') !== null ) {
				if( this.mainModel.get('current').$el.hasClass('works-view') ) $('body').addClass('works');
				else $('body').removeClass('works');
			}
		},

		updateWinSize : function() {
			this.mainModel.set({ 'width': this.pageView.GetClientWindowSize('width'), 'height': this.pageView.GetClientWindowSize('height') });
		}

	});

	return Router;

});