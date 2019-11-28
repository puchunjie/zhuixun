<template>
    <div class="switch-container">
        <div class="item" v-for="(item,i) in list" :key="i">
            <div class="head">
                <image class="logo-img" :src="item.logoPic"></image>
                <div class="name">{{ item.shopName }}</div>
                <image src="/static/home/jiantou.png" class="arrow"></image>
            </div>
            <div class="action-btns">
                <div class="btn" @click="quitShop" :data-shopid="item.shopId">退出机构</div>
                <div v-if="item.shopId == userinfo.shopId"  class="btn green">当前机构</div>
                <div v-else class="btn" @click="changeShop" :data-shopid="item.shopId">切换机构</div>
            </div>
        </div>

        <div class="submit-btn large" @click="openToEnterInst">+加入机构</div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { mapActions } from 'vuex'
export default {
    data() {
        return {
            list: []
        }
    },
	computed: {
        ...mapGetters(['isTeacher']),
		...mapGetters(['userinfo']),
    },
	onShow() {
		this.getShopList();
	}, 
	methods:{
		openToEnterInst(){
			uni.navigateTo({
				url: '../../me/institution/enterInstForSearch'
			});
		},
		getShopList(){
			uni.request({
				method: 'POST',
				url: `${this.doMain}/shop/teacher/listShop`,
				header: {
					'content-type': 'application/x-www-form-urlencoded'
				},
				data: {"teacherId":this.userinfo.teacherId},
				success: res => {
					console.info(res);
					if (res.data.code === 0) {
						this.list = res.data.data;
						if(this.list != null && this.list.length > 0){
							for (let i = 0; i < this.list.length; i++) {
								this.list[i].logoPic = this.imgUrl+this.list[i].logoPic ;
							}
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
		quitShop(e){
			var shopId = e.currentTarget.dataset.shopid;
			console.info(shopId+","+this.userinfo.teacherId);
			uni.request({
				method: 'POST',
				url: `${this.doMain}/shop/teacher/leaveShop`,
				header: {
					'content-type': 'application/x-www-form-urlencoded'
				},
				data: {"teacherId":this.userinfo.teacherId, "shopId":shopId},
				success: res => {
					console.info(res);
					if (res.data.code === 0) {
						uni.showToast({
							title:"退出机构成功！",
							icon: 'success',
							duration: 1000
						});	
						this.getShopList();
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
		changeShop(e){
			var shopId = e.currentTarget.dataset.shopid;
			uni.request({
				method: 'POST',
				url: `${this.doMain}/shop/teacher/changeShop`,
				header: {
					'content-type': 'application/x-www-form-urlencoded'
				},
				data: {"teacherId":this.userinfo.teacherId, "shopId":shopId},
				success: res => {
					console.info(res);
					if (res.data.code === 0) {
						uni.showToast({
							title:"切换机构成功！",
							icon: 'success',
							duration: 1000
						});
						//切换机构成功后，需要将userinfo中的shopId修改成当前的
						var teacher = this.userinfo;
						teacher.shopId = shopId;
						this.setUserInfo(teacher);
						this.getShopList();
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
page {
    padding: 20upx 40upx 0;
    background: #fff;
}

.switch-container {
    width: 100%;

    .item{
        width: 100%;
        border-radius: 8upx;
        overflow: hidden;
        border: 1px solid #ccc;
        margin-bottom: 20upx;

        .head{
            position: relative;
            width: 100%;
            height: 130upx;
            line-height: 70upx;
            display: flex;
            padding: 30upx 20upx;
            .logo-img{
                display: block;
                width: 70upx;
                height: 70upx;
                margin-right: 20upx;
                border-radius: 50upx;
            }

            .name{
                font-size: 32upx;
                color: #222;
            }

            .arrow{
                display: block;
                width: 28upx;
                height: 32upx;
                position: absolute;
                right: 20upx;
                top: 50upx;
            }
        }

        .action-btns{
            width: 100%;
            border-top: 1px solid #ccc;
            display: flex;
            height: 73upx;
            line-height: 73upx;
            text-align: center;
            font-size: 28upx;
            color: @gray_black;
            .btn{
                width: 50%;
                height: 100%;
                &:not(:last-child){
                    border-right: 1px solid #ccc;
                }

                &.green{
                    color: @base_green;
                }
            }
        }
    }
}
</style>