<template>
	<div class="page" :clubId="changeClubId">
		<div class="allEntranceGuardListBox">
			<div class="entranceGuardListBox" v-for="list in entranceGuardList" :id="list.id" @click="openDoor(list.id,list.deviceName)">
				<div class="entranceGuardList">
					<span class="offLine" v-if="list.state==4">离线</span>
					<div class="entranceUser">
						<span>{{list.deviceName}}</span>
					</div>
					<i class="entranceState" :class="{'offEntranceState':list.state==2}" :state="list.state"></i>
					<div class="entranceDeviceId">
						<span>NO.{{list.deviceId}}</span>
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
  	name: 'EntranceGuard',
    data () {
		return {
			entranceGuardList: [],
			EntranceSheet: false,
		}
    },
    props:['change-club-id'],
    computed:mapGetters([
		'currentClubId'
	]),
    watch:{
    	currentClubId: function(val,oldVal){
    		if(val != oldVal){
    			//this.loadEntrance(val);
    		}
    	}
    },
    mounted() {
    	this.$nextTick(() => {
			this.loadEntrance();
		})
    },
    methods: {
    	loadEntrance(val){
    		var _this = this;
            this.$http.get('/gp/LuchyBird/device/getDeviceState.do?clubId=134&deviceType=door')
            .then(function (data) {
            	if(data.data.status == 0){
            		let value = data.data.data;
                	_this.entranceGuardList = value;
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
		openDoor(id,name){
			MessageBox.confirm('要开启'+name+'的门么？').then(action => {
                    Toast({
						message: name+'的门开启',
						position: 'bottom',
						duration: 2000
					});
            },() => {});
		},
    }
}
</script>
<style scoped>
	.page{
		width: 100%;
		height: 100%;
		overflow: auto;
	}
	.allEntranceGuardListBox{
		padding: 0 0.2rem;
		box-sizing: border-box;
	}
	.entranceGuardListBox{
		width: 50%;
		height: 2.6rem;
		padding: 0 0.1rem;
		box-sizing: border-box;
		margin-bottom: 0.2rem;
		float: left;
		overflow: hidden;
	}
	.entranceGuardList{
		width: 100%;
		height: 100%;
		background: #fff;
		overflow: hidden;
		display: flex;
		align-items: center;
		justify-content: space-around;
		position: relative;
	}
	.entranceGuardList>.offLine{
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
	.entranceGuardList>.entranceUser{
		flex: 1;
		height: 1.8rem;
		font-size: 12px;
		color: #000;
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
	}
	.entranceGuardList>.entranceState{
		flex: 1;
		height: 1.4rem;
		background-image: url(../../assets/img/entranceImg.png);
		background-size: contain;
		background-repeat: no-repeat;
		background-position: center; 
		display: block;
		position: relative;
		margin-bottom: 0.2rem;
	}
	.entranceGuardList>.offEntranceState{
		background-image: url(../../assets/img/offEntranceImg.png) !important;
	}
	.entranceDeviceId{
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
