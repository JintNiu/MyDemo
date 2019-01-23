<template>
    <div class="page" id="allPrivateList">
        <mt-header fixed title="私教列表" style="background:#000">
            <mt-button slot="left" icon="back" @click="$router.back()"></mt-button>
        </mt-header>
        <div class="page-content">
            <div class="privateListBox" @scroll.native="woListScroll($event)">
                <!-- on-refresh下拉刷新 -->
                <v-scroll ref="privateList" 
                        :on-refresh="onRefresh"
                        v-infinite-scroll="loadMore"
                        infinite-scroll-disabled="loading"
                        infinite-scroll-distance="0"
                        infinite-scroll-immediate-check=false>
                    <ul class="privateList" id="privateList">
                        <li v-for="item in privateListBox" :id="item.id">
                            <div class="privateName">
                                <i class="privatePhoto">
                                    <img v-if="item.teacherheadurl==null" src="../../assets/img/offlineUserIcon.png" alt="暂无头像">
                                    <img v-if="item.teacherheadurl!=null" :src="item.teacherheadurl" alt="">
                                </i>
                                <span>{{item.teachername}}</span>
                            </div>
                            <div class="privateInforBox">
                                <div class="privateTag">
                                    <i><img src="../../assets/img/privateTag.png"></i>
                                    <span>{{item.tag}}</span>
                                </div>
                                <div class="privateMotto">
                                    <i><img src="../../assets/img/privateMotto.png"></i>
                                    <span>{{item.teachersay}}</span>
                                </div>
                            </div>
                            <div class="privateModelList">
                                <div class="privateDetails" @click="toPrivateDetails(item.id)">
                                    <i><img src="../../assets/img/privateDetails.png"></i>
                                    <span>详情</span>
                                </div>
                                <div class="privateTime" @click="toPrivateTime(item.userId,item.companyid)">
                                    <i><img src="../../assets/img/privateTime.png"></i>
                                    <span>课表</span>
                                </div>
                            </div>
                        </li>
                        <div class="loadingBox" style="width:100%;min-height:1rem;overflow:hidden;">
                            <mt-spinner type="snake" style="width:1rem;height:1rem;margin:0 auto;display:block;" v-if="loading&&!noMore"></mt-spinner>
                            <div class="noContentBox" v-if="noContent">
                                <i><img src="../../assets/img/noHtml.png"></i>
                                <span>没有东东诶~</span>
                            </div>
                            <div style="width:100%;height:1rem;line-height:1rem;color:#000;font-size:0.36rem;position:relative;overflow:hidden" v-if="noMore">
                                <i style="width:3rem;height:1px;background:#ccc;position:absolute;right:0.4rem;top:50%"></i>
                                <span>没有更多了</span>
                                <i style="width:3rem;height:1px;background:#ccc;position:absolute;left:0.4rem;top:50%"></i>
                            </div>
                        </div>
                    </ul>
                </v-scroll>
                <!-- 模态框 -->
                <mt-popup v-model="privatePopup" :modal=true
                        position="top"
                  popup-transition="popup-slide" style="width:100%;height:100%">
                    <div class="privateTimeListBox">
                        <mt-header fixed title="私教时间管理" style="background:#000">
                            <mt-button slot="left" icon="back" @click="closePrivatePopup"></mt-button>
                        </mt-header>
                        <iframe :src="privateUrl"></iframe>
                    </div>
                </mt-popup>
            </div>  
        </div>
    </div>
</template>
<script>
    import {Toast,InfiniteScroll,Popup } from 'mint-ui';
    import Scroll from '../../components/scroll';
    export default {
        name: 'AllPrivateList',
        components: {
            'v-scroll': Scroll,
        },
        data () {
            return {
                clubId: '',
                privateListBox: [],
                currentPage: 1, // 初始页码
                pageSize: 10, // 每次加载的数量
                noContent: false, // 没有初始化内容 
                loading: false, // 加载更多loading
                noMore: false, // 没有更多
                scrollTop: '',
                scrollDisable: false,
                privatePopup: false,
                privateUrl: ''
            }
        },
        ready () {
          
        },
        mounted (){
            this.clubId = this.$route.params.clubId;
            this.getPrivateList();
            document.getElementById('privateList').addEventListener('scroll', this.woListScroll);      
        },
        watch: {
            
        },
        methods: {
            woListScroll() {
                this.scrollTop = window.scrollY + window.screen.availHeight - document.getElementById('privateList').offsetHeight - 80;
                if(this.scrollTop >= 0){
                    if(!this.scrollDisable){
                        this.loadMore()
                    }
                }
            },
            getPrivateList(){
                let num = 0;
                this.currentPage = 1;
                let _this = this;
                this.$http.get('/LuchyBird/customRole/privateTeacherList.do?currentPage=1&pageSize='+this.pageSize+'&clubId='+this.clubId+'').then(function(data){
                    if(data.data.status == 0){
                        var value = data.data.data;
                        if(value == '' || value == null|| value.length == 0){
                            Toast({
                                message: '暂无教练信息',
                                position: 'bottom',
                                duration: 2000
                            });
                            _this.noContent = true; // 初始无数据
                            _this.noMore = false;
                        }else{
                            _this.noContent = false; // 初始有数据
                            for(let i in value){
                                if(value[i].picurl == null){
                                    value[i].picurl = _this.hasImage;
                                }
                                num ++;
                            }
                        }
                        _this.privateListBox = value;
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
            onRefresh(done){
                this.getPrivateList();
                done() // call done
            },
            loadMore() { // 加载更多
                if(this.noMore || this.noContent || this.loading){
                    return false;
                }
                this.scrollDisable = true;
                this.loading = true;
                let _this = this;
                let num = 0; // 判断每次请求到的数量
                this.currentPage ++;
                this.$http.post('/LuchyBird/customRole/privateTeacherList.do?currentPage='+this.currentPage+'&pageSize='+this.pageSize+'&clubId='+this.clubId+'').then(function(data){
                    let value = data.data.data;
                    if(_this.privateListBox.length == 0){ // 如果初始没有数据不继续加载
                        _this.noMore = false;
                        _this.noContent = true; 
                    }else{
                        if(value == '' || value == null){
                            _this.noMore = true;
                            _this.noContent = false;
                        }else{
                            _this.noMore = false;
                            _this.noContent = false;
                            for(let i in value){
                                if(value[i].picurl == null){
                                    value[i].picurl = _this.hasImage;
                                }
                                num ++;
                                _this.privateListBox = value[i];
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
            toPrivateDetails(id){
                this.$router.push({name:'TeacherDetails',params:{id:id}})
            },
            toPrivateTime(userId,companyId){
                // this.$router.push({name:'OnePrivate'})
                this.closePrivatePopup();
                // http://www.imstlife.com.cn/WeChatServer/luchyPrivateTime.html?openId=o6uBPwelwhfugeCSToyO-U9SmteA&companyId=1
                this.privateUrl = 'http://www.imstlife.com.cn/WeChatServer/luchyPrivateTime.html?userId='+userId+'&companyId='+companyId+''
                // this.privateUrl = 'http://www.imstlife.com.cn/WeChatServer/privateTime.html?openId=o6uBPwelwhfugeCSToyO-U9SmteA&companyId=1'
            },
            closePrivatePopup(){
                this.privatePopup = !this.privatePopup;
            }
        }
    }
</script>
<style scoped>
    .page-content{
        width: 100%;
        height: auto;
        overflow: hidden;
    }
    .privateListBox{
        width: 100%;
        min-height: 100vh;
        background: #fff;
        padding-top: 40px;
        margin-top: -40px;
        box-sizing: border-box;
        overflow: auto;
    }
    .privateList{
        width: 100%;
        height: auto;
        padding: 0.1rem;
        box-sizing: border-box;
        overflow: hidden;
    }
    .privateList>li{
        width: 47%;
        height: 5.4rem;
        box-shadow: 0 0 6px 2px #f2f2f2;
        margin: 1.5%;
        box-sizing: border-box;
        overflow: hidden;
        float: left;
    }
    .privateName{
        width: 100%;
        height: 1.8rem;
        display: flex;
        align-items: center;
        justify-content: space-around;
        overflow: hidden;
    }
    .privatePhoto{
        flex: 1;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .privatePhoto>img{
        width: 1.5rem;
        height: 1.5rem;
        border-radius: 50%;
        display: block;
        overflow: hidden;
    }
    .privateName>span{
        flex: 1;
        width: 100%;
        height: 100%;
        font-size: 14px;
        color: #000;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .privateInforBox{
        width: 100%;
        height: 2.5rem;
        padding: 0.1rem;
        box-sizing: border-box;
        overflow: hidden;
    }
    .privateInforBox>div{
        width: 100%;
        height: 1rem;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        overflow: hidden;
    }
    .privateInforBox>div>i{
        flex: none;
        width: 0.5rem;
        height: 0.5rem;
        display: block;
        overflow: hidden;
    }
    .privateInforBox>div>i>img{
        width: 100%;
        height: 100%;
        display: block;
    }
    .privateInforBox>div>span{
        width: 100%;
        height: 100%;
        font-size: 12px;
        text-indent: 0.2rem;
        color: #666;
        display: flex;
        align-items: center;
        justify-content: flex-start;
    }
    .privateInforBox>.privateMotto{
        height: 1.5rem;
        align-items: flex-start;
    }
    .privateInforBox>.privateMotto>span{
        line-height: 0.5rem;
        text-align: left;
        align-items: flex-start;
    }
    .privateModelList{
        width: 100%;
        height: 1.2rem;
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .privateModelList>div{
        width: 50%;
        height: 100%;
        font-size: 14px;
        color: #000;
        background: #f9f9f9;
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .privateModelList>div>i{
        width: 0.6rem;
        height: 0.6rem;
        margin-right: 0.2rem;
        margin-top: -0.1rem;
        display: block;
        overflow: hidden;
    }
    .privateModelList>div>i>img{
        width: 100%;
        height: 100%;
        display: block;
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
    .privateTimeListBox{
        width: 100%;
        height: 100vh;
        padding-top: 40px;
        box-sizing: border-box;
        background: #fff;
        -webkit-overflow-scrolling: touch;
        overflow:auto;
    }
    .privateTimeListBox>iframe{
        width: 100%;
        height: 100%;
        border: none;
        position: relative;
        overflow-x: hidden;
        overflow-y: auto;
    }
</style>