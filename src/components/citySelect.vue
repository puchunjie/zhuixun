<template>
    <div class="form-group" :class="{'required':required,'no-padding':noPadding}">
        <slot>
            <div class="label">所属区域</div>
            <div class="value" @click="showPicker">
                <div class="select" :class="{ 'vvv': label!=='' }">{{ pickerValueDefault.length == 0 ? '请选择' : label }}<i class="iconfont arrow icondibudaohanglan"></i></div>
            </div>
        </slot>
    
        <mpvue-picker v-if="cityData.length > 0" ref="mpvuePicker" mode="multiLinkageSelector" :deepLength="3" :pickerValueDefault="pickerValueDefault" :pickerValueArray="cityData" @onConfirm="onConfirm">
        </mpvue-picker>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import mpvuePicker from 'mpvue-picker';
import { mapGetters } from 'vuex'
export default Vue.extend({
    components: {
        mpvuePicker
    },
    props: {
        required: {
            type: Boolean,
            default: false
        },
        noPadding: {
            type: Boolean,
            default: false
        },
        value: {
            type: Array,
            default: function() {
                return []
            }
        }
    },
    data() {
        return {
            label: '',
            pickerValueDefault: []
        }
    },
    computed: {
        ...mapGetters(['cityData'])
    },
    watch: {
        pickerValueDefault(val) {
            this.$emit('input', val)
        }
    },
    methods: {
        showPicker() {
            this.$refs.mpvuePicker.show();
        },
        onConfirm(e) {
            this.$emit('onConfirm', e)
            this.label = e.label;
            this.pickerValueDefault = this.$clearData(e.value);
        }
    },
    created() {
        if (this.value) this.pickerValueDefault = this.value;
    }

})
</script>

<style lang="scss">

</style>