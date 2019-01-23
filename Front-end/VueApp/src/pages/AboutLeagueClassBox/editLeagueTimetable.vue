<template>
  	<div class="page" id="editLeagueTimetableBox">
  		<mt-header fixed title="修改课表" style="background:#000">
            <mt-button slot="left" icon="back" @click="$router.back()"></mt-button>
        </mt-header>
        <div class="page-content">
            <form class="editLeagueTimetable" id="editLeagueTimetable">
                <input type="hidden" name="clubId" v-model="clubId">
                <input type="hidden" name="classScheduleId" v-model="classScheduleId">
                <div class="teacherName">
                    <label>教练</label>
                    <select name="teacherId" v-model="teacherId">
                        <option v-for="teacher in teacherList" :value="teacher.teacherId">{{teacher.teacherName}}</option>
                    </select>
                </div>
                <div class="clubName">
                    <label>俱乐部</label>
                    <span>{{clubName}}</span>
                    <input type="hidden" name="clubId" v-model="clubId">
                </div> 
                <div class="className">
                    <label>课程名</label>
                    <select id="classTypeListBox" name="classId" v-model="classId" @change="selectChange()">
                        <option v-for="classInfor in classTypeList" :value="classInfor.classId" :state="classInfor.isPersonal">{{classInfor.className}}</option>
                    </select>
                </div> 
                <div class="startTime" @click="selectTime('start')" v-if="notPersonal">
                    <label>开始时间</label>
                    <input type="text" name="startTime" readonly v-model="startTime">
                </div> 
                <div class="endTime" @click="selectTime('end')" v-if="notPersonal">
                    <label>结束时间</label>
                    <input type="text" name="endTime" readonly v-model="endTime">
                </div> 
                <div class="maxNumber">
                    <label>最大人数</label>
                    <input type="number" name="maxPersion" v-model="maxPersion">
                </div> 
                <div class="minNumber">
                    <label>最小人数</label>
                    <input type="number" name="minPersion" v-model="minPersion">
                </div> 
                <div class="area">
                    <label>场地</label>
                    <input type="text" name="place" v-model="place">
                </div>  
                <mt-datetime-picker
                    ref="picker"
                    type="datetime"
                    v-model="pickerValue"
                    year-format="{value}"
                    month-format="{value}"
                    date-format="{value}"
                    hour-format="{value}"
                    minute-format="{value}"
                    @confirm="handleConfirm">
                </mt-datetime-picker>
            </form>
            <div class="toEditLeagueTimetable" @click="toSaveEditClassSchedule()">
                <span>修改</span>
            </div>      
        </div>
  	</div>
</template>
<script>
    import {Toast,DatetimePicker,Popup} from 'mint-ui';
    export default {
        name: 'EditLeagueTimetable',
        components: {
    		
      	},
    	data () {
    		return {
                classScheduleId: '',
                classId: '',
                clubId: '',
                clubName: '',
                teacherList: [],
                teacherId: '',
                classTypeList: [],
                notPersonal: true,
                pickerValue: '', // 初始化时间
                type: '', // 开始/结束时间
                startTime: '', // 起始时间
                endTime: '', // 结束时间
                maxPersion: '',
                minPersion: '',
                place: ''
    		}
    	},
        watch: {  
            
        }, 
        created() {  
            
        },  
    	mounted (){
            this.classScheduleId = this.$route.params.classScheduleId;
            this.clubId = this.$route.params.clubId;
            if(this.$route.params.notPersonal == 0){ // 判断是否是私教课程
                this.notPersonal = true;
            }else{
                this.notPersonal = false;
            }
            this.getClassInfor();
            this.getTeacherList();
            this.getClassTypeList();
    	},
    	methods: {
            getClassInfor(){
                let _this = this;
                this.$http.get('/LuchyBird/manage/ classScheduleById.do?classScheduleId='+this.classScheduleId+'').then(function(data){
                    if(data.data.status == 0){
                        let value = data.data.data;
                        if(value != null && value != ''){
                            _this.classId = value.classid;
                            _this.teacherId = value.teacherid;
                            _this.startTime = value.starttime;
                            _this.endTime = value.endtime;
                            _this.maxPersion = value.maxpersion;
                            _this.minPersion = value.minpersion;
                            _this.place = value.place;
                        }else{
                            Toast({
                                message: '暂无课程详情',
                                position: 'bottom',
                                duration: 2000
                            });
                        }
                    }else{
                        Toast({
                            message: data.data.msg,
                            position: 'bottom',
                            duration: 2000
                        });
                    }
                    
                }).catch(function(data){
                    
                })
            },
            getTeacherList(){  // 团课1 私教2
                let _this = this;
                this.$http.get('/LuchyBird/manage/teacherInfos.do?clubId='+this.clubId+'').then(function(data){
                    if(data.data.status == 0){
                        let value = data.data.data;
                        if(value != null && value != ''){
                            _this.teacherList = value;
                        }else{
                            Toast({
                                message: '暂无教练信息',
                                position: 'bottom',
                                duration: 2000
                            });
                        }
                    }else{
                        Toast({
                            message: data.data.msg,
                            position: 'bottom',
                            duration: 2000
                        });
                    }
                    
                }).catch(function(data){
                    
                })
            },
            getClassTypeList(){// 团课0 私教1
                let _this = this;
                this.$http.get('/LuchyBird/manage/classInfos.do?clubId='+this.clubId+'&type=0').then(function(data){
                    if(data.data.status == 0){
                        let value = data.data.data;
                        if(value != null && value != ''){
                            _this.classTypeList = value.classInfos;
                            _this.clubName = value.clubName;
                        }else{
                            Toast({
                                message: '暂无课程信息',
                                position: 'bottom',
                                duration: 2000
                            });
                        }
                    }else{
                        Toast({
                            message: data.data.msg,
                            position: 'bottom',
                            duration: 2000
                        });
                    }
                    
                }).catch(function(data){
                    
                })
            },
            selectChange(){
                let classTypeSelect = document.getElementById('classTypeListBox'); // select
                let classTypeSelectIndex = classTypeSelect.selectedIndex; // 类型选中的索引
                let state = classTypeSelect.options[classTypeSelectIndex].getAttribute('state');
                if(state == 0){
                    this.notPersonal = true;
                }else{
                    this.notPersonal = false;
                }
            },
            formSerialize(form){
                let formData = new FormData(form),
                    getValue = formData.entries(),
                    parts = [];
                for (let pair of getValue) {
                    parts.push(pair[0] + "=" + pair[1]);
                }
                return parts.join("&");
            },
            toSaveEditClassSchedule(){
                let _this = this;
                let editForm = document.getElementById('editLeagueTimetable');
                let editFormList = this.formSerialize(editForm);
                if(this.notPersonal == false){
                    if(this.classId!=''&&this.teacherId!=''&&this.clubId!=''&&this.maxPersion!=''&&this.minPersion!=''&&this.place!='' && this.classId!=null&&this.teacherId!=null&&this.clubId!=null&&this.maxPersion!=null&&this.minPersion!=null&&this.place!=null){
                        this.$http.post('/LuchyBird/manage/editClassSchedule.do',editFormList,{headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'}}).then(function(data){
                            if(data.data.status == 0){
                                Toast({
                                    message: '修改成功',
                                    position: 'bottom',
                                    duration: 2000
                                });
                                _this.$router.back();
                            }else{
                                Toast({
                                    message: data.data.msg,
                                    position: 'bottom',
                                    duration: 2000
                                });
                            }
                            
                        }).catch(function(data){
                            
                        })
                    }else{
                        Toast({
                            message: '请将信息填写完整',
                            position: 'bottom',
                            duration: 2000
                        });
                    }
                }else{
                    if(this.classId!=''&&this.teacherId!=''&&this.clubId!=''&&this.startTime!=''&&this.endTime!=''&&this.maxPersion!=''&&this.minPersion!=''&&this.place!='' && this.classId!=null&&this.teacherId!=null&&this.clubId!=null&&this.startTime!=null&&this.endTime!=null&&this.maxPersion!=null&&this.minPersion!=null&&this.place!=null){
                        this.$http.post('/LuchyBird/manage/editClassSchedule.do',editFormList,{headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'}}).then(function(data){
                            if(data.data.status == 0){
                                Toast({
                                    message: '添加成功',
                                    position: 'bottom',
                                    duration: 2000
                                });
                                _this.$router.back();
                            }else{
                                Toast({
                                    message: data.data.msg,
                                    position: 'bottom',
                                    duration: 2000
                                });
                            }
                            
                        }).catch(function(data){
                            
                        })
                    }else{
                        Toast({
                            message: '请将信息填写完整',
                            position: 'bottom',
                            duration: 2000
                        });
                    }
                }
                
            },
    		selectTime(type){
                this.type = type;
                if(type == 'start'){
                    this.pickerValue = new Date(this.startTime)
                }else{
                    this.pickerValue = new Date(this.endTime)
                }
                this.$refs.picker.open();
            },
            handleConfirm(data) {
                let dataTime = this.$moment(data).format('YYYY-MM-DD HH:mm');
                // 当前选择时间
                let dataTimeNum = this.$moment(data).format('YYYYMMDDHHmm');
                // 选择前的开始时间
                let startTimeNum = parseInt(this.$moment(this.startTime).format('YYYYMMDDHHmm'));
                // 选择前的结束时间
                let endTimeNum = parseInt(this.$moment(this.endTime).format('YYYYMMDDHHmm'));
                if(this.type == 'start'){
                    if(!isNaN(endTimeNum)){
                        if(dataTimeNum <= endTimeNum){
                            this.startTime = dataTime;
                        }else{
                            Toast('起始时间不能大于结束时间，请重新操作');
                        }
                    }else{
                        this.startTime = dataTime;
                    }
                }else{
                    if(!isNaN(startTimeNum)){
                        if(dataTimeNum >= startTimeNum){
                            this.endTime = dataTime;
                        }else{
                            Toast('结束时间不能大于起始时间，请重新操作');
                        }
                    }else{
                        this.endTime = dataTime;
                    }
                }
            }
    	}
    }
</script>
<style scoped>
    .page-content{
        width: 100%;
        height: 100vh;
        background: #fff;
        padding-top: 40px;
        margin-top: -40px;
        box-sizing: border-box;
        overflow: auto;
    }
    .editLeagueTimetable{
        width: 100%;
        height: auto;
        padding: 0 0.4rem;
        box-sizing: border-box;
        overflow: hidden;
    }
    .editLeagueTimetable>div{
        width: 100%;
        min-height: 1rem;
        padding: 0.2rem 0 0;
        margin-top: 0.4rem;
        box-sizing: border-box;
        overflow: hidden;
    }
    .editLeagueTimetable>div>label{
        width: 100%;
        height: 0.4rem;
        line-height: 0.4rem;
        text-align: left;
        font-size: 0.32rem;
        color: #666;
        display: block;
        overflow: hidden;
    }
    .editLeagueTimetable>div>span,.editLeagueTimetable>div>input,.editLeagueTimetable>div>select{
        width: 100%;
        height: 0.8rem;
        font-size: 0.52rem;
        line-height: 0.8rem;
        text-align: left;
        color: #000;
        outline: none;
        border: none;
        border-bottom: 1px solid #f2f2f2;
        background: #fff;
        display: block;
        transition: all 0.2s ease;
    }
    .editLeagueTimetable>div>input:focus,.editLeagueTimetable>div>select:focus{
        border-bottom: 1px solid #FFB74D;
    }
    .toEditLeagueTimetable{
        width: 2.6rem;
        height: 1rem;
        font-size: 0.42rem;
        background: #f0832f;
        color: #fff;
        border-radius: 6px;
        box-sizing: border-box;
        margin: 1rem auto;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
    }
    .toEditLeagueTimetable:active{
        background: #FFA726;
    }
</style>