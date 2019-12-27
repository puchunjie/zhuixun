<template>
    <div class="form-group" :class="required && 'required'">
        <div class="label">{{ title }}</div>
        <div class="value">
            <div class="select" :class="{ 'vvv': inValue !=='' }">
                <ruiDatePicker class="test" :start="start" :end="end" :fields="fields" :value="inValue" @change="bindChange">
                    {{ inValue == '' ? '请选择' : inValue }}
                    <i class="iconfont arrow iconarrow"></i>
                </ruiDatePicker>
            </div>
        </div>    
    </div>
</template>

<script>
import ruiDatePicker from '@/components/rattenking-dtpicker/rattenking-dtpicker.vue';
import { dateformat } from '@/utils/filter.js';
export default {
    components: {
        ruiDatePicker
    },
    props: {
        required: {
            type: Boolean,
            default: false
        },
        title: {
            type: String,
            default: ''
        },
        value: {
            type: [String, Number],
            default: ''
        },
        // year	String	选择器粒度为年
        // month	String	选择器粒度为月份
        // day	String	选择器粒度为天
        // hour	String	选择器粒度为小时
        // minute	String	选择器粒度为分钟
        // second	String	选择器粒度为秒
        fields: {
            type: String,
            default: 'day'
        }
    },
    data() {
        return {
            start: '',
            end: '',
            inValue: ''
        }
    },
    watch: {
        fields: {
            handler: function(val) {
                switch (val){
				case 'year':
                  this.start = '1900';
                  this.end = '2500';
				  break;
				case 'month':
				  this.start = '1900-00';
                  this.end = '2500-12';
				  break;
				case 'day':
				  this.start = '1900-00-00';
                  this.end = '2500-12-31';
				  break;
				case 'hour':
				  this.start = '1900-00-00 00';
                  this.end = '2500-12-31 23';
				  break;
				case 'minute':
				  this.start = '1900-00-00 00:00';
                  this.end = '2500-12-31 23:59';
				  break;
				case 'second':
				  this.start = '1900-00-00 00:00:00';
                  this.end = '2500-12-31 23:59:59';
				  break;
				default: 
				  this.start = '1900-00-00 00:00:00';
                  this.end = '2500-12-31 23:59:59';
				  break;
			  }
            },
            immediate: true
        },
        inValue(val) {
            this.$emit('input', val)
        },
        value: {
            handler: function(val) {
                this.inValue = val
            },
            immediate: true
        }
    },
    methods: {
        bindChange(e){
            this.inValue = e;
			this.$emit('bindChange', e)
        }
    }
}
</script>