# XMLHttpRequest对象的使用
> 本文是摘抄自《Javascript高级程序设计》，对其中自己不熟悉，但是以后可能用到的地方进行了记录，方便以后查询。

## 创建XMLHttpRequest对象
IE从IE5引入了对XHR `(下文都称XMLHttpRequest对象为XHR对象)` 的支持，IE中可能会遇到三个不同的版本`MSXML2.XMLHttp, MSXML2.XMLHttp.3.0, MSXML2.XMLHttp.6.0`。IE7+，Firefox，Opera，Chrome和Safari都支持原生的XHR对象。

```javascript
function createXHR() {
	//IE7+，Firefox，Opera，Chrome和Safari
	if (typeof XMLHttpRequest != "undefined") {
		return new XMLHttpRequest();
	} else if (typeof arguments.callee.activeXString != "string") {
    //老版本IE兼容
    	var versions = ["MSXML2.XMLHttp.6.0", "MSXML2.XMLHttp.3.0", "MSXML2.XMLHttp"];
		var i, len;

		for (i = 0, len = versions.length; i < len; i++ ) {
			try {
				new ActiveXObject(versions[i]);
				arguments.callee.activeXString = versions[i];
				break;
			} catch (ex) {
				//错误处理
			}
		}
    } else {
    	//没有原生XMLHttpRequest对象，抛出异常
    	throw new Error ("No XHR object available.");
    }
}
```

在使用XHR对象时需注意，只能向同一个域中使用`相同端口号和协议`的URL发送请求。如果URL与启动请求的页面有任何差别，都会引发错误。

## 使用XMLHttpRequest对象
使用上面定义的方法创建对象`var xhr = createXHR()`，使用自带的`open`和`send`方法使用对象。
```javascript
var xhr = createXHR();

xhr.open('get', 'example.txt', false);
xhr.send(null);
```
send方法接受一个参数，是要发送的请求主体。如果没有发送信息，则必须为null。
open方法最后一个参数用于选择是否是异步分送，是为true，不是为false。
收到响应后，响应数据自动填充XHR对象的属性：
- responseText: 作为响应主体被返回的文本。
- responseXML: 如果响应内容类型是“text/xml”或“application/xml”，则这个属性中将包含响应的XML DOM文档。（注意条件）
- status: 响应的HTTP状态。
- statusText: HTTP状态的说明。

接受响应后需要进一判接受响应的类型，这里需要用到的属性是`status`。200表示成功，304表示从缓存读取（具体参考HTTP权威指南）。
```javascript
//判断响应类型
if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
	alert(xhr.responseText);
} else {
//非成功响应类型处理
	alert("Request was unsuccessful: " + xhr.status);
}
```

这里需要注意有些浏览器会报告错误的204状态码。
异步发送请求时需要用到XHR对象的`readyState`属性来跟踪当前活动阶段，总共有5个阶段用于检测：
- 0: 未初始化。尚未调用open()方法。
- 1: 启动。已经调用open()方法，但尚未调用send()方法。
- 2: 发送。已经调用send()方法，但尚未接收到请求。
- 3: 接收。已经接收到部分响应请求。
- 4: 完成。已经接收到全部响应请求，而且已经可以在客户端使用了。

状态变化时触发`readystatechange事件`。
```javascript
xhr.onreadystatechange = function () {
	//等于4时完成请求
	if (xhr.readystate == 4) {
    	//判断是否成功响应
    	if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
            alert(xhr.responseText);
        } else {
        //非成功响应类型处理
            alert("Request was unsuccessful: " + xhr.status);
        }
    }
}
```

在接收到响应之前，还可以调用`xhr.abort()`来取消异步请求。不建议重用xhr对象。
## XMLHttpRequest对象头部
根据HTTP协议规定，请求头部中带有请求的一些信息。XHR通过`setRequestHeader`方法来设置请求头中的一些信息。通过`getResponseHeader`和`getAllResponseHeaders`来获取响应头的信息。
```javascript
//设置请求头信息
xhr.setRequestHeader("Content-Type", "application/json");
//获取响应头中的一个字段
var myHeader = xhr.getResponseHeader("Content-Type");
//获取响应头所有字段
var allHeaders = xhr.getAllResponseHeaders();
```

## 其他
### GET请求
GET请求的URL查询字符串必须使用`encodeURIComponent()`进行编码。
### POST请求
POST请求模拟发送表单数据时，需将内容序列化后，放在send方法当中。并设置Content-Type为application/x-www-form-urlencoded。
### 对比
GET请求消耗的资源比POST要少，发送相同的数据，GET速度最多可达到POST的两倍。