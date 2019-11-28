<template>
    <div class="audition-container">
        <div class="search-div">
            <div class="search-warp">
                <div class="box">
                    <i class="isearch iconfont iconsousuo"></i>
                    <input type="text" v-model="shopName" placeholder="查询机构">
                </div>
                <div @click="searchShop">搜索</div>
            </div>
    
            <div class="su-list">
                <div class="st-item" :class="{ 'active': item.shopId==currentshopId }" @click="chooseShop" :data-shopid="item.shopId" v-for="(item,i) in shopList" :key="i">
                    <p>{{item.shopName}}</p>
                    <p>地址：{{item.districtFullName}}</p>
                    <i class="icheck iconfont iconxuanzejiaobiao"></i>
                </div>
            </div>
        </div>
    
    
        <div class="submit-btn-fixed" @click="submitEnter">提交加入机构申请</div>
    
    </div>
</template>

<script>
import singleElection from '~/singleElection.vue'
import dateSelect from '~/dateSelect.vue'
import { mapGetters } from 'vuex'
export default {
    components: { dateSelect, singleElection },
    data() {
        return {
            shopList: [],
            currentshopId: 0,
			shopName:''
        }
    },
	computed: {
        ...mapGetters(['isTeacher']),
		...mapGetters(['userinfo']),
    },
    methods: {
        check(item, i) {
            item.check = !item.check;
        },
		searchShop(){
			if(this.shopName == ''){
				uni.showToast({
					title:"请输入搜索内容！",
					icon: 'success',
					duration: 1000
				});
				return;
			} 
			uni.request({
				method: 'POST',
				url: `${this.doMain}/shop/search`,
				header: {
					'content-type': 'application/x-www-form-urlencoded'
				},
				data: {"contentLike":this.shopName},
				success: res => {
					console.info(res);
					if (res.data.code === 0) {
						if(res.data.data == null || res.data.data.length == 0){
							uni.showToast({
								title:"未搜索到任何机构！",
								icon: 'success',
								duration: 1000
							});
						}else{
							this.shopList = res.data.data;
						}
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
		chooseShop(e){
			this.currentshopId = e.currentTarget.dataset.shopid;
		},
		submitEnter(){
			if(this.currentshopId == 0){
				uni.showToast({
					title:"请选择机构！",
					icon: 'success',
					duration: 1000
				});
				return;
			} 
			uni.request({
				method: 'POST',
				url: `${this.doMain}/shop/teacher/joinShop`,
				header: {
					'content-type': 'application/x-www-form-urlencoded'
				},
				data: {"shopId":this.currentshopId,"teacherId":this.userinfo.teacherId},
				success: res => {
					console.info(res);
					if (res.data.code === 0) {
						if(res.data.data == null || res.data.data.length == 0){
							uni.showToast({
								title:"申请成功！",
								icon: 'success',
								duration: 1000
							});
						}else{
							this.shopList = res.data.data;
						}
					}else{
						uni.showToast({
							title:res.data.fieldErrors[0].message,
							icon: 'none',
							duration: 1000
						})
					}
				}
			})
		}
    }
}
</script>

<style lang="less">
@import url('../../../styles/base.less');
.audition-container {
    padding-bottom: 150upx;
    .class-div {
        margin-top: 20upx;
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
        .time-title {
            width: 710upx;
            margin: 0 auto;
            height: 100upx;
            line-height: 100upx;
            color: @base_black;
            font-size: 30upx;
            padding: 0 20upx;
            background: #fff;
            border-bottom: 1px solid #ccc;
        }
        .class-list {
            width: 710upx;
            margin: 0 auto;
            background-color: #fff;
            min-height: 100upx;
            padding: 0 20upx;
            .empty {
                color: @base_black;
                font-size: 30upx;
                height: 100upx;
                line-height: 100upx;
            }
        }
    }
    .search-div {
        width: 100%;
        margin-top: 20upx;
        background: #fff;
        padding: 20upx 40upx;
        .search-warp {
            width: 100%;
            height: 100upx;
            margin-top: 20upx;
            display: flex;
            justify-content: space-between;
            line-height: 100upx;
            .box {
                position: relative;
                width: 590upx;
                height: 100upx;
                border: 1px solid #ccc;
                border-radius: 8upx;
                padding: 30upx 30upx 30upx 87upx;
                font-size: 30upx;
                input {
                    display: block;
                    width: 100%;
                    height: 100%;
                    line-height: 100upx;
                    font-size: 30upx;
                    margin: 0;
                    padding: 0;
                    outline: 0;
                    border: 0;
                }
                .isearch {
                    position: absolute;
                    font-size: 40upx;
                    color: #999;
                    left: 30upx;
                    top: 0;
                }
            }
        }
    }
    .su-list {
        .st-item {
            position: relative;
            width: 100%;
            margin-top: 20upx;
            background: rgba(255, 255, 255, 1);
            border: 1px solid rgba(204, 204, 204, 1);
            border-radius: 4px;
            padding: 27upx 20upx;
            font-size: 26upx;
            overflow: hidden;

            p {
                height: 44upx;
                line-height: 44upx;
            }
            .icheck {
                position: absolute;
                display: none;
                font-size: 80upx;
                color: @dark_green;
            }
            &.active {
                color: @dark_green;
                border-color: @dark_green;
                .icheck {
                    display: inline-block;
                    right: -2upx;
                    bottom: -2upx;
                }
            }
        }
    }
}
</style>