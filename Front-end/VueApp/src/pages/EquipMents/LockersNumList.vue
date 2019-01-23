<template>
  	<div class="page">
		<mt-header fixed title="储物柜" style="background:#000">
			<mt-button icon="back" slot="left" @click="$router.back()"></mt-button>
		</mt-header>
		<div class="page-content">
			<h2 class="lockerName">储物柜</h2>
			<div class="lockerAreaListBox">
				<ul>
					<li v-for="locker in lockersState" :id="locker.id" :tag="locker.tag" @click="actionSheet(locker)">
						<i v-if="locker.state==1 && locker.tag!=1"><img src="../../assets/img/fulledArea.png"></i>
						<i v-if="locker.state==2"><img src="../../assets/img/unusualArea.png"></i>
						<i v-if="locker.tag==1 && locker.state!=2"><img src="../../assets/img/longPlayArea.png"></i>
						<span>{{locker.num}}</span> 
					</li>
				</ul>	
			</div>
		</div>
		<!-- 底部提示框 -->
		<mt-actionsheet
			:actions='actions'
			v-model='sheetVisible'>	
		</mt-actionsheet>
	</div>
</template>
<script>
import { Toast } from 'mint-ui';
export default {
	name: 'LockersNumList',
	data() {
		return {
			manageId: '', // 管理员ID
			deviceId: '',
			sheetVisible: false,
			actions:[
      			{
      				name: '开柜',
      				method: this.openLocker
      			},{
      				name: '取消/标记异常',
      				method: this.unusualLocker
      			}
      		],
      		lockersState: [],
      		currentLocker: {}
		};
	},
	mounted (){
		this.manageId = localStorage.getItem("manageId");
		this.deviceId = this.$route.params.deviceId;
		this.getLockersNumList();
	},
	methods: {
		getLockersNumList(){
			let _this = this;
            this.$http.get('/LuchyBird/deviceInfo/getLockerNums.do?deviceId='+this.deviceId+'')
            .then(function (data) {
            	if(data.data.status == 0){
            		let value = data.data.data;
            		if(value == null || value == ''){
            			Toast({
	                        message: '暂无柜子列表',
	                        position: 'bottom',
	                        duration: 2000
	                    });
            		}else{
            			_this.lockersState = value;
            		}
            	}else{
            		Toast({
                        message: data.data.msg,
                        position: 'bottom',
                        duration: 2000
                    });
            	}
            	
            })
            .catch(function (data) {
                // alert(data);
            });
		},
		// 控制底部弹框显示隐藏
		actionSheet(locker){
			this.currentLocker = locker;
			this.sheetVisible = !this.sheetVisible;
		},
		openLocker(){
			let _this = this;
			// 临时开柜
			if((this.currentLocker.state == 0 || this.currentLocker.state == 1) && this.currentLocker.tag != 1){
	            this.$http.get('/LuchyBird/deviceInfo/openLocker.do?managerId='+this.manageId+'&deviceId='+this.deviceId+'&num='+this.currentLocker.num+'&isRelease=8')
	            .then(function (data) {
	            	if(data.data.status == 0){
	            		Toast({
							message: _this.currentLocker.num+'号柜开启',
							position: 'bottom',
							duration: 2000
						});
	            	}else{
	            		Toast({
	                        message: data.data.msg,
	                        position: 'bottom',
	                        duration: 2000
	                    });
	            	}
	            	
	            })
	            .catch(function (data) {
	                // alert(data);
	            });
			}else if(this.currentLocker.state == 2 || this.currentLocker.tag == 1){
				this.$http.get('/LuchyBird/deviceInfo/openLocker.do?managerId='+this.manageId+'&deviceId='+this.deviceId+'&num='+this.currentLocker.num+'&isRelease=7')
	            .then(function (data) {
	            	if(data.data.status == 0){
	            		Toast({
							message: _this.currentLocker.num+'号柜开启',
							position: 'bottom',
							duration: 2000
						});
	            	}else{
	            		Toast({
	                        message: data.data.msg,
	                        position: 'bottom',
	                        duration: 2000
	                    });
	            	}
	            	
	            })
	            .catch(function (data) {
	                // alert(data);
	            });
			}
		},
		unusualLocker(){
			let _this = this;
			// 临时开柜
			if(this.currentLocker.state == 2){
	            this.$http.get('/LuchyBird/deviceInfo/openLocker.do?managerId='+this.manageId+'&deviceId='+this.deviceId+'&num='+this.currentLocker.num+'&isRelease=6')
	            .then(function (data) {
	            	if(data.data.status == 0){
	            		_this.currentLocker.state = 0;
	            		Toast({
							message: _this.currentLocker.num+'号柜已标记为空闲状态',
							position: 'bottom',
							duration: 2000
						});
	            	}else{
	            		Toast({
	                        message: data.data.msg,
	                        position: 'bottom',
	                        duration: 2000
	                    });
	            	}
	            	
	            })
	            .catch(function (data) {
	                // alert(data);
	            });
			}else{
				this.$http.get('/LuchyBird/deviceInfo/openLocker.do?managerId='+this.manageId+'&deviceId='+this.deviceId+'&num='+this.currentLocker.num+'&isRelease=5')
	            .then(function (data) {
	            	if(data.data.status == 0){
	            		_this.currentLocker.state = 2;
	            		Toast({
							message: _this.currentLocker.num+'号柜已标记成异常状态',
							position: 'bottom',
							duration: 2000
						});
	            	}else{
	            		Toast({
	                        message: data.data.msg,
	                        position: 'bottom',
	                        duration: 2000
	                    });
	            	}
	            	
	            })
	            .catch(function (data) {
	                // alert(data);
	            });
			}
		},
	}
};
</script>
<style scoped>
	.page-content{
		width: 100%;
		min-height: 100vh;
		background: #fff;
		padding-top: 40px;
		margin-top: -40px;
		box-sizing: border-box;
		overflow: auto;
	}
	.lockerName{
		width: 100%;
		height: 1rem;
		font-size: 14px;
		color: #000;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	/* 柜子列表 */
	.lockerAreaListBox{
		width: 100%;
		height: auto;
		padding: 0.15rem;
		-webkit-box-sizing: border-box;
		        box-sizing: border-box;
		overflow: hidden;
	}
	.lockerAreaListBox>ul{
		width: 100%;
		height: 100%;
		margin: 0 auto;
		overflow: hidden;
	}
	.lockerAreaListBox>ul>li{
		width: 25%;
		height: 1.5rem;
		padding: 0 0.15rem;
		margin-bottom: 0.3rem;
		-webkit-box-sizing: border-box;
		        box-sizing: border-box;
		float: left;
		overflow: hidden;
		position: relative;
	}
	.lockerAreaListBox>ul>li>span{
		width: 100%;
		height: 100%;
		font-size: 0.69rem;
		color: rgb(102,102,102);
		border: 1px solid #f2f2f2;
		-webkit-box-sizing: border-box;
		        box-sizing: border-box;
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		-webkit-box-align: center;
		    -ms-flex-align: center;
		        align-items: center;
		-webkit-box-pack: center;
		    -ms-flex-pack: center;
		        justify-content: center;
	}
	.lockerAreaListBox>ul>li>i{
		width: 1rem;
		height: 1rem;
		display: block;
		overflow: hidden;
		position: absolute;
		right: 0.15rem;
		top: 0;
	}
	.lockerAreaListBox>ul>li>.userImgBox{
		width: 0.4rem !important;
		height: 0.4rem !important;
		border-radius: 50%;
	}
	.lockerAreaListBox>ul>li>i>img{
		width: 100%;
		height: 100%;
		display: block;
	}
</style>
