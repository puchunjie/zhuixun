<script lang="ts">
	import Vue from 'vue';
	import { mapActions } from 'vuex'
	export default Vue.extend({
		mpType: 'app',
		globalData: {
			text: 'text'
		},
		methods:{
			...mapActions(['setCityData']),
			getCitys() {
				uni.request({
					method: 'POST',
					url: `${this.doMain}/location/getLocationV2`,
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					success: res => {
						if (res.data.code === 0) {
							console.info("城市"+res.data.data)
							this.setCityData(res.data.data)
						}
					}
				});
			}
		},
		async created() {
			this.getCitys();
		}
	})
</script>

<style lang="less">
@import url('./styles/common.less');
</style>
