---
layout: post 
title: 初学nodejs  
--- 

## 简述

 这几天闲来无事，就自己看看nodejs。其实我就想知道两个问题，nodejs是什么东东？以及它可以做什么？

### 什么是nodejs - Node.js不是JS应用、而是JS运行平台

 乍一听我还以为这是一个Javascript应用，事实上Node.js采用C++语言编写而成，是一个Javascript的运行环境。提到Javascript，大家首先想到的是日常使用的浏览器，现代浏览器包含了各种组件，包括渲染引擎、Javascript引擎等，其中Javascript引擎负责解释执行网页中的Javascript代码。作为Web前端最重要的语言之一，Javascript一直是前端工程师的专利。不过，Node.js是一个后端的Javascript运行环境，这意味着你可以编写系统级或者服务器端的Javascript代码，交给Node.js来解释执行，简单的命令类似于：

```javascript
$ node helloworld.js
```

### nodejs可以做什么

 它可以做什么换句话说它要解决什么呢？Node公开宣称的目标是 “旨在提供一种简单的构建可伸缩网络程序的方法”。更改连接到服务器的方式。每个连接发射一个在 Node 引擎的进程中运行的事件，而不是为每个连接生成一个新的 OS 线程（并为其分配一些配套内存）。Node 声称它绝不会死锁，因为它根本不允许使用锁，它不会直接阻塞 I/O 调用。Node 还宣称，运行它的服务器能支持数万个并发连接。

 接下来安装试试👇

### 安装流程

作为前端开发者，node和npm安装必不可少。然而有时会因为安装新的app（如MacPorts，慎装，它会修改基本环境变量以及npm的全局设置等）导致版本环境混乱，所以看到有人推荐安装brew来对node和npm版本进行管理。那就试试喽！

1.安装brew

```javascript
$ ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

2.首先更新brew，使其在最新版本

```javascript
$ brew update
```

提示语为“Your system is ready to brew.”说明已经安装了brew

3.将brew的位置添加到$PATH环境变量中，并保存bash或者profile文件

```javascript
$ export PATH="/usr/local/bin:$PATH"
```

正常情况下没有任何提示，如果没有报错的话不必管它，可以继续安装node

4.通过brew安装node和npm

```javascript
$ brew install node
$ node -v
$ npm -v
```
 安装结束后查看版本即可。

## node.js创建一个应用

如果我们使用PHP来编写后端的代码时，需要Apache 或者 Nginx 的HTTP 服务器，并配上 mod_php5 模块和php-cgi。

从这个角度看，整个"接收HTTP请求并提供Web页面"的需求根本不需要PHP来处理。不过对Node.js来说，概念完全不一样了。使用Node.js时，我们不仅仅在实现一个应用，同时还实现了整个HTTP服务器。事实上，我们的Web应用以及对应的Web服务器基本上是一样的。

在我们创建Node.js第一个"Hello, World!" 应用前，让我们先了解下Node.js应用是由哪几部分组成的：

1.引入required模块：我们可以使用require指令来载入Node.js模块。
$ npm -v
2.创建服务器：服务器可以监听客户端的请求，类似于Apache 、Nginx等HTTP服务器。
3.接收请求与响应请求 服务器很容易创建，客户端可以使用浏览器或终端发送 HTTP 请求，服务器接收请求后返回响应数据。

实例如下，在你项目的根目录下创建一个叫 server.js 的文件，并写入以下代码：

```javascript
var http = require('http');  //第一行请求（require）Node.js 自带的 http 模块，并且把它赋值给 http 变量。

http.createServer(function (request, response) {

	// 发送 HTTP 头部 
	// HTTP 状态值: 200 : OK
	// 内容类型: text/plain
	response.writeHead(200, {'Content-Type': 'text/plain'});

	// 发送响应数据 "Hello Mimi, I Miss You!"
	response.end('Hello Mimi, I Miss You!');
}).listen(8888);

// 终端打印如下信息
console.log('Server running at http://127.0.0.1:8888/');
```

以上代码我们完成了一个可以工作的 HTTP 服务器。
退出js文件，在当前server.js所在目录下使用node命令执行以上的代码：

```javascript
node server.js
Server running at http://127.0.0.1:8888/
```
接下来，打开浏览器访问 http://127.0.0.1:8888/，你会看到一个写着 "Hello Mimi, I Miss You!"的网页。

![incon server](/img/170217/server.jpeg)

有时间就学习一点点，有备无患！

