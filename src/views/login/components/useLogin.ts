import { ref, reactive, onMounted } from "vue";
import { useRouter } from "vue-router";
import { HOME_URL } from "@/config";
import { getTimeState } from "@/utils";
import { ElNotification } from "element-plus";
import { loginAdminAuth } from "@/api/modules/auth";
import { useAuthStore } from "@/stores/modules/auth";
import { useTabsStore } from "@/stores/modules/tabs";
import { useKeepAliveStore } from "@/stores/modules/keepAlive";
import { initDynamicRouter } from "@/routers/modules/dynamicRouter";

import { ElForm } from "element-plus";
type FormInstance = InstanceType<typeof ElForm>;

export const useLogin = () => {
	const router = useRouter();
	const authStore = useAuthStore();
	const tabsStore = useTabsStore();
	const keepAliveStore = useKeepAliveStore();

	const loginFormRef = ref<FormInstance>();
	const loginRules = reactive({
		userName: [{ required: true, message: "请输入用户名", trigger: "blur" }],
		password: [{ required: true, message: "请输入密码", trigger: "blur" }]
	});

	const loading = ref(false);
	const loginForm = reactive<Auth.LoginParams>({
		userName: "admin",
		password: "123456"
	});

	// login
	const handleLogin = () => {
		loginFormRef.value?.validate(async valid => {
			if (!valid) return;
			loading.value = true;
			try {
				// 1.执行登录接口
				const { data } = await loginAdminAuth({ ...loginForm });
				authStore.setToken(data.access_token);
				// 获取用户信息
				authStore.getUserInfo();

				// 2.添加动态路由
				await initDynamicRouter();

				// 3.清空 tabs、keepAlive 数据
				tabsStore.closeMultipleTab();
				keepAliveStore.setKeepAliveName();

				// 4.跳转到首页
				router.push(HOME_URL);
				ElNotification({
					title: getTimeState(),
					message: "欢迎登录 Base Admin",
					type: "success",
					duration: 3000
				});
			} finally {
				loading.value = false;
			}
		});
	};

	// resetForm
	const resetForm = () => {
		loginFormRef.value?.resetFields();
	};

	onMounted(() => {
		// 监听 enter 事件（调用登录）
		document.onkeydown = (e: KeyboardEvent) => {
			e = (window.event as KeyboardEvent) || e;
			if (e.code === "Enter" || e.code === "enter" || e.code === "NumpadEnter") {
				if (loading.value) return;
				handleLogin();
			}
		};
	});

	return {
		loginFormRef,
		loginForm,
		loginRules,
		loading,
		resetForm,
		handleLogin
	};
};
