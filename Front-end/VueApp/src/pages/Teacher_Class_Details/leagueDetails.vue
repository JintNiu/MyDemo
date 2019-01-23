<template>
  	<div class="page" id="LeagueDetailsBox">
  		<mt-header fixed title="课程介绍" style="background:#000;z-index:999;">
            <mt-button slot="left" icon="back" @click="$router.back()"></mt-button>
        </mt-header>
        <div class="page-content">
            <div class="bannerList">
                <swiper :options="swiperOption"  ref="bannerSwiper">  
                    <swiper-slide v-for="(img,index) in leaguePhotos" :key="index"> 
                        <span class="leagueName">{{leagueName}}</span>
                        <img :src='img'>
                    </swiper-slide>    
                </swiper>
            </div> 
            <div class="introductionBox inforBox">
                <div class="introductionTitle titleBox">
                    <i class="dotIcon"><img src="../../assets/img/dotIcon.png" alt=""></i>
                    <span>课程简介</span>
                </div>
                <div class="introductionContent contentBox">
                    <p v-html="classinfo"></p>
                </div>
            </div>
            <div class="suitBox inforBox">
                <div class="suitTitle titleBox">
                    <i class="dotIcon"><img src="../../assets/img/dotIcon.png" alt=""></i>
                    <span>适合人群</span>
                </div>
                <div class="suitContent contentBox">
                    <p v-html="suitable"></p>
                </div>
            </div>
            <div class="effectBox inforBox">
                <div class="effectTitle titleBox">
                    <i class="dotIcon"><img src="../../assets/img/dotIcon.png" alt=""></i>
                    <span>训练效果</span>
                </div>
                <div class="effectContent contentBox">
                    <p v-html="trainingeffect"></p>
                </div>
            </div>
            <div class="faqBox inforBox">
                <div class="faqTitle titleBox">
                    <i class="dotIcon"><img src="../../assets/img/dotIcon.png" alt=""></i>
                    <span>FAQ</span>
                </div>
                <div class="faqContent contentBox">
                    <p v-html="faq"></p>
                </div>
            </div>
            <div class="pointBox inforBox">
                <div class="pointTitle titleBox">
                    <i class="dotIcon"><img src="../../assets/img/dotIcon.png" alt=""></i>
                    <span>温馨提示</span>
                </div>
                <div class="pointContent contentBox">
                    <p v-html="warning"></p>
                </div>
            </div>
            <div class="kong"></div>
        </div>	
  	</div>
</template>
<script>
    import { swiper, swiperSlide } from 'vue-awesome-swiper'
    export default {
        name: 'LeagueDetails',
        components: {
    		
      	},
    	data () {
    		return {
                classId: '',
                leaguePhotos:[
                    require('../../assets/img/teacherBg.png')
                ],
                leagueName: '动感单车',
                classinfo: '',
                faq: '',
                suitable: '',
                trainingeffect: '',
                warning: '',
    			swiperOption: {   
                    notNextTick: false,   
                    pagination: '.swiper-pagination',
                    effect : 'coverflow',
                    initialSlide :0, // 默认显示第几张
                    slidesPerView: 1, // 每个图的占位大小
                    centeredSlides: true,
                    observer:true,
                    observeParents:true,
                },
    		}
    	},
        computed: {  
            swiper() {  
                return this.$refs.bannerSwiper.swiper;   
            }  
        }, 
    	mounted (){
            this.classId = this.$route.params.classId;
            this.getLeagueDetails();
    	},
    	methods: {
    		getLeagueDetails(){
                let _this = this;
                this.$http.get('/LuchyBird/customRole/classInfoById.do?classId='+this.classId+'').then(function(data){
                    if(data.data.status == 0){
                        let value = data.data.data;
                        console.log(value);
                        if(value == '' || value == null){
                            Toast({
                                message: '暂无课程信息',
                                position: 'bottom',
                                duration: 2000
                            });
                        }else{
                            if(value.classpics != null){
                               _this.leaguePhotos = value.classpics.split(','); 
                            }
                            _this.leagueName = value.name
                            _this.classinfo = value.classinfo
                            _this.faq = value.faq
                            _this.suitable = value.suitable
                            _this.trainingeffect = value.trainingeffect
                            _this.warning = value.warning
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
    .bannerList{
        width: 100%;
        height: 6rem;
        overflow: hidden;
    }
    .swiper-container,.swiper-wrapper,.swiper-slide{
        width: 100%;
        height: 100%;
        overflow: hidden;
        position: relative;
    }
    .swiper-slide img{
        width: 100%;
        height: 100%;
        display: block;
    }
    .leagueName{
        width: 100%;
        height: 1rem;
        font-size: 0.8rem;
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        left: 0;
        top: 50%;
        margin-top: -0.5rem;
        overflow: hidden;
    }
    .inforBox{
        width: 100%;
        height: auto;
        background: #fff;
        overflow: hidden;
    }
    .titleBox{
        width: 100%;
        height: 1rem;
        background: #f9f9f9;
        padding: 0 0.1rem;
        box-sizing: border-box;
        overflow: hidden;
    }
    .titleBox>.dotIcon{
        width: 0.5rem;
        height: 0.5rem;
        margin-top: 0.25rem;
        margin-right: 0.2rem;
        display: block;
        float: left;
    }
    .titleBox>.dotIcon>img{
        width: 100%;
        height: 100%;
        display: block;
    }
    .titleBox>span{
        width: auto;
        height: 100%;
        line-height: 1rem;
        text-align: left;
        font-size: 14px;
        color: #000;
        display: block;
        float: left;
    }
    .contentBox{
        width: 100%;
        height: auto;
        padding: 0.3rem 0.2rem 0.3rem 0.6rem;
        box-sizing: border-box;
        overflow: hidden;
    }
    .contentBox>p{
        width: 100%;
        height: 100%;
        line-height: 0.6rem;
        text-align: left;
        font-size: 12px;
        color: #666;
        display: block;
    }
    .kong{
        width: 100%;
        height: 1rem;
        overflow: hidden;
    }
</style>