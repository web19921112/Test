'use strict';
var debug = {
	p:document.createElement('p'),
	test:function(callback,l){
		var now = performance.now();
		for (var i = 0;i < l;i++) {
			callback();
		}
		return (performance.now() - now);
	},
	getPosition:function(dom){
		return document.querySelector(dom).getBoundingClientRect();
	}
};
debug.p.style.cssText = 'font-size:2.4rem;position:absolute;z-index:10086;top:0;left:0;word-break:break-all;pointer-events: none;';
debug.p.innerHTML = '我是测试文字。';
document.body.appendChild(debug.p);

window.addEventListener('error', function(e) {
	debug.p.innerHTML = '文件名字：'+e.filename+'<br>第' + e.lineno + '行：' + e.message;
});