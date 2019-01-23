<template>
	<div class="page" :clubId="changeClubId">
		<div class="allLampControlBox">
			<div class="lampControlBox" v-for="list in lampControl" @click="toLampControlList()">
				<div class="lampControl">
					<span class="offLine" v-if="list.state==2">离线</span>
					<div class="lampUser">
						<span>{{list.content}}</span>
					</div>
					<i class="lampState" :class="{'offlampState':list.state==2}" :state="list.state"></i>
					<div class="lampDeviceId">
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
  	name: 'LampControlScene',
    data () {
		return {
			lampControl: [{
				"state": "1",
				"id" : "1",
				"content": "设备一"
			},{
				"state": "1",
				"id" : "2",
				"content": "设备二"
			},{
				"state": "1",
				"id" : "3",
				"content": "设备三"
			},{
				"state": "2",
				"id" : "4",
				"content": "设备四"
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
    			//this.loadLamp(val);
    		}
    	}
    },
    mounted() {
    	this.$nextTick(() => {
			this.loadLamp();
		})
    },
    methods: {
    	loadLamp(val){
    		var _this = this;
            this.$http.get('/gp/LuchyBird/device/getDeviceState.do?clubId=134&deviceType=lamp')
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
    	toLampControlList(){
    		this.$router.push({name:'LampControlList'});
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
	.allLampControlBox{
		padding: 0 0.2rem;
		box-sizing: border-box;
	}
	.lampControlBox{
		width: 50%;
		height: 2.6rem;
		padding: 0 0.1rem;
		box-sizing: border-box;
		margin-bottom: 0.2rem;
		float: left;
		overflow: hidden;
	}
	.lampControl{
		width: 100%;
		height: 100%;
		background: #fff;
		padding-right: 0.2rem;
		box-sizing: border-box;
		overflow: hidden;
		display: flex;
		align-items: center;
		justify-content: space-around;
		position: relative;
	}
	.lampControl>.offLine{
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
	.lampControl>.lampUser{
		flex: 1;
		height: 1.8rem;
		font-size: 12px;
		color: #000;
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
	}
	.lampControl>.lampState{
		flex: 1;
		height: 1.4rem;
		background-image: url(../../assets/img/lampControl.png);
		background-size: contain;
		background-repeat: no-repeat;
		background-position: center; 
		display: block;
		position: relative;
		margin-bottom: 0.2rem;
	}
	.lampControl>.offlampState{
		background-image: url(../../assets/img/offLampControl.png) !important;
	}
	.lampDeviceId{
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
