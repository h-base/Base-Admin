<template>
	<el-config-provider :locale="zhCn" :size="assemblySize" :button="buttonConfig">
		<router-view></router-view>
	</el-config-provider>
</template>

<script setup lang="ts">
import { reactive, computed } from "vue";
import { useRoute } from "vue-router";
import { LOGIN_URL } from "@/config";
import { useTheme } from "@/hooks/useTheme";
import { useDict } from "@/hooks/useDict";
import { ElConfigProvider } from "element-plus";
import { useGlobalStore } from "@/stores/modules/global";

import zhCn from "element-plus/es/locale/lang/zh-cn";

const route = useRoute();
const globalStore = useGlobalStore();

const { initTheme } = useTheme();
initTheme();

if (route.path !== LOGIN_URL) {
	// 不是登录页面就开始初始化字典
	const { initDict } = useDict();
	initDict();
}

const assemblySize = computed(() => globalStore.assemblySize);

const buttonConfig = reactive({ autoInsertSpace: false });
</script>
