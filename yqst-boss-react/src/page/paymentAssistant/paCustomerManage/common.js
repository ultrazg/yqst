export const numToString = (num)=>{
    switch (num) {
        case 1:
            return '一'
        case 2:
            return '二'
        case 3:
            return '三'
        case 4:
            return '四'
        case 5:
            return '五'
        case 6:
            return '六'
        case 7:
            return '日'
    }
}

export const getTimeString = (type, params)=>{
    if(type === 'channelBillCycleType'){
        const {channelBillCycleType, channelBillDay, channelBillDate} = params;
        // 1对应周， 2对应月
        if(channelBillCycleType === 1){
            return `每周，星期${numToString(channelBillDay)}`
        }else {
            return `每月，${channelBillDate}号`
        }
    }else {
        const {channelDeductCycleType, channelDeductDay, channelDeductDate} = params;
        // 1对应周， 2对应月
        if(channelDeductCycleType === 1){
            return `每周，星期${numToString(channelDeductDay)}`
        }else {
            return `每月，${channelDeductDate}号`
        }
    }
}