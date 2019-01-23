<template>
  	<div class="page">
		<mt-header fixed title="灯控设备" style="background:#000">
			<mt-button icon="back" slot="left" @click="$router.back()"></mt-button>
		</mt-header>
		<div class="page-content">
			<div class="allLampListBox">
				<div class="lampControlListBox" v-for="list in lampsState">
					<div class="lampControlList" :class="{'onLampControlList':list.sencestate==0}">
						<div class="lampUser">
							<i class="userImg">		
								<img src="../../assets/img/noLight.png" v-if="list.sencestate==1">
								<img src="../../assets/img/hasLight.png" v-if="list.sencestate==0">
							</i>
							<span>{{list.sencename}}</span>
						</div>
						<i class="lampState" :class="{'onLampState':list.sencestate==0}" @click="openLamp(list)">
							<i class="fa fa-power-off"></i>
						</i>
					</div>
				</div>	
			</div>
		</div>
	</div>
</template>
<script>
import { Toast } from 'mint-ui';
export default {
	name: 'LampControlList',
	data() {
		return {
			deviceId: '',
      		lampsState: []
		};
	},
	mounted (){
		this.deviceId = this.$route.params.deviceId;
		this.getLampSences();
	},
	methods: {
		getLampSences(){
			var _this = this;
            this.$http.get('/LuchyBird/deviceInfo/getLampSences.do?deviceId='+this.deviceId+'')
            .then(function (data) {
            	if(data.data.status == 0){
            		let value = data.data.data;
            		if(value == null || value == ''){
            			Toast({
	                        message: '暂无灯控场景',
	                        position: 'bottom',
	                        duration: 2000
	                    });
            		}else{
            			_this.lampsState = value
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
		openLamp(lamp){
			// 关灯
			if(lamp.sencestate == 0){
				var _this = this;
	            this.$http.get('/LuchyBird/deviceInfo/remoteControlSence.do?senceId='+lamp.senceid+'&deviceId='+this.deviceId+'&senceState=1')
	            .then(function (data) {
	            	if(data.data.status == 0){
	            		lamp.sencestate = 1;
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
			}else if(lamp.sencestate == 1){ // 开灯
				var _this = this;
	            this.$http.get('/LuchyBird/deviceInfo/remoteControlSence.do?senceId='+lamp.senceid+'&deviceId='+this.deviceId+'&senceState=0')
	            .then(function (data) {
	            	if(data.data.status == 0){
	            		lamp.sencestate = 0;
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
		}
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
	.allLampListBox{
		margin-top: 0.4rem;
		padding: 0 0.2rem;
		box-sizing: border-box;
	}
	.lampControlListBox{
		width: 50%;
		height: 2.2rem;
		padding: 0 0.2rem;
		box-sizing: border-box;
		margin-bottom: 0.4rem;
		float: left;
		overflow: hidden;
	}
	.lampControlList{
		width: 100%;
		height: 100%;
		background: #fff;
		border: 1px solid #f9f9f9;
		box-sizing: border-box;
		overflow: hidden;
		display: flex;
		align-items: center;
		justify-content: space-around;
		transition: all 0.5s ease;
	}
	.onLampControlList{
		background: #fffef6 !important;
	}
	.lampControlList>.lampUser{
		flex: 1;
		height: 1.8rem;
		display: block;
		position: relative;
	}
	.lampControlList>.lampUser>.userImg{
		width: 1rem;
		height: 1rem;
		border-radius: 50%;
		display: block;
		overflow: hidden;
		margin: 0 auto; 
	}
	.lampControlList>.lampUser>.userImg>img{
		width: 100%;
		height: 100%;
		display: block;
	}
	.lampControlList>.lampUser>span{
		width: 100%;
		height: 0.6rem;
		font-size: 12px;
		color: #000;
		text-align: center;
		line-height: 0.6rem; 
		margin: 0 auto;
		margin-top: 0.2rem;
		display: block;
	}
	.lampControlList>.lampState{
		flex: 1;
		height: 1.4rem;
		font-size: 0.8rem;
		color: #c2c2c2;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: all 0.5s ease;
		position: relative;
	}
	.lampControlList>.onLampState{
		color: #3f3f3f !important;
	}
</style>
