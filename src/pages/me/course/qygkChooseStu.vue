<template>
    <div class="user-info">
        <div class="form-div">
            <singleElection title="家长" v-model="parentId" @onConfirm="getStuList" :data="parentArray"></singleElection>
			<singleElection title="学生" v-model="studentId" :data="studentArray" @onConfirm="getStudentId"></singleElection>
		</div>
    
        <div class="submit-btn-fixed" @click="submit">+签约购课</div>
    </div>
</template>

<script>
import singleElection from '@/components/singleElection.vue'
import { mapGetters } from 'vuex'
export default {
   components: {singleElection},
	data() {
	    return {
			parentId: 0,
			studentId:0,
			parentList:[],
			studentList:[],
			parentArray:[],
			studentArray:[]
	    }
	},
	computed: {
	    ...mapGetters(['isTeacher']),
		...mapGetters(['userinfo']),
	},
	methods:{
		onShow() {
			this.getParentList();
		},
		getParentList(){
			uni.request({
			    method: 'POST',
			    url: `${this.doMain}/parent/listParent`,
			    header: {
			        'content-type': 'application/x-www-form-urlencoded'
			    },
			    data: {teacherId:this.userinfo.teacherId},
			    success: res => {
			        if (res.data.code === 0) {
						this.parentList = res.data.data;
						if(this.parentList != null && this.parentList.length > 0){
							for (var i = 0; i < this.parentList.length; i++) {
								let item = {value:this.parentList[i].parentId,label:this.parentList[i].realName};
								this.parentArray.push(item);
							}
							console.info(this.parentArray);
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
		getStuList(data){
			this.parentId = data.value;
			if(this.parentId == 0){
				uni.showToast({
					title:"请选择家长",
					icon: 'none',
					duration: 1000
				})
				return;
			}
			uni.request({
			    method: 'POST',
			    url: `${this.doMain}/parent/listStudentForParent`,
			    header: {
			        'content-type': 'application/x-www-form-urlencoded'
			    },
			    data: {parentId:this.parentId},
			    success: res => {
			        if (res.data.code === 0) {
						this.studentList = res.data.data;
						for (var i = 0; i < this.studentList.length; i++) {
							let item = {value:this.studentList[i].studentId,label:this.studentList[i].studentName};
							this.studentArray.push(item); 
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
		getStudentId(data){
			this.studentId = data.value;
		},
		submit(){
			if(this.parentId == 0){
				uni.showToast({
					title:"请选择家长",
					icon: 'none',
					duration: 1000
				})
				return;
			}
			if(this.studentId == 0){
				uni.showToast({
					title:"请选择学生",
					icon: 'none',
					duration: 1000
				})
				return;
			}
			uni.navigateTo({
				 url: '../../me/course/qygkChooseClass?studentId='+this.studentId
			});
		}
	}
}
</script>

<style lang="less">
@import url('../../../styles/base.less');
.user-info {
    padding-bottom: 150upx;
    .log-sp{
        height: 155upx;
        line-height: 155upx;
        padding: 24upx 40upx;
    }
    .logo-img{
        display: block;
        width: 106upx;
        height: 106upx;
        border-radius: 106upx;
    }
}
</style>