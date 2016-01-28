define([
  'jquery',
  'underscore',
  'backbone',
  'views/PageView',
  'views/LoaderView',
  'views/WorkDetailView',
  'text!templates/work.php'

], function ($, _, Backbone, PageView, LoaderView, WorkDetailView, WorkTemplate) {
	
	var WorkView = PageView.extend({
		tagName: 'article',
		className: '',

		events : {
			'click .btn a': 'viewWorkDetail',
			'click .btn-close a': 'closeWorkDetail'
		},

		initialize : function (options) {
			this.parent = options.parent;
			this.workTemplate = _.template(WorkTemplate);
		},

		render : function (){
			this.$el.html( this.workTemplate( this.model ) );
			return this;
		},

		viewWorkDetail : function() {
			this.workdDetailView = new WorkDetailView({ model: this.model, parent: this });
			this.$el.find('.content .detail').append(this.workdDetailView.render().$el);
			this.$el.removeClass('from-left from-right');

			$('html, body').addClass('scrollable');
			TweenMax.to( this.$el, 2, { css: { className: 'opened selected' } } );
			_.delay( _.bind(function() { this.workdDetailView.showRows(); }, this), 1000 );

			this.parent.slider.disable();
			Backbone.history.navigate('/works/'+this.model.id+'/detail', {trigger: false});
		},

		closeWorkDetail : function(event) {
			var _this = this;

			this.$el.removeClass('opened').find('.row').removeClass('show');
			TweenMax.to( 'html, body', .1, { delay: 1, css: { className: '' }, onComplete: function() {
				_this.workdDetailView.closeDetail();
				$('html, body').removeClass('scrollable');
				_this.parent.slider.enable();
				Backbone.history.navigate('/works/'+_this.model.id, {trigger: false});
			} } );
		},

		showContent : function() {
			return this;
		}

	});

  	return WorkView;

});
