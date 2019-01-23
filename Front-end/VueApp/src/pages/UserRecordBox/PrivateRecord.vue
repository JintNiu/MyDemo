<template>
    <div class="page" id="privateRecord">
       <mt-header fixed title="私教记录" style="background:#000">
            <mt-button slot="left" icon="back" @click="privatePopup()"></mt-button>
        </mt-header>
        <div class="privateListBox" id="privateListBox" @scroll.native="woListScroll($event)">
            <ul>
                <li v-for="course in privateRecordList">
                    <i>
                        <img v-if="course.headImgUrl==null" src="../../assets/img/offlineUserIcon.png" alt="暂无头像">
                        <img v-if="course.headImgUrl!=null" :src="course.headImgUrl" alt="">
                    </i>
                    <div>
                        <p class="courseName">
                            {{course.name}}
                            <span style="float:right">教练：{{course.teacherName}}</span>
                        </p>
                        <p class="storeName">{{course.clubName}}</p>
                        <p class="courseDate">
                            <span>{{course.createTime}} </span>
                        </p>
                    </div>
                </li>
                <mt-spinner type="4" style="width:1rem;margin:0 auto;display:block;" v-if="loading&&!noMore"></mt-spinner>
                <div class="noContentBox" v-if="noContent">
                    <i><img src="../../assets/img/noHtml.png"></i>
                    <span>没有东东诶~</span>
                </div>
                <div style="width:100%;height:1rem;line-height:1rem;color:#000;font-size:0.36rem;position:relative;overflow:hidden" v-if="noMore">
                    <i style="width:3rem;height:1px;background:#ccc;position:absolute;right:0.4rem;top:50%"></i>
                    <span>oh，已经到底线了</span>
                    <i style="width:3rem;height:1px;background:#ccc;position:absolute;left:0.4rem;top:50%"></i>
                </div>
            </ul>
        </div>
    </div>
</template>
<script>
import {Toast,Spinner} from 'mint-ui';
export default {
    name: 'PrivateRecord',
	data () {
		return{
            userId: '',
            privateRecordList:[],
            noContent: false, // 没有初始化内容 
            loading: false, // 加载更多loading
            noMore: false, // 没有更多
            scrollTop: '',
            scrollDisable: false,
            currentPage: '1',
            pageSize: '8'
		}
	},
    mounted (){
        this.userId = this.$route.params.userId;
        this.getPrivateList();
        document.getElementById('privateListBox').addEventListener('scroll', this.woListScroll);
    },
    methods:{
        // privatePopup(){
        //     this.$emit('closeprivatePopup',false); // 自定义事件，在父级调用closeCardPopup
        // }
        woListScroll() {
            this.scrollTop = window.scrollY + window.screen.availHeight - document.getElementById('privateListBox').offsetHeight - 80;
            if(this.scrollTop >= 0){
                if(!this.scrollDisable){
                    this.loadMore()
                }
            }
        },
        getPrivateList(){
            let num = 0;
            let _this = this;
            this.$http.get('/LuchyBird/publicUser/getUserClassDetail.do?userId='+this.userId+'&isPersonal=1&currentPage=1&pageSize='+this.pageSize+'').then(function(data){
                if(data.data.status == 0){
                    let value = data.data.data;
                    if(value == '' || value == null|| value.length == 0){
                        Toast({
                            message: '暂无私教课程信息',
                            position: 'bottom',
                            duration: 2000
                        });
                        _this.noContent = true; // 初始无数据
                        _this.noMore = false;
                    }else{
                        _this.noContent = false; // 初始有数据
                        _this.privateRecordList = value;
                        for(let i in value){
                            num ++;
                        }
                    }
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
        loadMore() { // 加载更多
            if(this.noMore == true || this.noContent == true || this.loading == true){
                return false;
            }
            this.scrollDisable = true;
            this.loading = true;
            let _this = this;
            let num = 0; // 判断每次请求到的数量
            this.currentPage ++; 
            this.$http.post('/LuchyBird/manage/getUserClassDetail.do?userId='+this.userId+'&isPersonal=1&currentPage='+this.currentPage+'&pageSize='+this.pageSize+'').then(function(data){
                let value = data.data.data;
                if(_this.privateRecordList.length == 0){ // 如果初始没有数据不继续加载
                    _this.noMore = false;
                    _this.noContent = true; 
                }else{
                    if(value == '' || value == null || value.length == 0){
                        _this.noMore = true;
                        _this.noContent = false;
                    }else{
                        _this.noMore = false;
                        _this.noContent = false;
                        for(let i in value){
                            num ++;
                            _this.privateRecordList.push(value[i]);
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
        privatePopup(){
            this.$router.back();
        }
    }
}
</script>
<style scope>
    #privateRecord{
        width: 100%;
        height: 100vh;
        box-sizing: border-box;
        background: #fff;
        overflow: auto;
    }
    .privateListBox{
        width: 100%;
        height: auto;
        box-sizing: border-box;
        overflow: auto;
    }
    .privateListBox>ul{
        width: 100%;
        height: 100%;
        padding: 0 0.4rem;
        box-sizing: border-box;
        overflow: auto;
    }
    .privateListBox>ul>li{
        width: 100%;
        height: 2.5rem;
        padding-top:0.25rem;
        padding-left:0.25rem;
        border-radius: 6px;
        margin-top: 0.4rem;
        background:#fff;
        box-shadow:   0  0  10px  2px  #f2f2f2;
        box-sizing: border-box;
    }
    .privateListBox>ul>li>i{
        width: 2rem;
        height: 2rem;
        overflow:hidden;
        float:left;
    }
    .privateListBox>ul>li>i>img{
        width: 100%;
        height: 100%;
        display: block;
    }
    .privateListBox>ul>li>div{
        width: 7.2rem;
        height:100%;
        /* background: #fff; */
        padding: 0.2rem 0.4rem;
        box-sizing: border-box;
        float:left;
    }
    .privateName{
        font-size: 14px;
        text-align: left;
        color: #000;
    }
    .storeName{
        font-size: 12px;
        text-align: left;
        color: #666;
        margin-top:10px
    }
    .privateDate{
        font-size: 12px;
        text-align: left;
        color: #666;
        margin-top:10px 
    }
    .noContentBox>span{
        width: 100%;
        height: 1rem;
        line-height: 1rem;
        text-align: center;
        color: #666;
        font-size: 0.36rem;
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
