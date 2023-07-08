<template>
	<div class="a-select">
		<el-select v-bind="attrs" v-model="selectValue">
			<el-option v-for="item in selectOptions" :key="item.value" :label="item.label" :value="item.value" />
		</el-select>
	</div>
</template>

<script setup lang="ts" name="ASelect">
import { ref, watch, computed } from "vue";
import type { ISelectProps } from "element-plus";

export type ASelectProps = {
	modelValue: ISelectProps["modelValue"];
	attrs?: {
		[P in keyof Omit<ISelectProps, "modelValue">]?: Omit<ISelectProps, "modelValue">[P];
	};
	options?: {
		label: string;
		value: any;
		disabeld?: boolean;
	}[];
};

interface ASelectEmits {
	(e: "update:modelValue", value: string): void;
}

// 接受父组件参数
const props = withDefaults(defineProps<ASelectProps>(), {
	modelValue: "",
	options: undefined
});

const emits = defineEmits<ASelectEmits>();

const selectOptions = ref<ASelectProps["options"]>([]);

const getSelectOptions = async () => {
	selectOptions.value = (await props?.attrs?.remoteMethod?.()) ?? [];
};

const selectValue = computed({
	get: () => props.modelValue,
	set: val => emits("update:modelValue", val)
});

watch(
	() => props?.attrs?.remoteMethod,
	val => {
		if (val) {
			getSelectOptions();
		} else {
			selectOptions.value = props.options ?? [];
		}
	},
	{
		immediate: true,
		deep: true
	}
);
</script>

<style scoped lang="scss">
.a-select {
	width: 100%;
	:deep(.el-select) {
		width: 100%;
	}
}
</style>
