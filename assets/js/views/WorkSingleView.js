define([
  'jquery',
  'underscore',
  'backbone',
  'views/PageView',
  'views/LoaderView',
  'views/WorkDetailView'

], function ($, _, Backbone, PageView, LoaderView, WorkDetailView) {
	
	var WorkSingleView = PageView.extend({
		tagName: 'article',
		className: '',

		events : {
			'click .btn a': 'viewWorkDetail',
			'click .btn-close a': 'closeWorkDetail'
		},

		initialize : function (options) {
			this.parent = options.parent;
			this.render();
		},

		render : function (){
			return this;
		}/*,

		viewWorkDetail : function() {
			this.workdDetailView = new WorkDetailView({ el: this.$el.find('.detail .wrapper'), model: this.model, parent: this });
			this.$el.removeClass('from-left from-right');

			$('html, body').addClass('scrollable');
			TweenMax.to( this.$el, 2, { css: { className: 'opened selected' } } );
			_.delay( _.bind(function() { this.workdDetailView.showRows(); }, this), 1000 );

			this.parent.slider.disable();
		}*/,

		viewWorkDetail : function(event) {
			window.ga('send', 'event', 'WorkButton', 'Pressed', $(event.currentTarget).attr('title') );
		},

		closeWorkDetail : function(event) {
			this.$el.removeClass('opened').find('.row').removeClass('show');
			TweenMax.to( 'html, body', .1, { delay: 1, css: { className: '' }, onComplete: _.bind( function() {
				this.workdDetailView.closeDetail();
				$('html, body').removeClass('scrollable');
				this.parent.slider.enable();
				Backbone.history.navigate('/works/'+this.model.id, {trigger: false});
			}, this ) } );
		},

		showContent : function() {
			return this;
		}

	});

  	return WorkSingleView;

});
