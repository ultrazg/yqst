import mainLayoutType from './mainLayoutType';

const initialState = {
    indexData: {
        logo: localStorage.logo || '',
        userPhoto: localStorage.userPhoto || '',
        userAlias: localStorage.userAlias || '',
        company: localStorage.company || '',
        industry: localStorage.industry || '',
        provinceName: localStorage.provinceName || '',
        cityName: localStorage.cityName || '',
        districtName: localStorage.districtName || '',
        companyPhone: localStorage.companyPhone || '',
        companyEmail: localStorage.companyEmail || '',
        departmentName: localStorage.departmentName || '',
        jobName: localStorage.jobName || '',
        phone: localStorage.phone || '',
        userEmail: localStorage.userEmail || '',
        staffId: localStorage.staffId || '',
    },
    allTypeNews: {
        isAwait: true,
        allList: [],
    },
    total: 0,
};

export default function mainLayoutReducers(state = initialState, action) {
    switch (action.type) {
        case mainLayoutType.SET_INDEX_MES:
            return {
                ...state,
                indexData: {
                    ...state.indexData,
                    ...action.data,
                }
            };

        case mainLayoutType.ALL_TYPE_NEWS:
            return {
                ...state,
                allTypeNews: {
                    ...state.allTypeNews,
                    allList: action.data.allList,
                    isAwait: action.data.isAwait,
                }
            };

        case mainLayoutType.ALL_NEWS_TOTAL:
            return {
                ...state,
                total: action.data
            };

        default:
            return state;
    }
}
