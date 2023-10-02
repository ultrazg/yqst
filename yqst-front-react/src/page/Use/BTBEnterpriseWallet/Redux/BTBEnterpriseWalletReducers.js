import BTBEnterpriseWalletType from './BTBEnterpriseWalletType';

const initialState = {
    companyInfo: {},
};

export default function BTBEnterpriseWalletReducers(state = initialState, action) {
    switch (action.type) {
        case BTBEnterpriseWalletType.SAVE_COMPANY_INFO:
            return {
                ...state,
                companyInfo: {
                    ...action.data,
                }
            };

        default:
            return state;
    }
}
