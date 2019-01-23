<template>
	<div class="page">
		<div class="headerBox">
			<i></i>
			<div @click="clubListShow()">
				<span>{{clubName}}</span>
				<i class="fa fa-caret-down"></i>
			</div>		
			<i></i>
			<!-- <i @click="toScan()"></i> -->
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
			<div class="operationList">
				<span class="noRoleList" v-if="noRoleName">暂无角色信息</span>
				<div v-for="(index,item) in roleList" :class="{activeRole: activeName == item.name}" :id="item.id" @click="selected(item)" :key="index">
					<i class="fa fa-user-o"></i>
					<span>{{item.name}}</span>
				</div>
			</div>
			<div class="memberListBox">
				<div class="todayMember" @click="toTodayMember()">
					<span class="memberNumber">{{todayMember}}</span>
					<span class="memberTitle">今日入场</span>
				</div>
				<div class="newMember" @click="toNewMember()">
					<span class="memberNumber">{{newMember}}</span>
					<span class="memberTitle">新增会员</span>
				</div>
				<div class="leagueCancelClass" @click="toLeagueCancelClass()">
					<span class="memberNumber">{{leagueCancelClass}}</span>
					<span class="memberTitle">团课消课</span>
				</div>	
				<div class="PrivateCancelClass" @click="toPrivateCancelClass()">
					<span class="memberNumber">{{PrivateCancelClass}}</span>
					<span class="memberTitle">私教消课</span>
				</div>
			</div>	
			<div class="powerListBox">
				<ul class="powerList">
					<li v-for="(index,list) in powerList" :class="list.model" @click="toModel(list.model)" :key="index">
						<i></i>
						<span>{{list.name}}</span>
					</li>
				</ul>
			</div>	
		</div>
	</div>
</template>
<script>
	// import {luckyBird} from './android.js'
	import {Toast,Popup} from 'mint-ui';
	// var windowData;
	// window["getResult"] = function (data) {
	// 	if(data != null && data != ''){
	// 		let cacheValue = eval('(' + data + ')');
	// 		if(cacheValue.action == 'scan'){
				
	// 		}
	// 	}
	// }
  	export default {
  		name: 'ClassSet',
    	data () {
			return {
				manageId: '',
				noRoleName: false,
				popupVisible: false,
				clubId: '',
      			clubName: '',
      			clubListNum: 0,
      			clubListBox: [],
      			roleList: [],
      			activeName: '',
      			todayMember: '',
      			newMember: '',
      			leagueCancelClass: '',
      			PrivateCancelClass: '',
      			powerList: [
      				{name: '报表',model: 'ReportList'},
      				{name: '所有会员',model: 'AllMember'},
      				{name: '私教列表',model: 'AllPrivateList'},
      				{name: '团课',model: 'AllLeagueClass'},
      				{name: '课表',model: 'LeagueClassTimetable'},
      				{name: '课程',model: 'LeagueClassManage'},
      				{name: '健身卡管理',model: 'CardManageList'},
      				// {name: 'LuchyBird',model: 'MyRunning'},
      				// {name: '公众号Banner',model: 'WeChatBanner'},
      			],
			}
		},
		created() {
	      	// windowData = this;
	    },
		mounted() {
			this.$nextTick(() => {
				this.manageId = localStorage.getItem("manageId");
				this.clubList(); // 门店列表
				this.getRoleList();
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
				})
				.catch(function (data) {
					// alert(data);
				});
			},
			getRoleList(){
				var _this = this;
				this.$http.post('/LuchyBird/customRole/customRolesByManagerId.do?managerId='+this.manageId+'&clubId='+this.clubId+'')
				.then(function (data) {
					if(data.data.status == 0){
						var value = data.data.data;
						if(value.roles == '' || value.roles == null){
							Toast({
		                        message: '暂无角色信息',
		                        position: 'bottom',
		                        duration: 2000
		                    });
		                    _this.noRoleName = true;
						}else{
							_this.noRoleName = false;
							_this.roleList = value.roles;
							_this.activeName = _this.roleList[0].name; // 默认选中第一个角色
						}
						_this.todayMember = value.counts.userDoorCount
		      			_this.newMember = value.counts.userJoinCount
		      			_this.leagueCancelClass = value.counts.publicClassCount
		      			_this.PrivateCancelClass = value.counts.privateClassCount
						
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
			selectClub(clubId,clubName){
				this.clubId = clubId;
				this.clubName = clubName;
				this.popupVisible = !this.popupVisible;
				this.getRoleList();
			},
			selected: function(roleName) { // 选择角色
		      	this.activeName = roleName.name
		    },
		    toModel(modelName){
		    	this.$router.push({name:modelName,params:{clubId:this.clubId}})
		    },
		    toTodayMember(){
		    	this.$router.push({name:'TodayMember',params:{clubId:this.clubId,type:1}})
		    },
		    toNewMember(){
		    	this.$router.push({name:'NewMember',params:{clubId:this.clubId,type:2}})
		    },
		    toLeagueCancelClass(){
		    	this.$router.push({name:'LeagueCancelClass',params:{clubId:this.clubId,type:3}})
		    },
		    toPrivateCancelClass(){
		    	this.$router.push({name:'PrivateCancelClass',params:{clubId:this.clubId,type:4}})
		    },
		  //   toScan(){
		  //   	let getScan = {
				// 	action : 'scan'
				// };
				// luckyBird.event(JSON.stringify(getScan));
		  //   }
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
	/*.headerBox>i:nth-of-type(2){
		background: url(../assets/img/scanQR.png) no-repeat;
		background-size: 50%;
		background-position: right;
	}*/
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
	.page-content{
		width: 100%;
		min-height: 100vh;
		background: #f2f2f2;
		padding: 40px 0 52px;
		margin-top: -40px;
		box-sizing: border-box;
	}
	/* 角色列表 */
	.operationList{
		width: 100%;
		height: 3rem;
		background: #fff;
		text-align: left;
		padding: 0 0.2rem;
		box-shadow: 0 1px 10px 1px #f2f2f2;
		box-sizing: border-box;
		overflow-x: auto;
		overflow-y: hidden;
		white-space: nowrap;
	}
	.operationList>.noRoleList{
		width: 100%;
		height: 100%;
		font-size: 0.4rem;
		color: #666;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.operationList>div{
		width: 2.6rem;
		height: 2rem;
		text-align: center;
		box-shadow: 0 0 14px 2px #f2f2f2;
		border-radius: 3px;
		margin: 0.5rem 0.2rem;
		overflow: hidden;
		display: inline-block;
	}
	.operationList>div>i{
		width: 1rem;
		height: 1rem;
		font-size: 0.8rem;
		line-height: 1rem;
		color: #666;
		margin: 0 auto;
		margin-top: 0.1rem;
		display: block;
		overflow: hidden;
	}
	.operationList>div>span{
		width: 100%;
		height: 0.8rem;
		line-height: 0.8rem;
		text-align: center;
		font-size: 14px;
		color: #666;
		display: block;
	}
	.operationList>.activeRole{
		background: #f0832f;
	}
	.operationList>.activeRole>i,.operationList>.activeRole>span{
		color: #fff;
	}
	/* 当前会员状态 */
	.memberListBox{
		width: 100%;
		height: 2.4rem;
		background: #fff;
		margin-top: 0.2rem;
		padding: 0.2rem 0;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: center;
		overflow: hidden;
	}
	.memberListBox>div{
		flex: 1;
		width: 100%;
		height: 100%;
	}
	.memberListBox>div{
		border-right: 1px dashed #f2f2f2;
	}
	.memberListBox>div:last-child{
		border: none;
	}
	.memberListBox>div>.memberNumber{
		width: 100%;
		height: 1.2rem;
		line-height: 1.2rem;
		text-align: center;
		font-size: 0.8rem;
		color: #f0832f;
		display: block;
	}
	.memberListBox>div>.memberTitle{
		width: 100%;
		height: 0.8rem;
		line-height: 0.8rem;
		text-align: center;
		font-size: 12px;
		color: #000;
		display: block;
	}
	/* 功能模块列表 */
	.powerListBox{
		width: 100%;
		height: auto;
		background: #fff;
		margin-top: 0.2rem;
		overflow: hidden;
	}
	.powerListBox>.powerList{
		width: 100%;
		height: 100%;
		overflow: hidden;
	}
	.powerListBox>.powerList>li{
		width: 33.33%;
		height: 2.4rem;
		border-right: 1px solid #f2f2f2;
		border-bottom: 1px solid #f2f2f2;
		box-sizing: border-box;
		overflow: hidden;
		float: left;
	}
	.powerListBox>.powerList>li:nth-child(3n){
		border-right: none;
	}
	.powerListBox>.powerList>li>i{
		width: 1rem;
		height: 1rem;
		background-size: contain;
		background-position: center;
		background-repeat: no-repeat; 
		margin: 0 auto;
		margin-top: 0.3rem;
		display: block;
		overflow: hidden;
	}
	.powerListBox>.powerList>.ReportList>i{
		background-image: url(../../src/assets/img/ReportList.png);
	}
	.powerListBox>.powerList>.AllMember>i{
		background-image: url(../../src/assets/img/AllMember.png);
	}
	.powerListBox>.powerList>.AllPrivateList>i{
		background-image: url(../../src/assets/img/AllPrivateList.png);
	}
	.powerListBox>.powerList>.AllLeagueClass>i{
		background-image: url(../../src/assets/img/AllLeagueClass.png);
	}
	.powerListBox>.powerList>.LeagueClassTimetable>i{
		background-image: url(../../src/assets/img/LeagueClassTimetable.png);
	}
	.powerListBox>.powerList>.LeagueClassManage>i{
		background-image: url(../../src/assets/img/LeagueClassManage.png);
	}
	.powerListBox>.powerList>.WeChatBanner>i{
		background-image: url(../../src/assets/img/WeChatBanner.png);
	}
	.powerListBox>.powerList>.MyRunning>i{
		background-image: url(../../src/assets/img/MyRunning.png);
	}
	.powerListBox>.powerList>.CardManageList>i{
		background-image: url(../../src/assets/img/CardManageList.png);
	}
	.powerListBox>.powerList>li>span{
		width: 100%;
		height: 1rem;
		line-height: 1rem;
		text-align: center;
		font-size: 12px;
		color: #000;
		display: block;
	}
</style>

