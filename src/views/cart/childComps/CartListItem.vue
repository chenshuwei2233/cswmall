<template>
	<div class="cart-list-item">
		<div class="item-selector">
			<CheckButton :isChecked='product.checked' @click.native="checkClick"></CheckButton>
		</div>
		<div class='cart-list-item-image'>
			<img :src="product.image" alt="商品图片">
		</div>
		<div class="cart-list-item-info">
			<div class='cart-title'>{{product.title}}</div>
			<div class="cart-desc">{{product.desc}}</div>
			<div class="cart-list-item-number">
				<div class="price">￥{{product.realPrice}}</div>
				<div class="count">x{{product.count}}</div>
			</div>
		</div>
	</div>
</template>

<script>
	import CheckButton from 'components/content/checkButton/CheckButton.vue'
	
	export default {
		name: 'CartListItem',
		props: {
			product: {
				type: Object,
				default () {
					return {};
				}
			}
		},
		components: {
			CheckButton
		},
		methods: {
			checkClick() {
				this.product.checked = !this.product.checked;
			}
		}
	}
</script>

<style scoped="scoped">
	.cart-list-item {
		width: 100%;
		padding: 10px;
		display: flex;
		border-bottom: 2px solid #f2f5f8;
	}
	.item-selector {
		width: 20px;
		display: flex;
		justify-content: center;
		align-items: center;
		padding-right: 10px;
	}
	.cart-list-item-image {
		width: 80px;
		height: 100px;
		
	}
	.cart-list-item-image img {
		width: 80px;
		height: 100px;
		border-radius: 5px;
	}
	.cart-list-item-info {
		width: calc(100% - 100px);
		margin-left: 5px;
	}
	.cart-desc, .cart-title {
		width: 100%;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
	.cart-title {
		font-weight: 700;
	}
	.cart-desc {
		margin-top: 10px;
		font-size: 13px;
	}
	.cart-list-item-number {
		margin-top: 20px;
		width: 100%;
		height: 38px;
		position: relative;
	}
	.price {
		position: absolute;
		left: 0;
		bottom: 0;
		color: orange;
	}
	.count {
		position: absolute;
		right: 5px;
		bottom: 0;
		font-size: 13px;
		font-weight: 700;
	}
</style>
