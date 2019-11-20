<template>
    <div class="tab-container" :class="large && 'large'">
        <div class="item" :class="active === i && 'active'" @click="setTab(i)" v-for="(tab,i) in list" :key="i">
            {{ tab.viewLabel }}
        </div>
    </div>
</template>

<script>
export default {
    props: {
        options: {
            type: Array,
            default: function() {
                return []
            }
        },
        labelFormat: Function,
        large: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            active: 0
        }
    },
    computed: {
        list() {
            let ops = this.options.map(tab => {
                tab.viewLabel = this.labelFormat ? this.labelFormat(tab) : tab.label;
                return tab
            })

            return ops
        }
    },
    methods: {
        setTab(i){
            this.active = i;
            this.$emit('tabChange',this.$clearData(this.options[i]))
        }
    }
}
</script>

<style lang="less">
@import url('../styles/base.less');
.tab-container {
    display: flex;
    width: 100%;
    height: 68upx;
    padding: 15upx 0;
    color: @gray_black;
    font-size: 26upx;
    font-weight: 500;
    text-align: center;
    border-bottom: 1px solid #E6E6E6;
    .item {
        position: relative;
        width: 50%;
        height: 37upx;
        line-height: 37upx;
        &:not(:last-child) {
            border-right: 1px solid #E6E6E6;
        }
        &:after {
            position: absolute;
            content: '';
            width: 100%;
            height: 1px;
            background-color: #fff;
            bottom: -15upx;
            left: 0;
        }
        &.active:after {
            background-color: #1ABC9C;
        }
    }

    &.large{
        height: 88upx;
        padding: 10upx 0;
        background: #fff;
        color: @base_gray;
        font-weight: normal;
        .item{
            height: 68upx;
            line-height: 68upx;
            &:after{
                bottom: -10upx;
            }
        }
    }

}
</style>