<template>
    <view class='upload-container'>
        <div class="up-load-item" @click="choseImg" v-if="!viewMode">
            <p class="text">更换头像</p>
        </div>
    </view>
</template>

<script>
export default {
    components: {},
    props: {
        viewMode: {
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
        resutImg() {
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
        choseImg() {
            uni.chooseImage({
                count: 1,
                sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
                sourceType: ['album'], //从相册选择
                success: res => {
                    // 上传文件
                    uni.showLoading({ title: '上传中...' });
                    uni.uploadFile({
                        url: `${this.doMain}/evaluation/uploadImg`, //仅为示例，非真实的接口地址
                        filePath: res.tempFilePaths[0],
                        name: 'file',
                        success: (res1) => {
                            let data = JSON.parse(res1.data);
                            if (data.code === 0) {
                                this.imgList.push(res.tempFilePaths[0]);
                                this.fileList.push(data.data)
                                this.$emit('onChange', this.resutImg);
                                uni.showToast({
                                    title: '上传成功'
                                })
                            } else {

                            }
                            uni.hideLoading();
                        }
                    })

                }
            });
        }
    },
    onShow() {}
}
</script>

<style lang='scss'>
.upload-container {
    width: 100%;
    height: auto;
    display: flex;
    flex-wrap: wrap;
    padding: 0 20upx 4upx;
    .up-load-item {
        text-align: right;
        color: #CCCCCC;
        font-size: 26upx;
        width: 100%;
    }
}
</style>