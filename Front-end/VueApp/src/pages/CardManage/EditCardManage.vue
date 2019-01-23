<template>
  	<div class="page" id="EditCardManage">
  		<mt-header fixed title="修改健身卡" style="background:#000">
            <mt-button slot="left" icon="back" @click="$router.back()"></mt-button>
            <!-- <mt-button slot="right" @click="deleteCard(cardId)"><i class="deleteIcon"></i></mt-button> -->
        </mt-header>
        <div class="page-content">
            <form class="editCardListManageBox" id="editCardListManageBox">
                <input type="hidden" name="id" v-model="cardId">
                <input type="hidden" name="picurl" v-model="cardImgUrl">
                <div class="cardBgImgBox">
                    <i class="cardBgImg"><img :src="cardImgUrl"></i>
                    <input type="file" accept="image/x-png,image/gif,image/jpeg,image/bmp" name="" @change="uploadImg">
                </div>  
                <div class="cardName">
                    <label class="cardTitle">健身卡名称</label>
                    <input type="text" name="name" v-model="cardName">
                </div>
                <div class="cardType">
                    <label class="cardTitle">健身卡类型</label>
                    <select name="type" v-model="cardType">
                        <option v-for="type in cardTypeList" :value="type.id">{{type.name}}</option>
                    </select>
                </div> 
                <!-- <div class="cardFit">
                    <label class="cardTitle">是否付费课程</label>
                    <label class="openOrCloseUrl" for="open">
                        <input id="open" type="radio" name="isfreebooking" value="1" v-model="cardFit">
                        <span class="urlStateName"></span>
                        <span style="margin-left: 10px">开启</span>
                    </label>
                    <label class="openOrCloseUrl" for="close">
                        <input id="close" type="radio" name="isfreebooking" value="0" v-model="cardFit">
                        <span class="urlStateName"></span>
                        <span style="margin-left: 10px">关闭</span>
                    </label>
                </div>  -->
                <div class="discountPrice">
                    <label class="cardTitle">单价</label>
                    <input type="number" name="price" v-model="discountPrice">
                </div> 
                <div class="originalPrice">
                    <label class="cardTitle">预售价格</label>
                    <input type="number" name="presellprice" v-model="originalPrice">
                </div> 
                <div class="cardInfo">
                    <label class="cardTitle">健身卡简介</label>
                    <textarea name="briefintroduction" v-model="cardInfo"></textarea>
                </div>  
                <div class="cardDetails">
                    <label class="cardTitle">健身卡详情</label>
                    <textarea name="details" v-model="cardDetails"></textarea>
                </div> 
                <div class="editManageBox" @click="saveEditCard()">
                    <span>保存修改</span>
                </div>  
            </form>
        </div>
  	</div>
</template>
<script>
    import {Toast,MessageBox} from 'mint-ui';
    export default {
        name: 'EditCardManage',
        components: {
    		
      	},
    	data () {
    		return {
                cardId : '',
                cardImgUrl: '',
                cardTypeList: [],
                cardName: '',
                cardType: '',
                // cardFit: '', // switch开关
                discountPrice: '',
                originalPrice: '',
                cardInfo: '',
                cardDetails: ''
    		}
    	},
        created() {  

        },  
    	mounted (){
            this.$nextTick(() => {
                this.cardId = this.$route.params.cardId;
                this.getCardInfor();
            })
    	},
        watch: {  
            
        },
    	methods: {
            getCardInfor(){
                let _this = this;
                this.$http.get('/LuchyBird/customRole/customEditCardManage.do?id='+this.cardId+'').then(function(data){
                    if(data.data.status == 0){
                        var value = data.data.data;
                        if(value == '' || value == null|| value.length == 0){
                            Toast({
                                message: '暂无健身卡信息',
                                position: 'bottom',
                                duration: 2000
                            });
                        }else{
                            _this.cardTypeList = value.typeList;
                            _this.cardImgUrl = value.fitnessProduct.picurl;
                            _this.cardName = value.fitnessProduct.name;
                            _this.cardType = value.fitnessProduct.type;
                            // _this.cardFit = value.fitnessProduct.isfreebooking;
                            _this.discountPrice = value.fitnessProduct.price;
                            _this.originalPrice = value.fitnessProduct.presellprice;
                            _this.cardInfo = value.fitnessProduct.briefintroduction;
                            _this.cardDetails = value.fitnessProduct.details.replace(/<[^>]+>/g,"");;

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
                        _this.cardImgUrl = value;
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
            formSerialize(form){
                let formData = new FormData(form),
                    getValue = formData.entries(),
                    parts = [];
                for (let pair of getValue) {
                    parts.push(pair[0] + "=" + pair[1]);
                }
                return parts.join("&");
            },
            saveEditCard(){
                let _this = this;
                let editForm = document.getElementById('editCardListManageBox');
                let editFormList = this.formSerialize(editForm);
                if(this.cardImgUrl!=null&&this.cardName!=null&&this.cardType!=null&&this.discountPrice!=null&&this.originalPrice!=null&&this.cardInfo!=null&&this.cardDetails!=null){

                    this.$http.post('/LuchyBird/customRole/customSaveCardManage.do',editFormList,{headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'}})
                        .then(function (data) {
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
            deleteCard(){
                let _this = this;
                MessageBox.confirm('确定要删除'+this.cardName+'么？').then(action => {
                    this.$http.post('/LuchyBird/customRole/customDeleteCardManage.do?id='+this.cardId+'')
                    .then(function (data) {
                        if(data.data.status == 0){
                            Toast({
                                message: '删除成功',
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
                        
                    })
                    .catch(function (data) {
                        // alert(data);
                    });
                },() => {});
            }
    	}
    }
</script>
<style scoped>
    #EditCardManage .page-content{
        width: 100%;
        min-height: 100vh;
        background: #fff;
        padding-top: 40px;
        margin-top: -40px;
        box-sizing: border-box; 
        overflow: auto;
    }
    #EditCardManage .editCardListManageBox{
        width: 100%;
        height: 100%;
        padding: 0 0.4rem 1rem;
        box-sizing: border-box;
    }
    #EditCardManage .editCardListManageBox>div{
        width: 100%;
        min-height: 1rem;
        border-bottom: 1px solid #f2f2f2;
        padding: 0.2rem 0 0.1rem;
        box-sizing: border-box;
        overflow: hidden;
        position: relative;
    }
    #EditCardManage .editCardListManageBox>.cardBgImgBox>.cardBgImg{
        width: 100%;
        height: 5rem;
        background: #fff;
        border-radius: 6px;
        overflow: hidden;
        display: block;
    }
    #EditCardManage .editCardListManageBox>.cardBgImgBox>.cardBgImg>img{
        width: 100%;
        height: 100%;
        display: block;
    }
    #EditCardManage .editCardListManageBox>.cardBgImgBox>input{
        width: 100%;
        height: 100%;
        display: block;
        opacity: 0;
        position: absolute;
        left: 0;
        top: 0;
    }
    #EditCardManage .editCardListManageBox>div>.cardTitle{
        width: 100%;
        height: 0.4rem;
        line-height: 0.4rem;
        text-align: left;
        font-size: 0.32rem;
        color: #666;
        display: block;
        overflow: hidden;
    }
    #EditCardManage .editCardListManageBox>div>input,#EditCardManage .editCardListManageBox>div>select,#EditCardManage .editCardListManageBox>div>textarea{
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
    #EditCardManage .editCardListManageBox>div>textarea{
        height: 3rem;
        line-height: 0.6rem;
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
    .editManageBox{
        width: 100%;
        height: 1.4rem;
        margin: 0 auto;
        margin-top: 1rem;
        box-sizing: border-box;
        display: block;
        overflow: hidden;
    }
    .editManageBox>span{
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