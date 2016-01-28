define([
  'jquery',
  'underscore',
  'backbone',
  'dragdealer',
  'views/PageView',
  'views/LoaderView',
  'views/WorkView',
  'collections/WorksCollection',
  'text!templates/works-list.php'

], function ($, _, Backbone, Dragdealer, PageView, LoaderView, WorkView, WorksCollection, WorksListTemplate) {
	
	var WorksListView = PageView.extend({
		id: 'works-list',
		className: 'page-view clearfix',
		workUrlId: new Array(),
		currentSliderId: null,
		oldSliderId: null,
		slider: null,
		collection: null,

		initialize : function (options) {
			this.navigate = options.section;
			this.worksListTemplate = _.template(WorksListTemplate);
			this.model.set({ 'title': 'Works' });
		},

		before : function(callback) {
			_this = this;
			this.$el.append( this.worksListTemplate );
			this.worksList = new WorksCollection();
			this.worksList.fetch()
				.then(_.bind(function( collection, response ) {
					callback(collection, response);
					LoaderView.trigger('preloadCompleted');
			}, this) );
		},

		render : function (detail){
			_this = this;

			this.before(function(collection, response) {
				_.each( collection.data, _.bind(function( work, index ) {
					_this.workUrlId.push(work.id);
					var _localView = new WorkView({ model: work, parent: _this });
					_this.$el.find('.handle.main').append( _localView.render().el );

				}, _this) );

				_this.renderSlide(collection);
			} );

			return this;
		},

		renderSlide : function(collection) {
			var _this = this;
			_this.collection = collection;
			this.resizeSlider();

			_initialSlideId = null;
			_initialSlideId = _.indexOf(this.workUrlId, this.navigate) +1;

			this.slider = new Dragdealer( this.$el.attr('id'), {
				steps: _this.collection.data.length,
				speed: .3,
				loose: true,
				vertical: false,
				callback: function(x, y) {
					if( _initialSlideId ) _.delay( function() { _this.showSlideContent( _this.slider, _this.collection ); }, 1200 );
					else { _this.detail = false; _this.showSlideContent( _this.slider, _this.collection ); }
				}
			});
			this.slider.setStep(_initialSlideId, 0, true);
			_initialSlideId = null;
			
			_.defer( function() {
				_this.resizeImageBackground();
				$(window).on('resize', _.bind(function() { _this.resizeImageBackground(); _this.resizeSlider() }, _this) );
			} );
		},

		resizeSlider : function() {
			this.$el.find('.handle.main').css({ 'width': this.collection.data.length*this.model.get('width') });
			this.$el.find('article').css( 'width', this.model.get('width') );
		},

		showSlideContent : function(slider, collection) {
			if( _this.currentSliderId !== null ) _this.oldSliderId = _this.currentSliderId;
			_this.currentSliderId = !isNaN(slider.getStep()[0]) ? slider.getStep()[0] : 0;
			_getWorkUrlId = _this.currentSliderId != 0 ? _this.workUrlId[_this.currentSliderId-1] : _this.workUrlId[_this.currentSliderId];

			if( _this.oldSliderId !== null ) _articleClassDirection = _this.oldSliderId == _this.currentSliderId ? '' : _this.oldSliderId < _this.currentSliderId ? 'from-right' : 'from-left';
			else _articleClassDirection = '';

			if( _this.oldSliderId !== _this.currentSliderId ) {
				if( _this.currentSliderId !== 0 ) this.model.set({ 'title': collection.data[ _this.currentSliderId-1 ].title + ' - Works' });
				else this.model.set({ 'title': collection.data[ _this.currentSliderId ].title + ' - Works' });

				$(slider.wrapper).find('article').removeClass('selected from-left from-right').eq(_this.currentSliderId-1).addClass(_articleClassDirection);
				_.delay( function() { $(slider.wrapper).find('article').eq(_this.currentSliderId-1).addClass('selected'); }, 100 );

				if( !this.detail ) Backbone.history.navigate('/works/'+_getWorkUrlId, {trigger: false});
				else $(slider.wrapper).find('article').eq(_this.currentSliderId-1).find('.btn a').trigger('click');
			}
		}

	});

  	return WorksListView;

});
