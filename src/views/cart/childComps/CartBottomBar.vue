<template>
	<div class="bottom-bar">
		<div class="check-contnet">
			<check-button class="check-button" :isChecked='isSelectAll' @click.native='checkClick'>

			</check-button>
			<span>全选</span>
		</div>
		<div class="price">
			合计:{{totalPrice}}
		</div>
		<div class="calculate" @click="calcClick">
			去计算:({{checkLength}})
		</div>
	</div>
</template>

<script>
	import CheckButton from 'components/content/checkButton/CheckButton.vue'

	import {
		mapGetters
	} from 'vuex'

	export default {
		name: 'CartBottomBar',
		components: {
			CheckButton
		},
		computed: {
			...mapGetters({
				list: 'cartList'
			}),
			totalPrice() {
				return '￥' + this.list.filter(item => {
					return item.checked
				}).reduce((preValue, item) => {
					return preValue + item.realPrice * item.count
				}, 0).toFixed(2);
			},
			checkLength() {
				return this.list.filter(item => item.checked).length
			},
			isSelectAll() {
				if (this.list.length === 0) {
					return false;
				} else {
					let newAry = this.list.filter(item => item.checked)
					if (newAry.length === this.list.length) {
						return true;
					} else {
						return false;
					}
				}
			}
		},
		methods: {
			checkClick() {
				if (this.isSelectAll) {
					this.list.forEach(item => item.checked = false);
				} else {
					this.list.forEach(item => item.checked = true)
				}
			},
			calcClick() {
				if(this.checkLength === 0) {
					this.$toast.show('请选择要购买的商品',2000)
				}
			}
		}
	}
</script>

<style scoped="scoped">
	.bottom-bar {
		width: 100%;
		height: 40px;
		background-color: #eee;
		position: fixed;
		bottom: 49px;
		line-height: 40px;
		display: flex;
		font-size: 14px;
	}

	.check-contnet {
		display: flex;
		align-items: center;
		margin-left: 10px;
		width: 60px;
	}

	.check-button {
		width: 20px;
		height: 20px;
		line-height: 20px;
		margin-right: 5px;
	}

	.price {
		margin-left: 30px;
		flex: 1;
	}

	.calculate {
		width: 90px;
		background-color: red;
		color: #fff;
		text-align: center;
	}
</style>
