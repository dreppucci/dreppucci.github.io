define([
  'jquery',
  'underscore',
  'backbone',
  'iscroll',
  'dragdealer',
  'views/PageView',
  'views/LoaderView'

], function ($, _, Backbone, IScroll, Dragdealer, PageView, LoaderView) {
	
	var WorkDetailView = PageView.extend({
		tagName: 'div',
		className: 'wrapper',
		detailSlider: null,

		initialize : function (options) {
			this.parent = options.parent;
			this.render();
		},

		render : function (){
			var _this = this;

			_.defer( function() {
				_this.detailScroll = new IScroll( _this.$el[0] , {
					scrollbars: true,
					mouseWheel: true,
					interactiveScrollbars: true,
					fadeScrollbars: true,
					bounce: true,
					keyBindings: true,
					click: Modernizr.touch ? true : false,
					tap: true
				});

				_this.detailScroll.on('scroll', function() {
					_this.showRows();
				});
				_this.detailScroll.on('scrollEnd', function() {
					_this.showRows();
				});

				_.delay( function() {
					if( _this.detailSliderCount > 1 ) {
						_this.detailSlider = new Dragdealer( _this.$el.find('#detail-slide')[0], {
							steps: _this.model.gallery.length,
							speed: .3,
							loose: true,
							vertical: false,
							callback: function(x, y) {
								_this.showActiveSlide(_this.detailSlider);
								_this.detailScroll.refresh();
							}
						});
						_this.detailSlider.setStep(0, 0, true);
					} else {
						_this.$el.find('#detail-slide').find('.handle').addClass('single')
						_this.$el.find('#detail-slide').find('.media').addClass('active');
					}

				}, 1);

				$(window).on('resize', _.bind( function() { _this.resizeDetail(); }, _this ) );
				$(window).trigger('resize');
			});
			return this;
		},

		closeDetail : function() {
			this.detailScroll.destroy();
			this.$el.find('.scroller').removeAttr('style');
			this.detailScroll = null;

			$('header').removeClass('goaway');
			this.parent.$el.find('h1, .btn-close').removeClass('goaway');
			$(window).off('resize', _.bind( function() { this.resizeDetail(); }, this ) );
			this.unbind();
		},

		resizeDetail : function() {
			this.detailSliderCount = this.model.gallery.length;
			this.detailSliderWidth = this.$el.find('#detail-slide .media img').width();

			this.$el.find('#detail-slide').find('.handle').css({ 'width': this.detailSliderWidth*this.detailSliderCount });
			this.$el.find('#detail-slide').find('.media').css({ 'width': this.detailSliderWidth });
		},

		showRows : function() {
			var _this = this,
				_delay = .1;

			if( this.detailScroll.y < -20) {
				$('header').addClass('goaway').removeClass('open').find('#bt-menu').addClass('bt-menu-close').removeClass('bt-menu-open');
				this.parent.$el.find('h1, .btn-close').addClass('goaway');
				$('.page-view').removeClass('open');
			} else {
				$('header').removeClass('goaway');
				this.parent.$el.find('h1, .btn-close').removeClass('goaway');
			}

			this.$el.find('.row').each(function (i) {
				var st = -_this.detailScroll.y;
				var currRow = _this.$el.find('.row').eq(i);
				var top = currRow.offset().top;
				var padding = _this.$el.find('.scroller').css('padding-top').replace('px', '');

				if (top - st < GetClientWindowSize('height')+padding && !currRow.hasClass('show')) {
					TweenMax.to( currRow[0], 1, { delay: _delay+=.2, css: { className: 'row show' } } );
				}
			});
		},

		showActiveSlide : function(slider) {
			console.log(slider.getStep());
			var _index = slider.getStep()[0] -1;
			$(slider.wrapper).find('.media').removeClass('active').eq(_index).addClass('active');
		}

	});

  	return WorkDetailView;

});