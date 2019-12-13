<template>
    <div class="form-group" :class="required && 'required'">
        <div class="label">{{ title }}</div>
        <div class="value" @click="showPicker">
            <div class="select" :class="{ 'vvv': label!=='' }">{{ pickerValueDefault.length == 0 ? '请选择' : label }}
                <i class="iconfont arrow iconarrow"></i></div>
        </div>
    
        <mpvue-picker v-if="listData.length > 0" ref="mpvuePicker" mode="selector" :pickerValueDefault="pickerValueDefault" :pickerValueArray="listData" @onConfirm="onConfirm">
        </mpvue-picker>
    </div>
</template>

<script>
import mpvuePicker from 'mpvue-picker';
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
        },
        data: {
            type: Array
        },
        ScEnumKey: {
            type: String,
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
			console.info("*"+val)
            this.$emit('input', val[0])
        },
        value: {
            handler: function(val) {
                let item = this.listData.find(item => item.value === val);
                if (item) {
					console.info("**"+item)
                    this.pickerValueDefault = [val];
                    this.label = item.label || '';
                }
            },
            immediate: true
        },
        listData:{
            handler: function(val) {
				console.info("***"+val)
                let item = this.listData.find(item => item.value === val);
                if (item) {
					console.info("****"+item)
                    this.pickerValueDefault = [val];
                    this.label = item.label || '';
                }
            },
            deep: true
        }
    },
    methods: {
        showPicker() {
            if(!this.$refs.mpvuePicker) return
            this.$refs.mpvuePicker.show();
        },
        onConfirm(e) {
            this.$emit('onConfirm', e)
            this.label = e.label;
            this.pickerValueDefault = this.$clearData(e.value);
        }
    }
}
</script>
