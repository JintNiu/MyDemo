<template>
  	<div class="page" id="WeChatBannerManage">
  		<mt-header fixed title="公众号Banner管理" style="background:#000">
            <mt-button slot="left" icon="back" @click="$router.back()"></mt-button>
            <mt-button slot="right" @click="deleteBanner()"><i class="deleteIcon" :class="{'deleteIconRight':deleteIconShow==true}"></i></mt-button>
        </mt-header>
        <div class="page-content">
            <div class="bannerBox">
                <div class="clubListBanner">
                    <label class="leagueTitle">门店列表Banner</label>
                    <div>
                        <swiper :options="swiperOption"  ref="clubListSwiper">  
                            <!-- 这部分放你要渲染的那些内容 -->  
                            <swiper-slide :class="{'shakeAll':deleteIconShow==true}" v-for="(img,index) in clubImages" :key="index">  
                                <span v-show="deleteIconShow" @click="delClubImage(index)">
                                    <img src="../../assets/img/deleteImg.png">
                                </span>
                                <img :src='img'>
                            </swiper-slide>   
                            <swiper-slide v-for="(img,index) in clubImagesLoad" :key="index"> 
                                <i v-show="img.state"><img src="../../assets/img/loading.gif" alt=""></i>
                                <img :src='img.url'>
                            </swiper-slide>
                            <swiper-slide>
                                <a href="javascript:void(0)" v-on:click="addClubPic($event)">
                                    <img src="../../assets/img/addBanner.png" alt="">
                                </a>
                            </swiper-slide>   
                        </swiper>  
                    </div>
                    <input id="clubPic" type="file" accept="image/gif,image/jpeg,image/jpg,image/png" name="" @change="onClubFileChange($event)" style="display:none">
                </div>
                <div class="classListBanner">
                    <label class="leagueTitle">课程列表Banner</label>
                    <div class="classPicBox">
                        <swiper :options="swiperOption"  ref="classListSwiper">  
                            <!-- 这部分放你要渲染的那些内容 -->  
                            <swiper-slide :class="{'shakeAll':deleteIconShow==true}" v-for="(img,index) in classImages" :key="index"> 
                                <span v-show="deleteIconShow" @click="delClassImage(index)">
                                    <img src="../../assets/img/deleteImg.png">
                                </span>
                                <img :src='img'>
                            </swiper-slide> 
                            <swiper-slide v-for="(img,index) in classImagesLoad" :key="index"> 
                                <i v-show="img.state"><img src="../../assets/img/loading.gif" alt=""></i>
                                <img :src='img.url'>
                            </swiper-slide>  
                            <swiper-slide>
                                <a href="javascript:void(0)" v-on:click="addClassPic($event)">
                                    <img src="../../assets/img/addBanner.png" alt="">
                                </a>
                            </swiper-slide>   
                        </swiper> 
                    </div>
                    <input id="classPic" type="file" accept="image/gif,image/jpeg,image/jpg,image/png" name="" @change="onClassFileChange($event)" style="display:none">
                </div>
            </div>  
        </div>
  	</div>
</template>
<script>
    import {Toast,MessageBox} from 'mint-ui';
    import { swiper, swiperSlide } from 'vue-awesome-swiper'  
    export default {
        name: 'WeChatBanner',
        components: {
    		swiper,  
            swiperSlide  
      	},
    	data () {
    		return {
                deleteIconShow: false,
                swiperOption: {  
                    //是一个组件自有属性，如果notNextTick设置为true，组件则不会通过NextTick来实例化swiper，也就意味着你可以在第一时间获取到swiper对象，假如你需要刚加载遍使用获取swiper对象来做什么事，那么这个属性一定要是true  
                    notNextTick: false,   
                    pagination: '.swiper-pagination',
                    effect : 'coverflow',
                    initialSlide :1, // 默认显示第几张
                    slidesPerView: 1.3, // 每个图的占位大小
                    centeredSlides: true,
                    coverflowEffect: {
                        rotate: 30,
                        stretch: 0,
                        depth: 100,
                        modifier: 2,
                        slideShadows: false
                    },
                    observer:true,
                    observeParents:true,
                },
                classFit: false,
                clubImages: ['http://run-manage.oss-cn-shanghai.aliyuncs.com/img/1502713899523.png','http://run-manage.oss-cn-shanghai.aliyuncs.com/img/1502713866682.png','http://run-manage.oss-cn-shanghai.aliyuncs.com/img/1502713832870.png'],
                clubImagesLoad: [],
                classImages: ['http://run-manage.oss-cn-shanghai.aliyuncs.com/img/1502713899523.png','http://run-manage.oss-cn-shanghai.aliyuncs.com/img/1502713866682.png','http://run-manage.oss-cn-shanghai.aliyuncs.com/img/1502713832870.png'],
                classImagesLoad: [],
                formData: new FormData(),
    		}
    	},
        watch: {  

        }, 
        computed: {  
            swiper() {  
                return this.$refs.clubListSwiper.swiper;  
                return this.$refs.classListSwiper.swiper;  
            }  
        }, 
        created() {  
            
        },  
    	mounted (){
           
    	},
    	methods: {
    		addClubPic(e){
                e.preventDefault();
                let classPic = document.getElementById('clubPic');
                classPic.click();
                return false;
            },
            addClassPic(e){
                e.preventDefault();
                let classPic = document.getElementById('classPic');
                classPic.click();
                return false;
            },
            onClubFileChange(e) {
                let files = e.target.files || e.dataTransfer.files;
                if (!files.length){return}; 
                this.createClubImage(files[0]);
            },
            onClassFileChange(e) {
                let files = e.target.files || e.dataTransfer.files;
                if (!files.length){return}; 
                this.createClassImage(files[0]);
            },
            createClubImage(file) {
                if(typeof FileReader==='undefined'){
                    Toast('您的设备不支持图片上传，请更新');
                    return false;
                }
                let image = new Image();         
                let _this = this;
                let reader = new FileReader();
                reader.readAsDataURL(file); 
                if((file.size/1024).toFixed(0)<=1024){
                    reader.onload =function(e){
                        _this.clubImagesLoad.push(
                            {
                                'url':e.target.result,
                                'state':true
                            }
                        );   
                    };      
                    // this.formData.set('file',file);
                    setTimeout(function(){
                        _this.clubImagesLoad.splice(0,1);
                        Toast({
                            message: '上传成功',
                            position: 'bottom'
                        });
                    },4000);
                }else{
                    Toast({
                        message: '您所选择的图片过大，请选择小于1M的图片',
                        position: 'bottom'
                    });
                }                    
            },
            createClassImage(file) {
                if(typeof FileReader==='undefined'){
                    Toast('您的设备不支持图片上传，请更新');
                    return false;
                }
                let image = new Image();         
                let _this = this;
                let reader = new FileReader();
                reader.readAsDataURL(file); 
                if((file.size/1024).toFixed(0)<=1024){
                    reader.onload =function(e){
                        _this.classImagesLoad.push(
                            {
                                'url':e.target.result,
                                'state':true
                            }
                        );   
                    };      
                    // this.formData.set('file',file);
                    setTimeout(function(){
                        _this.clubImagesLoad.splice(0,1);
                        Toast({
                            message: '上传成功',
                            position: 'bottom'
                        });
                    },4000);
                }else{
                    Toast({
                        message: '您所选择的图片过大，请选择小于1M的图片',
                        position: 'bottom'
                    });
                }
            },
            deleteBanner(){
                this.deleteIconShow = !this.deleteIconShow;
            },
            delClubImage(index){
                MessageBox.confirm('您确定要删除这张图片么？').then(action => {
                    this.clubImages.splice(index,1);
                    this.formData.delete('file'+index+'');
                },() => {});
            },
            delClassImage(index){
                MessageBox.confirm('您确定要删除这张图片么？').then(action => {
                    this.classImages.splice(index,1);
                    this.formData.delete('file'+index+'');
                },() => {});
            },
            uploadImage: function() {
                
            }
    	}
    }
</script>
<style scoped>
    .deleteIcon{
        width: 40px;
        height: 40px;
        background-image: url(../../assets/img/deleteWhite.png);
        background-size: 50%;
        background-position: right;
        background-repeat: no-repeat;
        display: block;
        float: right;
    }
    .deleteIconRight{
        background-image: url(../../assets/img/deleteFinal.png) !important;
    }
    .shakeAll{
        margin: 0 0.15rem;
        -webkit-animation-name: shakeImg;
        animation-name: shakeImg;
        -webkit-animation-duration: 1.5s;
        animation-duration: 1.5s;
        -webkit-animation-delay: .3s;
        animation-delay: .3s;
        -webkit-animation-timing-function: ease-in-out;
        animation-timing-function: ease-in-out;
        -webkit-animation-iteration-count: infinite;
        animation-iteration-count: infinite;
        -webkit-animation-fill-mode: forwards;
        animation-fill-mode: forwards;
        -webkit-animation-direction: alternate;
        animation-direction: alternate;
    }
    @keyframes shakeImg {
        0% {
            -webkit-transform: translateY(-8px);
            transform: translateY(-8px);
        }
        50% {
            -webkit-transform: translateY(-4px);
            transform: translateY(-4px);
        }
        100% {
            -webkit-transform: translateY(-8px);
            transform: translateY(-8px);
        }
    }
    #WeChatBannerManage .page-content{
        width: 100%;
        overflow: hidden;
        background: #f2f2f2;
    }
    #WeChatBannerManage .clubListBanner,#WeChatBannerManage .classListBanner{
        width: 100%;
        min-height: 6rem;
        padding: 0.4rem 0;
        box-sizing: border-box;
        background: #fff;
        overflow: hidden;
    }
    #WeChatBannerManage .clubListBanner{
        margin-bottom: 0.4rem;
    }
    #WeChatBannerManage .leagueTitle{
        width: 100%;
        height: 1rem;
        line-height: 1rem;
        text-align: left;
        font-size: 14px;
        padding: 0 0.4rem;
        box-sizing: border-box;
        color: #000;
        display: block;
    }
    #WeChatBannerManage img{
        width: 100%;
        height: 100%;
        display: block;
    }
    .swiper-container{
        padding: 0.5rem 0;
        box-sizing: border-box;
    }
    .swiper-slide{
        height: 4.6rem;
        display: flex;
        align-items: center;
        justify-content: center;
        -webkit-transform: perspective(1px) translateZ(0);
        transform: perspective(1px) translateZ(0);
    }
    #WeChatBannerManage .swiper-slide>span{
        width: 0.6rem;
        height: 0.6rem;
        position: absolute;
        right: -0.1rem;
        top: -0.2rem;
        display: block;
        overflow: hidden;
    }
    #WeChatBannerManage .swiper-slide>i{
        width: 1rem;
        height: 1rem;
        position: absolute;
        left: 50%;
        top: 50%;
        margin-left: -0.5rem;
        margin-top: -0.5rem;
        display: block;
        overflow: hidden;
    }
</style>