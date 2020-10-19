import Toast from './Toast'
const obj = {}
//install函数在执行时，自动导入Vue
obj.install = function(Vue) {
	
	// document.body.appendChild(Toast.$el)
	//1.创建组件构造器
	const toastConstrustor = Vue.extend(Toast);
	//2.通过new的方式，根据组件构造器，可以创建出一个组件对象
	const toast = new toastConstrustor();
	//3.将组件对象，手动挂载到某一个元素上 
	toast.$mount(document.createElement('div'))
	//4.toast.$el对应的是div
	document.body.appendChild(toast.$el)
	
	Vue.prototype.$toast = toast;
}
export default obj