<template>
    <div class="form-group" :class="{'required':required,'no-padding':noPadding}">
        <div v-if="selectType" class="select-warp" @click="showPicker">
            <div class="item" :class="'width'+deepLength" v-for="(el,i) in labels" :key="i">
                <div class="value">{{ el }}</div>
            </div>
        </div>
        <block v-else>
            <div class="label">所属区域</div>
            <div class="value" @click="showPicker">
                <div class="select" :class="{ 'vvv': label!=='' }">{{ label || '请选择'  }}<i class="iconfont arrow iconarrow"></i></div>
            </div>
        </block>
    
        <mpvue-picker v-if="cityData.length > 0" ref="mpvuePicker" mode="multiLinkageSelector" :deepLength="deepLength" :pickerValueDefault="pickerValueDefault" :pickerValueArray="cityData" @onConfirm="onConfirm">
        </mpvue-picker>
    </div>
</template>

<script>
import mpvuePicker from 'mpvue-picker';
import { mapGetters } from 'vuex'
export default {
    components: {
        mpvuePicker
    },
    props: {
        deepLength: {
            type: Number,
            default: 3
        },
        selectType: {
            type: Boolean,
            default: false
        },
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
        ...mapGetters(['cityData']),
        labels() {
            let arr = this.deepLength === 3 ? ['省', '市', '区'] : ['省', '市'];
            return this.label === '' ? arr : this.label.split('-')
        }
    },
    watch: {
        pickerValueDefault(val) {
            this.$emit('input', val)
        }
    },
    methods: {
        showPicker() {
            if (this.cityData.length === 0) return
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
}
</script>

<style lang="less">
.select-warp {
    width: 100%;
    height: 112upx;
    padding: 20upx 0;
    display: flex;
    justify-content: space-between;
    .item {
        position: relative;
        height: 72upx;
        text-align: center;
        line-height: 72upx;
        background: #F5F5F5;
        padding: 0 10upx;
        &.width3 {
            width: 30%;
            &:not(:last-child):after {
                display: block;
                content: '-';
                position: absolute;
                color: #ccc;
                right: -20upx;
                top: 0;
                transform: scale(.6);
            }
        }
        &.width2 {
            width: 330upx;
            &:not(:last-child):after {
                display: block;
                content: '-';
                position: absolute;
                color: #ccc;
                right: -34upx;
                top: 0
            }
        }
        .value {
            width: 100%;
            height: 100%;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            color: #999;
            font-size: 28upx;
        }
    }
}
</style>