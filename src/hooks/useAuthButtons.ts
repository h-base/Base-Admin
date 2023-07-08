import { useRoute } from "vue-router";
import { useAuthStore } from "@/stores/modules/auth";

/**
 * @description 页面按钮权限
 * */
export const useAuthButtons = () => {
	const route = useRoute();
	const authStore = useAuthStore();
	const authButtons = authStore.authButtonListGet || [];

	/**
	 * 按钮权限
	 * @param value 按钮code
	 * @returns boolean
	 */
	const getAuthButton = (value: string) => {
		return authButtons.includes(`${route.name as string}-${value}`);
	};

	return {
		getAuthButton
	};
};
