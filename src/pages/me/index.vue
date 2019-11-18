<template>
    <div class="me-container">
        <div class="green-bg">
            <i class="iconfont iconziyuan setting"></i>
        </div>
        <div class="jigou-ll">
            <div class="info-panel">
                <div class="head">
                    张靓颖
                    <div class="btn">＋{{ isTeacher ? '增加新机构' : '增加新学员' }}</div>
                </div>
                <div class="content">
                    <image class="h-logo" src='/static/boy.png'></image>
                    <div v-if="isTeacher" class="body" @click="goSwitch">
                        <p class="number">服务于2个机构</p>
                        <p class="word">3个班级授课 50个学生</p>
                    </div>
                    <div v-else class="body" @click="goStudentMana">
                        <p class="number">ID： No.1915 1603 7930</p>
                        <p class="word">2个机构学习 剩余学时：1199</p>
                    </div>
    
                    <i class="iconfont arrow iconarrow"></i>
                </div>
            </div>
            <institutionList v-if="!isTeacher"></institutionList>
        </div>

        <teacherMenu v-if="isTeacher"></teacherMenu>
        <parentMenu v-else></parentMenu>
        
    </div>
</template>

<script>
import institutionList from '@/components/institutionList.vue'
import { mapGetters } from 'vuex'
import teacherMenu from './teacherMenu.vue'
import parentMenu from './parentMenu.vue'
export default {
    components: {
        institutionList,
        teacherMenu,
        parentMenu
    },
    data() {
        return {
            
        }
    },
    computed: {
        ...mapGetters(['isTeacher'])
    },
    methods: {
        goSwitch(){
            uni.navigateTo({url: '/pages/me/institution/switchInst'})
        },
        goStudentMana(){
            uni.navigateTo({url: '/pages/me/studentMana/index'})
        }
    },
}
</script>

<style lang="less">
@import url('../../styles/base.less');
page{
    padding-bottom: 20upx;
}
.me-container {
    .green-bg {
        position: relative;
        width: 100%;
        height: 185upx;
        background: @dark_green;
        .setting {
            position: absolute;
            color: #fff;
            font-size: 40upx;
            right: 40upx;
            top: 20upx;
        }
    }
    .jigou-ll {
        position: relative;
        width: 100%;
        padding: 135upx 40upx 30upx;
        background: #fff;
        .info-panel {
            position: absolute;
            width: 670upx;
            height: 206upx;
            background: rgba(255, 255, 255, 1);
            box-shadow: 0upx 5upx 10upx 1upx rgba(21, 169, 140, 0.2);
            border-radius: 8upx;
            left: 40upx;
            top: -100upx;
            overflow: hidden;
            .head {
                display: flex;
                width: 100%;
                height: 70upx;
                line-height: 70upx;
                font-size: 30upx;
                color: @base_black;
                padding-left: 40upx;
                justify-content: space-between;
                .btn {
                    width: 336upx;
                    background: #CFE9E7;
                    text-align: center;
                    color: @base_green;
                    font-size: 28upx;
                    border-radius: 0 8upx 0 8upx;
                }
            }
            .content {
                position: relative;
                display: flex;
                width: 100%;
                padding: 0 24upx 30upx 30upx;
                .h-logo {
                    display: block;
                    width: 106upx;
                    height: 106upx;
                }
                .body {
                    flex: 1;
                    color: @base_gray;
                    font-size: 28upx;
                    margin-left: 25upx;
                    .number {
                        height: 22upx;
                        line-height: 22upx;
                        margin-top: 36upx;
                    }
                    .word {
                        height: 28upx;
                        line-height: 28upx;
                        margin-top: 20upx;
                    }
                }
            }
            .arrow {
                position: absolute;
                font-size: 40upx;
                color: @base_gray;
                right: 24upx;
                top: 44upx;
            }
        }
    }
    
}
</style>