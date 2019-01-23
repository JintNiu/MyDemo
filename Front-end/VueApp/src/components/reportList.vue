<template>
  	<div class="page">
		<div class="headerBox">
			<!-- <i class="fa fa-plus" @click="addClub()"></i> -->
			<i></i>
			<div @click="clubListShow()">
				<span>{{clubName}}</span>
				<i class="fa fa-caret-down"></i>
			</div>		
			<i></i>
			<!-- <i class="fa fa-ellipsis-h" @click="actionSheet()"></i> -->
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
    		<v-scroll :on-refresh="onRefresh">
				<div class="chartBox">
    			<!-- <a href="sms:17801115673">发短信</a>   -->
    			<!-- <a href="tel:17801115673">打电话</a> -->
					<div class="reportDetails cardSellDetails" @click="cardSellDetails(clubId,'order')">
						<span>会员卡销售(近一周)</span>
						<div>
							<span>详情</span>	
							<i class="fa fa-angle-right"></i>
						</div>	
					</div>
					<canvas id="myChart1"></canvas>
					<i class="chartCode" id="chart1Code" ref="chart1Code" v-if="code1Show"></i>
				</div>
				<div class="chartBox">
					<div class="reportDetails doorDetails" @click="cardSellDetails(clubId,'door')">
						<span>会员卡类型销售(近一周)</span>
						<div>
							<span>详情</span>	
							<i class="fa fa-angle-right"></i>
						</div>
					</div>
					<canvas id="myChart2"></canvas>
					<i class="chartCode" id="chart2Code" ref="chart2Code" v-if="code2Show"></i>
				</div>
				<div class="chartBox">
					<div class="reportDetails classDetails" @click="cardSellDetails(clubId,'publicClass')">
						<span>团课报表(近一周)</span>
						<div>
							<span>详情</span>	
							<i class="fa fa-angle-right"></i>
						</div>
					</div>
					<canvas id="myChart3" ref="myChart3"></canvas>
					<i class="chartCode" id="chart3Code" ref="chart3Code" v-if="code3Show">
						<img src="../assets/img/circleNone.png" alt="">
					</i>
				</div>
				<div class="chartBox">
					<div class="reportDetails privateDetails" @click="cardSellDetails(clubId,'privateClass')">
						<span>私教报表(近一周)</span>
						<div>
							<span>详情</span>	
							<i class="fa fa-angle-right"></i>
						</div>
					</div>
					<canvas id="myChart4" ref="myChart4"></canvas>
					<i class="chartCode" id="chart4Code" ref="chart4Code" v-if="code4Show">
						<img src="../assets/img/circleNone.png" alt="">
					</i>
				</div>
				<div class="chartBox">
					<div class="reportDetails memberDetails">
						<span>注册用户(近一周)</span>
						<!-- <div>
							<span>详情</span>	
							<i class="fa fa-angle-right"></i>
						</div> -->	
					</div>
					<canvas id="myChart5"></canvas>
					<i class="chartCode" id="chart5Code" ref="chart5Code" v-if="code5Show"></i>
				</div>
				<div class="chartBox">
					<div class="reportDetails cardTypeDetails">
						<span>客流统计(近一周)</span>
						<!-- <div>
							<span>详情</span>	
							<i class="fa fa-angle-right"></i>
						</div>	 -->
					</div>
					<canvas id="myChart6"></canvas>
					<i class="chartCode" id="chart6Code" ref="chart6Code" v-if="code6Show"></i>
				</div>
			</v-scroll>
		</div>
		<!-- 底部提示框 -->
		<mt-actionsheet
			:actions='actions'
			v-model='sheetVisible'>	
		</mt-actionsheet>
  	</div>
</template>
<script>
var w = document.documentElement.clientWidth || document.body.clientWidth;
var h = document.documentElement.clientHeight || document.body.clientHeight;

import Chart from 'chart.js';
import Scroll from './scroll';
import { Toast,Popup } from 'mint-ui';
export default {
  	components: {
		'v-scroll': Scroll
  	},
  	data() {
    	return {
    		manageId: '',
    		// managerName: '',
      		sheetVisible: false,
      		popupVisible: false,
      		code1Show: false,
      		code2Show: false,
      		code3Show: false,
      		code4Show: false,
      		code5Show: false,
      		code6Show: false, // 默认隐藏，该避免更换门店后，无数据时的多余 操作
      		clubId: '',
      		clubName: '',
      		sevenDay: '',
      		day: '',
      		clubListNum: 0,
      		clubListBox: [],
      		actions:[
      			{
      				name: '品牌管理',
      				method: this.clubManage,
      			},{
      				name: '退出当前账户',
      				method: this.signOut,
      			}
      		],
      		lineBarOptions:{
      			responsive : true, 
      			title:{display: false,},
      			legend :{
      				labels : {usePointStyle: true},
      			},
      			tooltips:{
      				enabled : true,
      				intersect: true,
      			}
      		},
      		circleOptions:{
      			responsive : true, 
      			title:{display: false,},
      			legend :{
      				display: false,
      			},
      			tooltips:{
      				enabled : true,
      				intersect: true,
      			}
      		},
      		// myChart1Labels: [
      		// 	"健身年卡","健身月卡","健身季卡","健身周卡"
      		// ],
      		// myChart1Data: [
      		// 	'26','30','12','22'
      		// ],
      		// myChart2Labels: [
      		// 	"健身卡","瑜伽卡","私教卡"
      		// ],
      		// myChart2Data: [
      		// 	'26','30','42'
      		// ],
      		// myChart3Labels: [
      		// 	"动感单车","普拉提","爵士舞","瑜伽理疗"
      		// ],
      		// myChart3Data: [
      		// 	'26','30','12','22'
      		// ],
      		// myChart4Labels: [
      		// 	"动感单车","普拉提","爵士舞","瑜伽理疗"
      		// ],
      		// myChart4Data: [
      		// 	'26','30','12','22'
      		// ],
      		// myChart5Labels: [
      		// 	"1.25","1.26","1.27","1.28","1.29","1.30","1.31"
      		// ],
      		// myChart5Data: [
      		// 	'11','20','34','22','16','35','45'
      		// ],
      		// myChart6Labels: [
      		// 	"1.25","1.26","1.27","1.28","1.29","1.30","1.31"
      		// ],
      		// myChart6Data: [
      		// 	'26','30','12','22','11','45','65'
      		// ],
      		myChart1Labels: [],
      		myChart1Data: [],
      		myChart2Labels: [],
      		myChart2Data: [],
      		myChart3Labels: [],
      		myChart3Data: [],
      		myChart4Labels: [],
      		myChart4Data: [],
      		myChart5Labels: [],
      		myChart5Data: [],
      		myChart6Labels: [],
      		myChart6Data: [],
		};
	},
	created(){
		// this.ajax();
	},
	mounted (){
		this.$nextTick(() => {
			let getManageId = window.location.href.split('?')[1].split('=')[1];
			// this.manageId = window.location.href.split('?')[1].split('=')[1]; // manageId
			// this.managerName = window.location.href.split('?')[1].split('&')[1].split('=')[1]; // managerName
			// this.manageId = 223;
			if(getManageId == null){
				this.manageId = localStorage.getItem("manageId");
			}else{
				this.manageId = getManageId;
				localStorage.setItem("manageId",this.manageId);
			}
			// localStorage.setItem("managerName",this.managerName);
			this.getTime(); // 获取近一周的时间
			this.clubList(); // 门店列表(加载成功之后在回调中加载图表)

		})
	},
	computed:{

	},
	methods: {
		addClub(){
			this.$router.push('/room');
		},
		// 控制底部弹框显示隐藏
		actionSheet(){
			this.sheetVisible = !this.sheetVisible;
		},
		// 控制门店列表显示隐藏
		clubListShow(){
			this.popupVisible = !this.popupVisible;
		},
		// 报表详情
		cardSellDetails(clubId,type){
			this.$router.push({name:'ReportDetailsList',params:{clubId:clubId,type:type}});
		},
		clubManage(){
			Toast({
				message: '品牌管理',
				position: 'bottom',
				duration: 2000
			});
		},
		signOut(){
			Toast({
				message: '登出',
				position: 'bottom',
				duration: 2000
			});
		},
		clubList(){ // 门店列表
			let _this = this;
			this.$http.post('/LuchyBird/manage/clubListByManageId.do?manageId='+this.manageId+'')
			.then(function (data) {
				if(data.data.status == 0){
					let value = data.data.data;
					for(let i in value){
						_this.clubListNum += 1;
						_this.clubListBox.push(value[i]);
					}
					_this.clubName = value[0].clubName; // 初始化clubName
					_this.clubId = value[0].clubId; // 初始化clubId
					_this.myChart1(_this.clubId);
					_this.myChart2(_this.clubId);
					_this.myChart3(_this.clubId);
					_this.myChart4(_this.clubId);
					_this.myChart5(_this.clubId);
					_this.myChart6(_this.clubId);
				}else{
					Toast({
						message: data.data.msg,
						position: 'bottom',
						duration: 2000
					});
				}
			})
			.catch(function (data) {
				
			});
		},
		selectClub(clubId,clubName){
			this.clubId = clubId;
			this.clubName = clubName;
			this.popupVisible = !this.popupVisible;
			this.myChart1(clubId);
			this.myChart2(clubId);
			this.myChart3(clubId);
			this.myChart4(clubId);
			this.myChart5(clubId);
			this.myChart6(clubId);
		},
		getTime(){ // 获取近一周的时间
			let currentDate = new Date();
			let myDate = currentDate.toLocaleDateString();
			let date = new Date(myDate); 
            date.setDate(date.getDate()-6); 
         	let currentMonth=(currentDate.getMonth()+1)<10?'0'+(currentDate.getMonth()+1):(currentDate.getMonth()+1); // 当前月
            let month=(date.getMonth()+1)<10?'0'+(date.getMonth()+1):(date.getMonth()+1); // 月
            this.sevenDay = (date.getFullYear()+'-'+month+'-'+(date.getDate()<10?'0'+date.getDate():date.getDate())).split('-').join('')+'000000';
            this.day = (currentDate.getFullYear()+'-'+currentMonth+'-'+(currentDate.getDate()<10?'0'+currentDate.getDate():currentDate.getDate())).split('-').join('')+'235959';
		},
		onRefresh(done) {
       		let _this = this;
       		// setTimeout(function(){
       		_this.getTime(); // 获取近一周的时间
			_this.myChart1(_this.clubId);
			_this.myChart2(_this.clubId);
			_this.myChart3(_this.clubId);
			_this.myChart4(_this.clubId);
			_this.myChart5(_this.clubId);
			_this.myChart6(_this.clubId);
         	done() // call done
       		// },1000)
    	},
		myChart1(clubId){
			let ctx1 = document.getElementById("myChart1");
			let _this = this;
			this.$http.post('/LuchyBird/manage/statisticsOfOrderByClubAndTime.do?clubId='+clubId+'&startTime='+this.sevenDay+'&endTime='+this.day+'')
			.then(function (data) {
				let value = data.data.data;
				_this.myChart1Labels = [];
				_this.myChart1Data = [];
				if(value == '' || value == null){
					_this.myChart1Labels.push('暂无数据');
					_this.myChart1Data.push('0');
					_this.code1Show = true;
				}else{					
					for(let i in value){
						_this.myChart1Labels.push(value[i].date);
						_this.myChart1Data.push(value[i].dy);
					}
					_this.code1Show = false;
				}
				let myChart1 = new Chart(ctx1, {
		            type: "line",
		            data: {
		                labels: _this.myChart1Labels,
		                datasets: [
		                    {
		                        label: "数量",
		                        fillColor : "rgba(220,220,220,0.2)",
								strokeColor : "rgba(220,220,220,1)",
								pointColor : "rgba(220,220,220,1)",
		                        backgroundColor: "rgba(255,195,149,0.2)",
		                        borderColor: "#F9A25E",
								borderWidth: 1,
								pointStrokeColor: "#fff",
								pointBorderWidth : 3,
								pointRadius : 5,
		                        data: _this.myChart1Data,
		                        cubicInterpolationMode: "monotone",
		                        spanGaps: true, // 空数据是否绘制
		                    }
		                ]
		            },
		            options: _this.lineBarOptions // 在data中默认配置
				});			
			})
			.catch(function (data) {
				// alert(data);
			});
		},
		myChart2(clubId){
			let ctx2 = document.getElementById("myChart2");
			let _this = this;
			this.$http.post('/LuchyBird/manage/selectStatisticsOfOrderGroupByClubAndTime.do?clubId='+clubId+'&startTime='+this.sevenDay+'&endTime='+this.day+'')
			.then(function (data) {
				let value = data.data.data;
				_this.myChart2Labels = [];
				_this.myChart2Data = [];
				if(value == '' || value == null){
					_this.myChart2Labels.push('暂无数据');
					_this.myChart2Data.push('0');
					_this.code2Show = true;
				}else{					
					for(let i in value){
						_this.myChart2Labels.push(value[i].date);
						_this.myChart2Data.push(value[i].dy);
					}
					_this.code2Show = false;
				}
				let myChart2 = new Chart(ctx2, {
		            type: "bar",
		            data: {
		                labels: _this.myChart2Labels,
		                datasets: [
		                    {
		                        label: "数量",
		                        backgroundColor: ["#DCEDC8",'#64B5F6','#AB47BC','#FFEE58','#E91E63','#FF7043','#D500F9'],
								pointStrokeColor: "#fff",
								pointBorderWidth : 3,
								pointRadius : 5,
		                        data: _this.myChart2Data,
		                        cubicInterpolationMode: "monotone",
		                        spanGaps: true,
		                    }
		                ]
		            },
		            options: _this.lineBarOptions // 在data中默认配置
				});			
			})
			.catch(function (data) {
				// alert(data);
			});
		},
		myChart3(clubId){
			let ctx3 = document.getElementById("myChart3");
			let _this = this;
			this.$http.post('/LuchyBird/manage/statisticsOfPublicClassByClubAndTime.do?clubId='+clubId+'&startTime='+this.sevenDay+'&endTime='+this.day+'')
			.then(function (data) {
				let value = data.data.data;
				_this.myChart3Labels = [];
				_this.myChart3Data = [];
				if(value == '' || value == null){
					_this.myChart3Labels.push('暂无数据');
					_this.myChart3Data.push('无');
					_this.code3Show = true;
				}else{					
					for(let i in value){
						_this.myChart3Labels.push(value[i].date);
						_this.myChart3Data.push(value[i].dy);
					}
					_this.code3Show = false;
				}
				let myChart3 = new Chart(ctx3, {
		            type: "doughnut",
		            data: {
		                labels: _this.myChart3Labels,
		                datasets: [
		                    {
		                        label: "数量",
		                        backgroundColor: ["#B6FAD5",'#6ACBF8','#80C582','#FCDA6E','#FE81A9','#A78BD5','#FD7F2C'],
								pointStrokeColor: "#fff",
								segmentStrokeWidth : 2,
								percentageInnerCutout : 20,
		                        data: _this.myChart3Data,
		                        cubicInterpolationMode: "monotone",
		                        spanGaps: true,
		                        fill: false,
		                    }
		                ]
		            },
		            options: _this.circleOptions // 在data中默认配置
				});			
			})
			.catch(function (data) {
				// alert(data);
			});
		},
		myChart4(clubId){
			let ctx4 = document.getElementById("myChart4");
			let _this = this;
			this.$http.post('/LuchyBird/manage/privateClassTypeSaleCaseByTime.do?clubId='+clubId+'&startTime='+this.sevenDay+'&endTime='+this.day+'')
			.then(function (data) {
				let value = data.data.data;
				_this.myChart4Labels = [];
				_this.myChart4Data = [];
				if(value == '' || value == null){
					_this.myChart4Labels.push('暂无数据');
					_this.myChart4Data.push('无');
					_this.code4Show = true;
				}else{					
					for(let i in value){
						_this.myChart4Labels.push(value[i].teacherName);
						_this.myChart4Data.push(value[i].classCount);
					}
					_this.code4Show = false;
				}
				let myChart4 = new Chart(ctx4, {
		            type: "doughnut",
		            data: {
		                labels: _this.myChart4Labels,
		                datasets: [
		                    {
		                        label: "数量",
		                        backgroundColor: ["#B6FAD5",'#6ACBF8','#80C582','#FCDA6E','#FE81A9','#A78BD5','#FD7F2C'],
								pointStrokeColor: "#fff",
								segmentStrokeWidth : 2,
								percentageInnerCutout : 20,
		                        data: _this.myChart4Data,
		                        cubicInterpolationMode: "monotone",
		                        spanGaps: true,
		                        fill: false,
		                    }
		                ]
		            },
		            options: _this.circleOptions // 在data中默认配置
				});			
			})
			.catch(function (data) {
				// alert(data);
			});
		},
		myChart5(clubId){
			let ctx5 = document.getElementById("myChart5");
			let _this = this;
			this.$http.post('/LuchyBird/manage/statisticsOfUserByClubAndTime.do?clubId='+clubId+'&startTime='+this.sevenDay+'&endTime='+this.day+'')
			.then(function (data) {
				let value = data.data.data;
				_this.myChart5Labels = [];
				_this.myChart5Data = [];
				if(value == '' || value == null){
					_this.myChart5Labels.push('暂无数据');
					_this.myChart5Data.push('0');
					_this.code5Show = true;
				}else{					
					for(let i in value){
						_this.myChart5Labels.push(value[i].date);
						_this.myChart5Data.push(value[i].dy);
					}
					_this.code5Show = false;
				}
				let myChart5 = new Chart(ctx5, {
		            type: "line",
		            data: {
		                labels: _this.myChart5Labels,
		                datasets: [
		                    {
		                    	label: "数量",
		                        fillColor : "rgba(220,220,220,0.2)",
								strokeColor : "rgba(220,220,220,1)",
								pointColor : "rgba(220,220,220,1)",
		                        backgroundColor: "rgba(255,195,149,0.2)",
		                        borderColor: "#F9A25E",
								borderWidth: 1,
								pointStrokeColor: "#fff",
								pointBorderWidth : 3,
								pointRadius : 5,
		                        data: _this.myChart5Data,
		                        cubicInterpolationMode: "monotone",
		                        spanGaps: true,
		                    }
		                ]
		            },
		            options: _this.lineBarOptions // 在data中默认配置
				});			
			})
			.catch(function (data) {
				// alert(data);
			});
		},
		myChart6(clubId){
			let ctx6 = document.getElementById("myChart6");
			let _this = this;
			this.$http.post('/LuchyBird/manage/statisticsOfDoorByClubAndTime.do?clubId='+clubId+'&startTime='+this.sevenDay+'&endTime='+this.day+'')
			.then(function (data) {
				let value = data.data.data;
				_this.myChart6Labels = [];
				_this.myChart6Data = [];
				if(value == '' || value == null){
					_this.myChart6Labels.push('暂无数据');
					_this.myChart6Data.push('0');
					_this.code6Show = true;
				}else{					
					for(let i in value){
						_this.myChart6Labels.push(value[i].date);
						_this.myChart6Data.push(value[i].dy);
					}
					_this.code6Show = false;
				}
				let myChart6 = new Chart(ctx6, {
		            type: "line",
		            data: {
		                labels: _this.myChart6Labels,
		                datasets: [
		                    {
		                        label: "数量",
		                        fillColor : "rgba(220,220,220,0.2)",
								strokeColor : "rgba(220,220,220,1)",
								pointColor : "rgba(220,220,220,1)",
		                        backgroundColor: "rgba(255,195,149,0.2)",
		                        borderColor: "#F9A25E",
								borderWidth: 1,
								pointStrokeColor: "#fff",
								pointBorderWidth : 3,
								pointRadius : 5,
		                        data: _this.myChart6Data,
		                        cubicInterpolationMode: "monotone",
		                        spanGaps: true,
		                    }
		                ]
		            },
		            options: _this.lineBarOptions // 在data中默认配置
				});			
			})
			.catch(function (data) {
				// alert(data);
			});
		}
  	}
};
</script>
<style scoped>
	h2 {
		font-family: Candara, Calibri, Segoe, Segoe UI, Optima, Arial, sans-serif;
		color: #888;
	}
	.page-content {
		width: 100%;
		min-height: 100vh;
		background: #fff;
		padding: 40px 0 52px;
		margin-top: -40px;
		box-sizing: border-box;
		overflow: auto;
	}
	.yo-scroll{
		bottom: 50px !important;
	}
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
	.headerBox>i:nth-of-type(1){
		text-align: left;
	}
	.headerBox>i:nth-of-type(2){
		text-align: right;
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
	.chartBox{
		width: 100%;
		height: auto;
		margin: 0 auto;
		padding: 0.4rem 0;
		box-shadow: 0 1px 3px #f2f2f2;
		box-sizing: border-box;
		position: relative;
		overflow: hidden;
	}
	.chartCode{
		width: 100%;
		height: 160px;
		box-sizing: border-box;
		display: block;
		position: absolute;
		left: 0;
		bottom: 50%;
		margin-bottom: -100px;
		z-index: 999999999;
	}
	.chartCode>img{
		height: 100%;
		display: block;
		margin: 0 auto;
	}
	/* 报表详情 */
	.chartBox>.reportDetails{
		width: 100%;
		height: 40px;
		padding: 0 0.4rem;
		box-sizing: border-box;
		overflow: hidden;
	}
	.chartBox>.reportDetails>span{
		width: 65%;
		height: 100%;
		line-height: 40px;
		color: #000;
		font-size: 14px;
		text-align: left;
		float: left;
		display: block;
	}
	.chartBox>.reportDetails>div{
		width: 35%;
		height: 100%;
		line-height: 40px;
		color: #000;
		font-size: 14px;
		text-align: right;
		float: left;
		display: block;
	}
	.chartBox>.reportDetails>div>span{
		margin-right: 0.2rem;
	}
	.fade-enter-active, .fade-leave-active {
		transition: opacity .5s
	}
	.fade-enter, .fade-leave-to /* .fade-leave-active in below version 2.1.8 */ {
		opacity: 0
	}
</style>
