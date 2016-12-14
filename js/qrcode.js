$(document).ready(function($) {
    "use strict";

	function getQRCode(rendermethod, picwidth, picheight, url) {
		$("#qrcode").qrcode({ 
            render: rendermethod, // 渲染方式有table方式（IE兼容）和canvas方式
            width: picwidth, //宽度 
            height: picheight, //高度 
            text: utf16to8(url), //内容 
            typeNumber: -1,//计算模式
            correctLevel: 2,//二维码纠错级别
            background: "#ffffff",//背景颜色
            foreground: "#000000"  //二维码颜色

        });
    }

    getQRCode("table", 68, 68, "https://www.baidu.com/s?ie=utf-8&f=8&rsv_bp=1&rsv_idx=1&tn=baidu&wd=jq.qrcode%20%E5%B7%A5%E4%BD%9C%E5%8E%9F%E7%90%86&oq=jq.qrcode%20%E9%80%82%E7%94%A8%E8%8C%83%E5%9B%B4&rsv_pq=bd08a7e300008650&rsv_t=7f28Y8lxro66maIcJgmNPDPDQKVJUwvC2Hf9AYXPr0tTSGupkfsMcQ%2F%2Bc1M&rqlang=cn&rsv_enter=1&inputT=12964&rsv_sug3=63&rsv_sug1=8&rsv_sug7=100&bs=jq.qrcode%20%E9%80%82%E7%94%A8%E8%8C%83%E5%9B%B4");

    //中文编码格式转换
    function utf16to8(str) {
        var out, i, len, c;
        out = "";
        len = str.length;
        for (i = 0; i < len; i++) {
            c = str.charCodeAt(i);
            if ((c >= 0x0001) && (c <= 0x007F)) {
                out += str.charAt(i);
            } else if (c > 0x07FF) {
                out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));
                out += String.fromCharCode(0x80 | ((c >> 6) & 0x3F));
                out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
            } else {
                out += String.fromCharCode(0xC0 | ((c >> 6) & 0x1F));
                out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
            }
        }
        return out;
    } 
});
