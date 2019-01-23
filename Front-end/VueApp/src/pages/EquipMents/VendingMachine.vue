<template>
	<div class="page" :clubId="changeClubId">
		<div class="allVendingMachineBox">
			<div class="vendingMachineBox" v-for="list in vendingMachine" @click="toGoodsChannel()">
				<div class="vendingMachine">
					<span class="offLine" v-if="list.state==2">离线</span>
					<span class="offGoods" v-if="list.state==3">缺货</span>
					<div class="vendingUser">
						<span>{{list.content}}</span>
					</div>
					<i class="vendingState" :class="{'offVendingState':list.state==2,'outOfStock':list.state==3}" :state="list.state"></i>
					 <div class="vendingDeviceId">
						<span>NO.123123121</span>
					</div>
				</div>
			</div>
			<v-touch tag="div" class="addGoodsBtn" v-on:tap="toAddGoods()">
	            <span class="fa fa-plus"></span>
	        </v-touch>
		</div>
	</div>
</template>
<script>
import {Toast,MessageBox} from 'mint-ui';
import {mapGetters} from 'vuex';
export default {
  	name: 'VendingMachine',
    data () {
		return {
			vendingMachine: [{
				"state": "1",
				"id" : "1",
				"content": "大厅售货机"
			},{
				"state": "2",
				"id" : "2",
				"content": "操房售货机"
			},{
				"state": "3",
				"id" : "3",
				"content": "办公室售货机"
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
    			//this.loadVending(val);
    		}
    	}
    },
    mounted() {
    	this.$nextTick(() => {
			this.loadVending();
		})
    },
    methods: {
    	loadVending(val){
    		var _this = this;
            this.$http.get('/gp/LuchyBird/device/getDeviceState.do?clubId=134&deviceType=vending')
            .then(function (data) {
            	if(data.data.status == 0){
            		let value = data.data.data;
                	_this.vendingMachine = value;
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
    	toAddGoods(){
    		this.$router.push({name:'AddGoods'});
    	},
    	toGoodsChannel(){
    		this.$router.push({name:'GoodsChannel'});
    	},
    }
  }
</script>
<style scoped>
	.page{
		width: 100%;
		height: 100%;
		overflow: auto;
		position: relative;
	}
	.allVendingMachineBox{
		padding: 0 0.2rem;
		box-sizing: border-box;
	}
	.vendingMachineBox{
		width: 50%;
		height: 2.6rem;
		padding: 0 0.1rem;
		box-sizing: border-box;
		margin-bottom: 0.2rem;
		float: left;
		overflow: hidden;
	}
	.vendingMachine{
		width: 100%;
		height: 100%;
		background: #fff;
		overflow: hidden;
		display: flex;
		align-items: center;
		justify-content: space-around;
		position: relative;
	}
	.vendingMachine>.vendingUser{
		flex: 1;
		height: 1.8rem;
		font-size: 12px;
		color: #000;
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
	}
	.vendingMachine>.offLine{
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
	.vendingMachine>.offGoods{
		width: auto;
		height: auto;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 0.32rem;
		color: #fff;
		padding: 0.1rem 0.15rem;
		box-sizing: border-box;
		background-image: url(../../assets/img/offGoods.png);
		background-size: contain;
		background-position: center;
		background-repeat: no-repeat;
		position: absolute;
		left: 0;
		top: 0;
	}
	.vendingMachine>.vendingState{
		flex: 1;
		height: 1.4rem;
		background-image: url(../../assets/img/vendingMachine.png);
		background-size: contain;
		background-repeat: no-repeat;
		background-position: center; 
		display: block;
		position: relative;
		margin-bottom: 0.2rem;
	}
	.vendingMachine>.offVendingState{
		background-image: url(../../assets/img/offVendingMachine.png) !important;
	}
	.vendingMachine>.outOfStock{
		background-image: url(../../assets/img/outOfStock.png) !important;
	}
	.addGoodsBtn{
        width: 1.4rem;
        height: 1.4rem;
        border-radius: 50%;
        box-sizing: border-box;
        box-shadow: 0 3px 5px -1px rgba(0,0,0,.2), 0 6px 10px 0 rgba(0,0,0,.14), 0 1px 18px 0 rgba(0,0,0,.12);
        background: #f0832f;
        color: #fff;
        font-size: 0.46rem;
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        right: 0.4rem;
        bottom: 0.8rem;
        z-index: 999;
        overflow: hidden;
    }
    .vendingDeviceId{
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
