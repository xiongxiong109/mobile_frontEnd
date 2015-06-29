fixHeight();

var oLoad=document.querySelector('.p-loading');
var oIndex=document.querySelector('.p-index');
var oEndLoading=document.querySelector("#endLoading");
var oInList=document.getElementById('indexList');
var oLis=oInList.getElementsByTagName('li');

	// 索引遍历
	for(var i=0;i<oLis.length;i++){
		oLis[i].getElementsByTagName('a')[0].addEventListener('touchstart',function(){
			var src=this.dataset.link;

			loadPage(document.querySelector('.p-'+src),'fadeOutLeft');

		},false);
	}
var oBtns=document.querySelectorAll(".back-btn");
	for(var i=0;i<oBtns.length;i++){
		oBtns[i].addEventListener('touchstart',function(){
			loadPage(oIndex,'fadeOutRight');
		},false);
	}
//加载动画完成后，直接进入引导页
	animationEnd(oEndLoading,function(){
		loadPage(oIndex,'fadeOutLeft');
	});

//plus函数
var oPlus=document.getElementById('plus');
	animationEnd(oPlus,function(){
		removeClass(oPlus,'fadeInDown');
		addClass(oPlus,'breath');
	});
//html5
var oHtml=document.getElementById('html5');
	animationEnd(oHtml,function(){
		removeClass(oHtml,'fadeInDown');
		addClass(oHtml,'fly');
	});
//绑定动画监听事件
function animationEnd(obj,fn){
	if( obj.addEventListener ){
		obj.addEventListener('webkitAnimationEnd',fn,false);
		obj.addEventListener('animationEnd',fn,false);
	}
	else {
		obj.attachEvent('onwebkitAnimationEnd',function(){
			fn.call(obj);
		});
		obj.attachEvent('onanimationEnd',function(){
			fn.call(obj);
		});
	}
}

//addClass
function addClass(obj,cls,fn){
	
	var arr=obj.className.split(' ');
	for(var i=0;i<arr.length;i++){
		if(arr[i]==cls){
			return;
		}
	}
	arr.push(cls);
	obj.className=arr.join(' ');
	setTimeout(function(){
		fn && fn.call();
	},1e3);
}

//removeClass
function removeClass(obj,cls){
	
	var arr=obj.className.split(' ');
	for(var i=0;i<arr.length;i++){
		if(arr[i]==cls){
			arr.splice(i,1);
			break;
		}
	}
	obj.className=arr.join(' ');
	return;
}

function fixHeight(){
	var oCur=document.querySelector('.show');
	if( oCur.offsetHeight < document.documentElement.clientHeight ){
		oCur.style.height=document.documentElement.clientHeight+'px';
	}
	document.body.style.height=oCur.offsetHeight+'px';
}

/*
oPage:需要加载的页面
effect:当前页面的退出方式
*/
function loadPage(oPage,effect){
	var oCur=document.querySelector('.show');
	addClass(oPage,'show');
	addClass(oCur,'animated '+effect,function(){
		removeClass(oCur,'show');
		removeClass(oCur,'animated');
		removeClass(oCur,effect);
		fixHeight();
	});
}