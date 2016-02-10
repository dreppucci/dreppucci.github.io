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

			_.defer( _.bind( function() {
				this.detailScroll = new IScroll( this.$el[0] , {
					scrollbars: true,
					mouseWheel: true,
					interactiveScrollbars: true,
					fadeScrollbars: true,
					bounce: true,
					keyBindings: true,
					click: Modernizr.touch ? true : false,
					tap: true
				});

				this.detailScroll.on('scrollStart', _.bind( function() {
					this.handleWorkInfoPosition();
					this.showRows();
				}, this ) );

				this.detailScroll.on('scrollEnd', _.bind( function() {
					this.handleWorkInfoPosition();
					this.showRows();
				}, this ) );

				_.delay( _.bind( function() {
					if( this.detailSliderCount > 1 ) {
						this.detailSlider = new Dragdealer( this.$el.find('#detail-slide')[0], {
							steps: this.model.gallery.length,
							speed: .3,
							loose: true,
							vertical: false,
							callback: _.bind( function(x, y) {
								this.showActiveSlide(this.detailSlider);
								this.detailScroll.refresh();
							}, this )
						});
						this.detailSlider.setStep(0, 0, true);
					} else {
						this.$el.find('#detail-slide').find('.handle').addClass('single')
						this.$el.find('#detail-slide').find('.media').addClass('active');
					}

				}, this ), 1);

				$(window).on('resize', _.bind( function() { this.resizeDetail(); }, this ) );
				$(window).trigger('resize');
			}, this ) );
			return this;
		},

		closeDetail : function() {
			if( this.detailScroll !== null ) {
				this.detailScroll.destroy();
				this.$el.find('.scroller').removeAttr('style');
				this.detailScroll = null;
			}

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

		handleWorkInfoPosition : function() {
			if( this.detailScroll.y < -10) {
				$('header').addClass('goaway').removeClass('open').find('#bt-menu').addClass('bt-menu-close').removeClass('bt-menu-open');
				this.parent.$el.find('h1, .btn-close').addClass('goaway');
				$('.page-view').removeClass('open');
			} else {
				$('header').removeClass('goaway');
				this.parent.$el.find('h1, .btn-close').removeClass('goaway');
			}
		},

		showRows : function() {
			var _delay = .1;

			this.$el.find('.row').not('.show').each( _.bind( function (i) {
				var st = -this.detailScroll.y;
				var currRow = this.$el.find('.row').eq(i);
				var top = currRow.offset().top;
				var padding = this.$el.find('.scroller').css('padding-top').replace('px', '');

				if (top - st < GetClientWindowSize('height')+padding && !currRow.hasClass('show')) {
					TweenMax.to( currRow[0], 1, { delay: _delay+=.2, css: { className: 'row show' } } );
				}
			}, this ) );
		},

		showActiveSlide : function(slider) {
			var _index = slider.getStep()[0] -1;
			$(slider.wrapper).find('.media').removeClass('active').eq(_index).addClass('active');
		}

	});

  	return WorkDetailView;

});