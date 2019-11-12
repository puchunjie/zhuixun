import { isDate, isUndefined, isNull } from 'lodash';
import df from 'dateformat-util'
import { ScEnumKeys, ScEnums } from '@/utils/enums';


export const dateformat = (value, formatStr = 'yyyy-MM-dd hh:mm') => {
    if (!value) return "";
    let d = isDate(value) ? value : new Date(value);
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