<template>
	<div class="icon-box">
		<el-input ref="inputRef" v-model="valueIcon" v-bind="attrs" @clear="clearIcon" @click="openDialog">
			<template #prepend>
				<el-button :icon="customIcons[modelValue]" />
			</template>
		</el-input>
		<el-dialog v-model="dialogVisible" :title="title" top="50px" width="66%">
			<el-input v-model="inputValue" placeholder="搜索图标" size="large" :prefix-icon="Icons.Search" />
			<el-scrollbar v-if="Object.keys(iconsList).length">
				<div class="icon-list">
					<div v-for="item in iconsList" :key="item" class="icon-item" @click="selectIcon(item)">
						<component :is="item"></component>
						<span>{{ item.name }}</span>
					</div>
				</div>
			</el-scrollbar>
			<el-empty v-else description="未搜索到您要找的图标~" />
		</el-dialog>
	</div>
</template>

<script setup lang="ts" name="ASelectIcon">
import { ref, computed } from "vue";
import * as Icons from "@element-plus/icons-vue";
import type { InputProps } from "element-plus";

export interface ASelectIconProps {
	modelValue: string;
	attrs?: {
		[P in keyof Omit<InputProps, "modelValue">]?: Omit<InputProps, "modelValue">[P];
	};
	title?: string;
}

const props = withDefaults(defineProps<ASelectIconProps>(), {
	modelValue: "",
	title: "请选择图标"
});

// 重新接收一下，防止打包后 clearable 报错
const valueIcon = ref(props.modelValue);

// open Dialog
const dialogVisible = ref(false);
const openDialog = () => (dialogVisible.value = true);

const emit = defineEmits(["update:modelValue"]);

// 选择图标
const selectIcon = (item: any) => {
	dialogVisible.value = false;
	valueIcon.value = item.name;
	emit("update:modelValue", item.name);
	setTimeout(() => inputRef.value.blur(), 0);
};

// 清空图标
const inputRef = ref();
const clearIcon = () => {
	valueIcon.value = "";
	emit("update:modelValue", "");
	setTimeout(() => inputRef.value.blur(), 0);
};

// 监听搜索框值
const inputValue = ref("");
const customIcons: { [key: string]: any } = Icons;
const iconsList = computed((): { [key: string]: any } => {
	if (!inputValue.value) return Icons;
	let result: { [key: string]: any } = {};
	for (const key in customIcons) {
		if (key.toLowerCase().indexOf(inputValue.value.toLowerCase()) > -1) result[key] = customIcons[key];
	}
	return result;
});
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
