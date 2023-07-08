import http from "@/api";

/**
 * @name 文件上传模块
 */
// 图片上传
export const uploadImg = (params: FormData) => {
	return http.post<API.Response<Upload.Response>>(`/admin/upload/img`, params);
};

// 视频上传
export const uploadVideo = (params: FormData) => {
	return http.post<API.Response<Upload.Response>>(`/admin/upload/video`, params);
};
