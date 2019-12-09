<template>
    <div class="order-module">
    	<div class="item" v-for="(item,index) in courseClassList" :key="item.classId" >
			<span class="dian"></span>
    		<p class="p1">
				<span class="span1">课程：{{item.className}}</span>
			</p>
    		<p class="p2">
				<span class="span1"> 机构：{{item.shopName}}</span>
				<span class="span1"> 老师：{{item.teacherName}}</span>
				<span class="span1"> 时间：{{item.classStartTime | dateformatYMD}}开始</span>
				<span class="span1" v-for="subitem in item.classCourseList"> 
					<span v-if="subitem.schedType == 1">{{subitem.lessonDate | dateformatYMD}} </span>
					<span v-if="subitem.schedType == 2">每周{{subitem.weekday}}</span>
				</span>
				<span class="span1" v-if='item.maxNormalNum-item.normalNum >= 0'> 剩余{{item.maxNormalNum-item.normalNum}}名额</span>
				<span class="span1" v-if='item.maxNormalNum-item.normalNum < 0'> 剩余0名额</span>
			</p>
    	</div>
    	<p v-if="classList.length === 0" class="no-order">暂无记录~</p>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    data() {
        return {
            courseClassList: [],
        }
    },
    computed: {
        ...mapGetters(['userinfo'])
    },
    methods: {
		onShow() {
			this.getCourseClassList();
		},
		getCourseClassList() {
			uni.request({
			    method: 'POST',
			    url: `${this.doMain}/course/courseLesson/listCourseClassByParentId`,
			    header: {
			        'content-type': 'application/x-www-form-urlencoded'
			    },
			    data: { parentId: this.userinfo.parentId},
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
    }
}
</script>

<style lang="less">
@import url('../../../styles/base.less');
page {
	padding: 18upx 20upx 20upx;
	background:#F2F2F2;
}
.order-module {
	.no-order {
	    line-height: 280upx;
	    color: #999;
	    font-size: 26upx;
	    text-align: center;
	}
	.item{
		overflow: hidden;	
		position: relative;
		width: 100%;
		height: auto;
		background-color: #fff;
		border:1upx solid rgba(204,204,204,1);
		border-radius:8upx;
		margin-bottom:20upx;
		.dian{
			position: absolute;
			width:48upx;
			height:54upx;
			left:-25upx;
			top:-25upx;
			border-radius:50%;;
			background-color:#0A9187;
		}
		.p1 {
			font-weight:bold;
			color:#242039;
			font-size:30upx;
			font-weight:bold;
			line-height:49upx;
			padding:20upx 20upx 20upx 20upx;
			.span1{
			}
			.span2{
				float: right;
			}
		}
		.p2 {
			font-size:26upx;
			line-height:46upx;
			color:#666666;
			font-weight:500;
			border-top: 1px solid #E5E5E5;
			padding:20upx 20upx 20upx 20upx;
			.span1{
			}
			.span2{
				float: left;
			}
		}
	}
	.bottom{
		position: relative;
		display: flex;
		width: 100%;
		height: 80upx;
		.ac-btn{
			position: absolute;
			float: right;
			width: 140upx;
			height: 47upx;
			line-height: 44upx;
			text-align: center;
			font-size: 26upx;
			color: #fff;
			background: #0A9187;
			right: 20upx;
			top: 17upx;
		}
		.ac-btn2{
			position: absolute;
			float: right;
			width: 140upx;
			height: 47upx;
			line-height: 44upx;
			text-align: center;
			font-size: 26upx;
			color: #fff;
			background: #0A9187;
			right: 40upx;
		}
	}
}
.span1{
		display: block;
	}
.span2{
	display:inline;
}
</style>