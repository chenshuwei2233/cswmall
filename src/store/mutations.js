import {
	ADD_COUNTER,
	ADD_TO_CART
} from './mutation-types.js'
export default  {
		//mutations唯一目的就是修改state中状态
		//mutations中每个方法尽可能完成的事情比较单一一点
		[ADD_COUNTER](state,payload) {
			payload.count++;
		},
		[ADD_TO_CART](state, payload) {
			payload.checked = true;
			state.cartList.push(payload)
		}
	}