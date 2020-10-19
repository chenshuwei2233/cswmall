<template>
	<div class="cart">
		<!-- 导航栏 -->
		<nav-bar class="nav-bar">
			<div slot="center" >购物车({{length}})</div>
		</nav-bar>
		
		<!-- 	商品的列表 -->
		<cart-list></cart-list>
		<!-- 	底部汇总 -->
		<cart-bottom-bar></cart-bottom-bar>
	</div>
</template>

<script>
	import NavBar from 'components/common/navbar/NavBar.vue'
	import CartList from './childComps/CartList.vue'
	import CartBottomBar from './childComps/CartBottomBar.vue'
	
	import {mapGetters} from 'vuex'
	 
	export default {
		name: 'cart',
		components: {
			NavBar,
			CartList,
			CartBottomBar
		},
		computed: {
			//两种语法
			//将getter转化为计算属性
			// ...mapGetters(['cartLength'])
			...mapGetters({
				length: 'cartLength'
			})
		}
	}
</script>

<style scoped="scoped">
	
	.nav-bar {
		background-color: var(--color-tint);
		color: #fff;
	}
</style>
