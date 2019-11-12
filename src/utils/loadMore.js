export default {
    data() {
        return {
            list: [],
            pageNo: 1,
            pageSize: 10,
            totalPage: 1
        }
    },
    computed: {
        canNext() {
            return this.pageNo < this.totalPage
        },
        loadText(){
            return this.canNext ? '加载中...' : '已经到底啦'
        },
        pageInfo(){
            return {
                pageSize: this.pageSize,
                pageNo: this.pageNo
            }
        }
    },
    methods: {
        async loadMore() {
            console.warn("loadMore 应该由子类实现")
        },
        async refreshList() {
            console.warn("refreshList 应该由子类实现")
        },
    },
    async onReachBottom() {
        if (!this.canNext) {
            wx.showToast({
                title: '已经到底啦',
                icon: 'none',
                duration: 2000
            })
            return
        }

        console.log(" PullTrait loadMore");
        try {
            this.pageNo++;
            await this.loadMore();
        } catch (e) {
        }
    },
    async onPullDownRefresh() {
        this.pageNo = 1;
        console.log("refreshList");
        try {
            await this.refreshList();
        } catch (e) {
        }
        setTimeout(() => {
            wx.stopPullDownRefresh()
        }, 100);
    }
}
