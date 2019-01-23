<template>
	<div class="page" :clubId="changeClubId">
		<div class="allLockersListBox">
			<div class="lockersListBox" v-for="list in lockersList" @click="toLockerNumList()">
				<div class="lockersList">
					<span class="offLine" v-if="list.state==2">离线</span>
					<div class="lockersUser">
						<span>{{list.content}}</span>
					</div>
					<i class="lockersState" :class="{'offLockersState':list.state==2}" :state="list.state"></i>
					<div class="lockersDeviceId">
						<span>NO.123123121</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import {Toast,MessageBox} from 'mint-ui';
import {mapGetters} from 'vuex'
export default {
  	name: 'LockersList',
    data () {
		return {
			lockersList: [{
			"state": "1",
			"id" : "1",
			"content": "大厅"
		},{
			"state": "2",
			"id" : "2",
			"content": "操房"
		},{
			"state": "1",
			"id" : "3",
			"content": "办公室"
		},{
			"state": "2",
			"id" : "4",
			"content": "瑜伽室"
		},{
			"state": "1",
			"id" : "5",
			"content": "洗浴间"
		},{
			"state": "1",
			"id" : "6",
			"content": "洗浴间"
		},{
			"state": "1",
			"id" : "7",
			"content": "洗浴间"
		},{
			"state": "1",
			"id" : "8",
			"content": "洗浴间"
		}]
		}
    },
    props:['change-club-id'],
    computed:mapGetters([
		'currentClubId'
	]),
    watch:{
    	currentClubId: function(val,oldVal){
    		if(val != oldVal){
    			//this.loadLockers(val);
    		}
    	}
    },
    mounted() {
    	this.$nextTick(() => {
			this.loadLockers();
		})
    },
    methods: {
    	loadLockers(val){
    		var _this = this;
            this.$http.get('/gp/LuchyBird/device/getDeviceState.do?clubId=134&deviceType=locker')
            .then(function (data) {
            	if(data.data.status == 0){
            		let value = data.data.data;
                	_this.lampControl = value;
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
    	toLockerNumList(){
    		this.$router.push({name:'LockersNumList'});
    	}
    }
}
</script>
<style scoped>
	.page{
		width: 100%;
		height: 100%;
		overflow: auto;
	}
	.allLockersListBox{
		padding: 0 0.2rem;
		box-sizing: border-box;
	}
	.lockersListBox{
		width: 50%;
		height: 2.6rem;
		padding: 0 0.1rem;
		box-sizing: border-box;
		margin-bottom: 0.2rem;
		float: left;
		overflow: hidden;
	}
	.lockersList{
		width: 100%;
		height: 100%;
		background: #fff;
		overflow: hidden;
		display: flex;
		align-items: center;
		justify-content: space-around;
		position: relative;
	}
	.lockersList>.offLine{
		width: auto;
		height: auto;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 0.32rem;
		color: #fff;
		padding: 0.1rem 0.15rem;
		box-sizing: border-box;
		background-image: url(../../assets/img/offLine.png);
		background-size: contain;
		background-position: center;
		background-repeat: no-repeat;
		position: absolute;
		left: 0;
		top: 0;
	}
	.lockersList>.lockersUser{
		flex: 1;
		height: 1.8rem;
		font-size: 12px;
		color: #000;
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
	}
	.lockersList>.lockersState{
		flex: 1;
		height: 1.4rem;
		background-image: url(../../assets/img/lockersList.png);
		background-size: contain;
		background-repeat: no-repeat;
		background-position: center; 
		display: block;
		position: relative;
		margin-bottom: 0.2rem;
	}
	.lockersList>.offLockersState{
		background-image: url(../../assets/img/offLockersList.png) !important;
	}
	.lockersDeviceId{
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
