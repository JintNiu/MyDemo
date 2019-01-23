<template>
    <div class="page" id="AppBannerManage">
        <mt-header fixed :title="pageTitle" style="background:#000">
            <mt-button slot="left" icon="back" @click="$router.back()"></mt-button>
            <mt-button slot="right" @click="openAddBanner()">添加</mt-button>
            <!-- <mt-button slot="right" v-show="changePage==2" @click="openAddTopic()">添加</mt-button> -->
        </mt-header>
        <div class="page-content">
            <v-scroll :on-refresh="onRefreshBanner">
                <div class="bannerBox">
                    <div class="bannerList" v-for="(banner,index) in bannerImages" :id="banner.id" @click="openEditBanner(banner.id)">
                        <i><img :src="banner.imgurl" alt=""></i>
                        <h2>
                            <span>{{banner.linkurl}}</span>
                            <b class="fa fa-angle-right"></b>
                        </h2>
                    </div>
                </div>  
            </v-scroll>
            <!-- <v-scroll :on-refresh="onRefreshTopic" v-show="changePage==2">
                <div class="bannerBox">
                    <div class="bannerList" v-for="(topic,index) in topicImages" @click="openEditTopic(topic.id)">
                        <i :url="topic.url"><img :src="topic.img" alt=""></i>
                        <h2>
                            {{topic.title}}
                            <b class="fa fa-angle-right"></b>
                        </h2>
                    </div>
                </div>  
            </v-scroll> -->
        </div>
        <!-- 添加轮播图 -->
        <mt-popup v-model="addBannerPopup" :modal=false
                position = bottom
          popup-transition="popup-slide" style="width:100%;height:100%;z-index:10 !important;">
            <div class="backIcon" @click="openAddBanner()">
                <i class="fa fa-angle-left"></i>
                <span>添加</span>
                <i></i>
            </div>      
            <div class="addBannerBox handleBannerBox">
                <i class="imgUrl">
                    <img id="bannerImgUrlBox" :src='imgUrl'>
                    <input type="file" accept="image/x-png,image/gif,image/jpeg,image/bmp" name="" @change="uploadImg">
                </i>

                <div class="toInfor">
                    <div class="cardFit">
                        <label class="cardTitle">是否开启链接</label>
                        <label class="openOrCloseUrl" for="open">
                            <input id="open" type="radio" name="linkType" value="1" v-model="linkType">
                            <span class="urlStateName"></span>
                            <span style="margin-left: 10px">开启</span>
                        </label>
                        <label class="openOrCloseUrl" for="close">
                            <input id="close" type="radio" name="linkType" value="0" v-model="linkType">
                            <span class="urlStateName"></span>
                            <span style="margin-left: 10px">关闭</span>
                        </label>
                    </div> 
                    <div class="discountPrice">
                        <label class="cardTitle">图片链接</label>
                        <input type="text" name="url" v-model="linkUrl">
                    </div>
                </div>
                <input id="toBannerPic" type="file" accept="image/gif,image/jpeg,image/jpg,image/png" name="" @change="onClubFileChange($event)" style="display:none">
                <div class="saveAddBanner" @click="saveAddBanner()">
                    <span>保存</span>
                </div>
            </div>
        </mt-popup>
        <!-- 添加话题 -->
        <!-- <mt-popup v-model="addTopicPopup" :modal=false
                position = bottom
          popup-transition="popup-slide" style="width:100%;height:100%;z-index:999 !important;">
            <div class="backIcon" @click="openAddTopic()">
                <i class="fa fa-angle-left"></i>
                <span>添加</span>
                <i></i>
            </div>      
            <div class="addBannerBox handleBannerBox">
                <i class="imgUrl" @click="addTopicPic($event)">
                    <img id="topicImgUrlBox" src='../../assets/img/addBanner.png'>
                </i>

                <div class="toInfor">
                    <input type="text" name="topicTitle" placeholder="图片标题" value="">
                    <input type="text" name="topicUrl" placeholder="图片链接地址" value="">
                </div>
                <input id="toTopicPic" type="file" accept="image/gif,image/jpeg,image/jpg,image/png" name="" @change="onClubFileChange($event)" style="display:none">
                <div class="saveAddBanner">
                    <span>保存</span>
                </div>
            </div>
        </mt-popup> -->
        <!-- <div class="footerChangeList">
            <div :class="{'changePage' : changePage == '1'}" v-on:tap="toChangePage('1')">
                <i class="fa fa-image"></i>
                <span>轮播图</span>
            </div>
            <div :class="{'changePage' : changePage == '2'}" v-on:tap="toChangePage('2')">
                <i class="fa fa-bullhorn"></i>
                <span>话题</span>
            </div>
        </div>  --> 
    </div>
</template>
<script>
    import {Toast,Popup,MessageBox} from 'mint-ui';
    import Scroll from '../../components/scroll';
    export default {
        name: 'MyRunning',
        components: {
            'v-scroll': Scroll
        },
        data () {
            return {
                // changePage: '1',
                manageId: '',
                pageTitle: 'AppBanner管理',
                bannerImages: [],
                // topicImages: [
                //     {'id' : 0,
                //     'img' : 'http://run-manage.oss-cn-shanghai.aliyuncs.com/img/1502713899523.png',
                //     'title' : '女性训练',
                //     'url' : 'https://mp.weixin.qq.com/s/mgzopsq7fbnQbzZklnpVCw'}
                // ],
                // topicImagesLoad: [],
                addBannerPopup: false,
                // addTopicPopup: false,
                imgUrl: require('../../assets/img/addBanner.png'),
                linkType: 0,
                linkUrl: ''
            }
        },
        watch: {  

        }, 
        computed: {  
            
        }, 
        created() {  
            
        },  
        mounted (){
           this.$nextTick(() => {
                this.manageId = localStorage.getItem("manageId");
                this.getAppBannerList();
            })
        },
        methods: {
            getAppBannerList(){
                let _this = this;
                this.$http.get('/LuchyBird/appBanner/getAppBanners.do?manageId='+this.manageId+'').then(function(data){
                    if(data.data.status == 0){
                        let value = data.data.data;
                        if(value == '' || value == null){
                            Toast({
                                message: '暂无banner信息',
                                position: 'bottom',
                                duration: 2000
                            });
                        }else{
                            _this.bannerImages = value;
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
            onRefreshBanner(done){
                this.getAppBannerList();
                done() // call done
            },
            // onRefreshTopic(done){
            //     console.log('刷新');
            //     setTimeout(function(){
            //         done() // call done
            //     },3000)
            // },
            uploadImg(e){
                var _this = this;
                var file = e.target.files[0];
                var formData = new FormData();
                var reader = new FileReader();
                reader.readAsDataURL(file); 
                if((file.size/1024).toFixed(0)<1024){
                    formData.append('image',file);
                    _this.toUploadImgFunc(formData);
                }else{
                    Toast({
                        message: '请选择小于1M的banner图片',
                        position: 'bottom'
                    });
                }      
            },
            toUploadImgFunc(file){
                let _this = this;
                this.$http.post('/LuchyBird/img/imgUpload.do',file,{headers: {'Content-Type': 'multipart/form-data'}})
                .then(function (data) {
                    if(data.data.status == 0){
                        let value = data.data.data;
                        _this.imgUrl = value;
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
            openAddBanner(){
                this.addBannerPopup = !this.addBannerPopup;
            },
            saveAddBanner(){
                let _this = this;
                if(this.imgUrl != '' && this.linkType != '' && this.linkUrl != ''){
                    this.$http.get('/LuchyBird/appBanner/addAppBanner.do?imgUrl='+this.imgUrl+'&linkType='+this.linkType+'&linkUrl='+this.linkUrl+'')
                    .then(function (data) {
                        if(data.data.status == 0){
                            Toast({
                                message: '添加成功',
                                position: 'bottom',
                                duration: 2000
                            });
                            _this.addBannerPopup = !_this.addBannerPopup
                            _this.getAppBannerList();
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
                }else{
                    Toast({
                        message: '请将信息填写完整',
                        position: 'bottom',
                        duration: 2000
                    });
                }
            },
            openEditBanner(id){
                this.$router.push({name:'EditAppBanner',params:{bannerId:id}});
            },
            // openAddTopic(){
            //     this.addTopicPopup = !this.addTopicPopup;
            // },
            // openEditTopic(id){
            //     this.$router.push({name:'EditAppTopic',params:{topicId:id}});
            // },
            // toChangePage(num){
            //     this.changePage = num;
            //     if(num == '1'){
            //         this.pageTitle = 'AppBanner管理';
            //     }else{
            //         this.pageTitle = 'App话题管理';
            //     }
                
            // }
        }
    }
</script>
<style scoped>
    #AppBannerManage .page-content{
        width: 100%;
        height: 100vh;
        padding-top: 40px;
        margin-top: -40px;
        background: #f6f6f6;
        box-sizing: border-box; 
        overflow: hidden;
    }
    #AppBannerManage .mint-popup,.mint-popup-bottom{
        z-index: 10 !important;
    }
    .bannerBox{
        width: 100%;
        height: auto;
        background: #f2f2f2;
        padding: 0.4rem;
        box-sizing: border-box;
        overflow: hidden;
    }
    .bannerBox>.bannerList{
        width: 100%;
        height: auto;
        margin-bottom: 0.4rem;
        overflow: hidden;
        position: relative;
    }
    .bannerBox>.bannerList>i,.bannerBox>.bannerList>i>img{
        width: 100%;
        height: 4.6rem;
        display: block;
        overflow: hidden;
    }
    .bannerBox>.bannerList>h2{
        width: 100%;
        height: 1rem;
        background: #fff;
        display: block;
    }
    .bannerBox>.bannerList>h2>span{
        width: 9rem;
        height: 100%;
        line-height: 1rem;
        text-align: left;
        text-indent: 0.3rem;
        color: #000;
        font-size: 14px;
        display: block;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
        float: left;
    }
    .bannerBox>.bannerList>h2>b{
        width: 0.5rem;
        height: 100%;
        line-height: 1rem;
        text-align: center;
        margin-right: 0.3rem;
        float: right;
        display: block;
    }
    /* 添加，修改banner */
    #AppBannerManage .handleBannerBox{
        width: 100%;
        height: 100%;
        padding: 0.4rem;
        box-sizing: border-box;
        overflow: hidden;
    }
    #AppBannerManage .handleBannerBox>.imgUrl{
        width: 100%;
        height: 5.2rem;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
    }
    #AppBannerManage .handleBannerBox>.imgUrl img{
        width: 100%;
        height: 100%;
        display: block;
    }
    #AppBannerManage .handleBannerBox>.imgUrl>input{
        width: 100%;
        height: 100%;
        display: block;
        opacity: 0;
        position: absolute;
        left: 0;
        top: 0;
    }
    #AppBannerManage .handleBannerBox>.toInfor{
        width: 100%;
        height: auto;
        overflow: hidden;
    }
    #AppBannerManage .handleBannerBox>.toInfor>div{
        width: 100%;
        min-height: 1rem;
        border-bottom: 1px solid #f2f2f2;
        padding: 0.2rem 0 0.1rem;
        box-sizing: border-box;
        overflow: hidden;
    }
    #AppBannerManage .handleBannerBox>.toInfor>div>.cardTitle{
        width: 100%;
        height: 0.4rem;
        line-height: 0.4rem;
        text-align: left;
        font-size: 0.32rem;
        color: #666;
        display: block;
        overflow: hidden;
    }
    #AppBannerManage .handleBannerBox>.toInfor>div>.mint-switch{
        margin: 0.1rem 0;
    }
    #AppBannerManage .handleBannerBox>.toInfor>div>input{
        width: 100%;
        height: 0.8rem;
        font-size: 0.42rem;
        line-height: 0.8rem;
        color: #000;
        margin-top: 0.1rem;
        outline: none;
        border: none;
        background: #fff;
        display: block;
    }
    .backIcon{
        width: 100%;
        height: 40px;
        background: #000;
        padding: 0 10px;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: space-between;
        overflow: hidden;
    }
    .backIcon>i{
        width: 40px;
        height: 40px;
        line-height: 40px;
        font-size: 26px;
        text-align: left;
        color: #fff;
        display: block;
    }
    .backIcon>span{
        width: auto;
        height: 40px;
        font-size: 14px;
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .saveAddBanner{
        width: 100%;
        height: 1rem;
        margin: 0 auto;
        margin-top: 1rem;
        box-sizing: border-box;
        display: block;
        overflow: hidden;
    }
    .saveAddBanner>span{
        width: 100%;
        height: 100%;
        font-size: 0.42rem;
        color: #fff;
        background: #f0832f;
        border-radius: 3px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .footerChangeList{
        width: 100%;
        height: 1.2rem;
        background: #fff;
        box-shadow: 0 0 6px 2px #f2f2f2;
        box-sizing: border-box;
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
        position: fixed;
        left: 0;
        bottom: 0;
    }
    .footerChangeList>div{
        flex: 1;
        width: 100%;
        height: 100%;
        padding: 0.1rem 0;
        box-sizing: border-box;
        overflow: hidden;
    }
    .footerChangeList>div>i{
        width: 100%;
        height: 0.6rem;
        font-size: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .footerChangeList>div>span{
        width: 100%;
        height: 0.4rem;
        font-size: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .footerChangeList>.changePage{
        background: #f0832f;
        color: #fff;
    }
    .openOrCloseUrl {
      position: relative;
      line-height: 30px;
      margin-right: 1rem;
      float: left;
    }

    .openOrCloseUrl input[type="radio"] {
      width: 20px;
      height: 20px;
      opacity: 0;
    }

    .openOrCloseUrl .urlStateName {
      position: absolute;
      left: 5px;
      top: 8px;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      border: 1px solid #999;
    }

    /*设置选中的input的样式*/
    /* + 是兄弟选择器,获取选中后的label元素*/
    .openOrCloseUrl input:checked+.urlStateName {
      background-color: #f0832f;
      border: 1px solid #f0832f;
    }

    .openOrCloseUrl input:checked+.urlStateName::after {
      position: absolute;
      content: "";
      width: 5px;
      height: 10px;
      top: 3px;
      left: 6px;
      border: 2px solid #fff;
      border-top: none;
      border-left: none;
      transform: rotate(45deg)
    }
</style>