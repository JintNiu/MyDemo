<template>
  	<div class="page" id="leagueClassTimetableBox">
  		<mt-header fixed title="团课课表" style="background:#000">
            <mt-button slot="left" icon="back" @click="$router.back()"></mt-button>
            <!-- <mt-button slot="right" @click="showDeleteLeague()"><i class="deleteIcon" :class="{'deleteIconRight':deleteIconShow==true}"></i></mt-button> -->
        </mt-header>
        <div class="page-content">
            <!-- <div class="tabListBox">
                <div class="tabList" @click="tabSelect(0)" :class="{'tabList_active':index==0}">
                    <span>团课课表</span>
                </div>
                <div class="tabList" @click="tabSelect(1)" :class="{'tabList_active':index==1}">
                    <span>私教课表</span>
                </div>
            </div> -->
            <div class="memberListTimetableBox">
                <v-scroll  id="leagueClassListBox" ref="leagueClassListBox" v-show="index==0"
                    :on-refresh="onRefresh"
                    v-infinite-scroll="loadMore"
                    infinite-scroll-disabled="loading"
                    infinite-scroll-distance="0"
                    infinite-scroll-immediate-check=false
                    @scroll.native="woListScroll($event)" 
                >
                	<ul class="memberListTimetable">
                        <div class="timetableList" :class="{'showDeleteManageList':deleteIconShow==true}" v-for="(item,index) in leagueClassList">
                            <div class="titleBox">
                                <div class="leagueClassName">
                                    <span>{{item.className}}</span>
                                </div>
                                <div class="leagueClassTeacher">
                                    <span>{{item.teacherName}}</span>
                                    <span>{{item.classTypeName}}</span>
                                    <span>（{{item.maxPersion}}人）</span>
                                </div>
                                <div class="leagueClassClub">
                                    <span>{{item.clubName}}</span>
                                    <span>{{item.startTime}}</span>
                                </div>
                            </div>  
                            <span class="scoreBox">9.6分</span>
                            <span class="stateBox">
                                <img src="../../assets/img/hasCancel.png" v-if="item.isTimeout==5">
                                <img src="../../assets/img/hasEnd.png" v-if="item.isTimeout==2">
                            </span>
                            <!-- 修改 -->
                            <span class="editLeagueBox" @click="editClass(item.classScheduleId,0)"><img src="../../assets/img/edit.png"></span>
                            <!-- 取消 -->
                            <!-- <span class="cancelLeagueBox" v-if="item.isTimeout==1" @click="cancelClass(item)"><img src="../../assets/img/cancel.png"></span> -->
                            <!-- 删除 -->
                            <span class="deleteLeagueBox" :class="{'showDeleteLeagueBox':deleteIconShow==true}" @click="deleteClass(item,index)"><img src="../../assets/img/delete.png"></span>
                        </div>
                        <div class="loadingBox" style="width:100%;height:auto;overflow:hidden;">
                            <mt-spinner type="snake" style="width:1rem;height:1rem;margin:0 auto;display:block;" v-if="loading&&!noMore"></mt-spinner>
                            <div class="noContentBox" v-if="noContent">
                                <i><img src="../../assets/img/noHtml.png"></i>
                                <span>没有东东诶~</span>
                            </div>
                            <div style="width:100%;height:1rem;line-height:1rem;color:#000;font-size:0.36rem;position:relative;overflow:hidden" v-if="noMore">
                                <i style="width:3rem;height:1px;background:#ccc;position:absolute;right:0.4rem;top:50%"></i>
                                <span>没有更多课程了</span>
                                <i style="width:3rem;height:1px;background:#ccc;position:absolute;left:0.4rem;top:50%"></i>
                            </div>
                        </div>
                    </ul>
                </v-scroll>
                <v-scroll  id="privateClassListBox" ref="privateClassListBox" v-show="index==1"
                    :on-refresh="onRefreshPrivate"
                    v-infinite-scroll="loadMorePrivate"
                    infinite-scroll-disabled="loadingPrivate"
                    infinite-scroll-distance="0"
                    infinite-scroll-immediate-check=false
                    @scroll.native="woListScroll($event)" 
                >
                    <ul class="memberListTimetable">
                        <div class="timetableList" :class="{'showDeleteManageList':deleteIconShow==true}" v-for="(item,index) in privateClassList">
                            <div class="titleBox">
                                <div class="leagueClassName">
                                    <span>{{item.className}}</span>
                                </div>
                                <div class="leagueClassTeacher">
                                    <span>{{item.teacherName}}</span>
                                    <span>{{item.classTypeName}}</span>
                                    <span>（{{item.maxPersion}}人）</span>
                                </div>
                                <div class="leagueClassClub">
                                    <span>{{item.clubName}}</span>
                                </div>
                            </div>  
                            <span class="scoreBox">9.6分</span>
                            <!-- 修改 -->
                            <span class="editLeagueBox" @click="editClass(item.classScheduleId,1)"><img src="../../assets/img/edit.png"></span>
                            <!-- 取消 -->
                            <!-- <span class="cancelLeagueBox" v-if="item.isTimeout==1" @click="cancelClass(item)"><img src="../../assets/img/cancel.png"></span> -->
                            <!-- 删除 -->
                            <span class="deleteLeagueBox" :class="{'showDeleteLeagueBox':deleteIconShow==true}" @click="deleteClass(item,index)"><img src="../../assets/img/delete.png"></span>
                        </div>
                        <div class="loadingBox" style="width:100%;height:auto;overflow:hidden;">
                            <mt-spinner type="snake" style="width:1rem;height:1rem;margin:0 auto;display:block;" v-if="loadingPrivate&&!noMorePrivate"></mt-spinner>
                            <div class="noContentBox" v-if="noContentPrivate">
                                <i><img src="../../assets/img/noHtml.png"></i>
                                <span>没有东东诶~</span>
                            </div>
                            <div style="width:100%;height:1rem;line-height:1rem;color:#000;font-size:0.36rem;position:relative;overflow:hidden" v-if="noMorePrivate">
                                <i style="width:3rem;height:1px;background:#ccc;position:absolute;right:0.4rem;top:50%"></i>
                                <span>没有更多课程了</span>
                                <i style="width:3rem;height:1px;background:#ccc;position:absolute;left:0.4rem;top:50%"></i>
                            </div>
                        </div>
                    </ul>
                </v-scroll>
                <div class="addTimetableBox" @click="addLeague()">
                    <span class="fa fa-plus"></span>
                </div>  
            </div>
        </div>
  	</div>
</template>
<script>
    import {Toast,Spinner,MessageBox,InfiniteScroll} from 'mint-ui';
    import Scroll from '../../components/scroll';
    export default {
        name: 'LeagueClassTimetable',
        components: {
    		'v-scroll': Scroll,
      	},
    	data () {
    		return {
                index: 0,
                clubId: '',
                leagueClassList: [],
                privateClassList: [],
                deleteIconShow: false,
                currentPage: 1, // 初始页码
                currentPagePrivate: 1, // 初始页码
                pageSize: 20, // 每次加载的数量
    			noContent: false, // 没有初始化内容 
                loading: false, // 加载更多loading
                noMore: false, // 没有更多
                scrollTop: '',
                scrollDisable: false,
                noContentPrivate: false, // 没有初始化内容 
                loadingPrivate: false, // 加载更多loading
                noMorePrivate: false, // 没有更多
                scrollTopPrivate: '',
                scrollDisablePrivate: false,
    		}
    	},
        created() {  
             
        },  
    	mounted (){
           this.clubId = this.$route.params.clubId;
           this.getLeagueClassTimeTable();
           // this.getPrivateClassTimeTable();
           document.getElementById('leagueClassListBox').addEventListener('scroll', this.woListScroll('league'));
           // document.getElementById('privateClassListBox').addEventListener('scroll', this.woListScroll('private'));
    	},
    	methods: {
            woListScroll(type) {
                if(type == 'league'){
                    this.scrollTop = window.scrollY + window.screen.availHeight - document.getElementById('leagueClassListBox').offsetHeight - 80;
                    if(this.scrollTop >= 0){
                        if(!this.scrollDisable){
                            this.loadMore()
                        }
                    }
                }else if(type == 'private'){
                    this.scrollTopPrivate = window.scrollY + window.screen.availHeight - document.getElementById('privateClassListBox').offsetHeight - 80;
                    if(this.scrollTopPrivate >= 0){
                        if(!this.scrollDisablePrivate){
                            this.loadMorePrivate()
                        }
                    }
                }
                
            },
            tabSelect(index){
                this.index = index;// 切换
            },
            getLeagueClassTimeTable(){
                let num = 0;
                this.currentPage = 1;
                let _this = this;
                this.$http.get('/LuchyBird/customRole/groupClassScheduleInfos.do?clubId='+this.clubId+'&page=1&pageSize='+this.pageSize+'').then(function(data){
                    if(data.data.status == 0){
                        var value = data.data.data;
                        if(value == '' || value == null|| value.length == 0){
                            Toast({
                                message: '暂无课程信息',
                                position: 'bottom',
                                duration: 2000
                            });
                            _this.noContent = true; // 初始无数据
                            _this.noMore = false;
                        }else{
                            _this.noMore = false;
                            _this.noContent = false; // 初始有数据
                            for(let i in value){
                                num ++;
                            }
                        }
                        _this.leagueClassList = value;
                        if(num<_this.pageSize && num != 0){ // 如果初始数据小于初始默认加载数据的条数，没有更多提示显示
                            _this.noMore = true;
                        }else{
                            _this.noMore = false;
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
            getPrivateClassTimeTable(){
                let numPrivate = 0;
                this.currentPagePrivate = 1;
                let _this = this;
                this.$http.get('/LuchyBird/customRole/privateClassScheduleInfos.do?clubId='+this.clubId+'&page=1&pageSize='+this.pageSize+'').then(function(data){
                    if(data.data.status == 0){
                        let value = data.data.data;
                        if(value == '' || value == null|| value.length == 0){
                            Toast({
                                message: '暂无课程信息',
                                position: 'bottom',
                                duration: 2000
                            });
                            _this.noContentPrivate = true; // 初始无数据
                            _this.noMorePrivate = false;
                        }else{
                            _this.noMorePrivate = false;
                            _this.noContentPrivate = false; // 初始有数据
                            for(let i in value){
                                numPrivate ++;
                            }
                        }
                        _this.privateClassList = value;
                        if(numPrivate<_this.pageSize && numPrivate != 0){ // 如果初始数据小于初始默认加载数据的条数，没有更多提示显示
                            _this.noMorePrivate = true;
                        }else{
                            _this.noMorePrivate = false;
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
            showDeleteLeague(){
                this.deleteIconShow = !this.deleteIconShow;
            },
            cancelClass(item){
                MessageBox.confirm('确定要取消'+item.className+'么？').then(action => {
                    item.isTimeout = '5';
                    Toast({
                        message: '成功取消'+item.className+'',
                        position: 'bottom',
                        duration: 2000
                    });
                },() => {});
            },
            deleteClass(item,index){
                MessageBox.confirm('确定要删除'+item.className+'么？').then(action => {
                    this.leagueClassList.splice(index,1);
                    Toast({
                        message: '成功删除'+item.className+'',
                        position: 'bottom',
                        duration: 2000
                    });
                    if(this.leagueClassList.length < this.pageSize){
                        if(!this.scrollDisable){
                            this.loadMore()
                        }
                    }
                },() => {});
            },
            onRefresh(done){
                this.getLeagueClassTimeTable();
                done() // call done
            },
            onRefreshPrivate(done){
                this.getPrivateClassTimeTable();
                done() // call done
            },
            loadMore() { // 加载更多
                if(this.noMore == true || this.noContent == true || this.loading == true){
                    return false;
                }
                this.scrollDisable = true;
                this.loading = true;
                let _this = this;
                let num = 0; // 判断每次请求到的数量
                this.currentPage ++;
                this.$http.get('/LuchyBird/customRole/groupClassScheduleInfos.do?clubId='+this.clubId+'&page='+this.currentPage+'&pageSize='+this.pageSize+'').then(function(data){
                    var value = data.data.data;
                    if(_this.leagueClassList.length == 0){ // 如果初始没有数据不继续加载
                        _this.noMore = false;
                        _this.noContent = true; 
                    }else{
                        if(value == '' || value == null){
                            _this.noMore = true;
                            _this.noContent = false;
                        }else{
                            _this.noMore = false;
                            _this.noContent = false;
                            for(var i in value){
                                num ++;
                                _this.leagueClassList.push(value[i]);
                            }
                            if(num<_this.pageSize && num != 0){ // 如果初始数据小于初始默认加载数据的条数，没有更多提示显示
                                _this.noMore = true;
                            }else{
                                _this.noMore = false;
                            }
                        }
                    }
                }).catch(function(data){ // 失败回调
                    
                })
                this.loading = false; 
                this.scrollDisable = false; 
            },
            loadMorePrivate() { // 加载更多
                if(this.noMorePrivate == true || this.noContentPrivate == true || this.loadingPrivate == true){
                    return false;
                }
                this.scrollDisablePrivate = true;
                this.loadingPrivate = true;
                let _this = this;
                let numPrivate = 0; // 判断每次请求到的数量
                this.currentPagePrivate ++;
                this.$http.get('/LuchyBird/customRole/privateClassScheduleInfos.do?clubId='+this.clubId+'&page='+this.currentPagePrivate+'&pageSize='+this.pageSize+'').then(function(data){
                    let value = data.data.data;
                    if(_this.privateClassList.length == 0){ // 如果初始没有数据不继续加载
                        _this.noMorePrivate = false;
                        _this.noContentPrivate = true; 
                    }else{
                        if(value == '' || value == null){
                            _this.noMorePrivate = true;
                            _this.noContentPrivate = false;
                        }else{
                            _this.noMorePrivate = false;
                            _this.noContentPrivate = false;
                            for(let i in value){
                                numPrivate ++;
                                _this.privateClassList.push(value[i]);
                            }
                            if(numPrivate<_this.pageSize && numPrivate != 0){ // 如果初始数据小于初始默认加载数据的条数，没有更多提示显示
                                _this.noMorePrivate = true;
                            }else{
                                _this.noMorePrivate = false;
                            }
                        }
                    }
                }).catch(function(data){ // 失败回调
                    
                })
                this.loadingPrivate = false; 
                this.scrollDisablePrivate = false; 
            },
            addLeague(){
                this.$router.push({name:'AddLeagueTimetable',params:{clubId:this.clubId}})
            },
            editClass(classScheduleId,notPersonal){
                this.$router.push({name:'EditLeagueTimetable',params:{clubId:this.clubId,classScheduleId:classScheduleId,notPersonal:notPersonal}})
            }
    	}
    }
</script>
<style>
    #leagueClassTimetableBox .deleteIcon{
        width: 40px;
        height: 40px;
        background-image: url(../../assets/img/deleteWhite.png);
        background-size: 50%;
        background-position: right;
        background-repeat: no-repeat;
        display: block;
        float: right;
    }
    #leagueClassTimetableBox .deleteIconRight{
        background-image: url(../../assets/img/deleteFinal.png) !important;
    }
    #leagueClassTimetableBox .tabListBox{
        width: 100%;
        height: 1.2rem;
        background: #fff;
        box-sizing: border-box;
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
        position: fixed;
        left: 0;
        top: 40px;
        z-index: 111;
    }
    #leagueClassTimetableBox .tabListBox>.tabList{
        height: 100%;
        line-height: 1.2rem;
        font-size: 14px;
        color: #666;
        box-sizing: border-box;
        flex: 1;
        overflow: hidden;
    }
    #leagueClassTimetableBox .tabListBox>.tabList_active{
        border-bottom: 2px solid #f0832f;
    }
    #leagueClassTimetableBox .memberListTimetableBox{
        width: 100%;
        height: 100vh;
        background: #f6f6f6;
        padding-top: 40px;
        margin-top: -40px;
        box-sizing: border-box; 
        overflow: hidden;
    }
    #leagueClassTimetableBox .memberListTimetableBox .memberListTimetable{
        width: 100%;
        min-height: 100%;
        padding: 0.2rem;
        box-sizing: border-box;
        background: #f6f6f6;
        overflow-x: hidden;
        overflow-y: auto;
    }
    #leagueClassTimetableBox .memberListTimetableBox .memberListTimetable .timetableList{
        width: 100%;
        height: 100px;
        background: #fff;
        border: 1px solid #f2f2f2;
        box-sizing: border-box;
        margin-bottom: 0.2rem;
        transition: all 0.5s ease;
        left: 0;
        position: relative;
        z-index: 888;
    }
    #leagueClassTimetableBox .memberListTimetableBox .memberListTimetable .showDeleteManageList{
        left: 1.5rem;
    }
    #leagueClassTimetableBox .memberListTimetableBox .memberListTimetable .timetableList>.titleBox{
        width: 80%;
        height: 100%;
        padding-left: 0.4rem;
        box-sizing: border-box;
        overflow: hidden;
    }
    #leagueClassTimetableBox .titleBox>.leagueClassName{
        width: 100%;
        height: 44px;
        line-height: 44px;
        text-align: left;
        font-size: 14px;
        color: #000;
    }
    #leagueClassTimetableBox .titleBox>.leagueClassTeacher,#leagueClassTimetableBox .titleBox>.leagueClassClub{
        width: 100%;
        height: 24px;
        line-height: 24px;
        text-align: left;
        font-size: 12px;
        color: #666;
        display: block;
    }
    #leagueClassTimetableBox .titleBox>.leagueClassTeacher>span,#leagueClassTimetableBox .titleBox>.leagueClassClub>span{
        margin-right: 0.2rem;
    }
    #leagueClassTimetableBox .memberListTimetableBox .memberListTimetable .timetableList>.scoreBox{
        width: 1.6rem;
        height: 1rem;
        text-align: center;
        line-height: 1rem;
        font-size: 14px;
        color: #000;
        display: block;
        position: absolute;
        right: 0.2rem;
        top: 50%;
        margin-top: -0.5rem;
        z-index: 999;
    }
    #leagueClassTimetableBox .memberListTimetableBox .memberListTimetable .timetableList>.stateBox{
        width: 1.5rem;
        height: 1.5rem;
        display: block;
        position: absolute;
        right: 0;
        top: -0.15rem;
        z-index: 888;
    }
    #leagueClassTimetableBox .memberListTimetableBox .memberListTimetable .timetableList>.stateBox>img{
        width: 100%;
        height: 100%;
        display: block;
    }
    /* 取消课程 */
    #leagueClassTimetableBox .cancelLeagueBox{
        width: 0.6rem;
        height: 0.6rem;
        display: block;
        position: absolute;
        right: 1.2rem;
        bottom: 0.2rem;
        z-index: 999;
    }
    /* 编辑 */
    #leagueClassTimetableBox .editLeagueBox{
        width: 0.6rem;
        height: 0.6rem;
        display: block;
        position: absolute;
        right: 0.2rem;
        bottom: 0.2rem;
        z-index: 999;
    }
    #leagueClassTimetableBox .editLeagueBox>img,#leagueClassTimetableBox .cancelLeagueBox>img{
        width: 100%;
        height: 100%;
        display: block;
    }
    /* 删除 */
    #leagueClassTimetableBox .memberListTimetableBox .memberListTimetable .timetableList>.deleteLeagueBox{
        width: 0.6rem;
        height: 0.6rem;
        display: none;
        position: absolute;
        left: -1rem;
        top: 50%;
        margin-top: -0.3rem;
        z-index: 999;
    }
    #leagueClassTimetableBox .memberListTimetableBox .memberListTimetable .timetableList>.showDeleteLeagueBox{
        display: block;
    }
    #leagueClassTimetableBox .memberListTimetableBox .memberListTimetable .timetableList>.deleteLeagueBox>img{
        width: 100%;
        height: 100%;
        display: block;
    }
    #leagueClassTimetableBox .addTimetableBox{
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
        position: fixed;
        right: 0.4rem;
        bottom: 0.8rem;
        z-index: 999;
        overflow: hidden;
    }
    .noContentBox>span{
        width: 100%;
        height: 1rem;
        line-height: 1rem;
        text-align: center;
        color: #666;
        font-size: 14px;
        display: block;
    }
    .noContentBox>i{
        width: 4rem;
        height: 4rem;
        display: block;
        margin: 0 auto;
        margin-top: 1rem;
        overflow: hidden;
    }
    .noContentBox>i>img{
        width: 100%;
        height: 100%;
        display: block;
    }
</style>

