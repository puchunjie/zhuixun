<template>
    <div class="sd-registration-container">
        <zxTabs :options="tabs" large @tabChange="tabChange"></zxTabs>
    
        <div class="content" v-if="active === 1">
            <div class="sd-item" :class="{ 'check': item.check }" v-for="(item,i) in list" :key="i" @click="check(item)">
                <i v-if="!item.hasSignIn" class="iconfont iconxuanze" :class="{ 'check': item.check }"></i> {{ item.name }}
                <span v-if="item.hasSignIn" class="tip">（已签到）</span>
            </div>
    
            <div class="fix-btottom">
                <div class="select-all sd-item b" @click="setAllCheck">
                    <i class="iconfont iconxuanze" :class="{ 'check': checkAll }"></i> {{ checkAll ? '取消全选' : '全选' }}
                </div>
                <div class="btn">提交</div>
            </div>
        </div>
    
        <div class="content" v-if="active === 2">
            <div class="erweima-warp">
                <tki-qrcode style="display:inline-block" ref="qrcode" cid="cid" :val="'xxxxxxxxxxxxxx'" :size="200" unit="upx" loadMake onval/>
            </div>
            <p class="tip-word">xxx签到成功</p>
    
            <div class="fix-btottom">
                <div class="btn">提交</div>
            </div>
        </div>
    
    
    </div>
</template>

<script>
import zxTabs from '@/components/tabs.vue'
import tkiQrcode from 'tki-qrcode/components/tki-qrcode/tki-qrcode.vue'
export default {
    components: { zxTabs, tkiQrcode },
    data() {
        return {
            tabs: [{
                    label: '批量签到',
                    value: 1
                },
                {
                    label: '扫码签到',
                    value: 2
                }
            ],
            active: 2,
            list: []
        }
    },
    computed: {
        checkAll() {
            return this.list.filter(item => !item.hasSignIn).every(item => item.check)
        }
    },
    methods: {
        tabChange(tab) {
            this.active = tab.value;
        },
        check(item) {
            if (item.hasSignIn) return
            item.check = !item.check;
        },
        setAllCheck() {
            let checkAll = this.checkAll;
            this.list.forEach(item => {
                item.check = !checkAll
            })
        },
        getList() {
            this.list = [{
                name: '张三',
                value: 1,
                hasSignIn: false
            }, {
                name: '张三san ',
                value: 2,
                hasSignIn: false
            }, {
                name: '张三si',
                value: 3,
                hasSignIn: true
            }].map(item => {
                item.check = false;
                return item
            })
        }
    },
    created() {
        this.getList()
    }
}
</script>

<style lang="less">
@import url('../../styles/base.less');
.sd-registration-container {
    .content {
        margin-top: 20upx;
        width: 100%;
        background-color: #fff;
        overflow: hidden;
        .sd-item {
            position: relative;
            width: 100%;
            height: 106upx;
            line-height: 106upx;
            padding: 0 40upx 0 90upx;
            color: @gray_black;
            font-size: 30upx;
            .iconfont {
                position: absolute;
                color: #ccc;
                font-size: 36upx;
                margin-right: 18upx;
                left: 40upx;
            }
            &:not(:last-child) {
                border-bottom: 1px solid @line_gray;
            }
            .tip {
                position: absolute;
                right: 40upx;
                color: @light_gray;
            }
            &.check .iconfont {
                color: @base_green;
            }
            &.b {
                border-bottom: 1px solid @line_gray;
            }
        }
        .erweima-warp {
            width: 670upx;
            height: 350upx;
            padding: 60upx 0;
            border-radius: 8upx;
            border: 1px solid #ccc;
            margin: 113upx auto 10upx;
            text-align: center;
        }
        .tip-word {
            font-size: 28upx;
            color: #333;
            text-align: center;
            line-height: 56upx;
            margin-bottom: 50upx;
        }
    }
    .fix-btottom {
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        background: #fff;
        .btn {
            width: 711upx;
            height: 99upx;
            background: rgba(29, 92, 84, 1);
            margin: 17upx auto;
            text-align: center;
            color: #fff;
            line-height: 99upx;
            font-size: 34upx;
        }
    }
}
</style>