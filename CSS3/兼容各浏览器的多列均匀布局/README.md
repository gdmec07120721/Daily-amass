## 全兼容多列均匀布局

多列布局，CSS3的Flex(Flexible Box的缩写，意为弹性盒子布局)绝对堪称完美。但是硬伤在于兼容各种浏览器。

当然未来成为页面布局的首选方案非Flex布局不可。

### 解决方案

场景：使父盒子里的所有宽度为50像素的子元素盒子，两端对齐自适应均匀布局

目前，为了满足浏览器的兼容，选择使用伪元素 + text-align:justify

	text-align 该属性通过指定行框与哪个点对齐，从而设置块级元素内文本的水平对齐方式，实现两端对齐文本效果。
	 
	text-align: justify 实现两端对齐文本效果。

由此可以把需要均匀布局的块级元素设置为行内块级元素（display: inline-block）,父元素设置text-align（文本对齐方式）为justify。
	
	.justify{text-align: justify;}
	.justify span{width: 50px; line-height: 50px; display: inline-block; *display: inline; *zoom:1; color: #fff; text-align: center; background: #000;}

然而即使设置了父元素的文本对齐方式，子元素并没有均匀布局

![Image](https://github.com/gdmec07120721/Daily-amass/CSS3/%E5%85%BC%E5%AE%B9%E5%90%84%E6%B5%8F%E8%A7%88%E5%99%A8%E7%9A%84%E5%A4%9A%E5%88%97%E5%9D%87%E5%8C%80%E5%B8%83%E5%B1%80/images/img1.png)

于是使用伪元素，设置其宽度为100%，相当于让子元素填充满父级盒子

	.justify:after{content: ''; width: 100%; display: inline-table; *display: inline; *zoom:1; }

[DEMO](https://github.com/gdmec07120721/Daily-amass/CSS3/%E5%85%BC%E5%AE%B9%E5%90%84%E6%B5%8F%E8%A7%88%E5%99%A8%E7%9A%84%E5%A4%9A%E5%88%97%E5%9D%87%E5%8C%80%E5%B8%83%E5%B1%80/index.html)