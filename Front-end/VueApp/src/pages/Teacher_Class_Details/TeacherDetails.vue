<template>
  	<div class="page" id="teacherDetailsBox">
  		<mt-header fixed title="教练介绍" style="background:#000">
            <mt-button slot="left" icon="back" @click="$router.back()"></mt-button>
        </mt-header>
        <div class="page-content">
            <div class="teacherPhoto">
                <i>
                    <img v-if="teacherInfor.teacherheadurl==null" src="../../assets/img/offlineUserIcon.png" alt="暂无头像">
                    <img v-if="teacherInfor.teacherheadurl!=null" :src="teacherInfor.teacherheadurl" alt="">
                </i>
                <span>{{teacherInfor.teachername}}({{teacherInfor.sex}})</span>
            </div>  
            <div class="introductionBox inforBox">
                <div class="introductionTitle titleBox">
                    <i class="dotIcon"><img src="../../assets/img/dotIcon.png" alt=""></i>
                    <span>教练简介</span>
                </div>
                <div class="introductionContent contentBox">
                    <p v-html="teacherInfor.teacherinfo"></p>
                </div>
            </div>
            <div class="telBox inforBox">
                <div class="telTitle titleBox">
                    <i class="dotIcon"><img src="../../assets/img/dotIcon.png" alt=""></i>
                    <span>电话</span>
                </div>
                <div class="telContent contentBox">
                    <p v-html="teacherInfor.tel"></p>
                </div>
            </div>
            <div class="skillBox inforBox">
                <div class="skillTitle titleBox">
                    <i class="dotIcon"><img src="../../assets/img/dotIcon.png" alt=""></i>
                    <span>擅长领域</span>
                </div>
                <div class="skillContent contentBox">
                    <p v-html="teacherInfor.tag"></p>
                </div>
            </div>
            <div class="photosBox inforBox">
                <div class="photosTitle titleBox">
                    <i class="dotIcon"><img src="../../assets/img/dotIcon.png" alt=""></i>
                    <span>教练相册</span>
                </div>
                <div class="photosContent contentBox" @click="photosSwiper()">
                    <i v-for="(index,photo) in teacherPhotos" :key="index">
                        <img :src="photo">
                    </i>
                </div>
            </div>
        </div>	
        <mt-popup v-model="photosSwiperPopup" :modal=true
                position = center
              popup-transition="popup-fade" style="width:100%;">
            <div class="photosList">
                <swiper :options="swiperOption"  ref="photosSwiper">  
                    <swiper-slide v-for="(img,index) in teacherPhotos" :key="index"> 
                        <img :src='img'>
                    </swiper-slide>    
                    <div class="swiper-pagination"  slot="pagination"></div>
                </swiper>
            </div>  
        </mt-popup>
  	</div>
</template>
<script>
    import {Popup,Toast} from 'mint-ui'
    import { swiper, swiperSlide } from 'vue-awesome-swiper'
    export default {
        name: 'TeacherDetails',
        components: {
    		swiper,  
            swiperSlide
      	},
    	data () {
    		return {
                teacherId: '',
                teacherInfor: {},
    			teacherPhotos:[
                    require('../../assets/img/teacherBg.png'),
                    require('../../assets/img/jiaolian.jpg')
                ],
                photosSwiperPopup: false,
                swiperOption: {   
                    notNextTick: false,   
                    pagination: '.swiper-pagination',
                    effect : 'coverflow',
                    initialSlide :0, // 默认显示第几张
                    slidesPerView: 1, // 每个图的占位大小
                    centeredSlides: true,
                    pagination:{
                        el: '.swiper-pagination',
                    },
                    observer:true,
                    observeParents:true,
                },
    		}
    	},
        computed: {  
            swiper() {  
                return this.$refs.photosSwiper.swiper;   
            }  
        }, 
    	mounted (){
            this.teacherId = this.$route.params.id;
            this.getTeacherInfor();
    	},
    	methods: {
            getTeacherInfor(){
                let _this = this;
                this.$http.get('/LuchyBird/customRole/privateTeacherList.do?currentPage=1&pageSize=1&id='+this.teacherId+'').then(function(data){
                    if(data.data.status == 0){
                        var value = data.data.data;
                        console.log(value);
                        if(value.sex == 1){
                            value.sex = '男'
                        }else{
                            value.sex = '女'
                        }
                        _this.teacherInfor = value;
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
    		photosSwiper(){
                this.photosSwiperPopup = !this.photosSwiperPopup;
            }
    	}
    }
</script>
<style>
    #teacherDetailsBox .page-content{
        width: 100%;
        min-height: 100vh;
        background: #fff;
        padding-top: 40px;
        margin-top: -40px;
        box-sizing: border-box;
        overflow: auto;
    }
    #teacherDetailsBox .teacherPhoto{
        width: 100%;
        height: 6.6rem;
        background-image: url(../../assets/img/teacherBg.png);
        background-size: 100% 100%;
        background-position: center;
        background-repeat: no-repeat;
        overflow: hidden;
    }
    #teacherDetailsBox .teacherPhoto>i{
        width: 2.5rem;
        height: 2.5rem;
        display: block;
        border-radius: 50%;
        margin: 0 auto;
        margin-top: 1.5rem;
        display: block;
        overflow: hidden;
    }
    #teacherDetailsBox .teacherPhoto>i>img{
        width: 100%;
        height: 100%;
        display: block;
    }
    #teacherDetailsBox .teacherPhoto>span{
        width: 100%;
        height: 1rem;
        line-height: 1rem;
        text-align: center;
        font-size: 14px;
        color: #fff;
        margin-top: 0.5rem;
        display: block;
    }
    #teacherDetailsBox .inforBox{
        width: 100%;
        height: auto;
        margin-bottom: 0.2rem;
        overflow: hidden;
    }
    #teacherDetailsBox .titleBox{
        width: 100%;
        height: 1rem;
        background: #f9f9f9;
        padding: 0 0.1rem;
        box-sizing: border-box;
        overflow: hidden;
    }
    #teacherDetailsBox .titleBox>.dotIcon{
        width: 0.5rem;
        height: 0.5rem;
        margin-top: 0.25rem;
        margin-right: 0.2rem;
        display: block;
        float: left;
    }
    #teacherDetailsBox .titleBox>.dotIcon>img{
        width: 100%;
        height: 100%;
        display: block;
    }
    #teacherDetailsBox .titleBox>span{
        width: auto;
        height: 100%;
        line-height: 1rem;
        text-align: left;
        font-size: 14px;
        color: #000;
        display: block;
        float: left;
    }
    #teacherDetailsBox .contentBox{
        width: 100%;
        height: auto;
        padding: 0.3rem 0.1rem 0.3rem 0.6rem;
        box-sizing: border-box;
        overflow: hidden;
    }
    #teacherDetailsBox .contentBox>p{
        width: 100%;
        height: 100%;
        line-height: 0.6rem;
        text-align: left;
        font-size: 12px;
        color: #666;
        display: block;
    }
    #teacherDetailsBox .photosContent>i{
        width: 2rem;
        height: 2rem;
        display: block;
        position: relative;
        margin-right: 0.2rem;
        float: left;
    }
    #teacherDetailsBox .photosContent>i>img{
        width: 100%;
        height: 100%;
        display: block;
    }
    #teacherDetailsBox .photosList{
        width: 100%;
        height: auto;
        display: block;
        overflow: hidden;
    }
    #teacherDetailsBox .swiper-wrapper{
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
    }
    #teacherDetailsBox .swiper-slide img{
        width: 100%;
        height: 100%;
        display: block;
    }
</style>