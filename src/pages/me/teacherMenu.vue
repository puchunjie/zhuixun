<template>
    <div class="menu-panel">
        <div class="menu-item" v-for="(menu,i) in menus" :key="i" @tap="openToPath(menu.path)">
            <i class="iconfont icon" :class="menu.icon" :style="{color: menu.color}"></i>
            <p class="label">{{ menu.label }}</p>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            menus: [{
                icon: 'iconjiachang_shangkeqiandao',
                label: '上课签到',
                color: '#80d5f1',
                path: ''
            }, {
                icon: 'iconjiachang_woyaoqingjia',
                label: '我要请假',
                color: '#6dc829',
                path: '/pages/me/leave/teacher'
            }, {
                icon: 'iconlaoshi_jiachangliebiao',
                label: '家长列表',
                color: '#EC8873',
                path: '/pages/me/parent/parentList'
            }, {
                icon: 'iconjiachang_goukeqingdan',
                label: '试听排课',
                color: '#55D0F8',
                path: ''
            }, {
                icon: 'iconico',
                label: '签约购课',
                color: '#5BDBB4',
                path: ''
            }, {
                icon: 'iconlaoshi_banjiguanli',
                label: '班级管理',
                color: '#6dc829',
                path: '/pages/me/course/classList'
            }, {
                icon: 'iconjiachang_kechengpingjia',
                label: '学员评价',
                color: '#5bdbb4',
                path: '/pages/me/evaluate/chooseCourse'
            }, {
                icon: 'iconlaoshi_xufeitixing',
                label: '续费提醒',
                color: '#6dc829',
                path: ''
            }]
        }
    },
	methods: {
		openToPath(url){
			console.info(url);
			uni.navigateTo({
				url: url
			});
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
</style>