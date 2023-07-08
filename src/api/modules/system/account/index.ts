import http from "@/api";

export const getAccountAdminList = (params?: SystemAccount.AccountListParams) => {
	return http.get<API.PageResponse<SystemAccount.AccountListProps>>(`/admin/account/list`, params);
};

export const getAccountAdminDetail = (id: string) => {
	return http.get<API.Response<SystemAccount.AccountProps>>(`/admin/account/detail/${id}`);
};

export const saveAccountAdmin = (params?: SystemAccount.AccountProps) => {
	return http.post<API.Response<SystemAccount.AccountProps>>(`/admin/account/save`, params);
};

export const updateAccountAdmin = (params?: SystemAccount.AccountProps) => {
	return http.put<API.Response<SystemAccount.AccountProps>>(`/admin/account/update`, params);
};

export const deleteAccountAdmin = (params?: SystemAccount.AccountDeleteRequest) => {
	return http.delete<API.Response<boolean>>(`/admin/account/delete`, params);
};
