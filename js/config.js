'use strict';
var main = {
		config: {
			baseUrl: './',
			waitSeconds: 100,
			paths: {
				'loading': 'js/loading'
			}
		},
		isLogin: false,
		wxShare: false,
		dialogShow:false,
		isClick: false,
		loginUrl: '',
		isTest: false,
		debug: true,
		notMove:function(){
			document.addEventListener('touchmove',function(e){
				e.preventDefault();
			});
		}
	},
	query = {
		id: function(dom) {
			return document.getElementById(dom);
		},
		class: function(dom) {
			return document.getElementsByClassName(dom);
		},
		tag: function(dom) {
			return document.getElementsByTagName(dom);
		},
		one: function(dom) {
			return document.querySelector(dom);
		},
		all: function(dom) {
			return document.querySelectorAll(dom);
		},
		url: function(item) {
			var svalue = location.search.match(new RegExp("[\?\&]" + item + "=([^\&]*)(\&?)", "i"));
			return svalue ? svalue[1] : svalue;
		}
	},
	req = {
		ajax: function(obj) {
			var method = obj.method || 'get',
				url = obj.url,
				data = obj.data,
				dataType = obj.dataType || 'json',
				callback = obj.callback || function() {},
				async = obj.async === false ? false : true,
				cross = obj.cross || false,
				debug = obj.debug || false,
				str = '',
				xhr = new XMLHttpRequest();
			if (data == null) {
				str = null;
			} else {
				for (var i in data) {
					str += (i + '=' + data[i] + '&');
				}
				str = str.substr(0, str.length - 1);
			}
			xhr.open(method, url, async);
			if (dataType == 'blob' || dataType == 'arraybuffer') {
				xhr.responseType = dataType;
			}
			if (obj.timeout) {
				xhr.timeout = obj.timeout;
				xhr.ontimeout = function(event) {　　　　
					alert('请求超时！');　　
				}
			}
			if (method == 'post') {
				xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
			}
			xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
			if (cross) {
				xhr.withCredentials = true;
			}
			xhr.onload = function() {
				xhr.onload = null;
				if (xhr.status !== 200 && debug) {
					alert('错误:' + this.statusText);
					return;
				}
				switch (dataType) {
					case 'json':
						callback(JSON.parse(this.responseText));
						break;
					case 'text':
						callback(this.responseText);
						break;
					case 'blob':
						callback(this.response);
						break;
					case 'arraybuffer':
						callback(this.response);
						break;
					default:
						break;
				}
			}
			xhr.send(str);
		},
		jsonp: function(url, callback) {
			var js = document.createElement('script'),
				callbackName = 'akong' + (Math.random() * 1000000000 >> 0).toString(16) + '_' + new Date().getTime(),
				rjsonp = /(=)\?(?=&|$)|\?\?/;
			window[callbackName] = callback;
			if (/\?/.test(url)) {
				js.src = url + '&callback=' + callbackName;
			} else {
				js.src = url + '?callback=' + callbackName;
			}
			document.body.appendChild(js);
			js.onload = function() {
				window[callbackName] = null;
			}
		},
		formData: function(obj) {
			var form = obj.dom,
				url = obj.url,
				data = obj.data,
				dataType = obj.dataType || 'json',
				callback = obj.callback || function() {},
				send = obj.send,
				down = obj.down,
				cross = obj.cross || false,
				debug = obj.debug || false,
				fd = new FormData(form),
				xhr = new XMLHttpRequest();
			if (data != null) {
				for (var i in data) {
					fd.append(i, data[i]);
				}
			}
			xhr.open('post', url, true);
			if (xhr.timeout = obj.timeout) {
				xhr.ontimeout = function(event) {　　　　
					alert('请求超时！');　　
				}
			}
			if (dataType == 'blob' || dataType == 'arraybuffer') {
				xhr.responseType = dataType;
			}
			xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
			if (cross) {
				xhr.withCredentials = true;
			}
			if (send) {
				xhr.upload.onprogress = send;
			}
			if (down) {
				xhr.onprogress = down;
			}
			xhr.onload = function() {
				xhr.onload = null;
				if (xhr.status !== 200 && debug) {
					alert('错误:' + this.statusText);
					return;
				}
				switch (dataType) {
					case 'json':
						callback(JSON.parse(this.responseText));
						break;
					case 'text':
						callback(this.responseText);
						break;
					case 'blob':
						callback(this.response);
						break;
					case 'arraybuffer':
						callback(this.response);
						break;
					default:
						break;
				}
			}
			xhr.send(fd);
		}
	};
(function() {
	main.ua = navigator.userAgent.toLowerCase();
	main.isAndroid = main.ua.match(/android/i) == "android";
	main.isIOS = main.ua.match(/iphone os/i) == "iphone os";
	main.isIpad = main.ua.match(/ipad/i) == "ipad";
	main.isWM = main.ua.match(/windows ce/i) == "windows ce" || main.ua.match(/windows mobile/i) == "windows mobile";
	var isMidp = main.ua.match(/midp/i) == "midp";
	var isUc7 = main.ua.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
	var isUc = main.ua.match(/ucweb/i) == "ucweb";
	main.isMobile = main.isAndroid || main.isIOS || main.isIpad || main.isWM || isMidp || isUc7 || isUc;
	main.isWeiXin = main.ua.match(/MicroMessenger/i) == "micromessenger";
	main.isWebKit = main.ua.match(/webkit/i) == "webkit";
	main.isChrome = main.ua.match(/Chrome/i) == "chrome";
})();
if (navigator.userAgent.indexOf('UCBrowser') > -1) {
	var control = navigator.control || {};
	if (control.gesture) {
		control.gesture(false);
	}
}
Element.prototype.on = Element.prototype.addEventListener;
Element.prototype.off = Element.prototype.removeEventListener;
if(!main.isWebKit){
	location.href = 'hehe.html';
}

if(main.isWeiXin && main.wxShare && !main.isTest){
	document.write('<script src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js" type="text/javascript" charset="utf-8"><\/script><script src="js/WeixinApi.js" type="text/javascript" charset="utf-8"><\/script>');
}