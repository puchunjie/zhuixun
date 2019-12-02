<template>
    <div class="menu-panel">
        <div class="menu-item" v-for="(menu,i) in menus" :key="i" @click="openToPage" :data-url="menu.path">
            <i class="iconfont icon" :class="menu.icon" :style="{color: menu.color}"></i>
            <p class="label">{{ menu.label }}</p>
        </div>
		<button open-type="contact" class="menu-item" style="background:#FFFFFF">
		    <i class="iconfont icon iconkefutouxiang" style="#0a9186"></i>
		    <p class="label">客服帮助</p>
		</button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            menus: [{
                icon: 'iconjiachang_kechengpingjia',
                label: '课程评价',
                color: '#5bdbb4',
                path: '../me/evaluate/chooseCourse'
            }, {
                icon: 'iconjiachang_goukeqingdan',
                label: '购课清单',
                color: '#ec8872',
                path: '../me/course/buyClassList'
            }, {
                icon: 'iconjiachang_xitongtongzhi',
                label: '系统通知',
                color: '#ec8872',
                path: '../me/message/parentMessageList'
            },{
                icon: 'iconjiachang_shangkeqiandao',
                label: '上课签到',
                color: '#80d5f1',
                path: ''
            }, {
                icon: 'iconjiachang_shangkelishi',
                label: '上课历史',
                color: '#ec8872',
                path: '../me/course/learnedLessonList'
            }, {
                icon: 'iconjiachang_woyaoqingjia',
                label: '我要请假',
                color: '#6dc829',
                path: '../me/leave/student'
            }, {
                icon: 'iconico',
                label: '课程购买',
                color: '#6EC828',
                path: ''
            }]
        }
    },
	methods:{
		openToPage(e){
			let url = e.currentTarget.dataset.url;
			if(url == '../curriculum/index'){
				uni.switchTab({//跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面
				    url: url
				})
			}else if(url == 'kefu'){
				this.$emit('kefu').click();
			}else{
				uni.navigateTo({//跳转到 非tabBar 页面
					url: url
				});
			}
		}
	}
}
</script>

<style lang="less">
@import url('../../styles/base.less');
.menu-panel {
    width: 100%;
    background: #fff;
    display: flex;
    flex-wrap: wrap;
    margin-top: 20upx;
    .menu-item {
        width: 25%;
        text-align: center;
        padding: 28upx 0 50upx 0;
        .icon {
            font-size: 50upx;
        }
        .label {
            font-size: 24upx;
            color: @gray_black;
            margin-top: 36upx;
        }
    }
}
.kefu{
	display:none
}
button::after{ border: none; }
button{
	position: relative;
	display: block;
	margin-left: auto;
	margin-right: auto;
	padding-left: 14upx;
	padding-right: 14upx;
	box-sizing: border-box;
	font-size: 18upx;
	text-align: center;
	text-decoration: none;
	line-height: 38upx;
	border-radius: 5upx;
	-webkit-tap-highlight-color: transparent;
	overflow: hidden;
	color: #000;
	background-color: #f8f8f8;

}
</style>