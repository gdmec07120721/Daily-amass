## 懒加载图片 [DEMO](https://gdmec07120721.github.io/Daily-amass/JavaScript/%E7%B1%BB%E6%96%B0%E7%89%88%E7%9F%A5%E4%B9%8E%E5%9B%BE%E7%89%87%E5%8A%A0%E8%BD%BD/index.html)

一直以来，网站对图片加载，一直都需要不断优化来提升用户体验。

懒加载思路：

有两张图片，一张是宽度为60px的小图，一张是原图。页面打开，默认只加载小图，节约流量让首屏更快展示。当浏览到图片相应的位置，先把小图用canvas加高斯模糊处理，再加载大图。

### 具体思路、技术方案：

-1.页面打开，先加载所有图片的小图
	
	//加载所有图片
	var loadImage = function(dataSrc){
		var img = new Image();
		img.src = dataSrc;
		img.onload = function(e){
			resolve(img);
		}	
	}
	//获取源元素的图片的小图的src
	contrastEl.forEach(function(item, index, array){
		itemImgSrc = that.originEl[index].getAttribute('data-src');
		sImg = itemImgSrc.replace('_b', '_60w');
		loadImage(sImg);
	});

-2.当浏览到图片相应位置运用scroll事件判断图片是否出现在可视区，并对其的大图进行加载，加载过程中，先用用canvas渲染小图并加模糊效果，来提升用户体验  

对于先把小图加高斯模糊，有三种方案：

-**使用CSS3blur滤镜**

-**使用SVG滤镜**

-**使用Canvas的高斯模糊 -- StackBlur.js**

这里使用**使用CSS3blur滤镜 **，如果需要兼容可选择**[StackBlur.js](http://www.quasimondo.com/StackBlurForCanvas/StackBlurDemo.html)**


	var canvas = document.createElement('canvas');
	var ctx=canvas.getContext('2d');
	canvas.width = originNode.offsetWidth;
	canvas.height = originNode.offsetHeight;
	canvas.style.filter = 'blur(10px)';
	loadImage(loadImg.sImgArr[index]).then(function(img){
		ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
		item.parentNode.replaceChild(canvas, item.nextSibling.nextSibling);
	})

-3.使用ES6的**promise**处理异步加载事件，加载完后img元素代替canvas画的图片

	var loadImage = function(dataSrc){
		return new Promise(function(resolve, rejuct){
			var img = new Image();
			img.src = dataSrc;
			img.onload = function(e){
				resolve(img);
			}
		})
		
	}
	
	loadImage(loadImg.imgArray[index]).then(function(img){
		item.parentNode.replaceChild(img, item.nextSibling.nextSibling);
	});
