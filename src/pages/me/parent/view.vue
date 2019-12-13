<template>
	<div class="container">
		<div class="header-info left-tip red">
			<div class="info">
				<image class="img" :src="'/static/head2.png'"></image>
				<div class="name">{{parent.realName}}({{parent.nickName}})</div>
				<div class="phone" v-show="shop.showParentTel == 1">
					<i class="iconfont icon-icon"></i>{{parent.mobilePhone}}
				</div>
			</div>
			<div class="more">
				录入更多资料<i class="iconfont icon-jiantou-copy-copy"></i>
			</div>
		</div>
		<div v-if="parentVisit !== ''" class="situation main-modal">
			<div class="state">
				 跟进情况
				<span class="tag"  v-show="parentVisit.state == 0">已跟进</c:if></span>
				<!-- <i class="iconfont icon-jiantou-copy-copy"></i> -->
			</div>
			<div class="desc">{{parentVisit.visitResult }}</div>
			<div class="person">跟进人：{{parentVisit.creatorName }}<span class="time">{{parentVisit.createdTimestamp | dateformatYMD}}</span></div>
		</div>
		<div class="now main-modal">
			<p class="title">现有学员</p>
			<div class="name-list">
				<div class="item" v-for="item in studentList" :key="item.studentId">
					<span class="name">{{item.studentName }}</span>
					<!-- <i class="iconfont icon-jiantou-copy-copy"></i> -->
				</div>
			</div>
		</div>
		<div class="query-btn">
			<div class="btn" @click="openToAddStudent">+添加学员</div>
		</div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    data() {
        return {
			parent:null,
			shop:null,
			studentList:[],
			parentVisit:''
        }
    },
	computed: {
	    ...mapGetters(['userinfo'])
	},
	onLoad:function(e) {
		this.parentId = e.parentId;
	},
	onShow() {
		this.getParent();
	},
	methods: {
		getParent() {
			uni.request({
			    method: 'POST',
			    url: `${this.doMain}/parent/view`,
			    header: {
			        'content-type': 'application/x-www-form-urlencoded'
			    },
			    data: { "parentId":this.parentId,"shopId":this.userinfo.shopId},
			    success: res => {
					console.info(this.parentId);
			        if (res.data.code === 0) {
			            this.parent = res.data.data.parent;
						this.studentList = res.data.data.studentList;
			        }else{
						uni.showToast({
							title:res.data.fieldErrors[0].message,
							icon: 'none',
							duration: 1000
						})
					}
			    }
			});
		},
		openToAddStudent(){
			uni.navigateTo({
				url: '/pages/me/parent/addStudent?parentId='+this.parentId
			});
		},
	},
}
</script>

<style lang="less">
@import url('../../../styles/base.less');
page {
	background:#f2f2f2;
	padding: 0 40upx;
}
	.container {
	    width: 100%;
	    padding-top: 20upx;
	    background-color: #f2f2f2;
	}
	.header-info {
	    width: 100%;
	    height: auto;
	    border-radius: 2.5upx;
	    background-color: #fff;
	}
	.left-tip {
	    position: relative;
	}
	.left-tip.red:before {
	    background-color: #1d5c54;
	}
	.left-tip:before {
	    position: absolute;
	    display: block;
	    content: '';
	    width: 1.5upx;
	    height: 50upx;
	    border-radius: 12.5upx;
	    left: -1.5upx;
	    top: 5upx;
	}
	.header-info .info {
	    position: relative;
	    width: 100%;
	    height: 180upx;
	    border-bottom: 1upx solid #e5e5e5;
	    padding: 45upx 10upx 10upx 170upx;
	}
	.info .img {
	    position: absolute;
	    display: block;
	    width: 106upx;
	    height:106upx;
	    left: 30upx;
	    top: 40upx;
	    border-radius: 106upx;
	    border: 1upx solid #e5e5e5;
	}
	.info .name {
	    width: 100%;
	    height: 28upx;
	    line-height: 28upx;
	    font-size: 28upx;
	    color: #333;
	}
	.info .name .iconfont.man {
	    color: #0b9186;
	}
	.info .name .iconfont {
	    font-size: 7upx;
	}
	.iconfont {
	    font-family: "iconfont" !important;
	    font-size: 16upx;
	    font-style: normal;
	    -webkit-font-smoothing: antialiased;
	    -moz-osx-font-smoothing: grayscale;
	}
	.icon-xingbienv:before {
	    content: "\e71d";
	}
	.more {
	    position: relative;
	    width: 100%;
	    height: 80upx;
	    padding: 0 20upx;
	    line-height: 80upx;
	    font-size: 26upx;
	    color: #0b9186;
	}
	.now {
	    margin-top: 20upx;
	    padding: 20upx;
	}
	.main-modal {
	    width: 100%;
	    background-color: #fff;
	    border-radius: 10upx;
	    font-size: 28upx;
	}
	.now .title {
	    color: #333333;
	    line-height: 36upx;
	}
	.now .name-list {
	    width: 100%;
	    margin-top: 20upx;
	}
	.name-list .item {
	    position: relative;
	    width: 100%;
	    line-height: 36upx;
	    color: #666;
	}
	.name-list .item .name {
	    width: 600upx;
	    display: inline-block;
	}
	.name-list .item .iconfont {
	    color: #d9d9d9;
	    font-size: 28upx;
	}
	.icon-jiantou-copy-copy:before {
	    content: "\e66b";
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
	        background: #fff;
	    }
	}
</style>