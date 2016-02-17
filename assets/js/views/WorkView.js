define([
  'jquery',
  'underscore',
  'backbone',
  //'iscroll',
  'dragdealer',
  'views/PageView',
  'views/WorkSingleView',
  'collections/WorksCollection',
  'text!../../../works/index.html'

], function ($, _, Backbone/*, IScroll*/, Dragdealer, PageView, WorkSingleView, WorksCollection, WorkTemplate) {
	
	var WorkView = PageView.extend({
		id: 'works-list',
		className: 'works-view page-view',
		workUrlId: new Array(),
		currentSliderId: null,
		oldSliderId: null,
		slider: null,
		collection: null,

		initialize : function (options) {
			this.$el.append($(WorkTemplate).find('.page-view').html());
			this.navigate = options.section;
			this.model.set({ 'title': 'Works' });
		},

		before : function(callback) {
			
			this.worksList = new WorksCollection();
			this.worksList.fetch({
				success: function(c, r) {
					console.log('data loaded', r);

					window.ga('send', 'event', 'WorksList', 'Loaded' );
				},
				error: function(c, r) {
					console.log('error', r);
				}
			})
				.then(_.bind(function( collection, response ) {
					callback(collection, response);

					window.ga('send', 'event', 'WorksList', 'Error' );
			}, this) );
		},

		render : function (){
			this.before( _.bind( function(collection, response) {

				this.collection = collection;

				_.each( this.collection.data, _.bind(function( work, index ) {
					this.workUrlId.push(work.id);

					var _localView = new WorkSingleView({ el: this.$el.find('.handle.main article').eq(work.id-1), model: work, parent: this });
				}, this) );

				this.renderSlide();
			}, this ) );

			return this;
		},

		renderSlide : function() {
			this.resizeSlider();

			var _slideIndex = (this.$el.find('.handle.main article[data-id*='+this.navigate+']').index()+1).toString();
			_initialSlideId = _.indexOf(this.workUrlId, _slideIndex ) +1;

			this.slider = new Dragdealer( this.$el.attr('id'), {
				steps: this.collection.data.length,
				speed: .3,
				loose: true,
				vertical: false,
				callback: _.bind( function(x, y) {
					this.showSlideContent();
					if( !_initialSlideId ) this.detail = false;
				}, this )
			} );
			this.slider.setStep(_initialSlideId, 0, true);
			_initialSlideId = null;
			
			_.defer( _.bind( function() {
				this.resizeImageBackground();
				$(window).on('resize', _.bind(function() { this.resizeImageBackground(); this.resizeSlider() }, this) );
			}, this ) );
		},

		resizeSlider : function() {
			this.$el.find('.handle.main').css({ 'width': this.collection.data.length*this.model.get('width') });
			this.$el.find('article').css( 'width', this.model.get('width') );
		},

		showSlideContent : function() {

			if( this.currentSliderId !== null ) this.oldSliderId = this.currentSliderId;
			this.currentSliderId = !isNaN(this.slider.getStep()[0]) ? this.slider.getStep()[0] : 0;
			_getWorkUrlId = this.currentSliderId != 0 ? this.workUrlId[this.currentSliderId-1] : this.workUrlId[this.currentSliderId];
			if( this.oldSliderId !== null ) _articleClassDirection = this.oldSliderId == this.currentSliderId ? '' : this.oldSliderId < this.currentSliderId ? 'from-right' : 'from-left';
			else _articleClassDirection = '';

			if( this.oldSliderId !== this.currentSliderId ) {
				window.ga('send', 'event', 'WorksSlide', 'Selected', this.currentSliderId );

				if( this.currentSliderId !== 0 ) this.model.set({ 'title': this.collection.data[ this.currentSliderId-1 ].title + ' - Works' });
				else this.model.set({ 'title': this.collection.data[ this.currentSliderId ].title + ' - Works' });

				$(this.slider.wrapper).find('article').removeClass('selected from-left from-right').eq(this.currentSliderId-1).addClass(_articleClassDirection);
				_.delay( _.bind( function() { $(this.slider.wrapper).find('article').eq(this.currentSliderId-1).addClass('selected'); }, this ), 100 );

				if( !this.detail ) Backbone.history.navigate( $(this.slider.wrapper).find('article').eq(this.currentSliderId-1).data('id') , {trigger: false});
				else $(this.slider.wrapper).find('article').eq(this.currentSliderId-1).find('.btn a').trigger('click');
			}
		},

		showContent : function() {
			return this;
		}

	});

  	return WorkView;

});