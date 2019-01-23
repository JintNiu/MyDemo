<template>
	<div class="page" :clubId="changeClubId">
		<div class="allTreadmillListBox">
			<div class="treadmillListBox" v-for="list in treadmillList">
				<div class="treadmillList">
					<div class="treadmillUser">
						<i class="userImg">		
							<img src="../../assets/img/userPhoto.png" v-if="list.state==5">
							<img :src="'+list.headImgUrl+'" v-if="list.state==2">
							<img src="../../assets/img/offlineUserIcon.png" v-if="list.state==1||list.state==3">
							<img src="../../assets/img/noUserIcon.png" v-if="list.state==4">
						</i>
						<span v-if="list.state==1">跑步中</span>
						<span v-if="list.state==2">跑步中(登录)</span>
						<span v-if="list.state==3">在线</span>
						<span v-if="list.state==4">离线</span>
						<span v-if="list.state==5">在线(登录)</span>
					</div>
					<i class="treadState" :state="list.state" :class="{
						onlineTread:list.state==3||list.state==5,
						offlineTread:list.state==4,
						runningTread:list.state==1||list.state==2,
					}">
					</i>
					<div class="treadmillDeviceId">
						<span>NO.{{list.deviceId}}</span>
					</div>		
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import {Toast} from 'mint-ui';
import {mapGetters} from 'vuex'
export default {
  	name: 'TreadmillList',
    data () {
		return {
			treadmillList: []
		}
    },
    props:['change-club-id'],
    computed:mapGetters([
		'currentClubId'
	]),
    watch:{
    	currentClubId: function(val,oldVal){
    		if(val != oldVal){
    			console.log(val);
    			//this.loadTread(val);
    		}
    	}
    },
    mounted() {
    	this.$nextTick(() => {
			this.loadTread();
			
		})
    },
    methods: {
    	loadTread(val){
    		var _this = this;
            this.$http.get('/gp/LuchyBird/device/getDeviceState.do?clubId=134&deviceType=run')
            .then(function (data) {
            	if(data.data.status == 0){
            		let value = data.data.data;
            		console.log(value)
                	_this.treadmillList = value;
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
</script>
<style scoped>
	.page{
		width: 100%;
		height: 100%;
		box-sizing: border-box;
		overflow: auto;
	}
	.allTreadmillListBox{
		padding: 0 0.2rem;
		box-sizing: border-box;
	}
	.treadmillListBox{
		width: 50%;
		height: 2.6rem;
		padding: 0 0.1rem;
		box-sizing: border-box;
		margin-bottom: 0.2rem;
		float: left;
		overflow: hidden;
	}
	.treadmillList{
		width: 100%;
		height: 100%;
		background: #fff;
		overflow: hidden;
		display: flex;
		align-items: center;
		justify-content: space-around;
		position: relative;
	}
	.treadmillList>.treadmillUser{
		flex: 1;
		height: 1.8rem;
		background-size: contain;
		background-repeat: no-repeat;
		background-position: center; 
		display: block;
		position: relative;
		float: right;
	}
	.treadmillList>.treadState{
		flex: 1;
		height: 1.4rem;
		background-size: contain;
		background-repeat: no-repeat;
		background-position: center; 
		display: block;
		position: relative;
		margin-bottom: 0.2rem;
		float: right;
	}
	/*在线*/
	.treadmillList>.onlineTread{
		background-image: url(../../assets/img/tread2.png);
	}
	/*离线*/
	.treadmillList>.offlineTread{
		background-image: url(../../assets/img/tread3.png);
	}
	/*跑步中*/
	.treadmillList>.runningTread{
		background-image: url(../../assets/img/tread1.png);
	}
	.treadmillList>.treadmillUser>.userImg{
		width: 1rem;
		height: 1rem;
		border-radius: 50%;
		display: block;
		overflow: hidden;
		margin: 0 auto; 
	}
	.treadmillList>.treadmillUser>.userImg>img{
		width: 100%;
		height: 100%;
		display: block;
	}
	.treadmillList>.treadmillUser>span{
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
	.treadmillDeviceId{
		width: 100%;
		height: 0.4rem;
		/*background: #f2f2f2;*/
		text-align: right;
		font-size: 12px;
		color: #000;
		padding: 0 0.2rem;
		box-sizing: border-box;
		overflow: hidden;
		position: absolute;
		left: 0;
		bottom: 0;
	}
</style>
