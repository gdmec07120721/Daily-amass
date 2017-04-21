## Promise场景应用实例一

众所周知，Promise的诞生是源于**回调地狱**这场灾难。**回调地狱**例：基本回调函数等待一个异步请求回调后再发送一个异步请求回调再发送...如此层层圈套，不仅大大地降低代码的可读性还让开发人员很难维护。

使用Promise对象不仅提高代码可读性和维护，还可以模块化功能，从而让数据请求与数据处理区分开来。

这里是[Promise](http://www.jianshu.com/p/063f7e490e9a)的详细基础知识介绍。

### Promise

1.它是用来传递异步操作的消息并提供处理的一个对象

2.它有三种状态 => pending（等待） resolve（fulfilled 已结束） reject（已拒绝、失败）

3.状态不受外界影响只受异步函数回调结果影响，而且状态是不可逆的

4.它的使用:
	
	var fn = function(x){
		return new Promise(function(resolve, reject){
			if(x){
				resolve();
			}else{
				reject();
			}
		});
	}

	fn().then(function(){
		console.log('参数为空');
	},function(){
		console.log('参数不为空');
	});
		
5.Promise构造函数接受一个函数作为参数，这个函数有两个参数分别是resolve、reject

6.它的then方法接受两个参数，分别是resolve方法已完成状态执行函数和reject方法已失败状态执行函数

### 实例一

场景：**自定义弹窗处理**[DEMO](https://gdmec07120721.github.io/Daily-amass/JavaScript/promise%E5%9C%BA%E6%99%AF%E5%BA%94%E7%94%A8%E5%AE%9E%E4%BE%8B%E4%B8%80/index.html)

描述：使用RequireJs模块加载器，让弹窗的模块化。使用Promise操作触发不同按钮处理。


