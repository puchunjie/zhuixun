<template>
	<view class="index-container">
		<h3 class="title">追寻艺培
			<div class="right">
				<image class="icon" src="/static/home/message.png"></image>
			</div>
		</h3>
		<div class="swiper-banner">
			<swiper class="banner" autoplay @change="swiperChange">
				<swiper-item v-for="(img, index) in list" :key="index" @click="itemClick(img)">
					<image :src="img" class="slide-image" mode="scaleToFill" />
				</swiper-item>
			</swiper>
			<div class="dots-warp">
				<span class="dot-item" :class="{ 'active': activeIndex === e }" v-for="e in list.length" :key="e"></span>
			</div>
		</div>
	
		<div class="enters">
			<div class="item" v-for="enter in enters" :key="enter.label">
				<image class="img" :src="enter.icon"></image>
				<p class="label">{{ enter.label }}</p>
			</div>
		</div>
	
		<!-- 未添加机构 -->
		<h3 class="title mt70">
			我的课程
			<div class="right" v-if="jigouList.length > 0">
				<span class="tip-word">添加机构<i class="iconfont iconjiantou1"></i></span>
			</div>
		</h3>
		<institutionList :list="jigouList"></institutionList>
	
	
		<h3 class="title">发现</h3>
		<div class="find-banners">
			<image class="banner" src="/static/home/find01.png"></image>
			<image class="banner" src="/static/home/find02.png"></image>
		</div>
	
		<div class="news-list">
			<div class="item" v-for="(item,i) in news" :key="i">
				<div class="value">{{ item.content }}</div>
				<div class="time">{{ item.createTime }}</div>
			</div>
		</div>
	</view>
</template>

<script>
import { mapGetters } from 'vuex'
import institutionList from '@/components/institutionList.vue'
export default {
	components: {
		institutionList
	},
	data() {
		return {
			activeIndex: 0,
			list: ["/static/home/banner01.png",
				"/static/home/banner02.png",
				"/static/home/banner03.png"
			],
			teacherEnters: [{
				label: '上课签到',
				icon: '/static/home/qiandao.png'
			}, {
				label: '我要请假',
				icon: '/static/home/qingjia.png'
			}, {
				label: '课程调整',
				icon: '/static/home/pingjia.png'
			}, {
				label: '试听安排',
				icon: '/static/home/goumai.png'
			}],
			parentEnters: [{
				label: '上课签到',
				icon: '/static/home/qiandao.png'
			}, {
				label: '我要请假',
				icon: '/static/home/qingjia.png'
			}, {
				label: '课程评价',
				icon: '/static/home/pingjia.png'
			}, {
				label: '课程购买',
				icon: '/static/home/goumai.png'
			}],
			jigouList: [{
                icon: '/static/home/logo01.png',
                time: '2019-03-07 周六 14:00',
                place: '追寻艺术培训'
            }, {
                icon: '/static/home/logo01.png',
                time: '2019-03-07 周六 14:00',
                place: '追寻艺术培训'
            }],
			news: [{
				content: '我省3200名贫困新生将获得学习资助',
				createTime: '03-01'
			},{
				content: '我省3200名贫困新生将获得学习资助',
				createTime: '03-01'
			},{
				content: '我省3200名贫困新生将获得学习资助',
				createTime: '03-01'
			},{
				content: '我省3200名贫困新生将获得学习资助',
				createTime: '03-01'
			}]
		}
	},
	computed: {
		...mapGetters(['isTeacher']),
		enters(){
			return this.isTeacher ? this.teacherEnters : this.parentEnters
		}
	},
	methods: {
		swiperChange(e) {
			this.activeIndex = e.mp.detail.current;
			this.$emit("onChange", e.mp.detail.current);
		}
	}
}
</script>

<style lang="less">
page {
	padding-top: 17upx;
	background: #fff;
	padding-bottom: 74upx;
}

.index-container {
	padding: 0 40upx;
	.swiper-banner {
		position: relative;
		width: 100%;
		.banner {
			width: 100%;
			height: 280upx;
			border-radius: 10upx;
			overflow: hidden;
			.slide-image {
				display: block;
				width: 100%;
				height: 100%;
			}
		}
		.dots-warp {
			position: absolute;
			width: 100%;
			height: 42upx;
			text-align: center;
			padding: 0 24upx;
			bottom: -28upx;
			.dot-item {
				display: inline-block;
				width: 15upx;
				height: 10upx;
				border-radius: 5upx;
				opacity: 0.2;
				background-color: #BAEBE1;
				transition: width 0.2s;
				&:not(:last-child) {
					margin-right: 5upx;
				}
				&.active {
					opacity: 1;
					width: 22upx;
					background-color: #1ABC9C;
				}
			}
		}
	}
	.title {
		width: 100%;
		display: flex;
		height: 40upx;
		line-height: 40upx;
		color: #181818;
		font-size: 34upx;
		margin-bottom: 30upx;
		justify-content: space-between;
		.icon {
			display: block;
			width: 30upx;
			height: 40upx;
		}
		.tip-word {
			color: #999;
			font-size: 24upx;
		}
	}
	.enters {
		width: 100%;
		display: flex;
		margin-top: 40upx;
		justify-content: space-between;
		.item {
			width: 120upx;
			.img {
				display: block;
				width: 88upx;
				height: 88upx;
				margin: 0 auto;
			}
			.label {
				color: #333;
				font-size: 24upx;
				line-height: 24upx;
				margin-top: 30upx;
				text-align: center;
			}
		}
	}
	.mt70{
		margin-top: 70upx;
	}
	
	.find-banners {
		width: 100%;
		display: flex;
		flex-wrap: nowrap;
		justify-content: space-between;
		.banner {
			display: block;
			width: 328upx;
			height: 150upx;
			border-radius: 10upx;
		}
	}
	.news-list {
		margin-top: 10upx;
		.item {
			position: relative;
			display: flex;
			width: 100%;
			height: 28upx;
			line-height: 28upx;
			margin-top: 37upx;
			color: #333;
			font-size: 28upx;
			justify-content: space-between;
			&:before {
				position: absolute;
				content: '';
				display: block;
				width: 9upx;
				height: 9upx;
				background: rgba(26, 188, 156, 1);
				left: 10upx;
				top: 10upx;
			}
			.value {
				width: 500upx;
				padding-left: 29upx; 
			}
			.time {
				width: 100upx;
				color: #999;
			}
		}
	}
}
</style>
