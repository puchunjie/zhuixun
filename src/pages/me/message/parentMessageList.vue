<template>
	<div class="message-module">
		<div class="item"  v-for="item in messageList" :key="item.messageId">
			<p class="p1">{{item.messageTitle}}</p>
			<p class="p2">{{item.createdTimestamp | dateformat}}</p>
			<p class="p3">{{item.messageContent}}</p>
		</div>
		<p v-if="messageList.length === 0" class="no-message">暂无班级~</p>
	</div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    data() {
        return {
            messageList: []
        }
    },
    computed: {
        ...mapGetters(['userinfo'])
    },
	onLoad() {
		this.getMessageList();
	},
    methods: {
		getMessageList() {
			uni.request({
			    method: 'POST',
			    url: `${this.doMain}/message/list`,
			    header: {
			        'content-type': 'application/x-www-form-urlencoded'
			    },
			    data: { receiverId: this.userinfo.parentId,receiverType:2},
			    success: res => {
			        if (res.data.code === 0) {
			            this.messageList = res.data.data;
			        }else{
						uni.showToast({
							title:res.data.fieldErrors[0].message,
							icon: 'none',
							duration: 1000
						})
					}
			    }
			});
		}
    },
}
</script>

<style lang="less">
@import url('../../../styles/base.less');
page {
	padding: 18upx 20upx 20upx;
	background:#F2F2F2;
}
.message-module {
	.no-message {
	    line-height: 280upx;
	    color: #999;
	    font-size: 26upx;
	    text-align: center;
	}
	.item{
		width: 100%;
		height: auto;
		background-color: #fff;
		border:1upx solid rgba(204,204,204,1);
		border-radius:8upx;
		margin-bottom: 20upx;
		padding:20upx 20upx 20upx 20upx;
		.p1 {
			font-size:32upx;
			line-height:44upx;
			font-weight:bold;
			color:#333333;
		}
		.p2 {
			font-size:24upx;
			line-height:44upx;
			color:#999999;
		}
		.p3 {
			font-size:28upx;
			line-height:42upx;
			font-weight:500;
			color:#333333;
		}
	}
}
/* .message-module {
    margin-top: 30upx;
    min-height: 280upx;
    .no-message {
        line-height: 280upx;
        color: #999;
        font-size: 26upx;
        text-align: center;
    }
    .item {
        width: 100%;
        background: rgba(255,255,255,1);
        border: 1px solid rgba(230, 230, 230, 1);
        border-radius: 8upx;
        margin-top: 20upx;
        .top {
			width: 100%;
			height: 80upx;
			line-height: 80upx;
			font-size: 30upx;
			color: #242039;
			padding: 0 30upx 0 28upx;
			text-indent: 14upx;
			font-weight:bold;
        }
        .person-nums {
            width: 100%;
            height: 80upx;
			line-height: 80upx;
            font-size: 26upx;
            color: rgba(102,102,102,1);
            border-top: 1px solid rgba(229,229,229,1);
            padding: 0 30upx 0 28upx;
            text-indent: 14upx;
			font-weight:500;
        }
    }
} */
		
</style>