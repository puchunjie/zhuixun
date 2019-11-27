<template>
    <div class="audition-container">
        <div class="form-div">
            <singleElection title="近期课程" :data="[{value: 1,label: '美术课'}]"></singleElection>
            <singleElection title="选择班级" :data="[{value: 1,label: '大一班'}]"></singleElection>
            <dateSelect title="选择时间"></dateSelect>
        </div>
    
        <div class="class-div">
            <div class="query-btn">
                <div class="btn" @click="getList">查询</div>
            </div>
            <div class="time-title">选择时段</div>
            <div class="class-list">
                <p class="empty" v-show="classList.length === 0">无数据</p>
                <div class="cls-item" v-for="(item,i) in classList" :key="i">{{ item.b }}</div>
            </div>
        </div>
    
        <div class="search-div">
            <div class="submit-btn nomargin" style="width:100%">扫一扫</div>
    
            <div class="search-warp">
                <div class="box">
                    <i class="isearch iconfont iconsousuo"></i>
                    <input type="text" placeholder="查询学生">
                </div>
                <div>搜索</div>
            </div>
    
            <div class="su-list">
                <div class="st-item active">
                    <p>家长姓名：高锡</p>
                    <p>家长手机号：15261195938</p>
                    <p>学生姓名：李思</p>
                    <i class="icheck iconfont iconxuanzejiaobiao"></i>
                </div>
                <div class="st-item">
                    <p>家长姓名：高锡</p>
                    <p>家长手机号：15261195938</p>
                    <p>学生姓名：李思</p>
                    <i class="icheck iconfont iconxuanzejiaobiao"></i>
                </div>
            </div>
        </div>
    
    
        <div class="submit-btn-fixed">确定</div>
    
    </div>
</template>

<script>
import singleElection from '~/singleElection.vue'
import dateSelect from '~/dateSelect.vue'
export default {
    components: { dateSelect, singleElection },
    data() {
        return {
            classList: [],
            form: {
                studentName: ''
            }
        }
    },
    methods: {
        check(item, i) {
            item.check = !item.check;
        },
        getList() {
            this.classList = [{
                a: '蓝天早教机构',
                b: '陆游的英语',
                c: '201教室',
                d: '18:00-19:00'
            }, {
                a: '蓝天早教机构',
                b: '陆游的英语',
                c: '201教室',
                d: '18:00-19:00'
            }, {
                a: '蓝天早教机构',
                b: '陆游的英语',
                c: '201教室',
                d: '18:00-19:00'
            }].map(item => {
                item.check = false;
                return item
            })
        }
    }
}
</script>

<style lang="less">
@import url('../../styles/base.less');
.audition-container {
    padding-bottom: 150upx;
    .class-div {
        margin-top: 20upx;
        .query-btn {
            width: 100%;
            padding: 20upx 40upx;
            .btn {
                width: 100%;
                height: 66upx;
                line-height: 66upx;
                text-align: center;
                border: 1px dotted @dark_green;
                border-radius: 8upx;
                color: @dark_green;
                background: #fff;
            }
        }
        .time-title {
            width: 710upx;
            margin: 0 auto;
            height: 100upx;
            line-height: 100upx;
            color: @base_black;
            font-size: 30upx;
            padding: 0 20upx;
            background: #fff;
            border-bottom: 1px solid #ccc;
        }
        .class-list {
            width: 710upx;
            margin: 0 auto;
            background-color: #fff;
            min-height: 100upx;
            padding: 0 20upx;
            .empty {
                color: @base_black;
                font-size: 30upx;
                height: 100upx;
                line-height: 100upx;
            }
        }
    }
    .search-div {
        width: 100%;
        margin-top: 20upx;
        background: #fff;
        padding: 20upx 40upx;
        .search-warp {
            width: 100%;
            height: 100upx;
            margin-top: 20upx;
            display: flex;
            justify-content: space-between;
            line-height: 100upx;
            .box {
                position: relative;
                width: 590upx;
                height: 100upx;
                border: 1px solid #ccc;
                border-radius: 8upx;
                padding: 30upx 30upx 30upx 87upx;
                font-size: 30upx;
                input {
                    display: block;
                    width: 100%;
                    height: 100%;
                    line-height: 100upx;
                    font-size: 30upx;
                    margin: 0;
                    padding: 0;
                    outline: 0;
                    border: 0;
                }
                .isearch {
                    position: absolute;
                    font-size: 40upx;
                    color: #999;
                    left: 30upx;
                    top: 0;
                }
            }
        }
    }
    .su-list {
        .st-item {
            position: relative;
            width: 100%;
            margin-top: 20upx;
            background: rgba(255, 255, 255, 1);
            border: 1px solid rgba(204, 204, 204, 1);
            border-radius: 4px;
            padding: 27upx 20upx;
            font-size: 26upx;
            overflow: hidden;

            p {
                height: 44upx;
                line-height: 44upx;
            }
            .icheck {
                position: absolute;
                display: none;
                font-size: 80upx;
                color: @dark_green;
            }
            &.active {
                color: @dark_green;
                border-color: @dark_green;
                .icheck {
                    display: inline-block;
                    right: -2upx;
                    bottom: -2upx;
                }
            }
        }
    }
}
</style>