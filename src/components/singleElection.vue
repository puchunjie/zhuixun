<template>
    <div class="form-group" :class="required && 'required'">
        <div class="label">{{ title }}</div>
        <div class="value" @click="showPicker">
            <div class="select" :class="{ 'vvv': label!=='' }">{{ pickerValueDefault.length == 0 ? '请选择' : label }}<i class="iconfont arrow icondibudaohanglan"></i></div>
        </div>
    
        <mpvue-picker v-if="listData.length > 0" ref="mpvuePicker" mode="selector" :pickerValueDefault="pickerValueDefault" :pickerValueArray="listData" @onConfirm="onConfirm">
        </mpvue-picker>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import mpvuePicker from 'mpvue-picker';
export default Vue.extend({
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
            if(this.ScEnumKey) return this.ScEnums[this.ScEnumKey]
            if(this.data) return this.data
            return []
        }
    },
    watch: {
        pickerValueDefault(val) {
            this.$emit('input', val[0])
        }
    },
    methods: {
        showPicker() {
            this.$refs.mpvuePicker.show();
        },
        onConfirm(e) {
            this.$emit('onConfirm',e)
            this.label = e.label;
            this.pickerValueDefault = this.$clearData(e.value);
        }
    },
    created() {
        if (this.value) this.pickerValueDefault = [this.value];
    }

})
</script>

<style lang="scss">

</style>