<template>
    <div class="clsaa-module">
		<div class="item">
			<div class="top">
				<p>班级总数：{{ courseClassList.length }}</p>
			</div>
		</div>
        <div class="item"  v-for="item in courseClassList" :key="item.classId">
            <div class="top">
                <p>班级：{{ item.className }}</p>
            </div>
            <div class="person-nums">
                <p>老师：{{ item.teacherName }}</p>
            </div>
        </div>
        <p v-if="courseClassList.length === 0" class="no-class">暂无班级~</p>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    data() {
        return {
            courseClassList: []
        }
    },
    computed: {
        ...mapGetters(['userinfo'])
    },
	onLoad() {
		this.getClassList();
	},
    methods: {
		getClassList() {
			uni.request({
			    method: 'POST',
			    url: `${this.doMain}/course/listCourseClass`,
			    header: {
			        'content-type': 'application/x-www-form-urlencoded'
			    },
			    data: { teacherId: this.userinfo.teacherId},
			    success: res => {
			        if (res.data.code === 0) {
			            this.courseClassList = res.data.data;
			        }else{
						uni.showToast({
							title:res.data.fieldErrors[0].message,
							icon: 'none',
							duration: 1000
						})
					}
			    }
			});
		}
    },
}
</script>

<style lang="less">
@import url('../../styles/base.less');
page {
	padding: 18upx 20upx 20upx;
	background:#F2F2F2;
}
.clsaa-module {
    margin-top: 30upx;
    min-height: 280upx;
    .no-class {
        line-height: 280upx;
        color: #999;
        font-size: 26upx;
        text-align: center;
    }
    .item {
        width: 100%;
        background: #fff;
        border: 1px solid rgba(230, 230, 230, 1);
        border-radius: 8upx;
        margin-top: 20upx;
        .top {
			width: 100%;
			height: 66upx;
			line-height: 66upx;
			font-size: 30upx;
			color: #242039;
			padding: 0 22upx 0 28upx;
			text-indent: 14upx;
			font-weight: 800;
        }
        .person-nums {
            width: 100%;
            height: 66upx;
            line-height: 66upx;
            font-size: 26upx;
            color: #666666;
            border-top: 1px solid #E5E5E5;
            padding: 0 22upx 0 28upx;
            text-indent: 14upx;
        }
    }
}
		
</style>