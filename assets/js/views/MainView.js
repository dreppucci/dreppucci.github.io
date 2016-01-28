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
				href = $(event.currentTarget).attr('href');
				if (!event.altKey && !event.ctrlKey && !event.metaKey && !event.shiftKey) event.preventDefault();
				url = href.replace(/^\//,'').replace('\#\!\/','');
				$('#bt-menu').removeClass('bt-menu-open');
				$('header, .page-view').removeClass('open');
				Backbone.history.navigate(url, {trigger: true });
			}
			return false;
		}

	});

  	return MainView;

});
