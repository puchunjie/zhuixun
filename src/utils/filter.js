import { isDate, isUndefined, isNull } from 'lodash';
import df from 'dateformat-util'
import { ScEnumKeys, ScEnums } from '@/utils/enums';

export const dateformat = (value, formatStr = 'yyyy-MM-dd') => {
    if (!value) return "";
    let d = isDate(value) ? value : new Date(value);
    return df.format(d, formatStr)
};

export const dateformatYMDHM = (value, formatStr = 'yyyy-MM-dd hh:mm') => {
    if (!value) return "";
    let d = isDate(value) ? value : new Date(value*1000);
    return df.format(d, formatStr)
};

export const dateformatYMD = (value, formatStr = 'yyyy-MM-dd') => {
    if (!value) return "";
    let d = isDate(value) ? value : new Date(value*1000);
    return df.format(d, formatStr)
};

export const dateformatHM = (value, formatStr = 'hh:mm') => {
    if (!value) return "";
    let d = isDate(value) ? value : new Date(value*1000);
    return df.format(d, formatStr)
};

export const dateformatWeek = (value) => {
    if (!value) return "";
    let d = isDate(value) ? value : new Date(value*1000);
	return "周" + "日一二三四五六".charAt(d.getDay());
};

export const nowDate = () => {
    let formatStr= 'yyyy-MM-dd';
    let d = new Date();
	return df.format(d, formatStr)
};

export const enumFilter = (value, key) => {
    if (isUndefined(value) || isNull(value)) return "";
    const en = ScEnums[key];
    if (!en) {
        return '';
    }
    const find = en.find((a) => a.value.toString() === value.toString());
    return find ? find.label : '';
}

export const priceFilter = (value) => {
    if (!value) return "0.00";
    value = parseFloat(value/100).toFixed(2);
	return value;
};