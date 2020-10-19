<template>
	<div class="tab-control">
		<!-- 只是文字不同不建议搞插槽,建议传值 -->
	<!-- 	通过currentIndex来增加被点到的div的样式 -->
		<div v-for="(item,index) in titles" class="tab-control-item" :class="{active: currentIndex === index}" @click="itemClick(index)">
			<span>{{item}}</span>
		</div>
	</div>
</template>

<script>
	export default {
		name: "TabControl",
		props: {
			titles: {
				type: Array,
				default() {
					return []
				}
			}
		},
		data() {
			return {
				currentIndex: 0
			}
		},
		methods: {
			itemClick(index) {
				
				this.currentIndex = index;
				this.$emit('tabClick',index);
			}
		}
	}
</script>

<style>
	.tab-control {
		display: flex;
		text-align: center;
		font-size: 15px;
		height: 40px;
		line-height: 40px;
		background-color: #fff;
	}
	.tab-control-item {
		flex: 1;
	
	}
	.tab-control-item span {
			padding: 5px;
	}
	.active {
		color: var(--color-high-text);
		
	}
	.active span {
		border-bottom: 3px solid var(--color-hight-text);
	}
</style>
