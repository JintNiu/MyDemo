<template>
  	<div class="page">
		<mt-header fixed title="我的" style="background:#000"></mt-header>
		<div class="page-content">
			<div class="mineBox">
				<div class="userContent" @click="toManageInfor()">
					<i class="userHeadImg"><img src="../assets/img/userPhoto.png" alt=""></i>
					<span>{{managerName}}</span>
					<b class="fa fa-angle-right"></b>
				</div>
				<div class="modelList aboutUs" @click="toAboutUs()">
					<i><img src="../assets/img/aboutUs.png" alt=""></i>
					<span>关于我们</span>
					<b class="fa fa-angle-right"></b>
				</div>
				<div class="modelList suggestion" @click="clearCache()">
					<i><img src="../assets/img/suggestion.png" alt=""></i>
					<span>清除缓存</span>
					<p>{{cacheNum}}</p>
				</div>
				<div class="modelList versionNum">
					<i><img src="../assets/img/versionNum.png" alt=""></i>
					<span>版本号</span>
					<p>{{versionCode}}</p>
				</div>
			</div>
			<div class="signOut">
				<span @click="signOut()">退出登陆</span>
			</div>
		</div>
	</div>
</template>
<script>
import {luckyBird} from './android.js'
import {Toast,MessageBox} from 'mint-ui'
var windowData;
window["getResult"] = function (data) {
	if(data != null && data != ''){
		let cacheValue = eval('(' + data + ')');
		if(cacheValue.action == 'clearCache'){
			if(cacheValue.status == 0){ 	
				windowData.cacheNum = cacheValue.data;
				Toast({
					message: '清除成功',
					position: 'bottom',
					duration: 2000
				});
			}else{
				Toast({
					message: '清除缓存失败',
					position: 'bottom',
					duration: 2000
				});
			}
		}else if(cacheValue.action == 'getCacheSize'){
			if(cacheValue.status == 0){ 	
				windowData.cacheNum = cacheValue.data;
			}else{
				Toast({
					message: '清除缓存失败',
					position: 'bottom',
					duration: 2000
				});
			}
		}else if(cacheValue.action == 'getVersionName'){
			if(cacheValue.status == 0){ 	
				windowData.versionCode = cacheValue.data;
			}else{
				Toast({
					message: '获取版本号失败',
					position: 'bottom',
					duration: 2000
				});
			}
		}
	}
}
export default {
	name: 'Mine',
	data() {
		return {
			manageId: '',
			managerName: '管理员',
			items: [],
			infiniteCount: 0,
			cacheNum: '',
			versionCode: ''
		};
	},
	created() {
      	windowData = this;
    },
	mounted (){
		// this.$refs.my_scroller.resize()
		let getCacheSize = {
			action : 'getCacheSize'
		};
		let getVersionName = {
			action : 'getVersionName'
		};
		luckyBird.event(JSON.stringify(getCacheSize));
		luckyBird.event(JSON.stringify(getVersionName));
		this.manageId = localStorage.getItem("manageId");
		// this.managerName = localStorage.getItem("managerName");
	},
	methods: {
		toManageInfor(){
			this.$router.push({name:'ManageInforBox',params:{manageId:this.manageId}})
		},
		toAboutUs(){
			this.$router.push({name:'AboutUsBox'})
		},
		clearCache(){
			let command = {
				action : 'clearCache'
			};
			MessageBox.confirm('确定要清空缓存么？').then(action => {
				luckyBird.event(JSON.stringify(command));
        	},() => {});
			
		},
		signOut(){
			let command = {
				action : 'logout'
			};
			MessageBox.confirm('确定要退出么？').then(action => {
                luckyBird.event(JSON.stringify(command));
            },() => {});
		}
	}
};
</script>
<style scoped>
	.page-content {
		width: 100%;
		height: 100vh;
		padding: 40px 0 50px;
		background: #f2f2f2;
		margin-top: -40px;
		box-sizing: border-box;
		overflow: auto;
	}
	.mineBox{
		width: 100%;
		min-height: 2rem;
		background: #f2f2f2;
		box-sizing: border-box;
		overflow: auto;
	}
	.mineBox>.userContent{
		width: 100%;
		height: 2rem;
		background: #fff;
		box-sizing: border-box;
		overflow: hidden;
	}
	.mineBox>.userContent>i{
		width: 1.5rem;
		height: 1.5rem;
		margin: 0.25rem 0.5rem;
		border-radius: 50%;
		overflow: hidden;
		display: block;
		float: left;
	}
	.mineBox>.userContent>i>img{
		width: 100%;
		height: 100%;
		display: block;
	}
	.mineBox>.userContent>span{
		width: 6rem;
		height: 2rem;
		line-height: 2rem;
		text-align: left;
		color: #000;
		font-size: 14px;
		display: block;
		float: left;
	}
	.mineBox>.userContent>b{
		width: 1rem;
		height: 2rem;
		line-height: 2rem;
		text-align: center;
		color: #000;
		font-size: 0.6rem;
		display: block;
		float: right;
	}
	.modelList{
		width: 100%;
		height: 1.4rem;
		background: #fff;
		padding: 0 0.4rem;
		border-bottom: 1px solid #f2f2f2;
		box-sizing: border-box;
		overflow: hidden;
	}
	.modelList>i{
		width: 0.5rem;
		height: 0.5rem;
		margin-top: 0.45rem;
		margin-right: 0.2rem;
		display: block;
		float: left;
	}
	.modelList>i>img{
		width: 100%;
		height: 100%;
		display: block;
	}
	.modelList>span{
		width: 4rem;
		height: 1.4rem;
		line-height: 1.4rem;
		text-align: left;
		color: #000;
		font-size: 12px;
		box-sizing: border-box;
		display: block;
		float: left;
	}
	.modelList>b{
		width: 1rem;
		height: 1.4rem;
		line-height: 1.4rem;
		text-align: right;
		color: #000;
		font-size: 0.6rem;
		display: block;
		float: right;
	}
	.modelList>p{
		width: 3rem;
		height: 1.4rem;
		line-height: 1.4rem;
		text-align: right;
		color: #000;
		font-size: 12px;
		display: block;
		float: right;
	}
	.aboutUs{
		margin-top: 0.2rem;
	}
	.versionNum{
		border-bottom: none;
	}
	.signOut{
		width: 100%;
		height: 1.2rem;
		padding: 0 0.4rem;
		box-sizing: border-box;
		position: relative;
		top: 3rem;
	}
	.signOut>span{
		width: 100%;
		height: 100%;
		font-size: 0.46rem;
		color: #fff;
		background: #f0832f;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
