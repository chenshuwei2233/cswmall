<template>
	<div class="goods-base-info" v-if="Object.keys(goodsInfo).length !== 0">
		<div>{{goodsInfo.title}}</div>
		<div class="goods-price">
			<span class="new-price">{{goodsInfo.newPrice}}</span>
			<span class="old-price">{{goodsInfo.oldPrice}}</span>
			<span class="discount" v-if="goodsInfo.discount" 
			:style="{backgroundColor:goodsInfo.discountBgColor}">
			{{goodsInfo.discount}}</span>
		</div>
		<div class="goods-columns">
			<span class="span-left">{{goodsInfo.columns[0]}}</span>
			<span class="span-center">{{goodsInfo.columns[1]}}</span>
			<span class="span-right">{{goodsInfo.services[goodsInfo.services.length-1].name}}</span>
		</div>
		<div class="info-service">
			<span class="info-service-item" v-for="index in goodsInfo.services.length-1">
				<img :src="goodsInfo.services[index-1].icon" alt="">
				<span>{{goodsInfo.services[index-1].name}}</span>
			</span>
		</div>
	</div>
</template>

<script>
	export default {
		name: "DetailBaseInfo",
		props:{
			goodsInfo: {
				type: Object,
				default() {
					return {}
				}
			}
		}
	}
</script>

<style scoped>
	.goods-base-info {
		width: 100%;
		margin-top: 12px;
		color: black;
	}
	.goods-price {
		margin-top: 8px;
	}
	.new-price {
		color: purple;
		font-size: 20px;
	}
	.old-price {
		margin-left: 5px;
		font-size: 12px;
		text-decoration:line-through;
		color: #C0C0C0;
	}
	.discount {
		font-size: 12px;
		/* background-color: red; */
		color: white;
		border-radius: 25px;
		padding: 2px 5px 2px 5px;
		vertical-align: top;
		margin-left: 3px;
	}
	.goods-columns {
		width: 100%;
		margin-top: 15px;
		font-size: 12px;
		display: flex;
		padding-bottom: 5px;
		border-bottom: 1px solid  #C0C0C0;
		color: #C0C0C0;
		
	}
	.goods-columns span {
		flex: 1;
	}
	.span-left {
		padding-left: 5px;
	}
	.span-right {
		text-align: right;
		padding-right: 5px;
	}
	.info-service {
		width: 100%;
		
		display: flex;
		margin-top: 30px;
		padding-bottom: 5px;
		border-bottom: 4px solid #f2f5f8;
		
	}
	.info-service-item {
		flex: 1;
		font-size: 12px;
		padding-left: 5px;
	}
	.info-service-item:first-child {
		text-align: left;
		padding-left: 5px;
	}
	.info-service-item:last-child {
		text-align: right;
		padding-right: 5px;
	}
	.info-service-item img {
		width: 12px;
		height: 12px;
		vertical-align: middle;
	}
	
</style>
