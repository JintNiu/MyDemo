<template>
    <div class="page" id="EditAppBannerManage">
        <mt-header fixed title="修改" style="background:#000">
            <mt-button slot="left" icon="back" @click="$router.back()"></mt-button>
            <mt-button slot="right" @click="delClubImage(bannerId)"><i class="deleteIcon"></i></mt-button>
        </mt-header>
        <div class="editBannerBox handleBannerBox">
            <i class="imgUrl">
                <img id="imgUrlBox" :src='imgUrl'>
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
            <div class="saveEditBanner" @click="uploadImage()">
                <span>保存</span>
            </div>
        </div>
    </div>
</template>
<script>
    import {Toast,MessageBox} from 'mint-ui';
    export default {
        name: 'EditAppBanner',
        components: {
            
        },
        data () {
            return {
                bannerId : '',
                imgUrl: '',
                linkType: '',
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
                this.bannerId = this.$route.params.bannerId;
                this.getBannerInfor();
            })
        },
        methods: {
            getBannerInfor(){
                let _this = this;
                this.$http.post('/LuchyBird/appBanner/findBannerById.do?bannerId='+this.bannerId+'')
                .then(function (data) {
                    if(data.data.status == 0){
                        let value = data.data.data;
                        _this.imgUrl = value.imgurl;
                        _this.linkType = value.linktype;
                        _this.linkUrl = value.linkurl;
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
            delClubImage(id){
                let _this = this;
                MessageBox.confirm('您确定要删除这张图片及其信息么？').then(action => {
                    this.$http.get('/LuchyBird/appBanner/deleteBannerById.do?bannerId='+id+'')
                    .then(function (data) {
                        if(data.data.status == 0){
                            _this.$router.back();
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
                },() => {});
            },
            uploadImage(){
                if(this.imgUrl != null && this.linkType != null && this.linkUrl != null){
                    this.$http.get('/LuchyBird/appBanner/updateAppBanner.do?bannerId='+this.bannerId+'&imgUrl='+this.imgUrl+'&linkType='+this.linkType+'&linkUrl='+this.linkUrl+'')
                    .then(function (data) {
                        if(data.data.status == 0){
                            Toast({
                                message: '更新成功',
                                position: 'bottom',
                                duration: 2000
                            });
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
            }
        }
    }
</script>
<style scoped>
    #EditAppBannerManage .page-content{
        width: 100%;
        height: 100vh;
        padding-top: 40px;
        margin-top: -40px;
        background: #fff;
        box-sizing: border-box; 
        overflow: hidden;
    }
    /* 添加，修改banner */
    #EditAppBannerManage .handleBannerBox{
        width: 100%;
        height: 100vh;
        padding: 1.5rem 0.4rem;
        margin-top: -40px;
        background: #fff;
        box-sizing: border-box;
        overflow: hidden;
    }
    #EditAppBannerManage .handleBannerBox>.imgUrl{
        width: 100%;
        height: 5.2rem;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
    }
    #EditAppBannerManage .handleBannerBox>.imgUrl>img{
        width: 100%;
        height: 100%;
        display: block;
    }
    #EditAppBannerManage .handleBannerBox>.imgUrl>input{
        width: 100%;
        height: 100%;
        display: block;
        opacity: 0;
        position: absolute;
        left: 0;
        top: 0;
    }
    #EditAppBannerManage .handleBannerBox>.toInfor{
        width: 100%;
        height: auto;
        padding: 0.2rem 0;
        box-sizing: border-box;
        overflow: hidden;
    }
    #EditAppBannerManage .handleBannerBox>.toInfor>div{
        width: 100%;
        min-height: 1rem;
        border-bottom: 1px solid #f2f2f2;
        padding: 0.2rem 0 0.1rem;
        box-sizing: border-box;
        overflow: hidden;
    }
    #EditAppBannerManage .handleBannerBox>.toInfor>div>.cardTitle{
        width: 100%;
        height: 0.4rem;
        line-height: 0.4rem;
        text-align: left;
        font-size: 0.32rem;
        color: #666;
        display: block;
        overflow: hidden;
    }
    #EditAppBannerManage .handleBannerBox>.toInfor>div>.mint-switch{
        margin: 0.1rem 0;
    }
    #EditAppBannerManage .handleBannerBox>.toInfor>div>input{
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
    .saveEditBanner{
        width: 100%;
        height: 1rem;
        margin: 0 auto;
        margin-top: 1rem;
        box-sizing: border-box;
        display: block;
        overflow: hidden;
    }
    .saveEditBanner>span{
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