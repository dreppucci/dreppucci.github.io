define([
  'jquery',
  'underscore',
  'backbone',
  'views/PageView'

], function ($, _, Backbone, PageView, HeaderTemplate) {
	
	var HeaderView = Backbone.View.extend({

		el: $('header'),

		events : {
			'click ul li a': 'pageNavigation',
			'click .logo a': 'pageNavigation',
			'click .bt-menu-trigger': 'hamTrigger'
		},

		initialize : function () {
		    this.menu = $('#bt-menu');
		},

		hamTrigger : function(event) {
			if( this.menu.hasClass('bt-menu-open') ) {
				this.menu.addClass('bt-menu-close').removeClass('bt-menu-open');
				$('header, .page-view').removeClass('open');

				window.ga('send', 'event', 'Header', 'Closed' );
			}
			else {
				this.menu.addClass( 'bt-menu-open' ).removeClass( 'bt-menu-close' );
				$('header, .page-view').addClass('open');

				window.ga('send', 'event', 'Header', 'Opened' );
			}
		},

		render : function (){
			return this;
		},

		pageNavigation : function(event) {

			if( !$(event.currentTarget).hasClass('active') ) {
				var href = $(event.currentTarget).attr('href'),
					url = href.replace(/^\//,'').replace('\#\!\/','');

				if (!event.altKey && !event.ctrlKey && !event.metaKey && !event.shiftKey) event.preventDefault();

				$('html, body').removeClass('scrollable');
				this.menu.removeClass('bt-menu-open');
				$('header, .page-view').removeClass('open');

				Backbone.history.navigate(url, { trigger: true });
			}
		}

	});

  	return HeaderView;

});
