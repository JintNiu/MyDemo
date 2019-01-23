<template>
	<div class="page" id="leagueClassDateTable">
        <div class="page-content">
            <mt-header fixed title="课表管理(团课)" style="background:#000;z-index:666">
                <mt-button slot="left" icon="back" @click="$router.back()"></mt-button>
                <mt-button slot="right">
                    <div>
                        <span>上周</span>
                        <span>下周</span>
                    </div>
                </mt-button>
            </mt-header>
            <div class="week">
                <div class="kong"></div>
                <div v-for="date in allList">
                    <span>{{date.date}}</span>
                    <span>{{date.time}}</span>
                </div>
            </div>
            <div class="class-tab">
                <ul>
                    <li v-for="time in timeList">{{time}}</li>
                </ul>
                <div class="orderListBox">
                    <ul v-for="date in allList">
                       <li v-for="order in date.timeList" 
                                :class="{hasUser:order.state==0,
                                        noContent:order.state==1,
                                        teacherRest:order.state==2}" 
                        >
                            <!-- {{order.state | filterFun}} -->
                            {{order.userInfor.userName}}
                        </li>
                    </ul>
                </div>  
            </div>
            <!-- 教练休息 -->
            <mt-popup v-model="teacherRestPopup" :modal=true
                position = center
              popup-transition="popup-fade">

            </mt-popup>
            <div class="kong"></div>
            <div class="classStateTypeList">
                <div class="stateTypeBox" v-for="state in classTypeList">
                    <i :class="{endState:state.color=='red',
                                cancelState:state.color=='grey',
                                normalState:state.color=='green'}"></i>
                    <span>{{state.state}}</span>
                </div>
            </div>  
		</div>
	</div>
</template>
<script>
	var h = document.documentElement.clientHeight || document.body.clientHeight;
    import {Popup} from 'mint-ui';
  	export default {
  		name: 'leagueClassDateTable',
    	data () {
			return {
                active: '0',
				timeList:['8:00','9:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00','19:00','20:00','21:00'],
                classTypeList: [
                    {
                        "color" : "green",
                        "state" : "正常"
                    },{
                        "color" : "red",
                        "state" : "已结束"
                    },{
                        "color" : "grey",
                        "state" : "已取消"
                    }
                ],
                allList: [
                    {
                        "time": "周一",
                        "date": "12.11",
                        "timeList": [
                            {
                                "timeQuantum" : "8:00-9:00",
                                "state": "0",
                                "userInfor":{
                                    "userName":"动感单车",
                                    "userPhone":"17811111111"
                                }
                            },{
                                "timeQuantum" : "8:30-9:30",
                                "state": "1",
                                "userInfor":{
                                    "userName":"",
                                    "userPhone":""
                                }
                            },{
                                "timeQuantum" : "9:00-10:00",
                                "state": "2",
                                "userInfor":{
                                    "userName":"",
                                    "userPhone":""
                                }
                            },{
                                "timeQuantum" : "9:30-10:30",
                                "state": "2",
                                "userInfor":{
                                    "userName":"",
                                    "userPhone":""
                                }
                            },{
                                "timeQuantum" : "10:00-11:00",
                                "state": "2",
                                "userInfor":{
                                    "userName":"",
                                    "userPhone":""
                                }
                            },{
                                "timeQuantum" : "10:30-11:30",
                                "state": "1",
                                "userInfor":{
                                    "userName":"",
                                    "userPhone":""
                                }
                            },{
                                "timeQuantum" : "11:00-12:00",
                                "state": "0",
                                "userInfor":{
                                    "userName":"动感单车",
                                    "userPhone":"17811111111"
                                }
                            },{
                                "timeQuantum" : "11:30-12:30",
                                "state": "1",
                                "userInfor":{
                                    "userName":"",
                                    "userPhone":""
                                }
                            },{
                                "timeQuantum" : "12:00-13:00",
                                "state": "1",
                                "userInfor":{
                                    "userName":"",
                                    "userPhone":""
                                }
                            },{
                                "timeQuantum" : "12:30-13:30",
                                "state": "0",
                                "userInfor":{
                                    "userName":"动感单车",
                                    "userPhone":"17811111111"
                                }
                            },{
                                "timeQuantum" : "13:00-14:00",
                                "state": "1",
                                "userInfor":{
                                    "userName":"",
                                    "userPhone":""
                                }
                            },{
                                "timeQuantum" : "13:30-14:30",
                                "state": "1",
                                "userInfor":{
                                    "userName":"",
                                    "userPhone":""
                                }
                            },{
                                "timeQuantum" : "14:00-15:00",
                                "state": "1",
                                "userInfor":{
                                    "userName":"",
                                    "userPhone":""
                                }
                            },{
                                "timeQuantum" : "14:30-15:30",
                                "state": "1",
                                "userInfor":{
                                    "userName":"",
                                    "userPhone":""
                                }
                            },{
                                "timeQuantum" : "15:00-16:00",
                                "state": "1",
                                "userInfor":{
                                    "userName":"",
                                    "userPhone":""
                                }
                            },{
                                "timeQuantum" : "15:30-16:30",
                                "state": "1",
                                "userInfor":{
                                    "userName":"",
                                    "userPhone":""
                                }
                            },{
                                "timeQuantum" : "16:00-17:00",
                                "state": "0",
                                "userInfor":{
                                    "userName":"动感单车",
                                    "userPhone":"17811111111"
                                }
                            }
                        ]
                    },
                    {
                        "time": "周二",
                        "date": "12.12",
                        "timeList": [
                            {
                                "timeQuantum" : "8:00-9:00",
                                "state": "0",
                                "userInfor":{
                                    "userName":"动感单车",
                                    "userPhone":"17811111111"
                                }
                            },{
                                "timeQuantum" : "8:30-9:30",
                                "state": "1",
                                "userInfor":{
                                    "userName":"",
                                    "userPhone":""
                                }
                            },{
                                "timeQuantum" : "9:00-10:00",
                                "state": "2",
                                "userInfor":{
                                    "userName":"",
                                    "userPhone":""
                                }
                            },{
                                "timeQuantum" : "9:30-10:30",
                                "state": "2",
                                "userInfor":{
                                    "userName":"",
                                    "userPhone":""
                                }
                            },{
                                "timeQuantum" : "10:00-11:00",
                                "state": "2",
                                "userInfor":{
                                    "userName":"",
                                    "userPhone":""
                                }
                            },{
                                "timeQuantum" : "10:30-11:30",
                                "state": "1",
                                "userInfor":{
                                    "userName":"",
                                    "userPhone":""
                                }
                            },{
                                "timeQuantum" : "11:00-12:00",
                                "state": "0",
                                "userInfor":{
                                    "userName":"动感单车",
                                    "userPhone":"17811111111"
                                }
                            },{
                                "timeQuantum" : "11:30-12:30",
                                "state": "1",
                                "userInfor":{
                                    "userName":"",
                                    "userPhone":""
                                }
                            },{
                                "timeQuantum" : "12:00-13:00",
                                "state": "1",
                                "userInfor":{
                                    "userName":"",
                                    "userPhone":""
                                }
                            },{
                                "timeQuantum" : "12:30-13:30",
                                "state": "0",
                                "userInfor":{
                                    "userName":"动感单车",
                                    "userPhone":"17811111111"
                                }
                            },{
                                "timeQuantum" : "13:00-14:00",
                                "state": "1",
                                "userInfor":{
                                    "userName":"",
                                    "userPhone":""
                                }
                            },{
                                "timeQuantum" : "13:30-14:30",
                                "state": "1",
                                "userInfor":{
                                    "userName":"",
                                    "userPhone":""
                                }
                            },{
                                "timeQuantum" : "14:00-15:00",
                                "state": "1",
                                "userInfor":{
                                    "userName":"",
                                    "userPhone":""
                                }
                            },{
                                "timeQuantum" : "14:30-15:30",
                                "state": "1",
                                "userInfor":{
                                    "userName":"",
                                    "userPhone":""
                                }
                            },{
                                "timeQuantum" : "15:00-16:00",
                                "state": "1",
                                "userInfor":{
                                    "userName":"",
                                    "userPhone":""
                                }
                            },{
                                "timeQuantum" : "15:30-16:30",
                                "state": "1",
                                "userInfor":{
                                    "userName":"",
                                    "userPhone":""
                                }
                            },{
                                "timeQuantum" : "16:00-17:00",
                                "state": "0",
                                "userInfor":{
                                    "userName":"动感单车",
                                    "userPhone":"17811111111"
                                }
                            }
                        ]
                    },
                    {
                        "time": "周三",
                        "date": "12.13",
                        "timeList": [
                            {
                                "timeQuantum" : "8:00-9:00",
                                "state": "0",
                                "userInfor":{
                                    "userName":"动感单车",
                                    "userPhone":"17811111111"
                                }
                            },{
                                "timeQuantum" : "8:30-9:30",
                                "state": "1",
                                "userInfor":{
                                    "userName":"",
                                    "userPhone":""
                                }
                            },{
                                "timeQuantum" : "9:00-10:00",
                                "state": "1",
                                "userInfor":{
                                    "userName":"",
                                    "userPhone":""
                                }
                            },{
                                "timeQuantum" : "9:30-10:30",
                                "state": "1",
                                "userInfor":{
                                    "userName":"",
                                    "userPhone":""
                                }
                            },{
                                "timeQuantum" : "10:00-11:00",
                                "state": "1",
                                "userInfor":{
                                    "userName":"",
                                    "userPhone":""
                                }
                            },{
                                "timeQuantum" : "10:30-11:30",
                                "state": "1",
                                "userInfor":{
                                    "userName":"",
                                    "userPhone":""
                                }
                            },{
                                "timeQuantum" : "11:00-12:00",
                                "state": "0",
                                "userInfor":{
                                    "userName":"动感单车",
                                    "userPhone":"17811111111"
                                }
                            },{
                                "timeQuantum" : "11:30-12:30",
                                "state": "1",
                                "userInfor":{
                                    "userName":"",
                                    "userPhone":""
                                }
                            },{
                                "timeQuantum" : "12:00-13:00",
                                "state": "1",
                                "userInfor":{
                                    "userName":"",
                                    "userPhone":""
                                }
                            },{
                                "timeQuantum" : "12:30-13:30",
                                "state": "0",
                                "userInfor":{
                                    "userName":"动感单车",
                                    "userPhone":"17811111111"
                                }
                            },{
                                "timeQuantum" : "13:00-14:00",
                                "state": "1",
                                "userInfor":{
                                    "userName":"",
                                    "userPhone":""
                                }
                            },{
                                "timeQuantum" : "13:30-14:30",
                                "state": "1",
                                "userInfor":{
                                    "userName":"",
                                    "userPhone":""
                                }
                            },{
                                "timeQuantum" : "14:00-15:00",
                                "state": "2",
                                "userInfor":{
                                    "userName":"",
                                    "userPhone":""
                                }
                            },{
                                "timeQuantum" : "14:30-15:30",
                                "state": "2",
                                "userInfor":{
                                    "userName":"",
                                    "userPhone":""
                                }
                            },{
                                "timeQuantum" : "15:00-16:00",
                                "state": "2",
                                "userInfor":{
                                    "userName":"",
                                    "userPhone":""
                                }
                            },{
                                "timeQuantum" : "15:30-16:30",
                                "state": "1",
                                "userInfor":{
                                    "userName":"",
                                    "userPhone":""
                                }
                            },{
                                "timeQuantum" : "16:00-17:00",
                                "state": "0",
                                "userInfor":{
                                    "userName":"动感单车",
                                    "userPhone":"17811111111"
                                }
                            }
                        ]
                    },
                    {
                        "time": "周四",
                        "date": "12.14",
                        "timeList": [
                            {
                                "timeQuantum" : "8:00-9:00",
                                "state": "1",
                                "userInfor":{
                                    "userName":"",
                                    "userPhone":""
                                }
                            },{
                                "timeQuantum" : "8:30-9:30",
                                "state": "1",
                                "userInfor":{
                                    "userName":"",
                                    "userPhone":""
                                }
                            },{
                                "timeQuantum" : "9:00-10:00",
                                "state": "2",
                                "userInfor":{
                                    "userName":"",
                                    "userPhone":""
                                }
                            },{
                                "timeQuantum" : "9:30-10:30",
                                "state": "2",
                                "userInfor":{
                                    "userName":"",
                                    "userPhone":""
                                }
                            },{
                                "timeQuantum" : "10:00-11:00",
                                "state": "2",
                                "userInfor":{
                                    "userName":"",
                                    "userPhone":""
                                }
                            },{
                                "timeQuantum" : "10:30-11:30",
                                "state": "1",
                                "userInfor":{
                                    "userName":"",
                                    "userPhone":""
                                }
                            },{
                                "timeQuantum" : "11:00-12:00",
                                "state": "0",
                                "userInfor":{
                                    "userName":"动感单车",
                                    "userPhone":"17811111111"
                                }
                            },{
                                "timeQuantum" : "11:30-12:30",
                                "state": "1",
                                "userInfor":{
                                    "userName":"",
                                    "userPhone":""
                                }
                            },{
                                "timeQuantum" : "12:00-13:00",
                                "state": "1",
                                "userInfor":{
                                    "userName":"",
                                    "userPhone":""
                                }
                            },{
                                "timeQuantum" : "12:30-13:30",
                                "state": "0",
                                "userInfor":{
                                    "userName":"动感单车",
                                    "userPhone":"17811111111"
                                }
                            },{
                                "timeQuantum" : "13:00-14:00",
                                "state": "1",
                                "userInfor":{
                                    "userName":"",
                                    "userPhone":""
                                }
                            },{
                                "timeQuantum" : "13:30-14:30",
                                "state": "1",
                                "userInfor":{
                                    "userName":"",
                                    "userPhone":""
                                }
                            },{
                                "timeQuantum" : "14:00-15:00",
                                "state": "1",
                                "userInfor":{
                                    "userName":"",
                                    "userPhone":""
                                }
                            },{
                                "timeQuantum" : "14:30-15:30",
                                "state": "1",
                                "userInfor":{
                                    "userName":"",
                                    "userPhone":""
                                }
                            },{
                                "timeQuantum" : "15:00-16:00",
                                "state": "1",
                                "userInfor":{
                                    "userName":"",
                                    "userPhone":""
                                }
                            },{
                                "timeQuantum" : "15:30-16:30",
                                "state": "1",
                                "userInfor":{
                                    "userName":"",
                                    "userPhone":""
                                }
                            },{
                                "timeQuantum" : "16:00-17:00",
                                "state": "0",
                                "userInfor":{
                                    "userName":"动感单车",
                                    "userPhone":"17811111111"
                                }
                            }
                        ]
                    },
                    {
                        "time": "周五",
                        "date": "12.15",
                        "timeList": [
                            {
                                "timeQuantum" : "8:00-9:00",
                                "state": "0",
                                "userInfor":{
                                    "userName":"动感单车",
                                    "userPhone":"17811111111"
                                }
                            },{
                                "timeQuantum" : "8:30-9:30",
                                "state": "1",
                                "userInfor":{
                                    "userName":"",
                                    "userPhone":""
                                }
                            },{
                                "timeQuantum" : "9:00-10:00",
                                "state": "1",
                                "userInfor":{
                                    "userName":"",
                                    "userPhone":""
                                }
                            },{
                                "timeQuantum" : "9:30-10:30",
                                "state": "1",
                                "userInfor":{
                                    "userName":"",
                                    "userPhone":""
                                }
                            },{
                                "timeQuantum" : "10:00-11:00",
                                "state": "1",
                                "userInfor":{
                                    "userName":"",
                                    "userPhone":""
                                }
                            },{
                                "timeQuantum" : "10:30-11:30",
                                "state": "1",
                                "userInfor":{
                                    "userName":"",
                                    "userPhone":""
                                }
                            },{
                                "timeQuantum" : "11:00-12:00",
                                "state": "0",
                                "userInfor":{
                                    "userName":"动感单车",
                                    "userPhone":"17811111111"
                                }
                            },{
                                "timeQuantum" : "11:30-12:30",
                                "state": "1",
                                "userInfor":{
                                    "userName":"",
                                    "userPhone":""
                                }
                            },{
                                "timeQuantum" : "12:00-13:00",
                                "state": "1",
                                "userInfor":{
                                    "userName":"",
                                    "userPhone":""
                                }
                            },{
                                "timeQuantum" : "12:30-13:30",
                                "state": "1",
                                "userInfor":{
                                    "userName":"",
                                    "userPhone":""
                                }
                            },{
                                "timeQuantum" : "13:00-14:00",
                                "state": "1",
                                "userInfor":{
                                    "userName":"",
                                    "userPhone":""
                                }
                            },{
                                "timeQuantum" : "13:30-14:30",
                                "state": "1",
                                "userInfor":{
                                    "userName":"",
                                    "userPhone":""
                                }
                            },{
                                "timeQuantum" : "14:00-15:00",
                                "state": "0",
                                "userInfor":{
                                    "userName":"动感单车",
                                    "userPhone":"17811111111"
                                }
                            },{
                                "timeQuantum" : "14:30-15:30",
                                "state": "1",
                                "userInfor":{
                                    "userName":"",
                                    "userPhone":""
                                }
                            },{
                                "timeQuantum" : "15:00-16:00",
                                "state": "1",
                                "userInfor":{
                                    "userName":"",
                                    "userPhone":""
                                }
                            },{
                                "timeQuantum" : "15:30-16:30",
                                "state": "1",
                                "userInfor":{
                                    "userName":"",
                                    "userPhone":""
                                }
                            },{
                                "timeQuantum" : "16:00-17:00",
                                "state": "0",
                                "userInfor":{
                                    "userName":"动感单车",
                                    "userPhone":"17811111111"
                                }
                            }
                        ]
                    },
                    {
                        "time": "周六",
                        "date": "12.16",
                        "timeList": [
                            {
                                "timeQuantum" : "8:00-9:00",
                                "state": "0",
                                "userInfor":{
                                    "userName":"动感单车",
                                    "userPhone":"17811111111"
                                }
                            },{
                                "timeQuantum" : "8:30-9:30",
                                "state": "1",
                                "userInfor":{
                                    "userName":"",
                                    "userPhone":""
                                }
                            },{
                                "timeQuantum" : "9:00-10:00",
                                "state": "2",
                                "userInfor":{
                                    "userName":"",
                                    "userPhone":""
                                }
                            },{
                                "timeQuantum" : "9:30-10:30",
                                "state": "2",
                                "userInfor":{
                                    "userName":"",
                                    "userPhone":""
                                }
                            },{
                                "timeQuantum" : "10:00-11:00",
                                "state": "2",
                                "userInfor":{
                                    "userName":"",
                                    "userPhone":""
                                }
                            },{
                                "timeQuantum" : "10:30-11:30",
                                "state": "1",
                                "userInfor":{
                                    "userName":"",
                                    "userPhone":""
                                }
                            },{
                                "timeQuantum" : "11:00-12:00",
                                "state": "0",
                                "userInfor":{
                                    "userName":"动感单车",
                                    "userPhone":"17811111111"
                                }
                            },{
                                "timeQuantum" : "11:30-12:30",
                                "state": "1",
                                "userInfor":{
                                    "userName":"",
                                    "userPhone":""
                                }
                            },{
                                "timeQuantum" : "12:00-13:00",
                                "state": "1",
                                "userInfor":{
                                    "userName":"",
                                    "userPhone":""
                                }
                            },{
                                "timeQuantum" : "12:30-13:30",
                                "state": "0",
                                "userInfor":{
                                    "userName":"动感单车",
                                    "userPhone":"17811111111"
                                }
                            },{
                                "timeQuantum" : "13:00-14:00",
                                "state": "1",
                                "userInfor":{
                                    "userName":"",
                                    "userPhone":""
                                }
                            },{
                                "timeQuantum" : "13:30-14:30",
                                "state": "1",
                                "userInfor":{
                                    "userName":"",
                                    "userPhone":""
                                }
                            },{
                                "timeQuantum" : "14:00-15:00",
                                "state": "1",
                                "userInfor":{
                                    "userName":"",
                                    "userPhone":""
                                }
                            },{
                                "timeQuantum" : "14:30-15:30",
                                "state": "1",
                                "userInfor":{
                                    "userName":"",
                                    "userPhone":""
                                }
                            },{
                                "timeQuantum" : "15:00-16:00",
                                "state": "1",
                                "userInfor":{
                                    "userName":"",
                                    "userPhone":""
                                }
                            },{
                                "timeQuantum" : "15:30-16:30",
                                "state": "1",
                                "userInfor":{
                                    "userName":"",
                                    "userPhone":""
                                }
                            },{
                                "timeQuantum" : "16:00-17:00",
                                "state": "0",
                                "userInfor":{
                                    "userName":"动感单车",
                                    "userPhone":"17811111111"
                                }
                            }
                        ]
                    },
                    {
                        "time": "周日",
                        "date": "12.17",
                        "timeList": [
                            {
                                "timeQuantum" : "8:00-9:00",
                                "state": "0",
                                "userInfor":{
                                    "userName":"动感单车",
                                    "userPhone":"17811111111"
                                }
                            },{
                                "timeQuantum" : "8:30-9:30",
                                "state": "1",
                                "userInfor":{
                                    "userName":"",
                                    "userPhone":""
                                }
                            },{
                                "timeQuantum" : "9:00-10:00",
                                "state": "2",
                                "userInfor":{
                                    "userName":"",
                                    "userPhone":""
                                }
                            },{
                                "timeQuantum" : "9:30-10:30",
                                "state": "2",
                                "userInfor":{
                                    "userName":"",
                                    "userPhone":""
                                }
                            },{
                                "timeQuantum" : "10:00-11:00",
                                "state": "2",
                                "userInfor":{
                                    "userName":"",
                                    "userPhone":""
                                }
                            },{
                                "timeQuantum" : "10:30-11:30",
                                "state": "1",
                                "userInfor":{
                                    "userName":"",
                                    "userPhone":""
                                }
                            },{
                                "timeQuantum" : "11:00-12:00",
                                "state": "0",
                                "userInfor":{
                                    "userName":"动感单车",
                                    "userPhone":"17811111111"
                                }
                            },{
                                "timeQuantum" : "11:30-12:30",
                                "state": "1",
                                "userInfor":{
                                    "userName":"",
                                    "userPhone":""
                                }
                            },{
                                "timeQuantum" : "12:00-13:00",
                                "state": "1",
                                "userInfor":{
                                    "userName":"",
                                    "userPhone":""
                                }
                            },{
                                "timeQuantum" : "12:30-13:30",
                                "state": "0",
                                "userInfor":{
                                    "userName":"动感单车",
                                    "userPhone":"17811111111"
                                }
                            },{
                                "timeQuantum" : "13:00-14:00",
                                "state": "1",
                                "userInfor":{
                                    "userName":"",
                                    "userPhone":""
                                }
                            },{
                                "timeQuantum" : "13:30-14:30",
                                "state": "1",
                                "userInfor":{
                                    "userName":"",
                                    "userPhone":""
                                }
                            },{
                                "timeQuantum" : "14:00-15:00",
                                "state": "1",
                                "userInfor":{
                                    "userName":"",
                                    "userPhone":""
                                }
                            },{
                                "timeQuantum" : "14:30-15:30",
                                "state": "1",
                                "userInfor":{
                                    "userName":"",
                                    "userPhone":""
                                }
                            },{
                                "timeQuantum" : "15:00-16:00",
                                "state": "1",
                                "userInfor":{
                                    "userName":"",
                                    "userPhone":""
                                }
                            },{
                                "timeQuantum" : "15:30-16:30",
                                "state": "1",
                                "userInfor":{
                                    "userName":"",
                                    "userPhone":""
                                }
                            },{
                                "timeQuantum" : "16:00-17:00",
                                "state": "0",
                                "userInfor":{
                                    "userName":"动感单车",
                                    "userPhone":"17811111111"
                                }
                            }
                        ]
                    }
                ],
                // 休息时间表数据
                teacherRestPopup: false, // 弹窗
			}
		},
        filters: {  
            filterFun: function (value) {  
                if(value == 0){
                    return value;
                }else{
                    return '';
                }
            }  
        },
        mounted (){
            this.$nextTick(() => {
                
            })
        },
        methods:{
            
        }
		
  	}
</script>
<style scoped>
    #leagueClassDateTable{
        width: 100%;
        min-height: 100vh;
        background: #fff;
        padding-top: 40px;
        margin-top: -40px;
        box-sizing: border-box;
        overflow: auto;
    }
	.week{
        width: 100%;
        height: 1.2rem;
        display: flex;
        border-top:1px solid #ccc;
        border-bottom:1px solid #ccc;
        background:#F2F2F2;
        position: fixed;
        left: 0;
        top: 40px;
        z-index: 100;
    }
    .week div{
        width: 12.5%;
        height:1.2rem;
        line-height:1.2rem;
        text-align: center;
    }
    .week div>span{
        width: 100%;
        height: 50%;
        line-height: 0.6rem;
        text-align: center;
        font-size: 0.3rem;
        color: #000;
        display: block;
    }
    .class-tab{
        width: 100%;
        height: auto;
        margin-top: 50px;
        padding-bottom: 0.4rem;
        box-sizing: border-box;
        overflow: auto;
    }
    .class-tab>ul{
        width: 12.5%;
        height: auto;
        overflow: auto;
        float: left;
    }
    .class-tab>ul>li{
        width: 100%;
        height: 1.2rem;
        padding-right: 0.2rem;
        text-align: right;
        box-sizing: border-box;
    }
    .orderListBox{
        width: 87.5%;
        height: auto;
        overflow: auto;
        margin-top: 0.15rem;
        float: left;
    }
    .orderListBox>ul{
        width: 14.28%;
        height: auto;
        overflow: auto;
        float: left;
    }
    .orderListBox>ul>li{
        width: 100%;
        height: 1.2rem;
        line-height: 1.2rem;
        margin-top: -0.6rem;
        box-sizing: border-box;
        float: left;
        position: relative;
        z-index: 10;
    }
    /*.orderListBox>ul>li:nth-child(odd){
        border-top: 1px solid #f2f2f2;
    }
    .orderListBox>ul>li:nth-child(even){
        border-top: 1px dashed #FAFAFA;
    }*/
    .orderListBox>ul>li:first-child{
        margin-top: 0;
    }
    .orderListBox>ul>.noContent{
        z-index: 10;
        background: #9CCC65;
    }
    .orderListBox>ul>.hasUser{
        background: #FF7043;
        border: none !important;
        z-index: 11;
    }
    .orderListBox>ul>.teacherRest{
        background: #CFD8DC;
        border: none !important;
        z-index: 11;
    }
    .kong{
        width: 100%;
        height: 0.4rem;
        overflow: hidden;
    }
    /* 状态 */
    .classStateTypeList{
        width: 100%;
        height: 1rem;
        display: flex;
        align-items: center;
        justify-content: center;
        position: fixed;
        left: 0;
        bottom: 0.2rem;
        overflow: hidden;
    }
    .classStateTypeList>div{
        flex: 1;
        font-size: 0.32rem;
        color: #666;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .classStateTypeList>div>i{
        width: 0.3rem;
        height: 0.3rem;
        border-radius: 50%;
        margin-right: 0.2rem;
        display: block;
    }
    .endState{
        background: #FF7043;
    }
    .cancelState{
        background: #CFD8DC;
    }
    .normalState{
        background: #9CCC65;
    }
</style>