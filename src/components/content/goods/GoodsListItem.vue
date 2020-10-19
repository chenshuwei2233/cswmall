<template>
	<div class="goods-item" @click="itemClick"> 
		<img v-lazy='showImage' alt="" @load="imageLoad">
		<div class="goods-info">
			<p>{{goodsItem.title}}</p>
			<span class="price">{{goodsItem.price}}</span>
			<span class="collect">{{goodsItem.cfav}}</span>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'GoodsListIte',
		props: {
			goodsItem: {
				type: Object,
				default() {
					return {}
				}
			}
		},
		computed: {
			showImage() {
				return this.goodsItem.image || this.goodsItem.show.img
			},
			goodsId() {
				if(!this.goodsItem.iid) {
					this.goodsItem.iid = this.goodsItem.item_id;
				}
				return this.goodsItem.iid;
			}
		},
		methods: {
			imageLoad() {
				//判断是在什么组件里
				// 思路一:
				// if(this.$route.path.indexOf('/home')) {
				// 	// 发送自定义事件给事件总线
				// 	this.$bus.$emit('itemImageLoad')
				// } else if(this.$route.path.indexOf('/detail')) {
				// 	this.$bus.$emit('detailItemImageLoad')
				// }
				//思路二:
					this.$bus.$emit('itemImageLoad')
			},
			itemClick() {
				this.$router.push('/detail/'+ this.goodsId);
			}
		}
	}
</script>

<style >
	.goods-item {
		padding-bottom: 40px;
		position: relative;
		width: 48%;
	}
	.goods-item img {
		width: 100%;
		border-radius: 5px;
	}
	.goods-info {
		font-size: 12px;
		position: absolute;
		bottom: 5px;
		left: 0;
		right: 0;
		overflow: hidden;
		text-align: center;
	}
	.goods-info p {
		overflow: hidden;
	/* 	超出的字数进行...隐藏 */
		text-overflow: ellipsis;
	/* 	不换行 */
		white-space: nowrap;
		margin-bottom: 3px;
	}
	.goods-info .price {
		color: var(--color-hight-text);
		margin-right: 20px;
	}
	.goods-info .collect {
		position: relative;
	}
	.goods-info .collect::before {
		content: '';
		position: absolute;
		left: -15px;
		top: -1px;
		width: 14px;
		height: 14px;
		background: url(~assets/img/common/collect.svg) 0 0/14px 14px;
	}
</style>
