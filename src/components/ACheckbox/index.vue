<template>
	<div class="a-checkbox">
		<template v-if="showCheckAll">
			<el-checkbox v-model="checkAll" :indeterminate="isIndeterminate" @change="handleCheckAllChange">
				全选
			</el-checkbox>
		</template>
		<el-checkbox-group v-bind="attrs" v-model="selectValue">
			<template v-for="item in selectOptions" :key="(item.value as string)">
				<el-checkbox :label="isValueObject ? item : item.value">
					{{ item.label }}
				</el-checkbox>
			</template>
		</el-checkbox-group>
	</div>
</template>

<script setup lang="ts" name="ACheckbox">
import { ref, watch, computed } from "vue";
import type { CheckboxGroupProps, CheckboxProps, CheckboxValueType } from "element-plus";

export type ACheckboxProps = {
	modelValue: CheckboxGroupProps["modelValue"];
	attrs?: {
		[P in keyof Omit<CheckboxGroupProps, "modelValue">]?: Omit<CheckboxGroupProps, "modelValue">[P];
	};
	/** 选中的value为对象 */
	isValueObject?: boolean;
	/** 显示全选 */
	showCheckAll?: boolean;
	options?: ({
		[P in keyof CheckboxProps]?: CheckboxProps[P];
	} & { value: string | number })[];
	remoteMethod?: () => Promise<ACheckboxProps["options"]>;
};

interface ACheckboxEmits {
	(e: "update:modelValue", value: CheckboxGroupProps["modelValue"]): void;
}

// 接受父组件参数
const props = withDefaults(defineProps<ACheckboxProps>(), {
	modelValue: undefined,
	attrs: () => ({
		size: undefined,
		disabled: undefined,
		fill: undefined,
		label: undefined,
		min: undefined,
		max: undefined,
		tag: undefined,
		textColor: undefined,
		validateEvent: undefined
	}),
	options: undefined,
	isValueObject: false,
	remoteMethod: undefined
});

const emits = defineEmits<ACheckboxEmits>();

const selectOptions = ref<ACheckboxProps["options"]>([]);

/**
 * 全选/取消全选
 */
const handleCheckAllChange = (val: CheckboxValueType) => {
	selectValue.value = (
		val ? selectOptions.value?.map(item => (props.isValueObject ? item : item.value)) ?? [] : []
	) as CheckboxGroupProps["modelValue"];
};

const getCheckboxOptions = async () => {
	selectOptions.value = (await props.remoteMethod?.()) ?? [];
};

const selectValue = computed({
	get: () => props.modelValue,
	set: val => emits("update:modelValue", val)
});

const checkAll = computed({
	get: () => selectValue.value.length === selectOptions.value?.length,
	set: val => val
});

const isIndeterminate = computed(() => {
	if (checkAll.value) {
		return false;
	} else {
		return selectValue.value.length > 0;
	}
});

watch(
	() => props.remoteMethod,
	val => {
		if (val) {
			getCheckboxOptions();
		} else {
			selectOptions.value = props.options ?? [];
		}
	},
	{
		immediate: true,
		deep: true
	}
);

defineExpose({
	handleCheckAllChange
});
</script>

<style lang="scss" scoped>
.a-checkbox {
	width: 100%;
	&-action {
		text-align: right;
	}
}
</style>
