'use strict';
if(main.debug){
	document.write('<script src="js/debug.js" type="text/javascript" charset="utf-8"><\/script>');
}
var loadMask,dialog;
if(loadMask = query.class('loadMask')[0]){
	loadMask.on('touchmove',function(e){
		e.preventDefault();
	});
}
if(dialog = query.class('dialog')[0]){
	dialog.on('click',function(e){
		if(main.dialogShow){
			return;
		}
		if(e.target == this){
			dialog.classList.add('hide2');
			var c = dialog.children,l = c.length;
			for (var i = 0;i < l;i++) {
				c[i].classList.add('hide');
			}
		}
	});
}