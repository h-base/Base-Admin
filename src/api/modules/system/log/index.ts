import http from "@/api";

export const getLogAdminList = (params?: SystemLog.LogListParams) => {
	return http.get<API.PageResponse<SystemLog.LogListProps>>(`/admin/log/list`, params);
};

export const getLogAdminDetail = (id: string) => {
	return http.get<API.Response<SystemLog.LogProps>>(`/admin/log/detail/${id}`);
};

export const deleteLogAdmin = (params?: SystemLog.LogDeleteRequest) => {
	return http.delete<API.Response<boolean>>(`/admin/log/delete`, params);
};
