<template>
	<div v-if="Object.keys(paramsInfo).length !== 0" class="DetailParamsInfo">
		<div class="params-size">
			<table v-for="(table, index) in paramsInfo.rule.tables" :key="index">
				<tr v-for="(tr, indey) in table" :key="indey" class="size-row">
					<td v-for="(td, indez) in tr">{{td}}</td>
				</tr>
			</table>
		</div>
		<table class="info-params">
			<tr v-for="(tr,index) in paramsInfo.info.set" :key="index">
				<td class="td-key">{{tr.key}}</td>
				<td class="td-value">{{tr.value}}</td>
			</tr>
		</table>
		
		<div class="info-img" v-if="paramsInfo.info.images">
			<img :src="paramsInfo.info.images[0]" alt="">
		</div>
	</div>
</template>

<script>
	export default {
		name: 'DetailParamsInfo',
		props: {
			paramsInfo: {
				type: Object,
				default() {
					return {}
				}
			}
		}
	}
</script>

<style scoped="scoped">
	.DetailParamsInfo {
		padding-bottom: 20px;
		border-bottom: 5px solid #f2f5f8;
	}
	.params-size {
		width: 100%;
		margin-top: 10px;
	}
	.params-size table{
		width: 100%;
		
	}
	.size-row {
		width: 100%;
		display: flex;
		padding: 0 10px;
	}
	
	.size-row td {
		flex: 1;
		padding: 10px 0;
		border-bottom: 1px solid #CCCCCC;
	}
	.size-row:last-child td{
		border-bottom: 3px solid #CCCCCC;
	}
	.info-params {
		padding: 0 10px;
		width: 100%;
	}
	.info-params tr{
		width: 100%;
		display: flex;
	}
	.info-params td {
		padding: 10px 0;
		border-bottom: 1px solid #CCCCCC;
	}
	.td-key {
		width: 25%;
		
	}
	.td-value {
		flex: 1;
		padding-left: 10px;
		color: deeppink;
	}
	.info-params tr:last-child td {
		border-bottom: 3px solid #CCCCCC;
	}
</style>
