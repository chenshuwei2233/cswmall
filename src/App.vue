<template>
 <div id="app">
	 <keep-alive exclude="Detail">
			
		  <router-view v-if="isRouterAlive"></router-view>
	 </keep-alive>
	
	 <main-tab-bar></main-tab-bar>
 </div>
</template>

<script>
import MainTabBar from 'components/content/MainTabBar/MainTabBar.vue'


export default {
  name: 'App',
	provide() {
		return{
			reload: this.reload
		}
	},
	data() {
		return {
			isRouterAlive: true
		}
	},
	methods: {
		reload() {
			this.isRouterAlive = false;
			this.$nextTick(function() {
				this.isRouterAlive = true
			})
		}
	},
  components: {
    MainTabBar
  }
	
}
</script>

<style>
@import url("assets/css/base.css");
</style>
