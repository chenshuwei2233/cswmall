<template>
<!-- 	ref如果是绑定在组件中,那么通过'this.$refs.refname获取到的是一个组件对象' -->
<!-- ref如果是绑定在普通元素中,么通过'this.$refs.refname获取到的是一个元素对象 -->
<!-- 通过document.querySelector()方法获取普通元素有可能会跟其他组件同名的元素混淆 -->
	<div class="wrapper" ref="wrapper">
		<div class="content">
			<slot></slot>
		</div>
	</div>
</template>

<script>
	import BScroll from 'better-scroll'
	export default {
		name: 'Scroll',
		props: {
			probeType: {
				type: Number,
				default: 0,
			},
			pullUpLoad: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				scroll: null
			}
		},
		mounted() {
			//1.创建BScroll对象
			this.scroll = new BScroll(this.$refs.wrapper,{
				click: true,
				probeType: this.probeType,
				pullUpLoad: this.pullUpLoad
			})
			//2.监听滚动的位置
			if(this.probeType == 2 || this.probeType == 3) {
				this.scroll.on('scroll',position => {
					// console.log(position)
					//放送位置坐标给父组件
					this.$emit('scroll',position)
				})
			}
			
			//3.监听scroll滚动到底部
			if(this.pullUpLoad) {
				this.scroll.on('pullingUp' ,() => {
					this.$emit('pullingUp');
				})
			}
		},
		methods: {
			// ES6语法给参数一个默认值
			scrollTo(x, y, time=300) {
				this.scroll && this.scrollTo && this.scroll.scrollTo(x,y,time);
			},
			refresh() {
				console.log('-----------------------')
				this.scroll && this.scroll.refresh && this.scroll.refresh();
			},
			finishPullUp() {
				this.scroll && this.scroll.finishPullUp();
			},
			getScrollY() {
				return this.scroll ? this.scroll.y : 0
			}
		}
	} 
</script>

<style>
</style>
