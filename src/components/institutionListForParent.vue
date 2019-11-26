<template>
    <div class="jigou-list-container">
        <!-- <div class="empty" v-if="list.length === 0">
            <image class="add-icon" src="/static/home/add.png"></image>请添加机构
        </div> -->
    
        <div class="item" v-for="(item,i) in list" :key="i">
            <image class="icon" mode="aspectFill" :src="item.logoPic"></image>
            <div class="info">
                <h3 class="time" >{{item.shopName}}</h3>
                <div class="place">
                    <i class="place-icon iconfont icontouzijigou00"></i> 已经学习{{ item.learnNum }}
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
}
</script>

<style lang="less">
    @import url('../styles/institutionslIst.less');
</style>