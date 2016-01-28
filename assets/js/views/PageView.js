define([
  'jquery',
  'underscore',
  'backbone',
  'views/LoaderView'

], function ($, _, Backbone, LoaderView) {
	
	var PageView = Backbone.View.extend({
		className: 'page-view',
		tagName: 'section',
		detail: false,

		render : function (){
			var _this = this;

			LoaderView.trigger('preloadCompleted');

			var _customClass = _this.model.get('title').toLowerCase() +'-view '+ this.className;
			this.$el.attr('class', _customClass );

			_.defer( function() {
				_this.hideContent();
				_this.resizeImageBackground();
				$(window).on('resize', _.bind(_this.resizeImageBackground, _this) );
			} );

			return this;
		},

		unrender : function() {
			$(window).off('resize', _.bind( this.resizeImageBackground, this) );
			this.remove();
			this.unbind();
		},

		beforeResize : function( callback ) {
			this.$el.find('img[data-type=background]').each(function() {
				$(this).one('load', function() {
	                callback( this );
	            });
	            if (this.complete) $(this).trigger('load');
			});
		},

		resizeImageBackground : function() {
			var _this = this;
			this.beforeResize( function(img) {
				this._maxImgSize = GetClientWindowSize('width') > GetClientWindowSize('height') ? GetClientWindowSize('width') : GetClientWindowSize('height');
	            this._maxPixel = _maxImgSize;
	            this._imgW = $(img)[0].naturalWidth;
	            this._imgH = $(img)[0].naturalHeight;
	            this._imgProp = _imgW / _imgH;

	            if (_imgW > _imgH) {
	                $(img).css({
	                    'height': this._maxPixel,
	                    'width': this._maxPixel * this._imgProp,
	                    'margin-left': -((this._maxPixel * this._imgProp) / 2),
	                    'margin-top': -(this._maxPixel / 2)
	                });
	            } else {
	                $(img).css({
	                    'width': this._maxPixel,
	                    'height': this._maxPixel / this._imgProp,
	                    'margin-top': -((this._maxPixel / this._imgProp) / 2),
	                    'margin-left': -(this._maxPixel / 2)
	                });
	            }
	            _this.animImg(img, _this.showContent);
			});
		},

		animImg : function( img, callback ) {
			var _this = this;
			if( $(img).css('opacity') == 0 ) {
            	TweenMax.set( $(img), { scale: 1.1, z: .1 } );
	            TweenMax.to( $(img), 2, { opacity: .6, ease: Expo.easeInOut, onComplete: function() { callback.apply(_this); } } );
	            TweenMax.to( $(img), 10, { scale: 1, z: .1, ease: Expo.Quad } );
	        }
		},

		hideContent : function() {
			this.$el.find('.content').children().not('img[data-type=background]').css('opacity', 0).children().not('strong, em, a').css('opacity', 0);
			TweenMax.set( this.$el.find('.content').children().not('img[data-type=background]'), { y: -30, z: .1, rotationX: -10 } );
			TweenMax.set( this.$el.find('.content').children().not('img[data-type=background]').children().not('strong, em, a, li.no-anim'), { y: -20, z: .1, rotationX: -10 } );
		}

	});

  	return PageView;

});
