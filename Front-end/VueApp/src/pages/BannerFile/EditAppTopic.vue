<template>
    <div class="page" id="EditAppTopicManage">
        <mt-header fixed title="修改" style="background:#000">
            <mt-button slot="left" icon="back" @click="$router.back()"></mt-button>
            <mt-button slot="right" @click="delTopicImage(topicId)"><i class="deleteIcon"></i></mt-button>
        </mt-header>
        <div class="editTopicBox handleTopicBox">
            <i class="imgUrl">
                <img id="topicImgUrlBox" :src='topicImages.img' @click="changeTopicPic($event)">
                <i class="loadImgShow" v-show="loadImgState"><img src="../../assets/img/loading.gif" alt=""></i>
            </i>
            <div class="toInfor">
                <input type="text" name="title" :value="topicImages.title">
                <input type="text" name="url" :value="topicImages.url">
            </div>
            <input id="TopicPic" type="file" accept="image/gif,image/jpeg,image/jpg,image/png" name="" @change="onTopicFileChange($event)" style="display:none">
            <div class="saveEditTopic">
                <span>保存</span>
            </div>
        </div>
    </div>
</template>
<script>
    import {Toast,MessageBox} from 'mint-ui';
    export default {
        name: 'EditAppTopic',
        components: {
            
        },
        data () {
            return {
                topicId : '',
                topicImages: {
                    'img' : 'http://run-manage.oss-cn-shanghai.aliyuncs.com/img/1502713899523.png',
                    'title' : '女性训练',
                    'infor' : '训练不止于瑜伽',
                    'url' : 'https://mp.weixin.qq.com/s/mgzopsq7fbnQbzZklnpVCw'
                },
                topicImagesLoad: [],
                loadImgState: false, // 上传图片的loading
                formData: new FormData()
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
                this.topicId = this.$route.params.topicId;
            })
        },
        methods: {
            onRefresh(done){
                console.log('刷新');
                setTimeout(function(){
                    done() // call done
                },3000)
            },
            changeTopicPic(e){
                e.preventDefault();
                let classPic = document.getElementById('TopicPic');
                classPic.click();
                return false;
            },
            onTopicFileChange(e) {
                let files = e.target.files || e.dataTransfer.files;
                if (!files.length){return}; 
                this.createTopicImage(files[0]);
            },
            createTopicImage(file) {
                var topicImgUrlBox = document.getElementById('topicImgUrlBox');
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
                        topicImgUrlBox.src=e.target.result
                    };      
                    this.loadImgState = true;
                    // this.formData.set('file',file);
                    setTimeout(function(){
                        _this.loadImgState = false;
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
            delTopicImage(id){
                MessageBox.confirm('您确定要删除这张图片及其信息么？').then(action => {
                    this.$router.back();
                },() => {});
            },
            uploadImage: function() {
                
            }
        }
    }
</script>
<style scoped>
    #EditAppTopicManage .page-content{
        width: 100%;
        height: 100vh;
        padding-top: 40px;
        margin-top: -40px;
        background: #fff;
        box-sizing: border-box; 
        overflow: hidden;
    }
    /* 添加，修改Topic */
    #EditAppTopicManage .handleTopicBox{
        width: 100%;
        height: 100%;
        padding: 0.4rem;
        box-sizing: border-box;
        overflow: hidden;
    }
    #EditAppTopicManage .handleTopicBox>.imgUrl{
        width: 100%;
        height: 5.2rem;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
    }
    #EditAppTopicManage .handleTopicBox>.imgUrl>img{
        width: 100%;
        height: 100%;
        display: block;
    }
    #EditAppTopicManage .handleTopicBox>.imgUrl>.loadImgShow{
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
    #EditAppTopicManage .handleTopicBox>.toInfor{
        width: 100%;
        height: auto;
        padding: 0.2rem 0;
        box-sizing: border-box;
        overflow: hidden;
    }
    #EditAppTopicManage .handleTopicBox>.toInfor>input{
        width: 100%;
        height: 1rem;
        text-indent: 0.32rem;
        outline: none;
        border: 1px solid #E2E2E2;
        box-sizing: border-box;
        margin-top: 0.2rem;
        display: block;
    }
    .deleteIcon{
        width: 40px;
        height: 40px;
        background-image: url(/src/assets/img/deleteWhite.png);
        background-size: 50%;
        background-position: right;
        background-repeat: no-repeat;
        display: block;
        float: right;
    }
    .saveEditTopic{
        width: 100%;
        height: 1rem;
        margin: 0 auto;
        margin-top: 1rem;
        box-sizing: border-box;
        display: block;
        overflow: hidden;
    }
    .saveEditTopic>span{
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
</style>