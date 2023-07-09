<template>
	<div class="a-radio">
		<el-radio-group v-bind="attrs" v-model="selectValue">
			<template v-for="item in selectOptions" :key="(item.value as string)">
				<el-radio v-bind="item" :label="item.value">
					{{ item.label }}
				</el-radio>
			</template>
		</el-radio-group>
	</div>
</template>

<script setup lang="ts" name="ARadio">
import { ref, watch, computed } from "vue";
import type { RadioGroupProps, RadioProps } from "element-plus";

export type ARadioProps = {
	modelValue: RadioGroupProps["modelValue"];
	attrs?: {
		[P in keyof Omit<RadioGroupProps, "modelValue">]?: Omit<RadioGroupProps, "modelValue">[P];
	};
	options?: ({
		[P in keyof RadioProps]?: RadioProps[P];
	} & { value: RadioProps["label"] })[];
	remoteMethod?: () => Promise<ARadioProps["options"]>;
};

interface ARadioEmits {
	(e: "update:modelValue", value: RadioGroupProps["modelValue"]): void;
}

// 接受父组件参数
const props = withDefaults(defineProps<ARadioProps>(), {
	size: undefined,
	disabled: undefined,
	fill: undefined,
	textColor: undefined,
	modelValue: undefined,
	options: undefined,
	remoteMethod: undefined
});

const emits = defineEmits<ARadioEmits>();

const selectOptions = ref<ARadioProps["options"]>([]);

const getRadioOptions = async () => {
	selectOptions.value = (await props.remoteMethod?.()) ?? [];
};

const selectValue = computed({
	get: () => props.modelValue,
	set: val => emits("update:modelValue", val)
});

watch(
	() => props.remoteMethod,
	val => {
		if (val) {
			getRadioOptions();
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
