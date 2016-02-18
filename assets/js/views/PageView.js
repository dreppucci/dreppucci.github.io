define([
  'jquery',
  'underscore',
  'backbone'

], function ($, _, Backbone) {
	
	var PageView = Backbone.View.extend({
		className: 'page-view',
		tagName: 'section',
		detail: false,

		render : function (){

			_.defer( _.bind( function() {
				this.resizeImageBackground();
				$(window).on('resize', _.bind( this.resizeImageBackground, this) );
			}, this ) );

			return this;
		},

		unrender : function() {
			$('body').one(transitionEvent, this.$el, _.bind( function() {
				$(window).off('resize', _.bind( this.resizeImageBackground, this) );
				this.remove();
				this.unbind();
			}, this ) );
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
			this.beforeResize( _.bind( function(img) {
				this._maxImgSize = this.GetClientWindowSize('width') > this.GetClientWindowSize('height') ? this.GetClientWindowSize('width') : this.GetClientWindowSize('height');
	            this._maxPixel = this._maxImgSize;
	            this._imgW = $(img)[0].naturalWidth;
	            this._imgH = $(img)[0].naturalHeight;
	            this._imgProp = this._imgW / this._imgH;

	            if (this._imgW > this._imgH) {
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
	            this.animImg(img, this.showContent);
			}, this ) );
		},

		animImg : function( img, callback ) {
			if( $(img).css('opacity') == 0 ) {
            	TweenMax.set( $(img), { scale: 1.1, z: 0 } );
	            TweenMax.to( $(img), 2, { opacity: .6, ease: Expo.easeInOut, onComplete: $.proxy( function() { callback.apply(this); }, this ) } );
	            TweenMax.to( $(img), 10, { scale: 1, z: 0, ease: Expo.Quad } );
	        }
		},

		hideContent : function() {
			this.$el.find('.content').children().not('img[data-type=background]').css('opacity', 0).children().not('strong, em, a').css('opacity', 0);
			TweenMax.set( this.$el.find('.content').children().not('img[data-type=background]'), { z: .1, rotationX: -10 } );
			TweenMax.set( this.$el.find('.content').children().not('img[data-type=background]').children().not('strong, em, a, li.no-anim'), { z: .1, rotationX: -10 } );
		},

		checkBrowser : function(browser) {
			var is_chrome = navigator.userAgent.indexOf('Chrome') > -1,
				is_explorer = navigator.userAgent.indexOf('MSIE') > -1,
				is_firefox = navigator.userAgent.indexOf('Firefox') > -1,
				is_safari = navigator.userAgent.indexOf("Safari") > -1,
				is_opera = navigator.userAgent.toLowerCase().indexOf("op") > -1;
			if ((is_chrome)&&(is_safari)) {is_safari=false;}
			if ((is_chrome)&&(is_opera)) {is_chrome=false;}

			switch(browser) {
				case 'chrome':
					return is_chrome;
				case 'explorer':
					return is_explorer;
				case 'firefox':
					return is_firefox;
				case 'safari':
					return is_safari;
				case 'opera':
					return is_opera;
				default:
					return is_chrome;
			}
		},

		GetClientWindowSize : function(what) {
			if(!window.innerWidth){
				if(!(document.documentElement.clientWidth == 0)){ w = document.documentElement.clientWidth; h = document.documentElement.clientHeight; }
				else{ w = document.body.clientWidth; h = document.body.clientHeight; }
			} else { w = window.innerWidth; h = window.innerHeight; }
			if( what === 'width' ) { return w }
			if( what === 'height' ) { return h }
		},
		
		whichTransitionEvent : function(){
			var t,
				el = document.createElement("fakeelement");

			var transitions = {
				"transition"      : "transitionend",
				"OTransition"     : "oTransitionEnd",
				"MozTransition"   : "transitionend",
				"WebkitTransition": "webkitTransitionEnd"
			}

			for (t in transitions){
				if (el.style[t] !== undefined){
					return transitions[t];
				}
			}
		}

	});

  	return PageView;

});
