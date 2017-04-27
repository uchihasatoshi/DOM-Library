/* 需求（别人如何使用这个库）：
*
*  首先，声明一个函数 $
*
*  1、给我一个选择器，返回对应的元素
*     let items = $('li')
*
*  2、对应的元素可以 .on() 可以不遍历 就给每个元素添加 click 事件
      items.on('click', function(){
*       console.log('click')
*     })
*
*  3、给所有的元素添加 class 和删除 class
*     items.addClass('hi').removeClass('error')
*
*  4、让所有的元素内容为 你好
*     items.text('你好')
*
*  5、获取到元素里的第 n 个
*     items.get(0)
*
*  6、获取item的兄弟 删除class， 回到父元素 添加class
*     item.siblings().removeClass('active').end()
*         .addClass('active')
*
*	  关于第6条需求的三段论：
*		1、原生的item 没有 .siblings 方法
*		2、需求要有 XXX.siblings 方法
*		3、生成一个新的 $item = xxx(item) （随便一个方法把items封装），使得$item.siblings()返回 item 的兄弟
*
*/





//dom.js
//$ 接收一个 字符串 或者 元素 或者 元素列表
//返回一个 新的数组
//这个 新的数组 有 on addClass removeClass ... API

window.$ = function(selectorNode){
	let array = [];			//声明一个空的数组（数组也是对象），数组的关键是可以push		
	
	if(typeof selectorNode === 'string'){
		let items = document.querySelectorAll(selectorNode);
		for(var i=0; i < items.length; i++){			//遍历这个数组
			array.push(items[i]);
		}
									//判断一个元素是不是节点用 instanceof
	}else if(selectorNode instanceof Element){			// instanceof Node 和 instanceof Element 的区别，Node可能还包括了其他的节点
		array.push(selectorNode);					
			
	}else if(selectorNode instanceof Array){			//如果是数组
		for(var i=0; i < selectorNode.length; i++){
			if(!(selectorNode[i] instanceof Element)){
				continue;
			}
			array.push(selectorNode[i]);
		}
	}


  // 实现 .on
  array.on = function(eventType, fn){    	//接受两个参数，事件类型，回调函数
	  for(var i=0; i < array.length; i++){
		  array[i].addEventListener(eventType, fn);  //遍历所有的元素，添加回调
	  }
  }
	
  //addClass
	array.addClass = function(className){
		for(var i=0; i < array.length; i++){
			array[i].classList.add(className);
		}
		return array;
	}
	
	//removeClass
	array.removeClass = function(className){
		for(var i=0; i < array.length; i++){
			array[i].classList.remove(className);
		}
		return array;
	}
	
	//array.text
	array.text = function(value){		
		if(value !== undefined){   //如果传了参数，设置值
			for(var i=0; i < array.length; i++){
				array[i].textContent = value;
			}
			return array;
		}else{					   //如果没有传参数，取值（但是JQ 只取第一个）
			let result = [];
			for(var i=0; i < array.length; i++){
				result.push(array[i].textContent);
			}
			return result;
		}
	}
	
	//array.get
  	array.get = function(index){	//传一个参数 索引
		return array[index];		//返回 array 的相应元素	
	}
	
	//array.end
	array.end = function(){
		return array.previousSelection;
	}
	
	//array.siblings
	array.siblings = function(){
		let children = array[0].parentNode.children;  //所有的兄弟包括了自己
		let resultArray = []; 

		for(var i=0; i < children.length; i++){
			if(children[i] !== array[0]){
				resultArray.push(children[i]);		//把不等于自己的都放到resultArray里
			}
		}
		let items = $(resultArray);				
		items.previousSelection = array;
		return items;
	}
	
	return array;
	
	
}
