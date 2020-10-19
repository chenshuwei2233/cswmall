<template>
  <div v-if="Object.keys(detailInfo).length !== 0" class="goods-detail-info">
   <div class="info-desc clear-fix">
		 <div class="start"></div>
		 <div class="desc-center">{{detailInfo.desc}}</div>
		 <div class="end"></div>
	 </div>
	<div v-for="item in detailInfo.detailImage">
		<div class="info-key">{{item.key}}</div>
		<div class="info-image-list">
			<img v-for='(item, index) in item.list' :src="item" alt="" :key="index"
			@load="imageLoad">
		</div>
	</div>
  </div>
</template>

<script>
	export default {
		name: "DetailGoodsInfo",
    props: {
      detailInfo: {
        type: Object
      }
    },
    data() {
			return {
				counter: 0,
        imagesLength: 0
      }
    },
    methods: {
	    imageLoad() {
				this.$emit('detailImageLoad')
			}
    },
    watch: {
	    detailInfo() {
	      // 获取图片的个数
	    	this.imagesLength = this.detailInfo.detailImage[0].list.length
	    }
    }
	}
</script>

<style scoped>
   .goods-detail-info {
		 padding: 20px 0;
		 border-bottom: 5px solid #f2f5f8;
	 }
	 .info-desc {
		 font-size: 12px;
		 color: #333;
		 padding: 0 10px;
	 }
	 .desc-center {
		 padding: 10px 0;
	 }
	 .start {
		 width: 78px;
			border-bottom: 2px solid  #a3a3a5;
			position: relative;
		 }
		.end {
			position: relative;
			float: right;
			width: 78px;
			border-bottom: 2px solid #a3a3a5;
			
		}
		.start::before, .end::after {
			content: '';
			width: 5px;
			height: 5px;
			background-color: #333;
			font-size: 50px;
			position: absolute;
			top: -3px;
		}
		.start::before {
			left: -5px;
		}
		.end::after {
			right: -5px;
		}
		.info-key {
			padding: 10px 0;
		}
		.info-image-list img{
			width: 100%;
		}
</style>


