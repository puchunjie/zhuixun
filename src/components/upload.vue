<template>
    <view class='upload-container'>
        <div class="up-load-item" v-for="(img,i) in imgList" :key="i" @click="viewImg(img)">
            <image class="view-img" :src="img"></image>
            <i v-if="!hideDel" class="iconfont iconshanchu del-icon" @click.stop="del(img,i)"></i>
        </div>
        <div class="up-load-item add-div" @click="choseImg" v-if="!viewMode">
            <i class="iconfont iconic_image_upload"></i>
            <p class="text">上传附件</p>
        </div>
    </view>
</template>

<script>
export default{
    components: {},
    props: {
        viewMode: {
            type: Boolean,
            default: false
        },
        hideDel: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            imgList: [],
            fileList: []
        }
    },
    computed: {
        resutImg(){
            return this.fileList.join(',')
        }
    },
    methods: {
        viewImg(img) {
            uni.previewImage({
                current: img, //当前预览的图片
                urls: this.imgList //所有要预览的图片
            })
        },
        del(img,i){
            this.imgList.splice(i,1)
            this.fileList.splice(i,1)
            this.$emit('onChange', this.resutImg);
        },
        choseImg() {
            uni.chooseImage({
                count: 1,
                sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
                sourceType: ['album', 'camera'], //从相册选择，默认两者都有
                success: res => {
                    // 上传文件
                    uni.showLoading({ title: '上传中...' });
                    uni.uploadFile({
                        url: `${this.doMain}/evaluation/uploadImg`, //仅为示例，非真实的接口地址
                        filePath: res.tempFilePaths[0],
                        name: 'file',
                        success: res1 => {
                            uni.hideLoading();
                            let data = JSON.parse(res1.data);
                            if (data.code === 0) {
                                this.imgList.push(res.tempFilePaths[0]);
                                this.fileList.push(data.data)
                                console.log(this.fileList.length);
                                this.$emit('onChange', this.resutImg);
                                uni.showToast({
                                    title: '上传成功'
                                })
                            } else {

                            }
                        }
                    })

                }
            });
        }
    },
    onShow() {}
};
</script>

<style lang='scss'>
.upload-container {
    width: 100%;
    height: auto;
    display: flex;
    flex-wrap: wrap;
    padding: 0 20upx 4upx;
    .up-load-item {
        position: relative;
        width: 140upx;
        height: 140upx;
        border: 2upx dashed rgba(204, 204, 204, 1);
        text-align: center;
        color: #CCCCCC;
        font-size: 26upx;
        margin: 0 30upx 30upx 0;
        .view-img {
            display: block;
            width: 100%;
            height: 100%;
        }
        .iconfont {
            font-size: 50upx;
            color: #BDBEC5;
            margin-top: 24upx;
        }
        .text {
            margin-top: 10upx;
        }

        .del-icon{
            position: absolute;
            color: red;
            font-size: 40upx;
            right: -15upx;
            top: -35upx;
            width: 40upx;
            height: 40upx;
            border-radius: 40upx;
            background: #fff;
        }
    }
}
</style>