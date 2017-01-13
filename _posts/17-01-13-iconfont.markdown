---
layout: post 
title: 制作IconFont  
---

## 简述

接触到IconFont大约是在16年的年初吧，当时感觉很新鲜殊不知这个东东早在14年就已经有人使用了。当然现在网上也有很多公开的iconfont素材[Font-Awesome](http://fontawesome.io/)以及[阿里巴巴矢量图标库](http://www.iconfont.cn/)。推荐下我经常使用的是它[icomoon](https://icomoon.io/app/#/select)。

那么什么是IconFont呢？简单地讲就是Icon和Font两者的结合，这个“文字”不在是传统中的文字，而是一个个”纯色“的图标。它有很多优点的例如可以代替图片，提高了访问效率；还有页面在放大的时候图标也不会模糊，因为它是矢量的；并且很好维护，同时在兼容方面表现的也很不错；不过所有事物的存在都是有双面性的，她的缺点就是不支持多种颜色。看下图（标题是红配绿，是不是很丑，爱看不看～）

![incon font](/img/170113/iconfont.png)

## 制作

制作IconFont是有前提准备和借助工具的。前提就是UI同学给我的纯色icon图片，借助的工具就是icomoon了。生成工具所支持的图片格式是svg，而且这个svg在制作的时候必须是“实体描边”才行(由此掉坑里了，”实体描边“是ui童鞋告诉我的)。图片的大小可以自定义，我当时做的时候是1024px * 1024px。接着是图片教程时间：

1. 打开工具主页面

![incon font](/img/170113/iconfont-1.png)

2.新建图集

![incon font](/img/170113/iconfont-2.png)

3.添加.svg图片存放的路径

![incon font](/img/170113/iconfont-3.png)

4.生成字体 （选择要生成的图标，并且点击下方“Generate Font F”按钮）

![incon font](/img/170113/iconfont-4.png)

5.点击下载font（可以自定义命名）

![incon font](/img/170113/iconfont-5.png)

6.解压下载到的压缩包文件

![incon font](/img/170113/iconfont-6.png)

7.将fonts文件夹全部内容和style.css文件放到相应的项目中

![incon font](/img/170113/iconfont-7.png)

8.根据css文件下面生成的class类的名称添加到html对应的节点上即可添加字体。当然添加字体还需要设置font-size，也可以根据实际情况设置color改变其颜色。

![incon font](/img/170113/iconfont-8.png)

## 总结

IconFont 的制作和使用就是这么简单。对于设计师而言，针对同一个icon图形不用再输出不同大小各种颜色的图片了，技术上直接调整代码数值就可以完成，某种程度上能提升一些工作效率。

***

 其实对于实际操作过程还是有不少点要注意的，不过不同项目可能要求也不一样，快快去实践一把...


