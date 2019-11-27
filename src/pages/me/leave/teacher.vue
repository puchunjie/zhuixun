<template>
    <div class="leave-container">
        <div class="form-div">
            <!-- ScEnumKey在utils/enums.js中维护 用于静态枚举值 动态值传入data : [value:1,label:'xxx'] -->
            <singleElection title="请假类型" v-model="form.orderType" ScEnumKey="orderTypeEnum"></singleElection>
            <dateSelect title="开始时间" v-model="form.startDate"></dateSelect>
            <dateSelect title="结束时间" v-model="form.endDate"></dateSelect>
        </div>
    
        <div class="form-div">
            <div class="form-group block">
                <div class="label">请假理由</div>
                <div class="value">
                    <textarea v-model="form.remark" class="text-area" placeholder="填写请假理由" />
                </div>
            </div>
        </div>

        <div class="submit-btn-fixed">提交</div>
    </div>
</template>

<script>
import singleElection from '~/singleElection.vue'
import dateSelect from '~/dateSelect.vue'
export default {
    components: {dateSelect,singleElection},
    data() {
        return {
            form: {
                startDate: '',
                endDate: '',
                remark: ''
            }
        }
    },
}
</script>

<style lang="less">
@import url('../../../styles/base.less');
</style>