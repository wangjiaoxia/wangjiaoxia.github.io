---
layout: post
title: Reactjs - 初学
---

### 简述

近两周我主要的工作就是一边熟悉新环境一边乘着有空闲时间学习react。

学习react的前提是必须拥有基本 JavaScript 和 DOM 知识，等初步掌握React时就会发现 它所要求的预备知识并不多。React 可以在浏览器运行，也可以在服务器运行，但是对于初学者的我下面的例子只涉及浏览器。

#### 一、安装

React 可以直接下载使用，下载包中也提供了很多学习的实例。如果没安装 git，可以在官网 http://facebook.github.io/react/ 下载最新版。准备就绪后开始简单的案例学习：

基本代码结构如下

```javascript
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>ReactDOM.render()</title>

    <link type="text/css" rel="stylesheet" href="css/normalize.css" />
    <link type="text/css" rel="stylesheet" href="css/index.css" />
    <!-- 必须先加载 -->
    <script src="js/build/react.js"></script>
    <script src="js/build/react-dom.js"></script>
    <script src="js/build/browser.min.js"></script>
    <style>
        .box {
             background: #333;
             font-size: 20px;
             color: #fff;
        }
    </style>
</head>
<body>
    <div id="example"></div>
    <div class="box"></div>

    <script type="text/babel">
        var el = React.createElement('p', null, ['内容1', '内容2', '内容3', '内容4']);

        //方式一
        ReactDOM.render(el, document.querySelector('.box'));

        //方式二
        ReactDOM.render(
            <div>
                <p>内容1</p>
                <p>内容2</p>
                <p>内容3</p>
                <p>内容4</p>
            </div>,
            document.getElementById('example')
        );
    </script>
</body>
</html>
```

注意：

1.react.js 、react-dom.js 和 Browser.js 三个库文件必须先加载

    react.js 是 React 的核心库
    react-dom.js 是提供与 DOM 相关的功能
    browser.js 的作用是将 JSX 语法转为 JavaScript 语法；具有相同作用的库babel.min.js，babel 可以将 ES6 代码转为 ES5 代码，这样我们就能在目前不支持 ES6 浏览器上执行 React 代码。babel 内嵌了对 JSX 的支持。

2.代码中最后一个的 script 标签的 type 属性为'text/babel'，是因为 React 独有的 JSX 语法，跟 JavaScript 不兼容。凡是使用 JSX 的地方，都要加上 type="text/babel" ；

3.ReactDOM.render 是 React 的最基本方法，用于将模板转为 HTML 语言，并插入指定的 DOM 节点。

输出结果为：![img react](/img/170303/react-1.png)

#### 二、JSX 语法

React 使用 JSX 来替代常规的 JavaScript。HTML 语言直接写在 JavaScript 语言之中，不加任何引号，这就是 JSX 的语法，它允许 HTML 与 JavaScript 的混写，代码如下：

```javascript
<body>
    <div id="example"></div>
    <div id="box"></div>

    <script type="text/babel">
        //方式一
        var names = ['Anlen1', 'Anlen2', 'Anlen3', 'Anlen4', 'Anlen5'];

        ReactDOM.render(
            <div className="text">
                {
                    names.map(function(name){
                        return <p>Hello {name}!</p>
                    })
                }
            </div>,
            document.getElementById('example')
        );

        //方式二
        var arr = [
                <h1>Title 1</h1>,
                <h2>Title 2</h2>,
                <h3>Title 3</h3>,
                <h4>Title 4</h4>
            ],
            mystyle = {
                fontSize: 24,
                color: '#000',
                textAlign: 'center',
                marginTop: 10
            };
        ReactDOM.render(
                <div style={mystyle}>
                    {/*注释...*/}
                    {arr.lenght > 2 ? '大于两个值' : '小于两个值'}
                </div>,
            document.getElementById('box')
        );
    </script>
    <script type="text/babel" src="js/demo/index.js"></script>
</body>
```

注意：

上面代码体现了 JSX 的基本语法规则：遇到 HTML 标签（以 < 开头），就用 HTML 规则解析；遇到代码块（以 { 开头），就用 JavaScript 规则解析。

1.JSX 允许直接在模板插入 JavaScript 变量。如果这个变量是一个数组，则会展开这个数组的所有成员；

2.代码第八行中由于 class 和 for 是 JavaScript 的保留字，所以添加 class 属性需要写成 className ，for 属性需要写成 htmlFor；

3.JSX 中不能使用 if else 语句，但可以使用三元运算表达式来替代；

4.React 推荐使用内联样式。我们可以使用 camelCase 语法来设置内联样式. React 会在指定元素数字后自动添加 px ；

5.注释需要写在花括号中，多行注释'//'；

输出结果为：![img react](/img/170303/react-2.png)

#### 三、组件

React 允许将代码封装成组件（component），然后像插入普通 HTML 标签一样，在网页中插入这个组件。

```javascript
var Hellomeasge = React.createClass({
    render:function(){
        return (
            <div>
                <h1>Hello {this.props.name}!</h1>
                <p>nini</p>
            </div>
        );
    }
});

ReactDOM.render(
    <Hellomeasge name="lili" />,
    document.getElementById('example')
)
```

注意：

1.变量 HelloMessage 就是一个组件类，模板插入 <HelloMessage /> 时，会自动生成 HelloMessage 的一个实例；

2.所有组件类都必须有自己的 render 方法，用于输出组件。

3.组件类的第一个字母必须大写，否则会报错，比如HelloMessage不能写成helloMessage。另外，组件类只能包含一个顶层标签，否则也会报错。

4.组件的用法与原生的 HTML 标签完全一致，可以任意加入属性，比如 <HelloMessage name="John"> ，就是 HelloMessage 组件加入一个 name 属性，值为 lili。

5.组件的属性可以在组件类的 this.props 对象上获取，比如 name 属性就可以通过 this.props.name 读取。

输出结果为：![img react](/img/170303/react-3.png)

#### 四、React State(状态)

组件免不了要与用户互动，React 的一大创新，就是将组件看成是一个状态机，一开始有一个初始状态，然后用户互动，导致状态变化，从而触发重新渲染 UI 。示例代码如下：

```javascript
var LikeBtn = React.createClass({
    /*初始状态*/
    getInitialState: function (){
        return ({liked: false});
    },

    /*设置改变状态*/
    handleClick: function (event){
        this.setState({liked: !this.state.liked});
    },

    render: function (){
        var text = this.state.liked? 'like' : 'havent\'t liked';
        return (
            <p onClick={this.handleClick}>
                You {text} this. Click to toggle;
            </p>
        );
    }
});

ReactDOM.render(
    <LikeBtn />,
    document.getElementById('example')
);
```

上面代码创建了一个 LikeBtn 组件，它的 getInitialState 方法用于定义初始状态，也就是一个对象，这个对象可以通过 this.state 属性读取。当用户点击组件，导致状态变化，this.setState 方法就修改状态值，每次修改以后，自动调用 this.render 方法，再次渲染组件。由于 this.props 和 this.state 都用于描述组件的特性，可能会产生混淆。一个简单的区分方法是，this.props 表示那些一旦定义，就不再改变的特性，而 this.state 是会随着用户互动而产生变化的特性。

输出结果为：![img react](/img/170303/react-4.png) ![img react](/img/170303/react-5.png)

*********

这周的学习就先总结到这里了，下周继续总结。文章里的图片不出现是因为图片在其他电脑上忘记上传了，明天要是加班的话就会上传～
