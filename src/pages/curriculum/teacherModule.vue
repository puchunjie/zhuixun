<template>
    <div class="teacher-module">
        <p v-show="list.length > 0" class="title">课日程总数 <span>{{ list.length }}</span></p>
        <div class="item" v-for="(item,i) in list" :key="i">
            <div class="top">
                <h3 class="title">{{item.courseName }}</h3>
                <p class="class-name">{{item.className }}</p>
                <div class="class-info">
                    <!-- <div class="time">14:50-15:30</div> -->
                    <div class="room">{{item.classRoom }}</div>
                    <div class="teacher">老师：{{item.teacherName }}</div>
                </div>
            </div>
            <div class="person-nums">
                <div class="it">固定：{{item.actualNormalStudentNum }}/{{item.normalStudentNum }}</div>
                <div class="it">临时：{{item.linShiStudentNum}}</div>
                <div class="it">试听：{{item.shiTingStudentNum}}</div>
            </div>
    
            <span class="stop">正常</span>
        </div>
        <p v-if="list.length === 0" class="no-class">今日暂无课程~</p>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
	props: {
	    list: {
	        type: Array,
	        default: function() {
	            return []
	        }
	    }
	},
    data() {
        return {
           
        }
    },
	computed: {
	    ...mapGetters(['isTeacher']),
		...mapGetters(['userinfo']),
	},
	
}
</script>

<style lang="less">
@import url('../../styles/base.less');
.teacher-module {
    margin-top: 30upx;
    min-height: 280upx;
    .no-class {
        line-height: 280upx;
        color: #999;
        font-size: 26upx;
        text-align: center;
    }
    .item {
        position: relative;
        width: 100%;
        background: #fff;
        border: 1px solid rgba(230, 230, 230, 1);
        border-radius: 8upx;
        margin-top: 20upx;
        .stop {
            position: absolute;
            width: 84upx;
            height: 34upx;
            line-height: 34upx;
            background: rgba(255, 112, 82, 1);
            border-radius: 17upx;
            right: 22upx;
            top: 28upx;
            color: #fff;
            text-align: center;
            font-size: 24upx;
        }
        .top {
            padding: 30upx 20upx 30upx 40upx;
            .title {
                position: relative;
                height: 30upx;
                line-height: 30upx;
                font-size: 30upx;
                color: #242039;
                font-weight: bold;
                &:before {
                    left: -30upx;
                    top: 5upx;
                    display: block;
                    position: absolute;
                    content: '';
                    width: 20upx;
                    height: 20upx;
                    border: 2upx solid rgba(204, 204, 204, 1);
                    border-radius: 50%;
                }
            }
            .class-name {
                font-size: 26upx;
                color: #333333;
                height: 26upx;
                line-height: 26upx;
                margin-top: 19upx;
            }
            .class-info {
                height: 30upx;
                line-height: 30upx;
                display: flex;
                justify-content: space-between;
                margin-top: 22upx;
                .time {
                    color: #0B9186;
                    font-size: 28upx;
                    font-weight: 800;
                }
                .room {
                    font-size: #0B9186;
                    font-size: 28upx;
                    font-weight: 800upx;
                }
                .teacher {
                    font-weight: 800;
                    color: #B3B3B3;
                    font-size: 28upx;
                }
            }
        }
        .person-nums {
            width: 100%;
            height: 66upx;
            line-height: 66upx;
            display: flex;
            justify-content: space-between;
            font-size: 28upx;
            color: #333;
            border-top: 1px solid #E5E5E5;
            padding: 0 22upx 0 28upx;
            text-indent: 14upx;
            .it {
                position: relative;
                &:before {
                    position: absolute;
                    content: '';
                    display: block;
                    width: 4upx;
                    height: 23upx;
                    background: rgba(230, 230, 230, 1);
                    border-radius: 2upx;
                    left: 0;
                    top: 22upx;
                }
            }
        }
    }
}
</style>