<template>
    <div class="curriculum-container">
        <calendar @selected="tapDate"></calendar>
        <teacherModule v-if="isTeacher"></teacherModule>
        <parentModule v-else></parentModule>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import calendar from '@/components/calendar.vue'
import parentModule from './parentModule'
import teacherModule from './teacherModule'
export default {
    components: {
        calendar,
        parentModule,
        teacherModule
    },
    computed: {
        ...mapGetters(['isTeacher'])
    },
    methods: {
        tapDate(data) {
            console.log(data)
        }
    },

}
</script>

<style lang="less">
@import url('../../styles/base.less');
@import url('../../styles/institutionslIst.less');
page {
    padding: 18upx 20upx 20upx;
    background: #fff;
}

.curriculum-container {
    
}
</style>