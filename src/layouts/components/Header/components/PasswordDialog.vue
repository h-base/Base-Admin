<template>
	<el-dialog v-model="dialogVisible" title="修改密码" width="800px" draggable>
		<el-form>
			<el-form-item prop="password" label="旧密码">
				<el-input :show-password="true" />
			</el-form-item>
			<el-form-item prop="newpassword" label="新密码">
				<el-input :show-password="true" />
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
import { ref } from "vue";

const dialogVisible = ref(false);
const openDialog = () => {
	dialogVisible.value = true;
};

defineExpose({ openDialog });
</script>
