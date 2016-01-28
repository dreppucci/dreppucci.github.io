var cache = window.applicationCache;

// CACHE
if( cache ) {
	if( navigator.onLine ) {
		$('html').removeClass('offline');
	    if (!window.addEventListener) {
	        cache.attachEvent("cached", function (e) {
	        	logEvent(e);
	        }, false);
	        cache.attachEvent("checking", function (e) {
	            logEvent(e);
	        }, false);
	        cache.attachEvent("downloading", function (e) {
	            logEvent(e);
	        }, false);
	        cache.attachEvent("error", function (e) {
	            logEvent(e);
	        }, false);
	        cache.attachEvent("noupdate", function () {
	            logEvent(e);
	        }, false);
	        cache.attachEvent("progress", function () {
	            logEvent(e);
	        }, false);
	        cache.attachEvent("updateready", function () {
	            cache.swapCache();
	            logEvent(e);
	            window.location.reload(true);
	            log("Window reloaded");
	        }, false);
	    } else if(window.applicationCache) {
	    	window.applicationCache.oncached = function(e) {
	    		logEvent(e);
	        };
	        window.applicationCache.onchecking = function (e) {
	            logEvent(e);
	        };
	        window.applicationCache.onprogress = function (e) {
	            logEvent(e);
	        };
	        window.applicationCache.onerror = function (e) {
	            logEvent(e);
	        };
	        window.applicationCache.onnoupdate = function (e) {
	            logEvent(e);
	        };
	        window.applicationCache.ondownloading = function (e) {
	            logEvent(e);
	        };
	        window.applicationCache.onupdateready = function (e) {
	            window.applicationCache.swapCache();
	            logEvent(e);
	            window.location.reload(true);
	            log("Window reloaded");
	        };
	    } else {
	        cache.addEventListener("cached", function (e) {
	            logEvent(e);
	        }, false);
	        cache.addEventListener("checking", function (e) {
	            logEvent(e);
	        }, false);
	        cache.addEventListener("downloading", function (e) {
	            logEvent(e);
	        }, false);
	        cache.addEventListener("error", function (e) {
	            logEvent(e);
	        }, false);
	        cache.addEventListener("noupdate", function (e) {
	            logEvent(e);
	        }, false);
	        cache.addEventListener("progress", function (e) {
	            logEvent(e);
	        }, false);
	        cache.addEventListener("updateready", function (e) {
	            cache.swapCache();
	            logEvent(e);
	            window.location.reload(true);
	            log("Window reloaded");
	        }, false);
	    }
	} else {
		$('html').addClass('offline');
	}
	document.addEventListener('online', function() { $('html').removeClass('offline'); });
	document.addEventListener('offline', function() { $('html').addClass('offline'); });
	window.ononline = function(){ $('html').removeClass('offline'); }
	window.onoffline = function(){ $('html').addClass('offline'); }
}