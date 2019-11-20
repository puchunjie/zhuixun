<template>
    <div>
        <zxTabs :options="tabs" large></zxTabs>
    </div>
</template>

<script>
import zxTabs from '@/components/tabs.vue'
export default {
    components: { zxTabs },
    data() {
        return {
            tabs: [{
                    label: '批量签到',
                    value: 1
                },
                {
                    label: '扫码签到',
                    value: 2
                }
            ]
        }
    },
}
</script>

<style lang="less">

</style>