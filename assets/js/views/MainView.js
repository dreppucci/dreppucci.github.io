define([
  'jquery',
  'underscore',
  'backbone'

], function ($, _, Backbone, LoaderView) {
	
	var MainView = Backbone.View.extend({
		el: $('.app-view'),

		events : {
			'click a[data-behavior="internal"]': 'pageNavigation'
		},

		render : function (){
			return this;
		},

		pageNavigation : function(event) {
			if( !$(event.currentTarget).hasClass('active') ) {
				var href = $(event.currentTarget).attr('href'),
					url = href.replace(/^\//,'').replace('\#\!\/','');
					
				if (!event.altKey && !event.ctrlKey && !event.metaKey && !event.shiftKey) event.preventDefault();

				$('#bt-menu').removeClass('bt-menu-open');
				$('header, .page-view').removeClass('open');

				window.ga('send', 'event', 'Button', 'Pressed', $(event.currentTarget).attr('title') );

				Backbone.history.navigate(url, { trigger: true });
			}
		}

	});

  	return MainView;

});