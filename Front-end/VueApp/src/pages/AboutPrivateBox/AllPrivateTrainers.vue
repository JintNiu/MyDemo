<template>
    <div class="page" id="allPrivateTrainers">
        <mt-header fixed title="所有私教" style="background:#000">
            <mt-button slot="left" icon="back" @click="$router.back()"></mt-button>
        </mt-header>
        <div class="page-content">
            <div class="memberListBox">
                <ul class="memberList">
                    <v-touch tag="li" v-on:tap="toTeacherInfor()">
                        
                    </v-touch>
                </ul>
            </div>  
        </div>
    </div>
</template>
<script>
import {Spinner} from 'mint-ui';
export default {
    name: 'AllPrivateTrainers',
    components: {
        
    },
    data () {
        return {
            
        }
    },
    ready () {
      
    },
    mounted (){
        
    },
    watch: {
        
    },
    methods: {
        toTeacherInfor(){
            this.$router.push({name:'TeacherDetails'})
        }
    }
}
</script>
<style scoped>
</style>