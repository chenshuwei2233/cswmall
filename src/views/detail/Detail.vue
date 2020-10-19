<template>
	<div class="detail">
		<detail-nav-bar class="detail-nav-bar" @titleClick='titleClick' ref='nav'></detail-nav-bar>
		<scroll class="content" ref="scroll" @scroll="contentScroll" :probe-type="3">
			<detail-swiper :top-images="topImages"></detail-swiper>
			<detail-base-info :goodsInfo="goodsInfo"></detail-base-info>
			<detail-shop-info :shop="shopInfo"></detail-shop-info>
			<detail-image-info :detailInfo="detailInfo" @detailImageLoad='detailImageLoad'></detail-image-info>
			<detail-params-info :paramsInfo="itemParams" ref="params"></detail-params-info>
			<detail-comment-info :commentInfo="commentInfo" ref="comment"></detail-comment-info>
			<goods-list :goods='recommends' ref="recommends"></goods-list>
		</scroll>
		<back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
		<detail-bottom-bar @addCart='addToCart'></detail-bottom-bar>
		<!-- <toast :message='message' :show='show'></toast> -->
	</div>

</template>

<script>
	import DetailNavBar from './detailComps/DetailNavBar.vue'
	import DetailSwiper from './detailComps/DetailSwiper.vue'
	import DetailBaseInfo from './detailComps/DetailBaseInfo.vue'
	import DetailShopInfo from './detailComps/DetailShopInfo.vue'
	import DetailImageInfo from './detailComps/DetailImageInfo.vue'
	import DetailParamsInfo from './detailComps/DetailParamsInfo.vue'
	import DetailCommentInfo from './detailComps/DetailCommentInfo.vue'
	import GoodsList from 'components/content/goods/GoodsList.vue'
	import DetailBottomBar from './detailComps/DetailBottomBar.vue'

	import {
		getDetail,
		Goods,
		getRecommend
	} from 'network/detail.js'
	import {
		debounce
	} from 'common/utils.js'
	import {
		itemListenerMixin,
		backTopMixin
	} from 'common/mixin.js'
	import {
		mapActions
	} from 'vuex'
	

	import Scroll from 'components/common/scroll/Scroll.vue'
	// import Toast from 'components/common/toast/Toast.vue'

	export default {
		inject: ['reload'],
		name: "Detail",
		components: {
			DetailNavBar,
			DetailSwiper,
			DetailBaseInfo,
			Scroll,
			DetailShopInfo,
			DetailImageInfo,
			DetailParamsInfo,
			DetailCommentInfo,
			GoodsList,
			DetailBottomBar,
			// Toast
		},
		mixins: [
			itemListenerMixin,
			backTopMixin
		],
		data() {
			return {
				iid: null,
				topImages: [],
				goodsInfo: {},
				shopInfo: {},
				detailInfo: {},
				itemParams: {},
				commentInfo: {},
				recommends: [],
				themeTopY: [],
				getThemeTopY: null,
				currentIndex: 0,
				// message: '',
				// show: false
			}
		},
		watch: {
			'$route.path': function(newVal, oldVal) {
				this.reload()
				
			}
		},
		created() {
			//1.保存传入的iid
			this.iid = this.$route.params.iid;
			console.log(this.iid)
			//2.根据iid请求详情数据
			getDetail(this.iid).then(res => {
				console.log(res)
				//1.获取顶部的图片轮播数据
				const data = res.data.result;
				//2.取出轮播图信息
				this.topImages = data.itemInfo.topImages;
				console.log(this.topImages)
				//3.创建商品的信息
				this.goodsInfo = new Goods(data.itemInfo, data.columns, data.shopInfo.services);
				console.log(this.goodsInfo)
				//4.取出店铺的信息
				this.shopInfo = data.shopInfo;
				console.log(this.shopInfo)
				//5.取出详情的信息
				this.detailInfo = data.detailInfo;
				//6.取出参数的信息
				this.itemParams = data.itemParams;
				//7.取出评论信息
				if (data.rate.cRate !== 0) {
					this.commentInfo = data.rate.list[0];
				}
				//不对的原因，图片没有计算在内
				// this.$nextTick(() => {
				// 	//根据最新的数据，对应的DOM已经被渲染出来
				// 	//但是图片依然是没有加载完(目前获取到的offsetTop不包含其中的图片)
				// 	//offsetTop值不对的时候，都是因为图片的问题
				// 	this.themeTopY = []
				// 	this.themeTopY.push(0)
				// 	this.themeTopY.push(this.$refs.params.$el.offsetTop)
				// 	this.themeTopY.push(this.$refs.comment.$el.offsetTop)
				// 	this.themeTopY.push(this.$refs.recommends.$el.offsetTop)
				// 	console.log(this.themeTopY)
				// })
			})
			//3.获取商品推荐数据
			getRecommend().then(res => {
				this.recommends = res.data.data.list;
			})
			//4.给getThemeTopY赋值(对给this.themeTopY赋值的操作进行防抖)
			this.getThemeTopY = debounce(() => {
				this.themeTopY = []
				this.themeTopY.push(0)
				this.themeTopY.push(this.$refs.params.$el.offsetTop)
				this.themeTopY.push(this.$refs.comment.$el.offsetTop)
				this.themeTopY.push(this.$refs.recommends.$el.offsetTop)
				this.themeTopY.push(Number.MAX_VALUE)
				console.log(this.themeTopY)
			},50)
		},
		mounted() {

		}, 
		updated() {

		},
		destroyed() {
			console.log('啊！我坏了')
		},
		methods: {
			...mapActions(['addCart']),
			detailImageLoad() {
				this.newRefresh();
				this.getThemeTopY();
			},
			titleClick(index) {
				this.$refs.scroll.scrollTo(0, -(this.themeTopY[index]), 500)
			},
			contentScroll(position) {
				//1.获取y值
				const positionY = -position.y;
				
				//2.postionY和主体中值进行对比
				let length = this.themeTopY.length
				for(let i = 0; i < this.themeTopY.length; i++) {
					// if(positionY > this.themeTopY[i] && positionY < this.themeTopY[i + 1]) {
					// 	console.log(i)
					// }
					// if(this.currentIndex !== i &&
					// (i < length - 1 &&
					// (positionY >= this.themeTopY[i] && 
					// positionY < this.themeTopY[i + 1])) 
					// || 
					// (i == length - 1 &&
					//  positionY >= this.themeTopY[i])) {
					// 	this.currentIndex = i;
					// 	console.log(this.currentIndex)
					// 	this.$refs.nav.currentIndex = this.currentIndex;
					// }
					if(this.currentIndex !== i && (positionY > this.themeTopY[i]
					&& positionY < this.themeTopY[i + 1])) {
						this.currentIndex = i;
						this.$refs.nav.currentIndex = this.currentIndex;
					}
				}
				//3.判断是否显示返回顶部
				this.isShowBackTop = -position.y > 1000;
			},
			addToCart() {
				//1.获取购物车需要展示的信息
				const product = {};
				product.image = this.topImages[0];
				product.title = this.goodsInfo.title;
				product.desc = this.goodsInfo.desc;
				product.realPrice = this.goodsInfo.realPrice;
				product.iid = this.iid;
				//2.将商品添加至购物车
				//需将信息保存至store中
				// this.$store.commit('addCart',product)
				// this.$store.dispatch('addCart',product).then(res => {
				// 	console.log(res)
				// })
				this.addCart(product).then(res => {
					// this.show = true;
					// this.message = res;
					// setTimeout(() => {
					// 	this.show = false;
					// },1500)
					this.$toast.show(res);
				})
			}
		}
	}
</script>

<style scoped="scoped">
	.detail-nav-bar {
		position: relative;
		z-index: 9;
		background-color: #fff;
	}

	.detail {
		height: 100vh;
		background-color: #fff;
		position: relative;
		z-index: 1;
		overflow: hidden;
	}

	.content {
		height: calc(100% - 44px - 49px);
	}
</style>
