/* jQuery Browser Plugin 0.0.6*/
!function(a,b){"use strict";var c,d;if(a.uaMatch=function(a){a=a.toLowerCase();var b=/(opr)[\/]([\w.]+)/.exec(a)||/(chrome)[ \/]([\w.]+)/.exec(a)||/(version)[ \/]([\w.]+).*(safari)[ \/]([\w.]+)/.exec(a)||/(webkit)[ \/]([\w.]+)/.exec(a)||/(opera)(?:.*version|)[ \/]([\w.]+)/.exec(a)||/(msie) ([\w.]+)/.exec(a)||a.indexOf("trident")>=0&&/(rv)(?::| )([\w.]+)/.exec(a)||a.indexOf("compatible")<0&&/(mozilla)(?:.*? rv:([\w.]+)|)/.exec(a)||[],c=/(ipad)/.exec(a)||/(iphone)/.exec(a)||/(android)/.exec(a)||/(windows phone)/.exec(a)||/(win)/.exec(a)||/(mac)/.exec(a)||/(linux)/.exec(a)||/(cros)/i.exec(a)||[];return{browser:b[3]||b[1]||"",version:b[2]||"0",platform:c[0]||""}},c=a.uaMatch(b.navigator.userAgent),d={},c.browser&&(d[c.browser]=!0,d.version=c.version,d.versionNumber=parseInt(c.version)),c.platform&&(d[c.platform]=!0),(d.android||d.ipad||d.iphone||d["windows phone"])&&(d.mobile=!0),(d.cros||d.mac||d.linux||d.win)&&(d.desktop=!0),(d.chrome||d.opr||d.safari)&&(d.webkit=!0),d.rv){var e="msie";c.browser=e,d[e]=!0}if(d.opr){var f="opera";c.browser=f,d[f]=!0}if(d.safari&&d.android){var g="android";c.browser=g,d[g]=!0}d.name=c.browser,d.platform=c.platform,a.browser=d}(jQuery,window);

/* URL var */
$.extend({getUrlVars:function(){var vars=[],hash;var splitCode=(window.location.href.indexOf('&amp;')>0)?'&amp;':'&';var hashes=window.location.href.slice(window.location.href.indexOf('?')+1).split(splitCode);for(var i=0;i<hashes.length;i++){hash=hashes[i].split('=');vars.push(hash[0]);vars[hash[0]]=hash[1]};return vars},getUrlVar:function(name){return $.getUrlVars()[name]}});

/* GetClientWindowSize */
function GetClientWindowSize(what) {
    if(!window.innerWidth){
        if(!(document.documentElement.clientWidth == 0)){ w = document.documentElement.clientWidth; h = document.documentElement.clientHeight; }
        else{ w = document.body.clientWidth; h = document.body.clientHeight; }
    } else { w = window.innerWidth; h = window.innerHeight; }
    if( what == 'width' ) { return w }
    if( what == 'height' ) { return h }
}

// CREATEUUID
function createUUID() {
    var s = [];
    var hexDigits = "0100450089abcdef";
    for (var i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4";
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);
    s[8] = s[13] = s[18] = s[23] = "-";
    
    var uuid = s.join("");
    return uuid;
}

// COOKIE
function setCookie(c_name,value,exmnts) {
    var exdate=new Date();
    exdate.setMinutes(exdate.getMinutes() + exmnts);
    var c_value=escape(value) + ((exmnts==null) ? "" : "; expires="+exdate.toUTCString())+"; path=/";
    document.cookie=c_name + "=" + c_value;
}
function getCookie(c_name) {
    var i,x,y,ARRcookies=document.cookie.split(";");
    for (i=0;i<ARRcookies.length;i++) {
        x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
        y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
        x=x.replace(/^\s+|\s+$/g,"");
        if (x==c_name) { return unescape(y); }
    }
}
function checkCookie(varToCheck) {
    var tempVar=getCookie(varToCheck);
    if (tempVar!=null && tempVar!="") { return true }
    else { return false; }
}

function getQueryValues(query_string) {
    if(query_string.indexOf('?') == -1) return {}
    
    query_string = decodeURIComponent(query_string.substr(query_string.indexOf('?') + 1));
    var values_array = query_string.replace(/&amp;/g, '&').split('&'),
         values = {};
    
    if(query_string == '')
        return {};
    
    for(var i = 0; i < values_array.length; i++) {
        var pair = values_array[i].split('=');
    
        if(pair.length == 2)
            values[pair[0]] = pair[1];
        else
            values[pair[0]] = undefined;
    }
    
    return values;
}
function setQueryValues(url, values) {
    if(url.indexOf('?') == -1)
        url += '?';
    else
        url = decodeURIComponent(url.substr(0, url.indexOf('?') + 1));
    
    for(key in values) {
        url += key + (values[key] == undefined ? '' : '=' + values[key]) + '&';
    }
    
    url = url.substr(0, url.length - 1);
    
    return url;
}

function addEvent(element, eventName, callback) {
    if (element.addEventListener) {
        element.addEventListener(eventName, callback, false);
    }
    else {
        element.attachEvent('on' + eventName, callback);
    }
}

function formatFileSize(bytes) {
    if (typeof bytes !== 'number') {
        return '';
    }

    if (bytes >= 1000000000) {
        return (bytes / 1000000000).toFixed(2) + ' GB';
    }

    if (bytes >= 1000000) {
        return (bytes / 1000000).toFixed(2) + ' MB';
    }

    return (bytes / 1000).toFixed(2) + ' KB';
}