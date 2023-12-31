/**
 * v-auth
 * 按钮权限指令
 * @example <div v-auth="button-look">权限</div>
 */
import { useAuthStore } from "@/stores/modules/auth";
import type { Directive, DirectiveBinding } from "vue";

const auth: Directive = {
	mounted(el: HTMLElement, binding: DirectiveBinding) {
		const { value } = binding;
		const authStore = useAuthStore();
		const currentPageRoles = authStore.authButtonListGet ?? [];
		if (value instanceof Array && value.length) {
			const hasPermission = value.every(item => currentPageRoles.includes(`${authStore.routeName}-${item}`));
			if (!hasPermission) el.remove();
		} else {
			if (!currentPageRoles.includes(`${authStore.routeName}-${value}`)) el.remove();
		}
	}
};

export default auth;
