define(function(require) {
	require('jquery');
	function Dialog(config){
		this.content = config.content ? config.content : '我是内容！！！';
		this.el = config.el ? config.el : 'body';
		this.html = '<div class="dialog" style="display:none;">'+
						'<div class="dialog_content">'+
							'<div class="dialog_inner">' + this.content + '</div>'+
							'<div class="dialog_btn_wrap">'+
								'<a href="javascript:void(0);" class="dialog_btn" id="cancel">取消</a>'+
								'<a href="javascript:void(0);" class="dialog_btn" id="confirm">确认</a>'+
							'</div>'+
						'</div>'+
					'</div>';
		$(this.el).append(this.html);
	}

	Dialog.prototype.show = function(){

		$('.dialog').show();

		return new Promise(function(resolve, reject){

			$('#confirm').click(function(){
				resolve();
			});

			$('#cancel').click(function(){
				reject();
			});

		});
		
	}

	return Dialog;
})