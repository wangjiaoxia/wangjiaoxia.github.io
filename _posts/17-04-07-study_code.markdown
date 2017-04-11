---
layout: post 
title: 一个面试题的学习
---

### 简述

这道题是实现一个函数，是可以满足下面结果的：

> add(1)(2) // 3

> add(1, 2, 3)(10) // 16

> add(1)(2)(3)(4)(5) // 15

### 答案

有兴趣的同学可以试着解答一下，这里直接看文章作者的答案吧，不过这个实现方法不是很完美，在chrome 56 55 下结果正常。在更新到最新的 chrome57 ，控制台下结果都会带上 function 字段，在 firefox 下直接不生效。不过光是解决思路和方法就值得我学习了，其他的先不管~

```javascript
function add () {
    //console.log('进入add');
    var args = Array.prototype.slice.call(arguments);

    var fn = function () {
        var arg_fn = Array.prototype.slice.call(arguments);
        //console.log('调用fn');
        return add.apply(null, args.concat(arg_fn));
    }

    fn.valueOf = function () {
        //console.log('调用valueOf');
        return args.reduce(function(a, b) {
            return a + b;
        })
    }

    return fn;
}
```

拿到代码后在控制台测试了很多次都是可以满足的，代码的执行流程是将每一个括号里的参数依次传入add函数和fn函数，最后把所有传过来的值在fn.valueOf中使用reduce方法连接起来并求和。

### 知识积累

一、文章中提到了“高阶函数”，Javascript的高阶函数就是将函数作为参数或返回值的函数。高阶函数在Javascript中是很常见的，其实我们都已经在使用高阶函数了。

```javascript
function moqi (q1) {
    this.add = function (q2){
        this.ad = function (q3){
            return q1 + '' + q2 + q3 + '!';
        }
        return ad;
    }
    return add;
}
console.log(moqi('你')('好')('呀'));
```

1.函数作为参数

众所周知，函数是Javascript中的一等公民，不仅能被赋值，也能和普通变量一样，作为函数的参数。

示例代码：

```javascript
var text = function (){
    console.log('测试文本');
}

document.getElementById("btn").addEventListener("click", text);
```

注意，传递的是 text 而不是 text() 。当你通过不带括号的名字传递一个函数时，传递的是函数对象本身；而传递的名字待括号时，则传递的是函数执行后的结果。

2.函数作为结果返回

除了可以将函数作为参数之外，Javascript还允许一个函数将另一个函数作为结果返回。因为函数是一个对象，它可以返回任何其他值。但是将函数作为结果返回的意义在于将一个函数定义为另一个函数的返回值，可以允许你创建一个函数，这个函数作为新函数的模板。

示例代码：

```javascript
var text = function (){
    console.log('测试文本');
}

document.getElementById("btn").addEventListener("click", text);
```

查看这段代码是可以解决当前问题的，可是如果需求变化太快且复杂的话这段代码估计要被重复写很多遍了。所以升级下就是这样子的：

```javascript
var text = function (original, replacement, source) {
    return function (source) {
        return source.replace(original, replacement);
    };
};

var text1 = text('Chinese', 'Korean'),
    text2 = text('I', 'Are');

console.log(text1('I am learning Chinese'));
console.log(text2('I am a boy'));
```

二、Array.prototype.slice.call(arguments);

Array.prototype.slice.call(arguments)能将具有length属性的对象转成数组，除了IE下的节点集合（因为ie下的dom对象是以com对象的形式实现的，js对象与com对象不能进行转换）

示例代码：

```javascript
var a = {length:2, 0:'first', 1:'second'};
Array.prototype.slice.call(a);//  ["first", "second"]

var a = {length:2};
Array.prototype.slice.call(a);//  [undefined, undefined]
```

这里涉及到slice()方法和call()方法，所以先简单说说这两个方法。

1.slice()方法

数组和字符串都有这个slice方法，这个方法的作用是截取一段数据。它接收两个参数，第一个参数是要截取的位置索引，第二参数可选，表示要截取到的结束位置，但是不包括结束位置。在数组中，该方法的返回值是包含截取元素的组成的数组，在字符串中，该方法的返回值是包含截取字符串组成的字符串。

该方法也可以传入负数值，当参数为负数的时候，将参数和数组或字符串的长度相加得到的正数作为实际的参数。

示例代码：
```javascript
//Array.slice
[1,2,3,4,5,6].slice(2,4);
[1,2,3,4,5,6].slice(-4,-2);

返回值均为[3,4]，为数组。

//String.slice
'everything'.slice(2,4);
'everything'.slice(-4,-2);

返回值分别为'er'和'hi'，为字符串。
```

所以，Array.prototype.slice.call(arguments,0)的意思就可以这样理解：对于arguments类数组，调用Array.prototype.slice原型方法，并用call()方法，将作用域限定在arguments中，这里Array.prototype就可以理解为arguments，参数0为slice()方法的第一个参数，即开始位置索引。通过这种方法就将arguments类数组转换成了真数组。

三、concat()

concat() 方法用于连接两个或多个数组。该方法不会改变现有的数组，而仅仅会返回被连接数组的一个副本。

示例代码：

```javascript
var arr1 = new Array(3),
    arr2 = new Array(4),
    arr = new Array();

arr1[0] = 'cat';
arr1[1] = 'dog';
arr1[2] = 'bear';

arr2[0] = 'when';
arr2[1] = 'what';
arr2[2] = 'why';
arr2[3] = 'how';

console.log(arr.concat(arr1, arr2));
```

四、reduce()

reduce() 方法接收一个函数作为累加器，数组中的每个值（从左到右）开始缩减，最终为一个值，是ES5中新增的又一个数组逐项处理方法，reduce方法有两个参数，第一个参数是一个callback，用于针对数组项的操作；第二个参数则是传入的初始值，这个初始值用于单个数组项的操作。需要注意的是，reduce方法返回值并不是数组，而是形如初始值的经过叠加处理后的操作。

示例代码：

```javascript
var items = [10, 120, 1000];

// our reducer function
var reducer = function add(sumSoFar, item) { return sumSoFar + item; };

// do the job
var total = items.reduce(reducer, 0);

console.log(total); // 1130
```

***


