<template>
    <div class="leave-container">
        <div class="form-div">
            <dateSelect title="选择时间"></dateSelect>
            <div class="form-group">
                <div class="label">请假学员</div>
                <div class="value">
                    <div class="select" :class="{ 'vvv': form.studentName!=='' }">
                        {{ form.studentName !== '' ? form.studentName : '请选择'}}
                        <i class="iconfont arrow iconarrow"></i></div>
                </div>
            </div>
        </div>
    
        <div class="class-div">
            <div class="query-class">请点击查询并选择请假课程</div>
            <div class="query-btn">
                <div class="btn" @click="getList">查询</div>
            </div>
            <div class="list-conetnt">
                <div class="class-item" :class="{ 'checked': item.check }" @click="check(item,i)" v-for="(item,i) in classList" :key="i">
                    <h3 class="jigou">{{ item.a }}</h3>
                    <div class="desc">
                        <div class="b">{{ item.b }}</div>
                        <div class="c">{{ item.c }}</div>
                        <div class="d">{{ item.d }}</div>
                    </div>
    
                    <i class="iconfont iconxuanze check"></i>
                </div>
            </div>
        </div>

        <div class="form-div">
            <div class="form-group block">
                <div class="label">请假理由</div>
                <div class="value">
                    <textarea v-model="form.remark" class="text-area" placeholder="填写请假理由" />
                </div>
            </div>
        </div>

        <div class="submit-btn-fixed">确定</div>
    
    </div>
</template>

<script>
import dateSelect from '@/components/dateSelect.vue'
export default {
    components: { dateSelect },
    data() {
        return {
            classList: [],
            form: {
                studentName: ''
            }
        }
    },
    methods: {
        check(item,i){
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
@import url('../../../styles/base.less');
.leave-container {
    padding-bottom: 150upx;
    .class-div {
        background: #fff;
        margin-top: 20upx;
        .query-class {
            width: 100%;
            height: 55upx;
            line-height: 55upx;
            background: #EBFAF9;
            color: #70BEB8;
            font-size: 26upx;
            padding: 0 40upx;
        }
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
            }
        }
        .list-conetnt {
            padding: 0 40upx;
        }
        .class-item {
            position: relative;
            width: 100%;
            height: 135upx;
            padding: 30upx 0;
            font-size: 28upx;
            color: @gray_black;
            &:not(:last-child) {
                border-bottom: 1px solid #E5E5E5;
            }
            .jigou {
                height: 27upx;
                line-height: 27upx;
            }
            .desc {
                display: flex;
                margin-top: 20upx;
                height: 27upx;
                line-height: 27upx;
                .b {
                    width: 230upx;
                }
                .c {
                    width: 180upx;
                }
            }
            .check {
                position: absolute;
                right: 40upx;
                bottom: 30upx;
                font-size: 40upx;
                color: #ccc;
            }
            &.checked .check {
                color: @dark_green;
            }
        }
    }
}
</style>