<template>
	<div class="page">
		<div class="headerBox">
			<i></i>
			<div @click="clubListShow()">
				<span>{{clubName}}</span>
				<i class="fa fa-caret-down"></i>
			</div>		
			<i></i>
		</div>
		<!-- 模态框 -->
		<mt-popup v-model="popupVisible" :modal=true
				position="top"
		  popup-transition="popup-slide" style="width:100%;">
			<div class="clubListBox">
				<div class="allClubNum">
					<span>俱乐部数量</span>
					<span>{{clubListNum}}</span>
				</div>	
				<div class="allClubList">
					<div v-for="(list,index) in clubListBox" :id="list.clubId" @click="selectClub(list.clubId,list.clubName)" class="activeClub" :key="index">
						<i><img src="../assets/img/clubIcon.png" alt=""></i>
						<span>{{list.clubName}}</span>
					</div>
				</div>
			</div>
		</mt-popup>
		<div class="page-content">
			<div class="tabs">
				<span v-for="(list,index) in roleList" :class="{selected: activeName == list.model}" @click="toModel(index,list.model)" :key="index">{{list.name}}</span>
				<i class="slideLine" ref="slideLine"><span></span></i>
			</div>
			<div class="child-pages">
				<swiper :options="swiperOption"  ref="equipmentList">  
	                <!-- 这部分放你要渲染的那些内容 -->  
	                <swiper-slide> 
	                	<div class="equipmentListBox" v-for="(index,list) in treadmillList" :key="index">
							<div class="treadmillList">
								<div class="treadmillUser">
									<i class="userImg">		
										<img src="../assets/img/userPhoto.png" v-if="list.state==5">
										<img :src="'+list.headImgUrl+'" v-if="list.state==2">
										<img src="../assets/img/offlineUserIcon.png" v-if="list.state==1||list.state==3">
										<img src="../assets/img/noUserIcon.png" v-if="list.state==4">
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
								<div class="equipmentDeviceId">
									<span>NO.{{list.deviceId}}</span>
								</div>		
							</div>
						</div>
	                </swiper-slide> 
	                <swiper-slide> 
	                    <div class="equipmentListBox" v-for="(index,list) in entranceGuardList" :id="list.deviceId" @click="openDoor(list.deviceId)" :key="index">
							<div class="entranceGuardList">
								<span class="offLine" v-if="list.state==4">离线</span>
								<div class="entranceUser">
									<span>{{list.screenName}}</span>
								</div>
								<i class="entranceState" :class="{'offEntranceState':list.state==2}" :state="list.state"></i>
								<div class="equipmentDeviceId">
									<span>NO.{{list.deviceId}}</span>
								</div>
							</div>
						</div>
	                </swiper-slide>  
	                <swiper-slide>
	                    <div class="equipmentListBox" v-for="(index,list) in lockersList" @click="toLockerNumList(list.deviceId)" :key="index">
							<div class="lockersList">
								<span class="offLine" v-if="list.state==2">离线</span>
								<div class="lockersUser">
									<span>{{list.screenName}}</span>
								</div>
								<i class="lockersState" :class="{'offLockersState':list.state==2}" :state="list.state"></i>
								<div class="equipmentDeviceId">
									<span>NO.{{list.deviceId}}</span>
								</div>
							</div>
						</div>
	                </swiper-slide>   
	                <swiper-slide>
	                    <div class="equipmentListBox" v-for="(index,list) in vendingMachineList" @click="toGoodsChannel(list.deviceId)" :key="index">
							<div class="vendingMachine">
								<span class="offLine" v-if="list.state==4">离线</span>
								<!-- <span class="offGoods" v-if="list.state==3">缺货</span> -->
								<div class="vendingUser">
									<span>{{list.screenName}}</span>
								</div>
								<!-- 'outOfStock':list.state==3 -->
								<i class="vendingState" :class="{'offVendingState':list.state==4}" :state="list.state"></i>
								 <div class="equipmentDeviceId">
									<span>NO.{{list.deviceId}}</span>
								</div>
							</div>
						</div>
						<div class="addGoodsBtn" @click="toAddGoods()">
				            <span class="fa fa-plus"></span>
				        </div>
	                </swiper-slide>  
	                <swiper-slide>
						<div class="equipmentListBox" v-for="(index,list) in lampControlList" @click="toLampControlList(list.deviceId)" :key="index">
							<div class="lampControl">
								<span class="offLine" v-if="list.state==2">离线</span>
								<div class="lampUser">
									<span>{{list.screenName}}</span>
								</div>
								<i class="lampState" :class="{'offlampState':list.state==2}" :state="list.state"></i>
								<div class="equipmentDeviceId">
									<span>NO.{{list.deviceId}}</span>
								</div>
							</div>
						</div>
	                </swiper-slide>  
	            </swiper> 
			</div>
		</div>
		<div class="kong"></div>
	</div>
</template>
<script>
// import {mapGetters} from 'vuex'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import {Toast,MessageBox} from 'mint-ui';
export default {
  	name: 'Equipment',
    data () {
		return {
			manageId: '', // 管理员ID
			popupVisible: false,
			clubId: '',
  			clubName: '',
  			clubListNum: 0,
  			clubListBox: [],
			activeName: 'equipment1',
			roleList: [
  				{name: '跑步机',model: 'equipment1'},
  				{name: '门禁',model: 'equipment2'},
  				{name: '储物柜',model: 'equipment3'},
  				{name: '售货机',model: 'equipment4'},
				{name: '灯控',model: 'equipment5'},
  			],
  			swiperOption: {   
                notNextTick: false,   
                speed: 500,
                observer:true,
                observeParents:true
            },
            selectType: 'run',
            treadmillList: [],
            entranceGuardList: [],
            lockersList: [],
            vendingMachineList: [],
            lampControlList: [],
		}
    },
    computed: {  
        swiper() {  
            return this.$refs.equipmentList.swiper;   
        },
     //    ...mapGetters([
	    //   'currentClubId'
	    // ])
    },
    components:{
    	'swiper' : swiper,  
        'swiperSlide' : swiperSlide  
    },
    mounted() {
    	this.$nextTick(() => {
    		this.manageId = localStorage.getItem("manageId");
			this.clubList(); // 门店列表
			const _this = this;
			this.swiper.on('slideChangeTransitionEnd',function(e){
				_this.activeName = 'equipment'+(this.activeIndex+1);
				_this.toModel(this.activeIndex,_this.activeName)
			}) // page切换，tab也相应切换
			this.swiper.on('setTranslate',function(translate){
				const windowWidth = document.body.clientWidth;
				_this.$refs.slideLine.style.left = -((translate/windowWidth)*(windowWidth/5))+'px';
			})
		})
    },
    methods: {
    	// 控制门店列表显示隐藏
		clubListShow(){
			this.popupVisible = !this.popupVisible;
		},
		clubList(){ // 门店列表
			var _this = this;
			this.$http.post('/LuchyBird/manage/clubListByManageId.do?manageId='+this.manageId+'')
			.then(function (data) {
				var value = data.data.data;
				for(var i in value){
					_this.clubListNum += 1;
					_this.clubListBox.push(value[i]);
				}
				_this.clubName = value[0].clubName; // 初始化clubName
				_this.clubId = value[0].clubId; // 初始化clubId
				_this.currentClubId = value[0].clubId;
				_this.loadEntrance(_this.selectType); // 初始加载选中设备
			})
			.catch(function (data) {
				// alert(data);
			});
		},
		selectClub(clubId,clubName){
			this.clubId = clubId;
			this.clubName = clubName;
			this.popupVisible = !this.popupVisible;
			this.treadmillList = [];
			this.entranceGuardList = [];
			this.lockersList = [];
			this.vendingMachineList = [];
			this.lampControlList = [];
			this.loadEntrance(this.selectType);
			// this.$store.commit('CURRENT_CLUB_ID',clubId) // 改变id（vuex）
		},
		toModel(index,modelName){
			this.activeName = modelName;
			this.swiper.slideTo(index,500);
			if(index == 0){
				this.selectType = 'run';
				if(this.treadmillList.length == 0){
					this.loadEntrance('run')
				}
			}else if(index == 1){
				this.selectType = 'door';
				if(this.entranceGuardList.length == 0){
					this.loadEntrance('door')
				}
			}else if(index == 2){
				this.selectType = 'locker';
				if(this.lockersList.length == 0){
					this.loadEntrance('locker')
				}
			}else if(index == 3){
				this.selectType = 'vending';
				if(this.vendingMachineList.length == 0){
					this.loadEntrance('vending')
				}
			}else if(index == 4){
				this.selectType = 'lamp';
				if(this.lampControlList.length == 0){
					this.loadEntrance('lamp')
				}
			}
		},
		loadEntrance(type){
    		var _this = this;
            this.$http.get('/LuchyBird/deviceInfo/getDeviceState.do?clubId='+this.clubId+'&deviceType='+type+'')
            .then(function (data) {
            	if(data.data.status == 0){
            		let value = data.data.data;
            		if(type == 'run'){
            			_this.treadmillList = value;
            		}else if(type == 'door'){
            			for(let i in value){
            				if(value[i].screenName == null || value[i].screenName == ''){
            					value[i].screenName = '设备'
            				}
            			}
            			_this.entranceGuardList = value;
            		}else if(type == 'locker'){
            			for(let i in value){
            				if(value[i].screenName == null || value[i].screenName == ''){
            					value[i].screenName = '设备'
            				}
            			}
            			_this.lockersList = value;
            		}else if(type == 'vending'){
            			for(let i in value){
            				if(value[i].screenName == null || value[i].screenName == ''){
            					value[i].screenName = '设备'
            				}
            			}
            			_this.vendingMachineList = value;
            		}else if(type == 'lamp'){
            			for(let i in value){
            				if(value[i].screenName == null || value[i].screenName == ''){
            					value[i].screenName = '设备'
            				}
            			}
            			_this.lampControlList = value;
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
    	// 开储物柜
		openDoor(deviceId){
			MessageBox.confirm('确定要开启大门么？').then(action => {
                this.$http.get('/LuchyBird/deviceInfo/openDoor.do?managerId='+this.manageId+'&deviceId='+deviceId+'')
	            .then(function (data) {
	            	if(data.data.status == 0){
	            		Toast({
							message: '大门开启',
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
            },() => {});
		},
		// 去柜子列表
		toLockerNumList(deviceId){
    		this.$router.push({name:'LockersNumList',params:{deviceId:deviceId}});
    	},
    	// 灯控场景
    	toLampControlList(deviceId){
    		this.$router.push({name:'LampControlList',params:{deviceId:deviceId}});
    	},
    	// 添加商品
    	toAddGoods(){
    		this.$router.push({name:'AddGoods'});
    	},
    	// 货道
    	toGoodsChannel(deviceId){
    		this.$router.push({name:'GoodsChannel',params:{deviceId:deviceId}});
    	},

    }
  }
</script>
<style scoped>
	/* 头部 */
	.headerBox{
		width: 100%;
		height: 40px;
		overflow: hidden;
		position: fixed;
		left: 0;
		top: 0;
		z-index: 1;
		/*background: #26a2ff;*/
		background: #000;
		padding: 0 0.4rem;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: space-around;
	}
	.headerBox>i{
		width: 2rem;
		height: 100%;
		line-height: 40px;
		color: #fff;
		font-size: 0.36rem;
		display: block;
	}
	.headerBox>div{
		width: 6rem;
		height: 100%;
		line-height: 40px;
		text-align: center;
		color: #fff;
		font-size: 14px;
		overflow: hidden;
		text-overflow:ellipsis;
		white-space: nowrap;
		position: relative;
	}
	.headerBox>div>i{
		width: 10px;
		height: 10px;
		font-size: 10px;
		display: block;
		position: absolute;
		left: 50%;
		bottom: 2px;
		margin-left: -5px;
	}
	/* 门店列表 */
	.clubListBox{
		width: 100%;
		height: auto;
		background: #fff;
		box-sizing: border-box;
		overflow: auto;
		position: relative;
	}
	.clubListBox>.allClubNum{
		width: 100%;
		height: 40px;
		background: #000;
		display: flex;
		align-items: center;
		justify-content: center;
		box-sizing: border-box;
		overflow: hidden;
	}
	.clubListBox>.allClubNum>span{
		font-size: 14px;
		color: #fff;
		box-sizing: border-box;
		display: block;
	}
	.clubListBox>.allClubNum>span:last-child{
		width: 0.6rem;
		height: 0.6rem;
		line-height: 0.6rem;
		border-radius: 50%;
		margin-left: 0.2rem;
		overflow: hidden;
		background: #fff;
		color: #000;
	}
	.clubListBox>.allClubList{
		width: 100%;
		max-height: 80vh;
		background: #fff;
		box-sizing: border-box;
		overflow: auto;
	}
	.clubListBox>.allClubList>div{
		width: 3.8rem;
		height: 3rem;
		margin: 0.1rem 0.8rem;
		float: left;
		overflow: hidden;
	}
	.clubListBox>.allClubList>div>i{
		width: 1.6rem;
		height: 1.6rem;
		border-radius: 50%;
		margin: 0 auto;
		margin-top: 0.2rem;
		/*background: #f0832f;*/
		overflow: hidden;
		display: block;
	}
	.clubListBox>.allClubList>div>i>img{
		width: 100%;
		height: 100%;
		display: block;
	}
	.clubListBox>.allClubList>div>span{
		width: 100%;
		height: 1rem;
		line-height: 1rem;
		text-align: center;
		font-size: 0.36rem;
		color: #000;
		display: block;
	}
	.clubListBox>.allClubList>.activeClub{
		width: 4.2rem;
		height: 3rem;
		margin: 0.1rem 0.6rem;
	}
	.tabs{
		width: 100%;
		height: 1.2rem;
		overflow: auto;
		background: #fff;
		position: fixed;
		box-sizing: border-box;
    	outline: 0;
    	white-space: nowrap;
    	display: flex;
    	align-items: center;
    	justify-content: center;
    	z-index: 111;
	}
	.tabs>span{
		flex: 1;
		height: 1.2rem;
		color: #666;
		font-size: 14px;
		line-height: 1.2rem;
		text-align: center;
		box-sizing: border-box;
		position: relative;
		display: inline-block;
	}
	.tabs>.selected{
		color: #f0832f;
	}
	.tabs>.slideLine{
		width: 20%;
		height: 0.15rem;
		display: block;
		transition: all 0.5s ease;
		position: absolute;
		left: 0;
		top: 1rem;
	}
	.tabs>.slideLine>span{
		width: 25%;
		height: 100%;
		margin: 0 auto;
		display: block;
		background: #f0832f;
		border-radius: 20px;
	}
	.child-pages{
		width: 100%;
		height: calc(100vh - 92px);
		box-sizing: border-box;
    	outline: 0;
		padding: 1.2rem 0 0;
		background: #FAFAFA;
		overflow: auto;
	}
	.modelLists{
		width: 100%;
		height: 100%;
		box-sizing: border-box;
		overflow: auto;
	}
	.kong{
		width: 100%;
		height: 52px;
		overflow: hidden;
	}
	.swiper-container{
		width: 100%;
		height: 100%;
		overflow: hidden;
	}
	.swiper-slide{
		width: 100%;
		height: 100%;
		background: #f6f6f6;
		padding: 0.2rem;
		box-sizing: border-box;
		overflow: auto;
	}
	.equipmentListBox{
		width: 50%;
		height: 2.6rem;
		padding: 0 0.1rem;
		box-sizing: border-box;
		margin-bottom: 0.2rem;
		float: left;
		overflow: hidden;
	}
	/*门禁*/
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
		background-image: url(../assets/img/offLine.png);
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
		background-image: url(../assets/img/entranceImg.png);
		background-size: contain;
		background-repeat: no-repeat;
		background-position: center; 
		display: block;
		position: relative;
		margin-bottom: 0.2rem;
	}
	.entranceGuardList>.offEntranceState{
		background-image: url(../assets/img/offEntranceImg.png) !important;
	}
	.equipmentDeviceId{
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
	/*跑步机*/
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
		background-image: url(../assets/img/tread2.png);
	}
	/*离线*/
	.treadmillList>.offlineTread{
		background-image: url(../assets/img/tread3.png);
	}
	/*跑步中*/
	.treadmillList>.runningTread{
		background-image: url(../assets/img/tread1.png);
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
	/*储物柜*/
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
		background-image: url(../assets/img/offLine.png);
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
		background-image: url(../assets/img/lockersList.png);
		background-size: contain;
		background-repeat: no-repeat;
		background-position: center; 
		display: block;
		position: relative;
		margin-bottom: 0.2rem;
	}
	.lockersList>.offLockersState{
		background-image: url(../assets/img/offLockersList.png) !important;
	}
	/*售货机*/
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
		background-image: url(../assets/img/offLine.png);
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
		background-image: url(../assets/img/offGoods.png);
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
		background-image: url(../assets/img/vendingMachine.png);
		background-size: contain;
		background-repeat: no-repeat;
		background-position: center; 
		display: block;
		position: relative;
		margin-bottom: 0.2rem;
	}
	.vendingMachine>.offVendingState{
		background-image: url(../assets/img/offVendingMachine.png) !important;
	}
	.vendingMachine>.outOfStock{
		background-image: url(../assets/img/outOfStock.png) !important;
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
    /*灯控*/
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
		background-image: url(../assets/img/offLine.png);
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
		background-image: url(../assets/img/lampControl.png);
		background-size: contain;
		background-repeat: no-repeat;
		background-position: center; 
		display: block;
		position: relative;
		margin-bottom: 0.2rem;
	}
	.lampControl>.offlampState{
		background-image: url(../assets/img/offLampControl.png) !important;
	}
</style>
