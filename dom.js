//dom.js
//$ 接收一个字符串或者元素或者元素列表
//返回一个新的数组
//这个数组有 on addClass removeClass ... API

window.$ = function(selectorOrNode){
	let array = [];
	
	if(typeof selectorNode === 'string'){
		let items = document.querySelectorAll(selectorNode);
		for(var i=0; i < items.length; i++){
			array.push(items[i]);
		}
	}else if(selectorNode instanceof Element){
		array.push(selectofNode);		
	}else if(selectorNode instanceof Array){
		for(var i=0; i < selectorNode.length; i++){
			if(!(selectorNode[i] instanceof Element)){
				continue;
			}
			array.push(selectorNode[i]);
		}
	}


  //on
  array.on = function(eventType, fn){
	  for(var i=0; i < array.length; i++){
		  array[i].addEventListener(eventType, fn);
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
		if(value !== undefined){
			for(var i=0; i < array.length; i++){
				array[i].textContent = value;
			}
			return array;
		}else{
			let result = [];
			for(var i=0; i < array.length; i++){
				result.push(array[i].textContent);
			}
			return result;
		}
	}
	
	//array.get
  array.get = function(index){
		return array[index];
	}
	
	//array.end
	array.end = function(){
		return array.previousSelection;
	}
	
	//array.siblings
	array.siblings = function(){
		let children = array[0].parentNode.children;
		let resultArray = [];
		for(var i=0; i < children.length; i++){
			if(children[i] !== array[0]){
				resultArray.push(children[i]);
			}
		}
		let items = $(resultArray);
		items.previousSeletion = array;
		return items;
	}
	
	return array;
	
	
}
