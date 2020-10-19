<template>
	<div id="home">
		<nav-bar class="home-nav">
			<div slot="center">购物街</div>
		</nav-bar>
		<tab-control :titles="['流行','新款','精选']" class="tab-control" @tabClick="tabClick"
		ref="tabControl1"  v-show="isTabFixed"></tab-control>
		<scroll class="content" ref="scroll" :probe-type='3' 
		@scroll="contentScroll" :pull-up-load="true" 
		@pullingUp="LoadMore">
			<home-swiper :banners='banners' @swiperImageLoad="swiperImageLoad"></home-swiper>
			<recommend-view :recommends="recommends"></recommend-view>
			<feature-view></feature-view>
			<tab-control :titles="['流行','新款','精选']"  @tabClick="tabClick"
			ref="tabControl2" v-show="!isTabFixed"></tab-control>			
			<goods-list :goods="showGoods"></goods-list>
		</scroll>
		<!--组件不能直接监听原生事件，如果想要监听需要上.native修饰符 -->
		<back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
	</div>
</template>

<script>
	import HomeSwiper from './childComps/HomeSwiper.vue'
	import RecommendView from './childComps/RecommendView.vue'
	import FeatureView from './childComps/FeatureView.vue'


	import NavBar from 'components/common/navbar/NavBar.vue'
	import TabControl from 'components/content/tabControl/TabControl.vue'
	import GoodsList from 'components/content/goods/GoodsList.vue'
	import Scroll from 'components/common/scroll/Scroll.vue'
	
	
	import {
		getHomeMultidata,
		getHomeGoods
	} from 'network/home.js'
	import {debounce} from 'common/utils.js'
	import {itemListenerMixin,backTopMixin} from 'common/mixin.js'
	
 	export default {
		name: 'Home',
		components: {
			HomeSwiper,
			RecommendView,
			FeatureView,
			GoodsList,
			NavBar,
			TabControl,
			Scroll
		},
		mixins:[
			itemListenerMixin,
			backTopMixin
		],
		data() {
			return {
				result: null,
				banners: [],
				recommends: [],
				goods: {
					'pop': {
						page: 0,
						list: []
					},
					'new': {
						page: 0,
						list: []
					},
					'sell': {
						page: 0,
						list: []
					}
				},
				currentType: 'pop',
				tabOffsetTop: 0,
				isTabFixed: false,
				saveY: 0
			}
		},
		computed: {
			showGoods() {
				return this.goods[this.currentType].list
			}
		},
		created() {//created()只需保存主要代码，详细逻辑放在methods里
			//1.请求多个数据
			this.getHomeMultidata();
			//2.请求商品数据
			this.getHomeGoods('pop');
			this.getHomeGoods('new');
			this.getHomeGoods('sell');
			//3.赋值
		
		},
		mounted() {
		},
		destroyed() {
			console.log('Home Destroyed')
		},
		//组件活跃时回调的函数
		activated() {
			this.$refs.scroll.scrollTo(0,this.saveY)
			this.$refs.scroll.refresh();
		},
		//组件不活跃时回调的函数
		deactivated() {
			//1.保存Y值
			this.saveY = this.$refs.scroll.getScrollY();
			//2.取消全局事件的监听
			this.$bus.$off('itemImageLoad',this.itemImageListener)
		},
		methods: {
			/**
			 * 事件请求相关方法
			 */
			LoadMore() {
				this.getHomeGoods(this.currentType);
			},		
			tabClick(index) {
				console.log(index);
				switch(index) {
					case 0:
					 this.currentType = 'pop';
					 break;
					case 1:
						this.currentType = 'new';
						break;
					case 2:
						this.currentType = 'sell';
						break;
				}
				this.$refs.tabControl1.currentIndex = index;
				this.$refs.tabControl2.currentIndex = index;
			},
		
			contentScroll(position) {
				// console.log(position)
				//1.判断BackTop是否显示
				this.isShowBackTop = -position.y > 1000;
				//2.判断tabControl是否吸顶(position: fixed)
				this.isTabFixed = (-position.y) > this.tabOffsetTop;
			},
			swiperImageLoad() {
					this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
			},
 			/**
			 * 网络请求相关方法
			 */
			getHomeMultidata() {
				getHomeMultidata().then(res => {
					console.log(res)
					this.result = res;
					this.banners = res.data.data.banner.list;
					this.recommends = res.data.data.recommend.list;
				})
			},
			getHomeGoods(type) {
				const page = this.goods[type].page + 1;
				getHomeGoods(type,page).then(res => {
					console.log(res);
					this.goods[type].list.push(...res.data.data.list);
					this.goods[type].page += 1;
					
					//完成上拉加载更多
					this.$refs.scroll.finishPullUp();
				})
			}
		}
	}
</script>

<style scoped>
	#home {
		position: relative;
		height: 100vh;
		
	}
	.home-nav {
		background-color: var(--color-tint);
		color: #fff;
	/* 	position: fixed;
		left: 0;
		right: 0;
		top: 0;
		z-index: 9; */
	}
	.tab-control {
	/* 	position: sticky;
		top: 44px;
		z-index: 8; */
			position: relative;
			z-index: 8;
		}
		.content {
			position: absolute;
			top: 44px;
			bottom: 49px;
			left: 0;
			right: 0;
			overflow: hidden;
		}
</style>


