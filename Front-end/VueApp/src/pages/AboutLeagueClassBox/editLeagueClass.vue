<template>
  	<div class="page" id="editLeagueClassBox">
  		<mt-header fixed title="修改课程" style="background:#000">
            <mt-button slot="left" icon="back" @click="$router.back()"></mt-button>
        </mt-header>
        <div class="page-content">
            <form class="editLeagueClass" id="editLeagueClass">
                <input type="hidden" name="id" v-model="classId">
                <div class="className">
                    <label class="leagueTitle">课程名</label>
                    <input type="text" name="name" v-model="className">
                </div>
                <div class="classType">
                    <label class="leagueTitle">课程类型</label>
                    <select name="classtypeid" v-model="classType">
                        <option v-for="typeList in classTypeList" :value="typeList.id">{{typeList.name}}</option>
                    </select>
                </div> 
                <!-- <div class="classFit">
                    <label class="leagueTitle">是否付费课程</label>
                    <label class="openOrCloseUrl" for="open">
                        <input id="open" type="radio" name="freestate" value="1" v-model="classFit">
                        <span class="urlStateName"></span>
                        <span style="margin-left: 10px">开启</span>
                    </label>
                    <label class="openOrCloseUrl" for="close">
                        <input id="close" type="radio" name="freestate" value="0" v-model="classFit">
                        <span class="urlStateName"></span>
                        <span style="margin-left: 10px">关闭</span>
                    </label>
                </div>  -->
                <!-- <div class="unitPrice" v-if="classFit=='1'">
                    <label class="leagueTitle">单价</label>
                    <input type="number" name="price" v-model="unitPrice">
                </div> --> 
                <div class="tagName">
                    <label class="leagueTitle">标签</label>
                    <input type="text" name="tags" v-model="tagName">
                </div> 
                <div class="classPic">
                    <label class="leagueTitle">课程图片</label>
                    <input type="hidden" name="classpics" v-model="hasImageList">
                    <div class="hasLoadPicBox">
                        <span>现有图片:</span>
                        <i v-for="(hasImg,index) in hasImage">
                            <span class="fa fa-close" @click="delHasImage(index)"></span>
                            <img :src='hasImg'>
                        </i>
                    </div>
                    <div class="classPicBox">
                        <span>上传图片:</span>
                        <a href="javascript:void(0)">
                            <img src="../../assets/img/selectPic.png" alt="">
                            <input id="classPic" type="file" accept="image/gif,image/jpeg,image/jpg,image/png" name="" @change="uploadImg">
                        </a>
                    </div>
                </div>
                <div class="classInfo">
                    <label class="leagueTitle">课程信息</label>
                    <textarea name="classinfo" v-model="classInfo"></textarea>
                </div> 
                <div class="trainingEffect">
                    <label class="leagueTitle">训练效果</label>
                    <textarea name="trainingeffect" v-model="trainingEffect"></textarea>
                </div> 
                <div class="faqInfo">
                    <label class="leagueTitle">FAQ</label>
                    <textarea name="faq" v-model="faqInfo"></textarea>
                </div> 
                <div class="forPeople">
                    <label class="leagueTitle">适用人群</label>
                    <textarea name="suitable" v-model="forPeople"></textarea>
                </div> 
                <div class="warning">
                    <label class="leagueTitle">注意事项</label>
                    <textarea name="warning" v-model="warning"></textarea>
                </div>  
            </form>
            <div class="toEditLeagueClass" @click="saveEditLeagueClass()">
                <span>修改</span>
            </div>      
        </div>
  	</div>
</template>
<script>
    import {Toast,Switch,MessageBox} from 'mint-ui';
    export default {
        name: 'EditLeagueClass',
        components: {
    		
      	},
    	data () {
    		return {
                classId: '',
                hasImage: [],
                hasImageList: '',
                classTypeList: {},
                className: '',
                classType: '',
                tagName: '',
                // classFit: '',
                // unitPrice: '',
                classInfo: '',
                trainingEffect: '',
                faqInfo: '',
                forPeople: '',
                warning: ''
    		}
    	},
        watch: {  
            
        }, 
        created() {  
            
        },  
    	mounted (){
            this.$nextTick(() => {
                this.classId = this.$route.params.id;
                this.getLeagueClassInfo();
            })
    	},
    	methods: {
            getLeagueClassInfo(){
                let _this = this;
                this.$http.get('/LuchyBird/customRole/customEditClassManage.do?id='+this.classId+'').then(function(data){
                    if(data.data.status == 0){
                        let value = data.data.data;
                        if(value.classInfo.classpics != null && value.classInfo.classpics != ''){
                            _this.hasImage = value.classInfo.classpics.split(',');
                        }
                        _this.hasImageList = value.classInfo.classpics;
                        _this.classTypeList = value.classTypeList;
                        _this.className = value.classInfo.name;
                        _this.classType = value.classInfo.classtypeid;
                        _this.tagName = value.classInfo.tags;
                        // _this.classFit = value.classInfo.freestate;
                        // _this.unitPrice = value.classInfo.price;
                        _this.classInfo = value.classInfo.classinfo.replace(/<[^>]+>/g,"");
                        _this.trainingEffect = value.classInfo.trainingeffect.replace(/<[^>]+>/g,"");
                        _this.faqInfo = value.classInfo.faq.replace(/<[^>]+>/g,"");
                        _this.forPeople = value.classInfo.suitable.replace(/<[^>]+>/g,"");
                        _this.warning = value.classInfo.warning.replace(/<[^>]+>/g,"");
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
            formSerialize(form){
                let formData = new FormData(form),
                    getValue = formData.entries(),
                    parts = [];
                for (let pair of getValue) {
                    parts.push(pair[0] + "=" + pair[1]);
                }
                return parts.join("&");
            },
            delHasImage(index){
                MessageBox.confirm('您确定要删除这张图片么？').then(action => {
                    this.hasImage.splice(index,1);
                    this.hasImageList = this.hasImage.join(',');
                },() => {});
            },
            uploadImg(e){
                let _this = this;
                let file = e.target.files[0];
                let formData = new FormData();
                let reader = new FileReader();
                reader.readAsDataURL(file); 
                if((file.size/1024).toFixed(0)<1024){
                    formData.set('image',file);
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
                        _this.hasImage.push(value);
                        _this.hasImageList = _this.hasImage.join(',');
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
            saveEditLeagueClass(){
                let _this = this;
                let editForm = document.getElementById('editLeagueClass');
                let editFormList = this.formSerialize(editForm);
                if(this.hasImageList!=null&&this.className!=null&&this.classType!=null&&this.tagName!=null&&this.classInfo!=null&&this.trainingEffect!=null&&this.faqInfo!=null&&this.classInfo!=null&&this.forPeople!=null&&this.warning!=null){
                    this.$http.post('/LuchyBird/customRole/customSaveClassManage.do',editFormList,{headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'}})
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
            }
    	}
    }
</script>
<style scoped>
    #editLeagueClassBox .editLeagueClass{
        width: 100%;
        min-height: 100vh;
        background: #fff;
        padding: 0 0.4rem;
        padding-top: 40px;
        margin-top: -40px;
        box-sizing: border-box; 
        overflow: auto;
    }
    #editLeagueClassBox .editLeagueClass>div{
        width: 100%;
        min-height: 1rem;
        padding: 0.2rem 0 0.1rem;
        box-sizing: border-box;
        overflow: hidden;
    }
    #editLeagueClassBox .editLeagueClass>div>.leagueTitle{
        width: 100%;
        height: 0.4rem;
        line-height: 0.4rem;
        text-align: left;
        font-size: 0.32rem;
        color: #666;
        display: block;
        overflow: hidden;
    }
    #editLeagueClassBox .editLeagueClass>div>input,#editLeagueClassBox .editLeagueClass>div>select,#editLeagueClassBox .editLeagueClass>div>textarea{
        width: 100%;
        height: 0.8rem;
        font-size: 0.42rem;
        line-height: 0.8rem;
        color: #000;
        margin-top: 0.1rem;
        outline: none;
        border: none;
        border-bottom: 1px solid #f2f2f2;
        background: #fff;
        display: block;
        transition: all 0.2s ease;
    }
    #editLeagueClassBox .editLeagueClass>div>input:focus,#editLeagueClassBox .editLeagueClass>div>select:focus,#editLeagueClassBox .editLeagueClass>div>textarea:focus{
        border-bottom: 1px solid #FFB74D;
    }
    #editLeagueClassBox .editLeagueClass>div>textarea{
        height: 3rem;
        line-height: 0.6rem;
    }
    #editLeagueClassBox .toEditLeagueClass{
        width: 2.6rem;
        height: 1rem;
        font-size: 0.42rem;
        background: #f0832f;
        color: #fff;
        border-radius: 6px;
        box-sizing: border-box;
        margin: 1rem auto;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
    }
    #editLeagueClassBox .toEditLeagueClass:active{
        background: #FFA726;
    }
    /* 已有图片 */
    #editLeagueClassBox .hasLoadPicBox{
        width: 100%;
        height: auto;
        margin: 0.1rem 0;
        padding: 0 0.2rem;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        flex-wrap: wrap;
        overflow: hidden;
    }
    #editLeagueClassBox .hasLoadPicBox>span,#editLeagueClassBox .classPicBox>span{
        width: 100%;
        height: 0.5rem;
        line-height: 0.5rem;
        font-size: 0.32rem;
        margin: 0.1rem 0;
        text-align: left;
        box-sizing: border-box;
        display: block;
    }
    /* 上传图片 */
    #editLeagueClassBox .classPicBox{
        width: 100%;
        min-height: 2rem;
        margin: 0.1rem 0;
        padding: 0 0.2rem;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        flex-wrap: wrap;
        overflow: hidden;
    }
    #editLeagueClassBox .classPicBox>a{
        width: 2rem;
        height: 2rem;
        border-radius: 4px;
        margin-right: 0.2rem;      
        box-sizing: border-box; 
        display: block;
        overflow: hidden;
        position: relative;
    }
    #editLeagueClassBox .classPicBox>a>#classPic{
        width: 100%;
        height: 100%;
        display: block;
        opacity: 0;
        position: absolute;
        left: 0;
        top: 0;
     }
    #editLeagueClassBox .hasLoadPicBox>i,#editLeagueClassBox .classPicBox>i{
        width: 2rem;
        height: 2rem;
        border-radius: 4px;
        margin-right: 0.2rem;
        display: block;
        overflow: hidden;
        position: relative;
    }
    #editLeagueClassBox .hasLoadPicBox>i>span{
        width: 0.5rem;
        height: 0.5rem;
        font-size: 0.5rem;
        line-height: 0.5rem;
        color: #fff;
        text-align: center;
        display: block;
        position: absolute;
        right: 0;
        top: 0;
        overflow: hidden;
    }
    #editLeagueClassBox .classPicBox>i>i{
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
    #editLeagueClassBox img{
        width: 100%;
        height: 100%;
        display: block;
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