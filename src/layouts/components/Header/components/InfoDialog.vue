<template>
	<el-dialog v-model="dialogVisible" title="个人信息" width="800px" draggable>
		<el-form label-width="100">
			<el-form-item label="头像">
				<el-avatar :size="40" :src="userInfo.avatar" fit="fill" />
			</el-form-item>
			<el-form-item label="登录名">
				{{ userInfo.name }}
			</el-form-item>
		</el-form>
		<template #footer>
			<span class="dialog-footer">
				<el-button @click="dialogVisible = false">取消</el-button>
				<el-button type="primary" @click="dialogVisible = false">确认</el-button>
			</span>
		</template>
	</el-dialog>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useAuthStore } from "@/stores/modules/auth";

const authStore = useAuthStore();
const userInfo = computed(() => authStore.userInfoGet);
const dialogVisible = ref(false);
const openDialog = () => {
	dialogVisible.value = true;
};

defineExpose({ openDialog });
</script>
