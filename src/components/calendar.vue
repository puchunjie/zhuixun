<template>
    <view id="calendar-panel" class="calendar-container">
        <div class="top">
            <view class="calendar-year-month">
               <div class="prve" @click="prve"></div> {{yearMonth}}<div class="next" @click="next"></div>
            </view>
            <view class="calendar-week">
                <view class="calendar-week-item">日</view>
                <view class="calendar-week-item">一</view>
                <view class="calendar-week-item">二</view>
                <view class="calendar-week-item">三</view>
                <view class="calendar-week-item">四</view>
                <view class="calendar-week-item">五</view>
                <view class="calendar-week-item">六</view>
            </view>
        </div>
        <view class="calendar-content">
            <swiper @change="animationfinish" duration="200" :current="currentIdx" circular style="height: 100%">
                <swiper-item class="swiper-item" v-for="(calendar,index) in calendars" :key="index">
                    <view class="calendar-content-week-panel">
                        <view class="calendar-content-week" v-for="(week,key) in calendar.weeks" :key="key">
                            <view class="calendar-content-week-item" :class="{ 'disabled': day.notThisMounth }" v-for="(day,idx) in week" :key="idx">
                                <view class="day" :class="{notSelect:day.isClick?!true:!false,
                                                    active:calendar.selectDay == day.fullDate}" @tap="selectDate(calendar,index,calendar.year,calendar.month+1,day.date,day.isClick)">
                                    {{(day.date < 10) ? '0'+day.date:day.date}} </view>
                                </view>
                            </view>
                        </view>
                </swiper-item>
            </swiper>
            </view>
        </view>
</template>

<script>
import { dateformat } from '@/utils/filter.js'
export default {
    data() {
        //获取当前时间的年月
        let yearMonth = this.getNow(this.date);
        let dateCustom = this.formatCustomDate(this.productCalendar);
        return {
            dates: [],
            currentIdx: 1,
            height: 500,
            calendars: [],
            year: yearMonth.Year,
            month: yearMonth.Month,
            changeDay: yearMonth.Day,
            initDate: `${yearMonth.Year}-${yearMonth.Month}-${yearMonth.Day}`, //初始化的时间
            startDate: '',
            endDate: '',
            dateCustom
        };
    },
    computed: {
        yearMonth() {
            return `${this.year}年${this.month+1<10?'0'+(this.month+1):this.month+1}月`;
        }
    },
    props: {
        // 是否为默认选中时间
        isDefaultClick: {
            type: [Boolean],
            default: true,
        },
        date: {
            type: [String],
            //选择的时间，默认为当前时间
            default: () => {
                let date = new Date();
                return dateformat(date,'yyyy/MM/dd');
            }
        },
        // 时间选择器的标题
        calendarTitle: {
            type: [String],
            default: '时间选择器'

        },
        productCalendar: {
            type: [Array, String],
            default: () => {
                return [];
            }
        },
        //时间选择器类型 date 单时间选择器 dateSolt时间段选择，dateCustom自定义时间(需配合productCalendar 传入参数，类型为Array['2019-12-12','2019-12-13'])
        dateType: {
            type: [String],
            default: 'date'
        },
    },
    created() {
        this.getMonth(1, true);
        // let time = '2019-12-12';
        // console.log(this)
    },
    // #ifdef H5
    mounted() {
        this.getDomHeight();
    },
    // #endif
    // #ifndef H5
    onReady() {
        this.getDomHeight();
    },
    // #endif
    methods: {
        prve(){
            let current = this.currentIdx > 0 ? this.currentIdx - 1 : 2;
            this.currentIdx = current;
            this.year = this.calendars[current].year;
            this.month = this.calendars[current].month;
            this.day = this.calendars[current].selectDay;
            this.getMonth(current);
        },
        next(){
            let current = this.currentIdx < 2 ? this.currentIdx + 1 : 0;
            this.currentIdx = current;
            this.year = this.calendars[current].year;
            this.month = this.calendars[current].month;
            this.day = this.calendars[current].selectDay;
            this.getMonth(current);
        },
        animationfinish(e) {
            let current = e.detail.current;
            this.currentIdx = current;
            this.year = this.calendars[current].year;
            this.month = this.calendars[current].month;
            this.day = this.calendars[current].selectDay;
            this.getMonth(current);
        },
        /**
         * index:滑块id
         * init:是否为初始化
         */
        getMonth(index, init = false) {
            let date = `${this.year}/${this.month+1}/01`;
            let beforeMonth, Month, afterMonth, calendar = [];
            if (index == 1 && init == true) {
                beforeMonth = this.getweek(this.getNow(date, -1));
                Month = this.getweek(this.getNow(date, 0));
                afterMonth = this.getweek(this.getNow(date, 1));
                Month.selectDay = this.date;
                beforeMonth.selectDay = beforeMonth.endDate < this.day ? beforeMonth.endDate : this.day;
                afterMonth.selectDay = afterMonth.endDate < this.day ? afterMonth.endDate : this.day;
                this.calendars.splice(0, 1, beforeMonth);
                this.calendars.splice(1, 1, Month);
                this.calendars.splice(2, 1, afterMonth);
            } else {
                beforeMonth = this.getweek(this.getNow(date, -1));
                afterMonth = this.getweek(this.getNow(date, 1));
                beforeMonth.selectDay = beforeMonth.endDate < this.day ? beforeMonth.endDate : this.day;
                afterMonth.selectDay = afterMonth.endDate < this.day ? afterMonth.endDate : this.day;
            }
            if (index == 0) {
                this.calendars.splice(1, 1, afterMonth);
                this.calendars.splice(2, 1, beforeMonth);
                return;
            }
            if (index == 1) {
                this.calendars.splice(0, 1, beforeMonth);
                this.calendars.splice(2, 1, afterMonth);
                return;
            }
            if (index == 2) {
                this.calendars.splice(0, 1, afterMonth);
                this.calendars.splice(1, 1, beforeMonth);
                return;
            }
        },
        getweek(date) {
            let weeks = [];
            let dates = this.getDates(date);
            let len = Math.ceil(dates.weeks.length / 7) -1;
            for (let i = 0; i < len; i++) {
                weeks.push(dates.weeks.slice(i * 7, 7 + (i * 7)));
            }
            dates.weeks = weeks
            return dates;
        },
        getDates(date) {
            let dates = {
                year: date.Year,
                month: date.Month,
                firstDay: new Date(date.Year, date.Month, 1).getDay(),
                lastDay: new Date(date.Year, date.Month + 1, 0).getDay(),
                endDate: new Date(date.Year, date.Month + 1, 0).getDate(),
                weeks: []
            }
            //计算上月日期
            for (let i = dates.firstDay; i > 0; i--) {
                let dateinfo = {};
                dateinfo.date = new Date(date.Year, date.Month, -i + 1).getDate();
                dateinfo.fullDate = date.Year + '/' + date.Month + '/' + dateinfo.date;
                dateinfo.isClick = false;
                dateinfo.notThisMounth = true;
                dates.weeks.push(dateinfo);
            }
            //计算本月日期
            for (let i = 1; i <= new Date(date.Year, date.Month + 1, 0).getDate(); i++) {
                let nowisClick = true;
                let dateinfo = {};
                dateinfo.date = i;
                dateinfo.fullDate = date.Year + '/' + (date.Month + 1) + '/' + i;
                if (this.dateType == 'dateCustom') {
                    nowisClick = false;
                    if (this.dateCustom[dates.year] && this.dateCustom[dates.year][dates.month]) {
                        for (let j = 0; j < this.dateCustom[dates.year][dates.month].length; j++) {
                            if (this.dateCustom[dates.year][dates.month][j] == i) {
                                nowisClick = true;
                            }
                        }
                    }
                }
                dateinfo.isClick = nowisClick;
                dates.weeks.push(dateinfo);
            }
            //计算下月日期
            let len = 7 - dates.lastDay;
            if ((42 - dates.weeks.length) >= 7) {
                len += 7;
            }
            for (let i = 1; i < len; i++) {
                let dateinfo = {};
                dateinfo.date = i;
                dateinfo.fullDate = date.Year + '/' + (date.Month + 1) + '/' + i;
                dateinfo.isClick = false;
                dateinfo.notThisMounth = true;
                dates.weeks.push(dateinfo);
            }
            return dates;

        },
        getNow(date, addEndMonth = 0) {
            let _date = !date ? new Date() : new Date(date);
            _date.setMonth(_date.getMonth() + addEndMonth);
            let Year = _date.getFullYear();
            let Month = _date.getMonth();
            let Day = _date.getDate();
            let Week = _date.getDay();
            return {
                Year,
                Month,
                Day
            }
        },
        formatCustomDate(customDate) {
            let date = {};
            for (let i = 0; i < customDate.length; i++) {
                let dateArr = (customDate[i]).split('-');
                let year = parseInt(dateArr[0]);
                let month = parseInt(dateArr[1]) - 1;
                let day = parseInt(dateArr[2]);
                if (!date[year]) {
                    date[year] = {};
                }
                if (!date[year][month]) {
                    date[year][month] = [];
                }
                date[year][month].push(day);
            }
            return date;
        },
        getDomHeight() {
            let view = uni.createSelectorQuery().select('.calendar-content-week-panel');
            view.fields({ size: true }, data => {
                if (!data) return
                this.height = data.height;
            }).exec();
        },
        selectDate(calendar,index,year, month, date, isClick) {
            if (!isClick) return;
            this.calendars[index].selectDay = year + '/' + month + '/' + date;
            // console.log(this.calendars[index])
            this.$emit('selected', {
                fullDate: `${year}-${month}-${date}`
            });
        }
    }
}
</script>



<style lang="less">
@import url('../styles/base.less');
.calendar-container {
    height: 570upx;
    background: #fff;
    border: 1px solid rgba(230, 230, 230, 1);
    box-shadow: 0px 10upx 9upx 1px rgba(61, 189, 164, 0.15);
    border-radius: 8upx;
    overflow: hidden;
    .top {
        width: 100%;
        background-color: @dark_green;
        padding: 20upx 0 30upx;
        color: #fff;
        .calendar-year-month {
            display: flex;
            width: 643upx;
            height: 50upx;
            line-height: 50upx;
            margin: 0 auto;
            text-align: center;
            background-color: rgba(255, 255, 255, .15);
            border-radius: 25upx;
            font-size: 28upx;
            justify-content: space-between;

            .prve,.next{
                position: relative;
                width: 80upx;
                height: 100%;
                &:before{
                    position: absolute;
                    content: '';
                    width: 0; 
                    height: 0;
                }
            }

            .prve:before{
                border-width: 11upx;
                border-style: solid;
                border-color: transparent #fff transparent transparent;
                right: 40upx;
                top: 14upx;
            }

            .next:before{
                border-width: 11upx;
                border-style: solid;
                border-color: transparent transparent transparent #fff;
                left: 40upx;
                top: 14upx;
            }
        }
        .calendar-week {
            width: 100%;
            display: flex;
            flex-wrap: nowrap;
            font-size: 20upx;
            color: #fff;
            margin-top: 33upx;
            justify-content: space-around;
            .calendar-week-item {
                text-align: center;
            }
        }
    }
    .calendar-content {
        position: relative;
        width: 100%;
        height: 417upx;
        overflow: hidden;
        padding-top: 28upx;
        .swiper-item {
            width: 100%;
            height: 100%;
        }
        .calendar-content-week {
            display: flex;
            justify-content: space-around;
            margin-bottom: 28upx;
            .calendar-content-week-item {
                width: 52upx;
                height: 52upx;
                font-size: 30upx;
                color: #333;
                border-radius: 50%;
                text-align: center;
                line-height: 52upx;
                overflow: hidden;
                &.disabled .day{
                    color: #B3B3B3!important;
                    background: none!important;
                }

                .day.active{
                    background: rgba(11, 145, 134, 1);
                    color: #fff;
                }
            }
        }
    }
}
</style>