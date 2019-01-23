<template>
  	<div class="page">
		<mt-header fixed title="选择品牌" style="background:#000">
			<router-link to="/reportList" slot="left">
				<mt-button icon="back"></mt-button>
			</router-link>
		</mt-header>
		<scroller class="page-content">
			<div class="selectClub">
				<i><img src="../assets/img/userPhoto.png" alt=""></i>
				<div class="clubContent">
					<i class="userHeadImg"><img src="" alt=""></i>
					<span>xxx</span>
					<div>
						<span>品牌ID：213213</span>&nbsp;
						<span>创建人：23</span>
					</div>
				</div>
			</div>
			<div class="toAddBrand">
				<i class="ion-plus-circled"></i>
				<span>添加品牌</span>
			</div>
		</scroller>
	</div>
</template>
<script>
var h = document.documentElement.clientHeight || document.body.clientHeight;
export default {
	name: 'SelectClub',
	data () {
		return {
			msg: 111111
		}
	},
	mounted (){
		// this.$refs.my_scroller.resize()
		document.getElementsByClassName('page-content')[0].style.height = h-40+ 'px';
		// $dialog.alert({
		// 	// 效果
		// 	effect: 'default',
		// 	// 标题
		// 	title: '提示', 
		// 	// 内容
		// 	content: '数据变了',
		// 	// 按钮文本
		// 	okText: '确定',
		// 	// 按钮主题
		// 	okTheme: 'calm'
		// })
	},
	methods: {
	
	}
}
</script>
<style>
	.page-content {
		padding: 45px 0 50px;
		overflow: auto;
	}
	.selectClub{
		width: 100%;
		height: 3.4rem;
		overflow: hidden;
		position: relative;
	}
	.selectClub>i{
		width: 100%;
		height: 100%;
		display: block;
		filter: blur(10px);
		position: absolute;
		left: 0;
		top: 0;
		z-index: 10;
	}
	.selectClub>.clubContent{
		width: 100%;
		height: 100%;
		position: absolute;
		left: 0;
		top: 0;
		z-index: 20;
	}
	.selectClub>.clubContent>i{
		width: 1.5rem;
		height: 1.5rem;
		display: block;
		margin: 0 auto;
		margin-top: 0.3rem;
		background: red;
		border-radius: 50%;
		overflow: hidden;
	}
	.selectClub>.clubContent>span{
		width: 100%;
		height: 0.6rem;
		line-height: 0.6rem;
		font-size: 0.36rem;
		text-align: center;
		display: block;
	}
	.selectClub>.clubContent>div{
		width: 100%;
		height: 0.6rem;
		font-size: 0.36rem;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.toAddBrand{
		width: 100%;
		height: 1rem;
		text-align: center;
		line-height: 1rem;
		color: #fff;
		font-size: 0.36rem;
		background: orange;
		margin-top: 0;
	}
</style>

