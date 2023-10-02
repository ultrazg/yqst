import mainLayoutType from './mainLayoutType';

export function setIndexMes(data) {
    return {type: mainLayoutType.SET_INDEX_MES, data: data}
}

export function allTypeNews(data) {
    return {type: mainLayoutType.ALL_TYPE_NEWS, data: data}
}

export function allNewsTotal(data) {
    return {type: mainLayoutType.ALL_NEWS_TOTAL, data: data}
}


