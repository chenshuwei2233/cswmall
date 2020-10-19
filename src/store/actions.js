import {
	ADD_COUNTER,
	ADD_TO_CART
} from './mutation-types.js'
export default {
		addCart(context, payload) {
			return new Promise((resolve,reject) => {
				let Product = context.state.cartList.find(function(item) {
					return item.iid === payload.iid
				})
				//2.判断oldProduct
				if (Product) {
					context.commit(ADD_COUNTER, Product);
					resolve('当前商品数量+1')
				} else {
					payload.count = 1
					// context.state.cartList.push(payload)
					context.commit(ADD_TO_CART,payload);
					resolve('添加当前商品至购物车')
				}
			})
		}
	}