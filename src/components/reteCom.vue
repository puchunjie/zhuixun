<template>
    <div class="rate-conatiner">
        <div class="label">{{ label }}</div>
        <div class="rate-warp">
            <i class="iconfont iconpingfen" :class="{ 'active': (el+1) <= rateNum }" v-for="el in count" :key="el" @click="setRate(el)"></i>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        count: {
            type: Number,
            default: 5
        },
        label: String,
        value: Number
    },
    data() {
        return {
            rateNum: 0
        }
    },
    watch: {
        value: {
            handler: function(val) {
                this.rateNum = val;
            },
            immediate: true
        }
    },
    methods: {
        setRate(el) {
            this.rateNum = el + 1;
            this.$emit('input', (el + 1))
        }
    }
}
</script>

<style lang="less">
.rate-conatiner {
    width: 100%;
    display: flex;
    height: 50upx;
    margin-bottom: 25upx;
    .label {
        width: 180upx;
        height: 50upx;
        line-height: 50upx;
        color: #333;
        font-size: 28upx
    }
    .rate-warp {
        flex: 1;
        height: 50upx;
        .iconfont {
            font-size: 40upx;
            color: #ccc;
            margin-right: 10upx;
            &.active {
                color: #F5AF39;
            }
        }
    }
}
</style>