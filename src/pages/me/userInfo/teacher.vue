<template>
    <div class="user-info">
        <div class="form-div">
            <div class="form-group log-sp">
                <div class="label" style="height:155upx;line-height:155upx;padding:0">
                    <img class="logo-img" src="/static/logo.png" alt="">
                </div>
                <div class="value">
                    <div class="select" style="text-align:left">更换头像<i class="iconfont arrow iconarrow"></i></div>
                </div>
            </div>
        </div>
    
        <div class="form-div">
            <div class="form-group">
                <div class="label">姓名</div>
                <div class="value">
                    <input v-model="form.remark" placeholder="填写请" />
                </div>
            </div>
            <div class="form-group">
                <div class="label">手机号</div>
                <div class="value">
                    <input v-model="form.remark" placeholder="填写请" />
                </div>
            </div>
            <dateSelect title="生日"></dateSelect>
            <singleElection title="性别" :data="[{value: 1,label: '男'},{value: 2,label: '女'}]"></singleElection>
        </div>
    
        <div class="form-div">
            <singleElection title="教龄" :data="[{value: 1,label: '3年'},{value: 2,label: '5年'}]"></singleElection>
            <singleElection title="学历" :data="[{value: 1,label: '专科'},{value: 2,label: '本科'}]"></singleElection>
            <div class="form-group">
                <div class="label">院校</div>
                <div class="value">
                    <input v-model="form.remark" placeholder="填写请" />
                </div>
            </div>
        </div>
    
        <div class="submit-btn-fixed">提交</div>
    </div>
</template>

<script>
import dateSelect from '~/dateSelect.vue'
import singleElection from '~/singleElection.vue'
export default {
    components: { dateSelect, singleElection }
}
</script>

<style lang="less">
@import url('../../../styles/base.less');
.user-info {
    padding-bottom: 150upx;
    .log-sp{
        height: 155upx;
        line-height: 155upx;
        padding: 24upx 40upx;
    }
    .logo-img{
        display: block;
        width: 106upx;
        height: 106upx;
        border-radius: 106upx;
    }
}
</style>