define(function(require) {
	require('jquery');
	var Dialog = require('dialog');

	var config = {
		el: '',
		content: '我是新内容~'
	}

	var dialog = new Dialog(config);

	$('#btn').click(function(){
		dialog.show().then(function(){
			$('.dialog').hide();
			$('.tip').html('点击了弹窗"确定"按钮');
		},function(){
			$('.dialog').hide();
			$('.tip').html('点击了弹窗"取消"按钮');
		});
	});
})