---
layout: post
title: 表单拖拽排序
---

### 简述

最近再做”呼叫中心“的后台页面，没有需求，没有ui，没有产品。。。只能参照旧版的后台进行重新做一版。
有一个功能点是表单拖拽排序，下面就是实现这个功能记录：

一、准备工作

由于功能的实现是基于jqueryUI.js的，所以必定先要加载它；

html代码：

```javascript
<head>
    <script src="../../js/jquery-3.1.1.min.js"></script>
    <script src="../../js/jquery-ui.min.js"></script>
</head>

<body>
<table id="sort">
    <thead>
    <tr>
        <th class="index">序号</th>
        <th>年份</th>
        <th>标题</th>
        <th>作者</th>
    </tr>
    </thead>
    <tbody>
        <tr data="01">
            <td class="index">1</td>
            <td>2014</td>
            <td>这是第1个</td>
            <td>AAA</td>
        </tr>
        <tr data="02">
            <td class="index">2</td>
            <td>2015</td>
            <td>这是第2个</td>
            <td>BBB</td>
        </tr>
        <tr data="03">
            <td class="index">3</td>
            <td>2016</td>
            <td>这是第3个</td>
            <td>CCC</td>
        </tr>
    </tbody>
</table>
</body>
```

二、js代码

```javascript
$(function () {
   'use strict';

    var fixHelperModified = function(e, tr) {
        var $originals = tr.children(),                  //获取tr下的每个子元素
            $helper = tr.clone();                        //克隆当前tr

        $helper.children().each(function(index) {        //遍历克隆元素的子元素，并且克隆每个元素的宽度
            $(this).width($originals.eq(index).width());
        });
        return $helper;  //返回克隆之后的tr
    },

    updateIndex = function(e, ui) {     //重新排序
        $('td.index', ui.item.parent()).each(function (i) {
            $(this).html(i + 1);
        });
    };

    $("#sort tbody").sortable({     //调用方法的主体tbody
        helper: fixHelperModified,  //jquery ui中指向用于被拖动的helper元素的jQuery对象
        stop: updateIndex
    }).disableSelection();

    //保存排序
    function saveIndex () {
        var index = $('#sort tbody'),
            indexLen = index.find('tr').length;

        $('#priority').click(function () {
            var newArr = [];

            for (var i = 0; i < indexLen; i++) {
                newArr.push(index.find('tr').eq(i).attr("data"));   //data是添加在tr上的属性
            }
            alert(newArr);   //输出调整后的结果
        });
    }
    saveIndex();
});
```

这就写完了，看看注释吧很简单的，输出结果就是当前调整后data的排序了，而且兼容ie7+也是可以的~


