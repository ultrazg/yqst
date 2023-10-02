import BTBEnterpriseWalletType from './BTBEnterpriseWalletType';

export function saveCompanyInfo(data) {
    return {type: BTBEnterpriseWalletType.SAVE_COMPANY_INFO, data: data}
}



