define([
  'jquery',
  'underscore',
  'backbone'

], function ($, _, Backbone) {
	
	var MainView = Backbone.View.extend({
		el: $('.app-view'),

		events : {
			'click a[data-behavior="internal"]': 'pageNavigation',
			'click': 'closeHeader'
		},

		render : function (){
			return this;
		},

		pageNavigation : function(event) {
			event.preventDefault();
			event.stopPropagation();

			if( !$(event.currentTarget).hasClass('active') ) {
				var href = $(event.currentTarget).attr('href'),
					url = href.replace(/^\//,'').replace('\#\!\/','');
					
				if (!event.altKey && !event.ctrlKey && !event.metaKey && !event.shiftKey) event.preventDefault();

				$('#bt-menu').removeClass('bt-menu-open');
				$('header, .page-view').removeClass('open');

				window.ga('send', 'event', 'Button', 'Pressed', $(event.currentTarget).attr('title') );

				Backbone.history.navigate(url, { trigger: true });
			}
		},

		closeHeader : function() {
			$('#bt-menu').removeClass('bt-menu-open');
			$('header, .page-view').removeClass('open');
		}

	});

  	return MainView;

});