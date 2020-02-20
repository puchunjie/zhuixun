<template>
    <div class="sd-registration-container">
        <zxTabs :options="tabs" large @tabChange="tabChange"></zxTabs>
    
        <div class="content" v-if="active === 1">
            <div class="sd-item" :class="{ 'check': item.check }" v-for="(item,i) in list" :key="i" @click="check(item)">
                <i v-if="item.state === 0" class="iconfont iconxuanze" :class="{ 'check': item.check }"></i> {{ item.studentName }}
                <span v-if="item.isSign === 1" class="tip">已签到</span>
				<span v-if="item.state === 2" class="tip">已请假</span>
				<span v-if="item.state === 3" class="tip">已旷课</span>
            </div>
    
            <div class="fix-btottom">
                <div class="select-all sd-item b" @click="setAllCheck">
                    <i class="iconfont iconxuanze" :class="{ 'check': checkAll }"></i> {{ checkAll ? '取消全选' : '全选' }}
                </div>
                <div class="btn" @click="signForBatch">提交</div>
            </div>
        </div>
    
        <div class="content" v-if="active === 2">
            <div class="erweima-warp">
                <image style='width:200upx;height: 200upx;' src="../../static/sao.png" @click="saoma"></image>
            </div>
            <p class="tip-word">{{tipword}}</p>
        </div>
    
    
    </div>
</template>

<script>
import zxTabs from '@/components/tabs.vue'
import tkiQrcode from 'tki-qrcode/components/tki-qrcode/tki-qrcode.vue'
export default {
    components: { zxTabs, tkiQrcode },
    data() {
        return {
            tabs: [{
                    label: '批量签到',
                    value: 1
                } ,
                {
                    label: '扫码签到',
                    value: 2
                }
            ],
            active: 1,
            list: [],
			lessonId:0,
			studentIds:'',
			studentId:0,
			tipword:''
        }
    },
    computed: {
        checkAll() {
            return this.list.filter(item => item.state === 0).every(item => item.check)
        }
    },
    methods: {
        tabChange(tab) {
            this.active = tab.value;
        },
        check(item) {
            if (item.state != 0) return
            item.check = !item.check;
			this.studentIds += item.studentId+",";
        },
        setAllCheck() {
            let checkAll = this.checkAll;
			console.info(checkAll);
            this.list.forEach(item => {
                item.check = !checkAll;
            })
			console.info(this.list);
        },
        getList() {
			uni.request({
			    method: 'POST',
			    url: `${this.doMain}/course/lessonStudent/list`,
			    header: {
			        'content-type': 'application/x-www-form-urlencoded'
			    },
			    data: { lessonId: this.lessonId},
			    success: res => {
					console.info(res.data);
			        if (res.data.code === 0) {
			            let list = res.data.data;
						if(list != null && list.length > 0){
							this.list = list.map(item => {
							    item.check = false;
							    return item
							})
						}
			        }else{
						uni.showToast({
							title:res.data.fieldErrors[0].message,
							icon: 'none',
							duration: 1000
						})
					}
			    }
			});
            
        },
		signForBatch(){			  
			let studentIds = '';
			this.list.forEach(item => {
				if(item.check && item.state === 0){
					studentIds += item.studentId+",";
				}
			})
			if(studentIds == ''){
				uni.showToast({
					title:'请选择学生',
					icon: 'none',
					duration: 1000
				})
				return;
			}
	
			uni.request({
			    method: 'POST',
			    url: `${this.doMain}/course/student/qianDaoBatch`,
			    header: {
			        'content-type': 'application/x-www-form-urlencoded'
			    },
			    data: { lessonId: this.lessonId , studentIds: studentIds},
			    success: res => {
					console.info(res.data);
			        if (res.data.code === 0) {
			            uni.showToast({
			            	title:'签到成功',
			            	icon: 'none',
			            	duration: 1000
			            })
						this.isSign = 1;
			        }else{
						uni.showToast({
							title:res.data.fieldErrors[0].message,
							icon: 'none',
							duration: 1000
						})
					}
					this.getList()
			    }
			});
		},
		signForSingel(){
			uni.showLoading({ title: '处理中' });
			uni.request({
			    method: 'POST',
			    url: `${this.doMain}/course/student/qianDao`,
			    header: {
			        'content-type': 'application/x-www-form-urlencoded'
			    },
			    data: { lessonId: this.lessonId , studentId: this.studentId},
			    success: res => {
					uni.hideLoading();
					if (res.data.code === 0) {
						this.tipword = res.data.data.studentName + ':签到成功';
			        }else{
						this.tipword = res.data.fieldErrors[0].message;
					}
			    }
			});
		},
		saoma(){
			uni.scanCode({
				scanType:['qrCode'],
				success:  res => {
					let result = res.result; // 当needResult 为 1 时，扫码返回的结果
					if(result !=null && result !=''){
						let index = result.lastIndexOf("\/");  
						let studentIdStr  = result .substring(index + 1, result.length);
						if(studentIdStr !=null && studentIdStr !=''){
							this.studentId = studentIdStr;
							this.signForSingel();
						}else{
							uni.showToast({
								title:'扫描结果错误',
								icon: 'none',
								duration: 1000
							})
						}
					}
				}
			});
		}
    },
    created() {
        this.getList()
    }, 
	onLoad(e) {
		this.lessonId = e.lessonId;
	},
	onShow(){
		this.getList()
	}
	
}
</script>

<style lang="less">
@import url('../../styles/base.less');
.sd-registration-container {
    .content {
        margin-top: 20upx;
        width: 100%;
        background-color: #fff;
        overflow: hidden;
        .sd-item {
            position: relative;
            width: 100%;
            height: 106upx;
            line-height: 106upx;
            padding: 0 40upx 0 90upx;
            color: @gray_black;
            font-size: 30upx;
            .iconfont {
                position: absolute;
                color: #ccc;
                font-size: 36upx;
                margin-right: 18upx;
                left: 40upx;
            }
            &:not(:last-child) {
                border-bottom: 1px solid @line_gray;
            }
            .tip {
                position: absolute;
                right: 40upx;
                color: @light_gray;
            }
            &.check .iconfont {
                color: @base_green;
            }
            &.b {
                border-bottom: 1px solid @line_gray;
            }
        }
        .erweima-warp {
            width: 670upx;
            height: 350upx;
            padding: 60upx 0;
            border-radius: 8upx;
            border: 1px solid #ccc;
            margin: 113upx auto 10upx;
            text-align: center;
        }
        .tip-word {
            font-size: 28upx;
            color: #333;
            text-align: center;
            line-height: 56upx;
            margin-bottom: 50upx;
        }
    }
    .fix-btottom {
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        background: #fff;
        .btn {
            width: 711upx;
            height: 99upx;
            background: rgba(29, 92, 84, 1);
            margin: 17upx auto;
            text-align: center;
            color: #fff;
            line-height: 99upx;
            font-size: 34upx;
        }
		.sd-item {
		    .check{
		        color: green;
		    }
		}
    }
}
</style>