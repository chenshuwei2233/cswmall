<template>
	<div v-if="Object.keys(commentInfo).length !== 0" class="comment-info">
		<div class="header">
			<div class="comment-title ">用户评价</div>
			<div class="more">更多</div>
		</div>
		<div class="comment-middle">
				<span><img :src="commentInfo.user.avatar" alt="" class="avatar"></span>
				<span class="uname">{{commentInfo.user.uname}}</span>
				<div class="comment-content">{{commentInfo.content}}</div>
				<div class="uname-info">
					<span class="comment-created">{{commentInfo.created | showDate}}</span>
					<span>{{commentInfo.style}}</span>
				</div>
				<div class="comment-image">
					<span v-for="item in commentInfo.images">
						<img :src="item" alt="">
					</span>
				</div>
		</div>
		
	</div>
</template>

<script>
	import {formatDate} from 'common/utils.js'
	
	export default {
		name: 'DetailCommentInfo',
		props: {
			commentInfo: {
				type: Object,
				default() {
					return {}
				}
			}
		},
		filters: {
			showDate(value) {
				//1.将时间戳转成date对象
				const date = new Date(value * 1000);
				//2.将date进行格式化
				return formatDate(date,'yyyy-MM-dd')
			}
		}
	}
</script>

<style scoped="scoped">
	.comment-info {
			padding: 20px;
			border-bottom: 5px solid #f2f5f8;
	}
	.header {
		position: relative;
		width: 100%;
		border-bottom: 2px solid #f2f5f8;
		padding-bottom: 10px;
	}
	.more {
		position: absolute;
		right: 0;
		bottom: 10px;
		font-size: 13px;
	}
	.comment-middle {
		padding-top: 10px;
		padding-bottom: 20px;
	}
	.comment-middle .avatar {
		width: 48px;
		height: 48px;
		border-radius: 90px;
		margin-right: 15px;
		vertical-align: middle;
	}
	.comment-content {
		margin-top: 10px;
	}
	.uname {
		font-weight: bold;
	}
	.uname-info {
		margin-top: 10px;
		font-size: 13px;
		color: #a3a3a5;
	}
	.comment-created {
		margin-right: 10px;
	}
	.comment-image  {
		margin-top: 10px;
	}
	.comment-image img {
		width: 90px;
		height: 90px;
		margin-right: 10px;
	}
</style>
