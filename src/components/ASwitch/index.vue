<template>
	<div class="a-switch">
		<el-switch v-bind="attrs" v-model="selectValue" :before-change="handleBeforeChange" />
	</div>
</template>

<script setup lang="ts" name="ASwitch">
import { computed } from "vue";
import type { SwitchProps } from "element-plus";

export type ASwitchProps = {
	modelValue: SwitchProps["modelValue"];
	/** 接口的信息 */
	http: {
		/** 接口 */
		api: ((params?: any) => Promise<boolean>) | null;
		/** key 默认id */
		id?: string;
		/** params */
		params?: { [key: string]: any };
	};
	attrs?: {
		[P in keyof Omit<SwitchProps, "modelValue">]?: Omit<SwitchProps, "modelValue">[P];
	};
};

interface ASwitchEmits {
	(e: "update:modelValue", value: ASwitchProps["modelValue"]): void;
}

// 接受父组件参数
const props = withDefaults(defineProps<ASwitchProps>(), {
	modelValue: undefined,
	attrs: () => ({}),
	http: () => ({
		api: null
	})
});

const emits = defineEmits<ASwitchEmits>();

const selectValue = computed({
	get: () => props.modelValue,
	set: val => emits("update:modelValue", val)
});

const handleBeforeChange: SwitchProps["beforeChange"] = () => {
	if (props.http?.api) {
		const params = {
			...props.http.params,
			[props.http.id ?? "id"]: !selectValue.value
		};
		props.http.api(params).then(() => {
			selectValue.value = !selectValue.value;
		});
	}
	return false;
};
</script>
