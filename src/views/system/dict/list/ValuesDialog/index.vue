<template>
	<el-button type="primary" icon="FullScreen" size="small" @click="handleLook">查看</el-button>

	<el-dialog v-model="isShow" title="字典值列表" width="80vw" :append-to-body="true">
		<main v-loading="loading">
			<ProTable ref="proTableRef" v-bind="proTableAttrs" />
		</main>
	</el-dialog>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useShow } from "@/hooks/useShow";
import { useTable } from "./useTable";

interface ValuesDialogProps {
	info: {
		id?: string;
		name: string;
		code: string;
		remarks?: string;
		list: { name: string; code: string; remarks?: string }[];
		status: boolean;
	};
}

const props = withDefaults(defineProps<ValuesDialogProps>(), {
	info: () => ({} as ValuesDialogProps["info"])
});

const loading = ref(false);
const { isShow, openShow } = useShow();
const { proTableRef, proTableAttrs } = useTable();

const handleLook = () => {
	getInfo();
	openShow();
};

const getInfo = async () => {
	proTableAttrs.value.data = [];
	loading.value = true;

	proTableAttrs.value.data = props.info.list ?? [];
	loading.value = false;
};
</script>
