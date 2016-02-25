var w = document.documentElement.clientWidth;
	var h = document.documentElement.clientHeight;
	$("body").css({"width":w,"overflow-x":"hidden"});

//临时
//function playMine(){
	var chooseOver = false;
	$(".choose").click(function(){
		if(!chooseOver){
			$(".chooseBoard").show();
			$(".zhichi,.board").hide();
			$(".btns img").show();
		}
		chooseOver = true;
	});
//最后得分
	var num1 = Math.floor(Math.random()*20);
	$(".chao").html(80+num1);
	$(".defen").html(2500+num1*40);
//------------------------------------------------------------2015年11月18日04:25:22
//上传图片
$("#fileImage").click(function(){
	$(".maoZi,.component").show();
})

//相册
var luJing;
var params = {
	fileInput: $("#fileImage").get(0),
	dragDrop: $("#fileDragArea").get(0),
	upButton: $("#fileSubmit").get(0),
	url: $("#uploadForm").attr("action"),
	filter: function(files) {
		console.log("what's wrong???");
		var arrFiles = [];
		for (var i = 0, file; file = files[i]; i++) {
			if (file.type.indexOf("image") == 0) {
				// if (file.size >= 512000) {
					// alert('您这张"'+ file.name +'"图片大小过大，应小于500k');
				// } else {
					arrFiles.push(file);
				// }
			} else {
				alert('文件"' + file.name + '"不是图片。');
			}
		}
		return arrFiles;
	},
	onSelect: function(files) {
		console.log(000);
		var html = '', i = 0;
		$("#preview").html('<div class="upload_loading"></div>');
		var funAppendImage = function() {
			file = files[i];
			if (file) {
				console.log(111111111111111);
				var reader = new FileReader();
				reader.onload = function(e) {
					html = html + '<div id="uploadList_0" class="upload_append_list"><p><strong>' + file.name + '</strong>'+
						'<a href="javascript:" class="upload_delete" title="删除" onclick="del()" data-index="0">删除</a><br />' +
						'<img id="uploadImage_0" src="' + e.target.result + '" class="upload_image resize-image" draggable="true" style="width:'+w+'px;display:none"/></p>'+
						'<span id="uploadProgress_0" class="upload_progress"></span>' +
					'</div>';
					i++;
					funAppendImage();
					luJing = e.target.result;//上传的图片
					console.log(luJing);
					$(".resize-container img").show().attr({"src":luJing});//预览上传的图片
					$(".sss").html(luJing);//放到sss里供截图js:component.js使用
					$("#fileImage").hide();//禁止连续选择
				}
				reader.readAsDataURL(file);
			} else {
				console.log(222222222222222222);
				$("#preview").html(html);
				if (html) {
					//删除方法
					$(".upload_delete").click(function() {
						console.log("delete 666");
						del();
						ZXXFILE.funDeleteFile(files[parseInt($(this).attr("data-index"))]);
//						return false;
					});
					//提交按钮显示
					$("#fileSubmit").show();
				} else {
					//提交按钮隐藏
					$("#fileSubmit").hide();
				}
			}
		};
		funAppendImage();
	},
	onDelete: function(file) {
		$("#uploadList_" + file.index).fadeOut();
	},
	onDragOver: function() {
		$(this).addClass("upload_drag_hover");
	},
	onDragLeave: function() {
		$(this).removeClass("upload_drag_hover");
	},
	onProgress: function(file, loaded, total) {
		var eleProgress = $("#uploadProgress_" + file.index), percent = (loaded / total * 100).toFixed(2) + '%';
		eleProgress.show().html(percent);
	},
	onSuccess: function(file, response) {
		$("#uploadInf").append("<p>上传成功，图片地址是：" + response + "</p>");
	},
	onFailure: function(file) {
		$("#uploadInf").append("<p>图片" + file.name + "上传失败！</p>");
		$("#uploadImage_" + file.index).css("opacity", 0.2);
	},
	onComplete: function() {
		//提交按钮隐藏
		$("#fileSubmit").hide();
		//file控件value置空
		$("#fileImage").val("");
		$("#uploadInf").append("<p>当前图片全部上传完毕，可继续添加上传。</p>");
	}
};
ZXXFILE = $.extend(ZXXFILE, params);
ZXXFILE.init();

//删除所选照片
function del(){
	$("#fileImage").show();//重新选择
	$(".resize-image").attr("src","");//预览图片清空
	luJing = "";//清空上传图片
	$(".jie").attr("src","");//截取图片清空
	$("#uploadImage_0").attr("src","");
}
