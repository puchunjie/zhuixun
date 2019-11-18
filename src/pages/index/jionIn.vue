<template>
    <div class="join-container">
        <div class="warp">
            <i class="iconfont iconico"></i>
            <p>扫一扫</p>
        </div>
        <div class="warp">
            <i class="iconfont iconsousuo"></i>
            <p>搜一搜</p>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="less">
page{
    background: #fff;
}
.join-container {
    padding: 40upx;
    .warp {
        width: 100%;
        height: 330upx;
        background: rgba(255, 255, 255, 1);
        border: 1px solid rgba(204, 204, 204, 1);
        border-radius: 8upx;
        margin-top: 40upx;
        text-align: center;
        padding: 60upx;
        font-size: 30upx;
        .iconfont{
            font-size: 140upx;
            color: #999;
        }
    }
}
</style>