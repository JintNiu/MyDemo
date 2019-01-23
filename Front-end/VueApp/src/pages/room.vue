<template>
  	<div class="page">
		<mt-header fixed title="添加场馆" style="background:#000">
			<router-link to="/reportList" slot="left">
				<mt-button icon="back"></mt-button>
			</router-link>
		</mt-header>
		<div class="page-content">
			<div class="addClubBox">
				<!-- <div class="clubContent">
					<i class="clubHeadImg"><img src="" alt=""></i>
					<span>U-24健身</span>
				</div> -->
				<div class="clubModelList clubLogo">
					<span>LOGO</span>
					<input class="logoFile" type="file" accept="image/*"> <!--  capture="camera"调用摄像头 -->
					<b class="fa fa-angle-right"></b>
					<i><img src="" alt=""></i>
				</div>
				<div class="clubModelList clubName">
					<label>名称&nbsp;<i style="color:red;font-size:10px">*</i></label>
					<input type="text" placeholder="请填写俱乐部名称" v-model="clubName">
				</div>
				<div class="clubModelList clubAddress">
					<label>地址&nbsp;<i style="color:red;font-size:10px">*</i></label>
					<input type="text" placeholder="请填写地址" v-model="clubAddress">
				</div>
				<div class="clubModelList clubPhone">
					<label>联系方式&nbsp;<i style="color:red;font-size:10px">*</i></label>
					<input type="text" placeholder="请填写联系方式" v-model="clubPhone">
				</div>
				<div class="clubModelList clubDetails">
					<label>描述</label>
					<textarea placeholder="请输入描述" v-model="clubDetails"></textarea>
				</div>
			</div>
			<div class="clubSignOut">
				<span>确定添加</span>
			</div>
		</div>
	</div>
</template>
<script>
var h = document.documentElement.clientHeight || document.body.clientHeight;
export default {
	name: 'Room',
	data () {
		return {
			clubName: '',
			clubAddress: '',
			clubPhone: '',
			clubDetails: '',
		}
	},
	mounted (){
		// this.$refs.my_scroller.resize()
		// document.getElementsByClassName('page-content')[0].style.height = h-40+ 'px';
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
<style scoped>
	.page-content {
		/*padding: 45px 0 50px;*/
		overflow: auto;
	}
	.addClubBox{
		width: 100%;
		min-height: 2rem;
		overflow: auto;
	}
	.addClubBox>.clubContent{
		width: 100%;
		height: 2rem;
		background: #fff;
		padding: 0 0.4rem;
		box-sizing: border-box;
		overflow: hidden;
	}
	.addClubBox>.clubContent>i{
		width: 1.5rem;
		height: 1.5rem;
		margin: 0.25rem 0.5rem;
		border-radius: 50%;
		background: red;
		overflow: hidden;
		display: block;
		float: left;
	}
	.addClubBox>.clubContent>i>img{
		width: 100%;
		height: 100%;
		display: block;
	}
	.addClubBox>.clubContent>span{
		width: 6rem;
		height: 2rem;
		line-height: 2rem;
		text-align: left;
		color: #000;
		font-size: 0.46rem;
		display: block;
		float: left;
	}
	.addClubBox>.clubContent>b{
		width: 1rem;
		height: 2rem;
		line-height: 2rem;
		text-align: center;
		color: #000;
		font-size: 0.36rem;
		display: block;
		float: right;
	}
	.clubModelList{
		width: 100%;
		min-height: 1.4rem;
		background: #fff;
		padding: 0 0.4rem;
		border-bottom: 1px solid #f2f2f2;
		box-sizing: border-box;
		overflow: hidden;
		position: relative;
	}
	.clubModelList>span{
		width: 4rem;
		height: 1.4rem;
		line-height: 1.4rem;
		text-align: left;
		color: #000;
		font-size: 0.4rem;
		box-sizing: border-box;
		display: block;
		float: left;
	}
	.clubModelList>label{
		width: 4rem;
		height: 1.4rem;
		line-height: 1.4rem;
		text-align: left;
		color: #000;
		font-size: 0.4rem;
		box-sizing: border-box;
		display: block;
		float: left;
	}
	.clubModelList>input{
		width: 6rem;
		height: 1.4rem;
		line-height: 1.4rem;
		text-align: left;
		color: #000;
		font-size: 0.4rem;
		outline: none;
		border: none;
		box-sizing: border-box;
		display: block;
		float: right;
	}
	.clubModelList>textarea{
		width: 6rem;
		min-height: 2.4rem;
		line-height: 0.5rem;
		text-align: left;
		color: #000;
		font-size: 0.4rem;
		outline: none;
		border: none;
		padding-top: 0.4rem;
		box-sizing: border-box;
		display: block;
		float: right;
	}
	.clubLogo>.logoFile{
		width: 100%;
		height: 100%;
		opacity: 0;
		position: absolute;
		left: 0;
		top: 0;
	}
	.clubLogo>i{
		width: 1rem;
		height: 1rem;
		background: red;
		margin-top: 0.2rem;
		display: block;
		float: right;
		overflow: hidden;
	}
	.clubLogo>i>img{
		width: 100%;
		height: 100%;
		display: block;
	}
	.clubLogo>b{
		width: 1rem;
		height: 1.4rem;
		line-height: 1.4rem;
		text-align: center;
		color: #000;
		font-size: 0.4rem;
		display: block;
		float: right;
	}
	.clubSignOut{
		width: 100%;
		height: 1.4rem;
		padding: 0 0.4rem;
		margin-top: 0.5rem;
		box-sizing: border-box;
	}
	.clubSignOut>span{
		width: 100%;
		height: 1.4rem;
		text-align: center;
		line-height: 1.4rem;
		color: #f44336;
		font-size: 0.46rem;
		background: #fff;
		display: block;
	}
</style>

