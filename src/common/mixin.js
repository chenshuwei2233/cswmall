import {debounce} from 'common/utils.js'
import BackTop from 'components/content/backTop/BackTop.vue'
export const itemListenerMixin = {
	data() {
		return {
			itemImageListener: null,
			newRefresh: null
		}
	},
	mounted() {
		//监听item中图片加载完成
		 this.newRefresh = debounce(this.$refs.scroll.refresh,500)
		// 对监听事件进行保存
		this.itemImageListener = () => {
				this.newRefresh();
		}
		this.$bus.$on('itemImageLoad', this.itemImageListener);
		// 获取tabControl的offsetTop
		//所有的组件都有一个属性$el: 用于获取组件中的元素
		console.log('我是混入的代码')
	}
}
export const backTopMixin = {
	components: {
		 BackTop
	},
	data() {
		return {
			isShowBackTop: false
		}
	},
	methods: {
		backClick() {
			this.$refs.scroll.scrollTo(0,0,500);
		}
	}
}