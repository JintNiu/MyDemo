<template>
	<div class="page" id="onePrivateContentBox">
        <div class="headerBox">
            <i class="fa fa-angle-left" @click="$router.back()"></i>
            <span>私教时间表</span>     
            <div class="weekDayBtn">
                <span :class="{activeSpan:select=='week'}" @click="toWeek()">周</span>
                <span :class="{activeSpan:select=='day'}" @click="toDay()">天</span>
            </div>
        </div>
        <router-view></router-view> 
	</div>
</template>
<script>
    import {Popup} from 'mint-ui';
  	export default {
  		name: 'OnePrivate',
    	data () {
			return {
                select: 'week',
			}
		},
        watch:{
            $route(to){
                var path=to.path.substring(1);
                if(path.indexOf('OnePrivateWeek') > 0){
                    this.select = 'week';
                }else if(path.indexOf('OnePrivateDay') > 0){
                    this.select = 'day';
                }
            }
        },
        mounted (){
            
        },
        methods:{
            toWeek(){
                this.select = 'week';
                this.$router.replace({name:'OnePrivateWeek'})
            },
            toDay(){
                this.select = 'day';
                this.$router.replace({name:'OnePrivateDay'})
            }
        }
  	}
</script>
<style scoped>
	/* 头部 */
    .headerBox{
        width: 100%;
        height: 40px;
        overflow: hidden;
        position: fixed;
        left: 0;
        top: 0;
        z-index: 111;
        /*background: #26a2ff;*/
        background: #000;
        padding: 0 0.4rem;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: space-around;
    }
    .headerBox>i{
        width: 2rem;
        height: 100%;
        line-height: 40px;
        box-sizing: border-box;
        color: #fff;
        font-size: 0.68rem;
        text-align: left;
        display: block;
    }
    .headerBox>span{
        width: 6rem;
        height: 100%;
        line-height: 40px;
        text-align: center;
        color: #fff;
        font-size: 14px;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
        display: block;
    }
    .headerBox>.weekDayBtn{
        width: 2rem;
        height: 26px;
        border-radius: 20px;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: space-around;
    }
    .headerBox>.weekDayBtn>span{
        width: 50%;
        height: 100%;
        line-height: 26px;
        text-align: center;
        font-size: 14px;
        color: #fff;
        border: 1px solid #fff;
        box-sizing: border-box;
        display: block;
        float: left;
        position: relative;
    }
    .headerBox>.weekDayBtn>span:first-child{
        border-right: none !important;
    }
    .headerBox>.weekDayBtn>span:last-child{
        border-left: none !important;
    }
    .headerBox>.weekDayBtn>.activeSpan{
        background: orange;
        border: 1px solid orange;
    }
</style>

