import clone from 'lodash/clone';
import isFunction from 'lodash/isFunction';
import isEqual from 'lodash/isEqual';

/**
 * @return {boolean}
 */
export default function Comparison(value, other) {
    let newValue = clone(value);
    let newOther = clone(other);
    for (let i in newValue) {
        if (isFunction(newValue[i])) {
            delete newValue[i]
        }
    }
    for (let i in newOther) {
        if (isFunction(newOther[i])) {
            delete newOther[i]
        }
    }
    return isEqual(newValue, newOther)
}
