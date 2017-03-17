---
layout: post
title: Reactjs - 续集
---

### 简述

继续整理react的相关属性和使用方法 ↓

#### 一、this.props.children

this.props 对象的属性与组件的属性一一对应，但是有一个例外，就是 this.props.children 属性。它表示组件的所有子节点。
示例代码如下：

```javascript
<script type="text/babel">
    var NoteList = React.createClass({
        render:function(){
            return (
                <ol>
                    {
                        React.Children.map(this.props.children, function(child){
                            return <li>{child}</li>;
                        })
                    }
                </ol>
            );
        }
    });

    ReactDOM.render(
        <NoteList>
            <span>hello</span>
            <span>word</span>
            <span>!</span>
        </NoteList>,
        document.body
    );
</script>
```
上面代码的 NoteList 组件有三个 span 子节点，它们都可以通过 this.props.children 读取，运行结果如下：

![img react](/img/170314/react-1.png)

注意：

this.props.children 的值有三种可能：如果当前组件没有子节点，它就是 undefined ;如果有一个子节点，数据类型是 object ；如果有多个子节点，数据类型就是 array 。所以，处理 this.props.children 的时候要小心。

React 提供一个工具方法 React.Children 来处理 this.props.children 。我们可以用 React.Children.map 来遍历子节点，而不用担心 this.props.children 的数据类型是 undefined 还是 object。

#### 二、PropTypes

组件类的PropTypes属性，就是用来验证组件实例的属性是否符合要求的。示例代码：

```javascript
    var Title = React.createClass({
        propTypes : {
            title: React.PropTypes.string.isRequired,
        },

        render : function (){
            return <h1>{this.props.title}</h1>;
        }
    });

    var data = 111;
    ReactDOM.render(
        <Title title={data} />,
        document.body
    );
```

代码组件中有一个title属性。PropTypes 告诉 React，这个 title 属性是必须的，而且它的值必须是字符串。现在，我们设置 title 属性的值是一个数值。这样一来，title属性就通不过验证了。控制台会显示一行错误信息。

输出结果：![img react](/img/170314/react-2.png)

#### 三、获取真实的DOM节点 - ref

组件并不是真实的 DOM 节点，而是存在于内存之中的一种数据结构，叫做虚拟 DOM （virtual DOM）。只有当它插入文档以后，才会变成真实的 DOM 。根据 React 的设计，所有的 DOM 变动，都先在虚拟 DOM 上发生，然后再将实际发生变动的部分，反映在真实 DOM上，这种算法叫做 DOM diff ，它可以极大提高网页的性能表现。
但是，有时需要从组件获取真实 DOM 的节点，这时就要用到 ref 属性：

```javascript
    var MyComponent = React.createClass({
        inputClick : function (){
            this.refs.myInput.focus();
        },
        render: function (){
            return (
                <div>
                <input type="text" ref="myInput" />
                <input type="button" value="focus this button" onClick={this.inputClick} />
                </div>
            );
        }
    });
    ReactDOM.render(
        <MyComponent />,
        document.getElementById('example')
    );
```

上面代码中，组件 MyComponent 的子节点有一个文本输入框，用于获取用户的输入。这时就必须获取真实的 DOM 节点，虚拟 DOM 是拿不到用户输入的。为了做到这一点，文本输入框必须有一个 ref 属性，然后 this.refs.[refName] 就会返回这个真实的 DOM 节点。
需要注意的是，由于 this.refs.[refName] 属性获取的是真实 DOM ，所以必须等到虚拟 DOM 插入文档以后，才能使用这个属性，否则会报错。上面代码中，通过为组件指定 Click 事件的回调函数，确保了只有等到真实 DOM 发生 Click 事件之后，才会读取 this.refs.[refName] 属性。
React 组件支持很多事件，除了 Click 事件以外，还有 KeyDown 、Copy、Scroll 等。

输出结果：![img react](/img/170314/react-3.png)

#### 四、表单

用户在表单填入的内容，属于用户跟组件的互动，所以不能用 this.props 读取

```javascript
    var Input =React.createClass({
        getInitialState : function (){
            return {value: 'hello!你好'};
        },
        handleChange : function (event){
            this.setState({value: event.target.value});
        },
        render: function(){
            var value = this.state.value;
            return (
                    <div>
                        <input type="text" value={value} onClick={this.handleChange} />
                        <p>{value}</p>
                    </div>
            );
        }
    });
    ReactDOM.render(
        <Input />,
        document.getElementById('example')
    )
```

文本输入框的值，不能用 this.props.value 读取，而要定义一个 onChange 事件的回调函数，通过 event.target.value 读取用户输入的值。textarea 元素、select元素、radio元素都属于这种情况

输出结果：![img react](/img/170314/react-4.png)

#### 五、组件的生命周期

组件的生命周期分成三个状态：

1. Mounting：已插入真实 DOM
2. Updating：正在被重新渲染
3. Unmounting：已移出真实 DOM

React 为每个状态都提供了两种处理函数，will 函数在进入状态之前调用，did 函数在进入状态之后调用，三种状态共计五种处理函数。

componentWillMount()
componentDidMount()
componentWillUpdate(object nextProps, object nextState)
componentDidUpdate(object prevProps, object prevState)
componentWillUnmount()

做个数学小例子:

```javascript
var LianXi = React.createClass({
    getInitialState:function(){
        return {result: 0};
    },
    handlerClick: function () {
        this.setState({result:this.refs.num1.value * this.refs.num2.value});
    },
    render: function () {
        return (
            <div>
                <input type='number' ref='num1'/>
                <input type='number' ref='num2'/>
                <button  onClick={this.handlerClick}>求乘数</button>
                <p >{this.state.result}</p>
            </div>
        )
    }
});
ReactDOM.render(<LianXi /> ,document.getElementById('example'));
```

输出结果：![img react](/img/170314/react-5.png)

*********

心得：整理新知识还真的不能隔时间太长了，要不然要先复习在整理，累~

问：新东家总想着让我们这帮码农加班，包括周六日真是没有天理了，虽然手里是有项目的，但也没必要两天都来，快帮忙想个拒绝他的办法，在线等哦~