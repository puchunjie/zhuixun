<template>
	<view class="index-container">
		<h3 class="title">
			<label v-if="shop != null">
				{{shopName}}
			</label>
			<label v-if="city != null && city !=''">
				({{cityName}})
			</label>
			<div class="right">
				<image class="icon"  @tap="openToMessage" src="/static/home/message.png"></image>
			</div>
		</h3>
		<div class="swiper-banner">
			<swiper class="banner" autoplay @change="swiperChange">
				<swiper-item v-for="(img, index) in advertisementList" :key="index" @click="openToAd(img.advertisementId)">
					<image :src="img.adImg" class="slide-image" mode="scaleToFill" />
				</swiper-item>
			</swiper>
			<div class="dots-warp">
				<span class="dot-item" :class="{ 'active': activeIndex === e }" v-for="e in advertisementList.length" :key="e"></span>
			</div>
		</div>
		
		<div class="enters" v-if="teacherShopId != '' || isTeacher==false">
			<div class="item" v-for="enter in enters" :key="enter.label" @click="openToPage" :data-url="enter.url">
				<image class="img" :src="enter.icon"></image>
				<p class="label">{{ enter.label }}</p>
			</div>
		</div>
	
		<!-- 老师 -->
		<div v-if="isTeacher && teacherShopId == ''">
			<h3 class="title mt70">
				加入机构
				<div class="right">
					<span class="tip-word" @click="openToAddInstTeacher">加入机构<i class="iconfont iconjiantou1"></i></span>
				</div>
			</h3>
			<!-- <div class="empty" v-if="teacherShopId == ''">
			     <image class="add-icon" src="/static/home/add.png"></image>请添加机构
			 </div> -->
		</div>
		<!-- 家长 -->
		<div   v-if="isTeacher == false">
			<h3 class="title mt70">
				我的课程
				<div class="right">
					<span class="tip-word" @click="openToAddInst">加入机构<i class="iconfont iconjiantou1"></i></span>
				</div>
			</h3>
			<institutionList :list="lessonList"></institutionList>
		</div>
	
		<h3 class="title">发现</h3>
		<div class="find-banners">
			<image class="banner" src="/static/home/find01.png"></image>
			<image class="banner" src="/static/home/find02.png"></image>
		</div>
	
		<div class="news-list">
			<div class="item" v-for="(item,i) in articleList" :key="i"  data-articleId="item.articleId">
				<div class="value" >{{ item.articleName }}</div>
				<div class="time">{{ item.createdTimestamp | dateformatYMD}}</div>
			</div>
		</div>
	</view>
</template>

<script>
import { mapGetters } from 'vuex'
import institutionList from '@/components/institutionList.vue'
import { mapActions } from 'vuex'
export default {
	components: {
		institutionList
	},
	data() {
		return {
			activeIndex: 0,
			advertisementList: [],
			teacherEnters: [{
				label: '上课签到',
				icon: '/static/home/qiandao.png',
				url:'../curriculum/index'
			}, {
				label: '我要请假',
				icon: '/static/home/qingjia.png',
				url:'../me/leave/teacher'
			}, /* TODO{
				label: '课程调整',
				icon: '/static/home/pingjia.png',
				url:''
			},*/ {
				label: '试听安排',
				icon: '/static/home/goumai.png',
				url:'../me/audition'
			}],
			parentEnters: [{
				label: '上课签到',
				icon: '/static/home/qiandao.png',
				url:'../me/sign/student'
			}, {
				label: '我要请假',
				icon: '/static/home/qingjia.png',
				url:'../me/leave/student'
			}, {
				label: '课程评价',
				icon: '/static/home/pingjia.png',
				url:'../me/evaluate/chooseCourse'
			}, {
				label: '课程购买',
				icon: '/static/home/goumai.png',
				url:'../me/course/buyCourseForParent'
			}],
			lessonList: [],
			/* lessonList: [{
                icon: '/static/home/logo01.png',
                time: '2019-03-07 周六 14:00',
                place: '追寻艺术培训'
            }, {
                icon: '/static/home/logo01.png',
                time: '2019-03-07 周六 14:00',
                place: '追寻艺术培训'
            }], */
			articleList: [], 
			shop:'',
			city:'',
			advertisementList:[],
			unReadMessNum:0,
			teacherShopId:'',
			shopName:'',
			cityName:'',
			isJoinShop:0,
			
		}
	},
	computed: {
		...mapGetters(['isTeacher']),
		...mapGetters(['userinfo']),
		enters(){
			return this.isTeacher ? this.teacherEnters : this.parentEnters
		}
	},
	onShow() {
		/*this.setUserInfo({parentId:4,shopId:6});
		this.setTeacher(false);*/
		if(this.isTeacher){
			this.getTeacherIndexInfo();
		}else{
			this.getParentIndexInfo();
		}
	},
	methods: {
		...mapActions(['setUserInfo', 'setTeacher']),
		swiperChange(e) {
			this.activeIndex = e.mp.detail.current;
			this.$emit("onChange", e.mp.detail.current);
		},
		openToMessage(){
			uni.navigateTo({
				url: '../message/list'
			});
		},
		getTeacherIndexInfo(){
			uni.request({
				method: 'POST',
				url: `${this.doMain}/teacher/index`,
				header: {
					'content-type': 'application/x-www-form-urlencoded'
				},
				data: {"teacherId":this.userinfo.teacherId},
				success: res => {
					if (res.data.code === 0) {
						var resData = res.data.data;
						this.shop = resData.shop;
						if(this.shop != null){
							this.shopName = this.shop.shopName;
						}
						this.articleList = resData.articleList;
						this.city = resData.city;
						if(this.city != null){
							this.cityName = this.city.cityName;
						}
						this.advertisementList = resData.advertisementList;
						if(this.advertisementList != null && this.advertisementList.length > 0){
							for (let i = 0; i < this.advertisementList.length; i++) {
								this.advertisementList[i].adImg = this.imgUrl+this.advertisementList[i].adImg ;
							}
						}
						this.unReadMessNum = resData.unReadMessNum;
						this.teacherShopId = this.userinfo.shopId;
					}else{
						uni.showToast({
							title:res.data.fieldErrors[0].message,
							icon: 'none',
							duration: 1000
						})
					}
				}
			})
		},
		getParentIndexInfo(){
			uni.request({
				method: 'POST',
				url: `${this.doMain}/parent/index`,
				header: {
					'content-type': 'application/x-www-form-urlencoded'
				},
				data: {"parentId":this.userinfo.parentId},
				success: res => {
					if (res.data.code === 0) {
						var resData = res.data.data;
						this.articleList = resData.articleList;
						/*this.advertisementList = resData.advertisementList;
						if(this.advertisementList != null && this.advertisementList.length > 0){
							for (let i = 0; i < this.advertisementList.length; i++) {
								this.advertisementList[i].adImg = this.imgUrl+this.advertisementList[i].adImg ;
							}
						}*/
						this.advertisementList = [{adImg:'../../static/ad/ad_1.jpg'}];
						this.lessonList = resData.lessonList;
						if(this.lessonList != null && this.lessonList.length > 0){
							for (let i = 0; i < this.lessonList.length; i++) {
								this.lessonList[i].icon = this.imgUrl+this.lessonList[i].logoPic;
								this.lessonList[i].place =this.lessonList[i].shopName;
								this.lessonList[i].time =this.lessonList[i].startTime;
								this.lessonList[i].week =this.lessonList[i].week;
							}
						}
						this.unReadMessNum = resData.unReadMessNum;
						this.isJoinShop = resData.isJoinShop;
					}else{
						uni.showToast({
							title:res.data.fieldErrors[0].message,
							icon: 'none',
							duration: 1000
						})
					}
				}
			})
		},
		openToPage(e){
			let url = e.currentTarget.dataset.url;
			if(url == '../curriculum/index'){
				uni.switchTab({//跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面
				    url: url
				})
			}else{
				uni.navigateTo({//跳转到 非tabBar 页面
					url: url
				});
			}
		},
		openToAddInst(){
			uni.navigateTo({
				url: '../me/institution/enterInstForSearchParent'
			});
		},
		openToAddInstTeacher(){
			uni.navigateTo({
				url: '../me/institution/enterInstForSearchTeacher'
			});
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
					margin-right: 10upx;
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
		margin-top: 30upx;
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
				overflow: hidden;
			}
			.time {
				width: 200upx;
				color: #999;
				text-align: right;

			}
		}
	}
}
</style>
