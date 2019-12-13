<script>
import { mapActions } from 'vuex'
export default {
	methods: {
		...mapActions(['setCityData']),
		getCitys() {
			uni.request({
				method: 'POST',
				url: `${this.doMain}/shop/getLocation`,
				header: {
					'content-type': 'application/x-www-form-urlencoded'
				},
				success: (res) => {
					if (res.data.code === 0) {
						this.setCityData(res.data.data)
					}
				}
			});
		}
	},
	async created() {
		this.getCitys();
	}
}
</script>

<style lang="less">
@import url('./styles/common.less');
</style>
