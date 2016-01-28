// Filename: router.js
// http://coenraets.org/blog/2012/01/backbone-js-lessons-learned-and-improved-sample-app/
// http://stackoverflow.com/questions/7822542/backbone-routers-wait-for-data-to-be-fetched-first
// http://thecreativeclass.tv/#hare
// http://wild.as/bali
// http://www.jam3.com/contact/
define([
  'jquery',
  'underscore',
  'backbone',
  'external',
  'views/MainView',
  'views/PageView',
  'views/HeaderView',
  'views/HomeView',
  'views/AboutView',
  'views/WorksListView',
  'views/ContactView',
  'views/LoaderView',
  'models/MainModel'

], function($, _, Backbone, External, MainView, PageView, HeaderView, HomeView, AboutView, WorksListView, ContactView, LoaderView, MainModel){
  
  var Router = Backbone.Router.extend({

      routes: {
          '': 'getHome',
          'about': 'getAbout',
          'works': 'getWorksList',
          'works/:id': 'getWorksList',
          'works/:id/detail': 'getWorkDetail',
          'contact': 'getContact',
          '*notFound': 'notFound'
      },

      initialize: function(){
        this.mainModel = new MainModel();
        this.mainModel.set({'window': window, 'body': $('body'), 'width': GetClientWindowSize('width'), 'height': GetClientWindowSize('height') });

        this.mainView = new MainView({ model: this.mainModel });
        this.pageView = new PageView();
        this.headerView = new HeaderView({ model: this.mainModel });

        this.mainModel.get('body').append(this.mainView.render().$el);
        this.mainModel.on('change', _.bind(this.updateTitle, this) );

        TweenMax.lagSmoothing(0);
        TweenMax.force3D = true;

        $(window).on('resize', _.bind(this.updateWinSize, this) );

        _.extend(this.events, Router.prototype.events);
      },

      getHome : function() {
        this.controller( new HomeView({ model: this.mainModel }) );
      },

      getAbout : function() {
        this.controller( new AboutView({ model: this.mainModel }) );
      },

      getWorksList : function(id) {
        this.controller( new WorksListView({ model: this.mainModel, section: id }) );
      },

      getWorkDetail : function(id) {
        this.controller( new WorksListView({ model: this.mainModel, section: id }), true );
      },

      getContact : function() {
        this.controller( new ContactView({ model: this.mainModel }) );
      },

      notFound : function() {
        this.navigate('');
      },

      controller : function( view, detail ) {
        _this = this;
        LoaderView.trigger('preloadStarted');
        if( this.mainModel.get('current') !== null ) this.mainModel.previous('current').$el.removeClass('enter');
        if( this.mainModel.get('current') === null ) {
          $('.page-view').remove();
          $('body').removeClass('no-js');
        }

        if( this.mainModel.get('current') !== null ) this.mainModel.set({ 'prev': this.mainModel.previous('current') });
        
        _.delay( function() {
          //if( _this.mainModel.get('current') === null ) _this.mainView.$el.parent().prepend(_this.headerView.render().$el);
          if( _this.mainModel.get('current') !== null ) _this.mainModel.previous('current').unrender();
          
          _this.mainModel.set({'current': view });

          if( detail !== 'undefined' ) view.detail = detail;
          _this.mainView.$el.append(view.render().$el);

          _.delay( function() { view.$el.addClass('enter'); }, 1000);

          $('header ul li a').removeClass('active');
          $('header ul li a[href*="'+Backbone.history.fragment.split('/')[0]+'"]').addClass('active');

          return view;
        }, 600, 'view changed');
      },

      updateTitle : function() {
        document.title = this.mainModel.get('title') + this.mainModel.get('defaultTitle');
      },

      updateWinSize : function() {
        this.mainModel.set({ 'width': GetClientWindowSize('width'), 'height': GetClientWindowSize('height') });
      }

  });

  return Router;

});
