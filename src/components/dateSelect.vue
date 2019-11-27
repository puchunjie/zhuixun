<template>
    <div class="form-group" :class="required && 'required'">
        <div class="label">{{ title }}</div>
        <div class="value" @click="showPicker">
            <div class="select" :class="{ 'vvv': label!=='' }">
                {{ pickerValueDefault.length == 0 ? '请选择' : label }}
                <i class="iconfont arrow iconarrow"></i></div>
        </div>
    
        <mpvue-picker ref="mpvuePicker" mode="dateSelector" :pickerValueDefault="pickerValueDefault" :pickerValueArray="listData" @onConfirm="onConfirm">
        </mpvue-picker>
    </div>
</template>

<script>
import mpvuePicker from 'mpvue-picker';
import { dateformat } from '@/utils/filter.js';
export default {
    components: {
        mpvuePicker
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
        }
    },
    data() {
        return {
            label: '',
            pickerValueDefault: []
        }
    },
    computed: {
        listData() {
            if (this.ScEnumKey) return this.ScEnums[this.ScEnumKey]
            if (this.data) return this.data
            return []
        }
    },
    watch: {
        pickerValueDefault(val) {
            this.$emit('input', val)
        },
        value: {
            handler: function(val) {
                this.pickerValueDefault = val
            },
            immediate: true
        }
    },
    methods: {
        showPicker() {
            this.$refs.mpvuePicker.show();
        },
        onConfirm(e) {
            let date = dateformat(e.value.join('-'), 'yyyy-MM-dd')
            this.$emit('onConfirm', date)
            this.label = date;
            this.pickerValueDefault = date;
        }
    }
}
</script>