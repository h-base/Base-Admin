import http from "@/api";

export const getMenuAdminList = (params?: SystemMenu.MenuListParams) => {
	return http.get<API.PageResponse<SystemMenu.MenuProps>>(`/admin/menu/list`, params);
};

export const getMenuAdminTree = (params?: SystemMenu.MenuListParams) => {
	return http.get<API.ListResponse<SystemMenu.MenuProps>>(`/admin/menu/tree`, params);
};

export const getMenuAdminDetail = (id: string) => {
	return http.get<API.Response<SystemMenu.MenuProps>>(`/admin/menu/detail/${id}`);
};

export const saveMenuAdmin = (params?: SystemMenu.MenuProps) => {
	return http.post<API.Response<SystemMenu.MenuProps>>(`/admin/menu/save`, params);
};

export const updateMenuAdmin = (params?: SystemMenu.MenuProps) => {
	return http.put<API.Response<SystemMenu.MenuProps>>(`/admin/menu/update`, params);
};

export const deleteMenuAdmin = (params?: SystemMenu.MenuDeleteRequest) => {
	return http.delete<API.Response<boolean>>(`/admin/menu/delete`, params);
};
