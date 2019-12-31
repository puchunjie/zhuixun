<template>
    <div class="jigou-list-container">
        <div class="item" v-for="(item,i) in list" :key="i" @click="toCourse">
            <image class="icon" mode="aspectFill" :src="item.icon"></image>
            <div class="info">
                <h3 class="time">{{ item.time | dateformatYMD}} {{ item.week }}  {{ item.time | dateformatHM}}</h3>
                <div class="place">
                    <i class="place-icon iconfont icontouzijigou00"></i> {{ item.place }}
                </div>
    
                <image class="arrow" src="/static/home/jiantou.png"></image>
            </div>
        </div>
    </div>
</template>

<script>
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
	methods:{
		toCourse(){
			uni.switchTab({
				url: '/pages/curriculum/index'
			})
		}
	}
}
</script>

<style lang="less">
    @import url('../styles/institutionslIst.less');
</style>