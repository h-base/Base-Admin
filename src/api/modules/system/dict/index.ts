import http from "@/api";

export const getDictAdminList = (params?: SystemDict.DictListParams) => {
	return http.get<API.PageResponse<SystemDict.DictProps>>(`/admin/dict/list`, params);
};

export const getDictAdminDetail = (id: string) => {
	return http.get<API.Response<SystemDict.DictProps>>(`/admin/dict/detail/${id}`);
};

export const saveDictAdmin = (params?: SystemDict.DictProps) => {
	return http.post<API.Response<SystemDict.DictProps>>(`/admin/dict/save`, params);
};

export const updateDictAdmin = (params?: SystemDict.DictProps) => {
	return http.put<API.Response<SystemDict.DictProps>>(`/admin/dict/update`, params);
};

export const deleteDictAdmin = (params?: SystemDict.DictDeleteRequest) => {
	return http.delete<API.Response<boolean>>(`/admin/dict/delete`, params);
};
