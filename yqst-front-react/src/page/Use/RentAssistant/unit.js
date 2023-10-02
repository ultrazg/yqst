export const getSearchValueByName = (name, search)=>{
	/*decodeURIComponent对url进行解码*/
	search = decodeURIComponent(search).substring(1);
	let arr = search.split('&');
	for(let i=0; i<arr.length; i++){
		const keyValueArr = arr[i].split('=');
		if(keyValueArr[0] ===  name){
			return keyValueArr[1];
		}
	}
}

export const deepClone = (obj = {}) =>{
	// 如果接收的参数是 基本数据类型 或者 null，不处理，直接返回
	if(typeof obj !== 'object' || obj == null){
		return obj;
	}
	// 判断接收的类型是数组还是对象，初始化返回结果
	let result = obj instanceof Array ? [] : {};
	// 数组和对象都有 for in 方法
	for(let key in obj){
		// 判断key是obj自身的属性，而不是原型的属性
		if(obj.hasOwnProperty(key)){
			// 递归调用，处理深层结构
			result[key] = deepClone(obj[key])
		}
	}
	// 返回结果
	return result;
}
