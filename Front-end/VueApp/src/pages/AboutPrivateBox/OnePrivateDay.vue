<template>
	<div class="page" id="onePrivateDayBox">
        <div class="page-content">
            <div class="week">
                <div class="kong"></div>
                <div v-for="(date,index) in allWeekList" :class="{selectDay:selectIndex==index}" @click="selectDate(index)">
                    <span>{{date.date}}</span>
                    <span>{{date.time}}</span>
                </div>
            </div>
            <div class="class-teb">
                <ul>
                    <li v-for="time in timeList">{{time}}</li>
                </ul>
                <div class="orderListBox">
                    <ul>
                       <li v-for="order in nowList.timeList" 
                                :class="{hasUser:order.state==0,
                                        noContent:order.state==1,
                                        teacherRest:order.state==2}" 
                                @click="message(order.state,nowList.timeList,nowList.time,nowList.date)"
                        >
                            <!-- {{order.state | filterFun}} -->
                            {{order.userInfor.userName}}
                        </li>
                    </ul>
                </div> 
                <div class="teacherInfor">
                    <div>
                        <span>xx教练</span>
                        <span>排课记录</span>
                        <span>成就完美体型</span>
                    </div>
                </div> 
            </div>
            <!-- 教练休息 -->
            <mt-popup v-model="teacherRestPopup" :modal=true
                position = center
              popup-transition="popup-fade">
                <div class="restTimeListBox">
                    <div class="restTitle">
                        <span>请选择您休息的时间段</span>
                        <span>{{restTime}},{{restDate}}</span>
                    </div>
                    <ul>
                        <li v-for="(item,index) in restTimeList" :class="{activeRestLi:item.flag}" @click="selectRestTime(item,index)">
                            {{item.time}}
                        </li>
                    </ul>
                    <div class="handleBtnList">
                        <span class="saveBtn" @click="sendRestTime()">确定</span>
                    </div>      
                </div>  
            </mt-popup>
		</div>
	</div>
</template>
<script>
    import {Popup} from 'mint-ui';
  	export default {
  		name: 'OnePrivateDay',
    	data () {
			return {
				timeList:['8:00','9:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00','19:00','20:00','21:00'],
                allWeekList: [
                        {
                            "time": "周一",
                            "date": "1.29"
                        },{
                            "time": "周二",
                            "date": "1.30"
                        },{
                            "time": "周三",
                            "date": "1.31"
                        },{
                            "time": "周四",
                            "date": "2.1"
                        },{
                            "time": "周五",
                            "date": "2.2"
                        },{
                            "time": "周六",
                            "date": "2.3"
                        },{
                            "time": "周日",
                            "date": "2.4"
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
                                    "userName":"王凯",
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
                                    "userName":"王凯",
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
                                    "userName":"王凯",
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
                                    "userName":"王凯",
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
                                    "userName":"王凯",
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
                                    "userName":"王凯",
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
                                    "userName":"王凯",
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
                                    "userName":"王凯",
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
                                    "userName":"王凯",
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
                                    "userName":"王凯",
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
                                    "userName":"王凯",
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
                                    "userName":"王凯",
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
                                    "userName":"王凯",
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
                                    "userName":"王凯",
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
                                    "userName":"王凯",
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
                                    "userName":"王凯",
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
                                    "userName":"王凯",
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
                                    "userName":"王凯",
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
                                    "userName":"王凯",
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
                                    "userName":"王凯",
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
                                    "userName":"王凯",
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
                                    "userName":"王凯",
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
                                    "userName":"王凯",
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
                                    "userName":"王凯",
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
                                    "userName":"王凯",
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
                                    "userName":"王凯",
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
                                    "userName":"王凯",
                                    "userPhone":"17811111111"
                                }
                            }
                        ]
                    }
                ],
                nowList: {
                    "time": "周一",
                    "date": "12.11",
                    "timeList": [
                        {
                            "timeQuantum" : "8:00-9:00",
                            "state": "0",
                            "userInfor":{
                                "userName":"王凯",
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
                                "userName":"王凯",
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
                                "userName":"王凯",
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
                                "userName":"王凯",
                                "userPhone":"17811111111"
                            }
                        }
                    ]
                },
                selectIndex: 0,
                // 休息时间表数据
                teacherRestPopup: false, // 弹窗
                restDate: '', // 休息日期
                restTime: '', // 休息时间，周几
                restTimeList: [], // 休息时间表数组
                selectTimeList:[],  //选中的时间段数组
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
                //this.getDate();
            })
        },
        methods:{
            getDate(){
                var _this = this;
                this.$http.get('/src/assets/js/privateDay.json')
                .then(function (data) {
                    var weekValue = data.data.weekList;
                    var value = data.data.week;
                    _this.allWeekList = weekValue;
                    _this.allList = value;
                    _this.nowList = value[0];
                })
                .catch(function (data) {
                    // alert(data);
                });
            },
            selectDate(index){
                this.nowList = this.allList[index];
                this.selectIndex = index;
            },
            message(value,timeList,time,date){
                if(value == 0){
                    alert('有人预约');
                }else if(value == 1 || value == 2){
                    this.restTimeList = []; // 每次点击清空原有数组内容
                    this.selectTimeList = []; // 每次点击清空原有数组内容
                    this.teacherRestPopup = true;
                    this.restDate = date;
                    this.restTime = time;
                    for(var i in timeList){
                        if(timeList[i].state == 1){
                           this.restTimeList.push({
                                'time':timeList[i].timeQuantum.split('-')[0],
                                'flag':false
                            });
                        }else if(timeList[i].state == 2){
                            this.restTimeList.push({
                                'time':timeList[i].timeQuantum.split('-')[0],
                                'flag':true
                            });
                            this.selectTimeList.push(timeList[i].timeQuantum.split('-')[0]);
                        }
                    }
                }
            },
            selectRestTime(item,index){ // 选择休息时间
                item.flag=!item.flag;
                Array.prototype.remove = function(val) { // 移除数组中的某一项
                    var index = this.indexOf(val);
                    if (index > -1) {
                        this.splice(index, 1);
                    }
                };
                if(item.flag == true){
                    this.selectTimeList.push(item.time);
                }else{
                    var index = this.selectTimeList.indexOf(item.time);
                    this.selectTimeList.splice(index,1);
                }
            },
            sendRestTime(){ // 提交休息时间
                console.log(this.selectTimeList);
                this.teacherRestPopup = false;
            },
        }
		
  	}
</script>
<style scoped>
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
    .week .selectDay{
        background: #FFC107;
    }
    .week .selectDay>span{
        color: #fff;
    }
    .class-teb{
        width: 100%;
        height: auto;
        margin-top: 50px;
        padding-bottom: 0.4rem;
        box-sizing: border-box;
        overflow: auto;
    }
    .class-teb>ul{
        width: 12.5%;
        height: auto;
        overflow: auto;
        float: left;
    }
    .class-teb>ul>li{
        width: 100%;
        height: 1.2rem;
        padding-right: 0.2rem;
        text-align: right;
        box-sizing: border-box;
    }
    .orderListBox{
        width: 57.5%;
        height: auto;
        overflow: auto;
        margin-top: 0.15rem;
        float: left;
    }
    .orderListBox>ul{
        width: 100%;
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
    .orderListBox>ul>li:nth-child(odd){
        border-top: 1px solid #f2f2f2;
    }
    .orderListBox>ul>li:nth-child(even){
        border-top: 1px dashed #FAFAFA;
    }
    .orderListBox>ul>li:first-child{
        margin-top: 0;
    }
    .orderListBox>ul>.noContent{
        z-index: 10;
    }
    .orderListBox>ul>.hasUser{
        background: #FFC107;
        border: none !important;
        z-index: 11;
    }
    .orderListBox>ul>.teacherRest{
        background: #ccc;
        border: none !important;
        z-index: 11;
    }
    /* 教练信息 */
    .teacherInfor{
        width: 30%;
        height: 100%;
        padding: 1.2rem 0;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: center;
        position: fixed;
        right: 0;
        top: 40px;
        overflow: hidden;
    }
    .teacherInfor>div>span{
        width: 100%;
        height: 1rem;
        line-height: 1rem;
        text-align: center;
        font-size: 0.36rem;
        color: #000;
        display: block;
    }
    /* 休息时间表 */
    .restTimeListBox{
        width: 8rem;
        min-height: 4rem;
        padding-bottom: 0.4rem;
        box-sizing: border-box;
        position: relative;
    }
    .restTimeListBox>.restTitle{
        width: 100%;
        height: 1.8rem;
        overflow: hidden;
        background: #FFC107;
    }
    .restTimeListBox>.restTitle>span:first-child{
        width: 100%;
        height: 0.6rem;
        line-height: 0.6rem;
        color: #fff;
        text-align: center;
        font-size: 0.46rem;
        margin-top: 0.3rem;
        display: block;
    }
    .restTimeListBox>.restTitle>span:last-child{
        width: 100%;
        height: 0.6rem;
        line-height: 0.6rem;
        color: #fff;
        text-align: center;
        font-size: 0.36rem;
        display: block; 
    }
    .restTimeListBox>ul{
        width: 100%;
        height: auto;
        margin-top: 0.4rem;
        overflow: hidden;
    }
    .restTimeListBox>ul>li{
        width: 2.4rem;
        height: 0.8rem;
        line-height: 0.8rem;
        text-align: center;
        font-size: 0.36rem;
        color: #000;
        border: 1px solid #f2f2f2;
        box-sizing: border-box;
        margin-top: 0.1rem;
        margin-left: 0.2rem;
        float: left;
    }
    .restTimeListBox>ul>.activeRestLi{
        background: #FFC107;
    }
    .restTimeListBox>.handleBtnList{
        width: 100%;
        height: 1rem;
        margin-top: 0.4rem;
        display: flex;
        align-items: center;
        justify-content: center;
        /*overflow: hidden;*/
    }
    .restTimeListBox>.handleBtnList>span{
        width: 5rem;
        height: 100%;
        line-height: 1rem;
        text-align: center;
        font-size: 0.36rem;
        color: #000;
        box-sizing: border-box;
        background: #FFC107;
        display: block;
    }
</style>

