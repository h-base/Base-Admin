import http from "@/api";

export const getRoleAdminList = (params?: SystemRole.RoleListParams) => {
	return http.get<API.PageResponse<SystemRole.RoleProps>>(`/admin/role/list`, params);
};

export const getRoleAdminDetail = (id: string) => {
	return http.get<API.Response<SystemRole.RoleProps>>(`/admin/role/detail/${id}`);
};

export const saveRoleAdmin = (params?: SystemRole.RoleProps) => {
	return http.post<API.Response<SystemRole.RoleProps>>(`/admin/role/save`, params);
};

export const updateRoleAdmin = (params?: SystemRole.RoleProps) => {
	return http.put<API.Response<SystemRole.RoleProps>>(`/admin/role/update`, params);
};

export const deleteRoleAdmin = (params?: SystemRole.RoleDeleteRequest) => {
	return http.delete<API.Response<boolean>>(`/admin/role/delete`, params);
};
