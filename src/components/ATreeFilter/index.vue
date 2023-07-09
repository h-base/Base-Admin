<template>
	<div class="card filter">
		<el-row :gutter="20">
			<el-col :span="4" :xs="12" :sm="12" :md="10" :lg="8" :xl="4">
				<el-button :type="expandAll ? 'primary' : ''" @click="changeExpandAll()">
					{{ expandAll ? "收起" : "展开" }}
				</el-button>
				<el-button :type="checkAll ? 'primary' : ''" class="ml10" :disabled="!multiple" @click="handleCheckAll()">
					{{ checkAll ? "取消全选" : "全选" }}
				</el-button>
			</el-col>
			<el-col :span="20" :xs="12" :sm="12" :md="14" :lg="16" :xl="20">
				<el-input v-model="filterText" placeholder="输入关键字进行过滤" clearable />
			</el-col>
		</el-row>
		<el-scrollbar>
			<el-tree
				ref="treeRef"
				:default-expand-all="expandAll"
				:node-key="id"
				:data="multiple ? treeData : treeAllData"
				:show-checkbox="multiple"
				:check-strictly="true"
				:current-node-key="!multiple ? selected : ''"
				:highlight-current="!multiple"
				:expand-on-click-node="false"
				:check-on-click-node="checkOnClickNode"
				:props="defaultProps"
				:filter-node-method="filterNode"
				:default-checked-keys="multiple ? selected : []"
				@node-click="handleNodeClick"
				@check="handleCheckChange"
			>
				<template #default="scope">
					<span class="el-tree-node__label flex-justify-between w-100-p">
						<slot :row="scope">
							<span>
								{{ scope.node.label }}
								<template v-if="isAuth">
									<component :is="RouterMetaTypeTag(scope.data.meta.type, 'default')" class="ml10" />
								</template>
							</span>
						</slot>
					</span>
				</template>
			</el-tree>
		</el-scrollbar>
	</div>
</template>

<script setup lang="ts" name="ATreeFilter">
import { ref, watch, computed, onBeforeMount, nextTick, inject } from "vue";
import { ElTree, formContextKey, formItemContextKey } from "element-plus";
import { useEnumOption } from "@/views/system/menu/useEnumOption";
import type { TreeOptionProps } from "element-plus/es/components/tree/src/tree.type";

// TreeOptionProps
// 接收父组件参数并设置默认值
export interface ATreeFilterProps {
	requestApi?: (data?: any) => Promise<any>; // 请求分类数据的 api ==> 非必传
	data?: { [key: string]: any }[]; // 分类数据，如果有分类数据，则不会执行 api 请求 ==> 非必传
	title?: string; // treeFilter 标题 ==> 非必传
	id?: string; // 选择的id ==> 非必传，默认为 “id”
	label?: TreeOptionProps["label"]; // 显示的label ==> 非必传，默认为 “label”
	multiple?: boolean; // 是否为多选 ==> 非必传，默认为 false
	disabled?: boolean; // 是否为禁用 ==> 非必传，默认为 false
	/** 是否为权限管理 */
	isAuth?: boolean;
	// 默认展开
	defaultExpandAll?: boolean;
	modelValue?: string | number | string[] | number[];
}
const props = withDefaults(defineProps<ATreeFilterProps>(), {
	requestApi: undefined,
	data: undefined,
	title: "",
	modelValue: undefined,
	id: "id",
	label: "label",
	multiple: false,
	isAuth: false,
	defaultExpandAll: true,
	disabled: false
});

const defaultProps = {
	children: "children",
	label: props.label
};

const treeRef = ref<InstanceType<typeof ElTree>>();
const treeData = ref<{ [key: string]: any }[]>([]);
const treeAllData = ref<{ [key: string]: any }[]>([]);

// 获取 el-form 组件上下文
const formContext = inject(formContextKey, void 0);
// 获取 el-form-item 组件上下文
const formItemContext = inject(formItemContextKey, void 0);
// 判断是否禁用上传和删除
const self_disabled = computed(() => {
	return props.disabled || formContext?.disabled;
});

const { RouterMetaTypeTag } = useEnumOption();

const selected = ref();
const setSelected = () => {
	if (props.multiple) {
		selected.value = Array.isArray(props.modelValue) ? props.modelValue : [props.modelValue];
	} else {
		selected.value = typeof props.modelValue === "string" ? props.modelValue : "";
	}
};

// 展开收起
const expandAll = ref(props.defaultExpandAll);
const changeExpandAll = () => {
	expandAll.value = !expandAll.value;
	let nodesMap = treeRef?.value?.store.nodesMap;
	for (let key in nodesMap) {
		// 全部关闭
		nodesMap[key].expanded = expandAll.value;
	}
	console.log();
};

// 全选
const checkAll = ref(false);
const handleCheckAll = () => {
	checkAll.value = !checkAll.value;
	let nodesMap = treeRef?.value?.store.nodesMap;
	for (let key in nodesMap) {
		// 全部关闭
		nodesMap[key].checked = checkAll.value;
	}
	const checkedKeys = treeRef.value?.getCheckedKeys() as string[];
	emit("update:modelValue", checkedKeys);
};

const checkOnClickNode = computed(() => {
	if (self_disabled.value) {
		return false;
	} else {
		return props.multiple;
	}
});

onBeforeMount(async () => {
	setSelected();
	if (props.requestApi) {
		const { data } = await props.requestApi?.();
		treeData.value = data;
		treeAllData.value = [{ id: "", [typeof props.label === "string" ? props.label : "label"]: "全部" }, ...data];
	}
});

// 使用 nextTick 防止打包后赋值不生效，开发环境是正常的
watch(
	() => props.modelValue,
	() => {
		nextTick(() => setSelected());
	},
	{ deep: true, immediate: true }
);

watch(
	() => props.data,
	() => {
		if (props.data?.length) {
			treeData.value = props.data;
			treeAllData.value = [
				{ id: "", [typeof props.label === "string" ? props.label : "label"]: "全部" },
				...props.data
			];
		}
	},
	{ deep: true, immediate: true }
);

const filterText = ref("");
watch(filterText, val => {
	treeRef.value?.filter(val);
});

// 过滤
const filterNode = (value: string, data: { [key: string]: any }, node: any) => {
	if (!value) return true;
	let parentNode = node.parent,
		labels = [node.label],
		level = 1;
	while (level < node.level) {
		labels = [...labels, parentNode.label];
		parentNode = parentNode.parent;
		level++;
	}
	return labels.some(label => label.indexOf(value) !== -1);
};

interface FilterEmits {
	(e: "update:modelValue", value: ATreeFilterProps["modelValue"]): void;
}
const emit = defineEmits<FilterEmits>();

// 调用 el-form 内部的校验方法（可自动校验）
const formItemValidateField = () => {
	formItemContext?.prop && formContext?.validateField([formItemContext.prop as string]);
};

// 单选
const handleNodeClick = (data: { [key: string]: any }) => {
	if (props.multiple) return;
	emit("update:modelValue", data[props.id]);
	formItemValidateField();
};

/**
 * 选中所有子项
 */
const handleCheckChildren = (list: any[], result: string[] = []) => {
	const res: string[] = result;
	if (list.length) {
		for (const item of list) {
			res.push(item.name);
			if (item.children?.length) {
				handleCheckChildren(item.children, res);
			}
		}
	}
	return res;
};

// 多选
const handleCheckChange = (data: any) => {
	const childrenValue = handleCheckChildren(data?.children ?? []);
	const checkedKeys = treeRef.value?.getCheckedKeys() as string[];
	const isCheck = checkedKeys.some(item => item === data[props.id]);

	if (isCheck) {
		emit("update:modelValue", checkedKeys?.concat?.(childrenValue));
	} else {
		const result = checkedKeys.filter(item => !childrenValue.includes(item));
		treeRef.value?.setCheckedKeys(result);
		emit("update:modelValue", result);
	}
	formItemValidateField();
};

// 暴露给父组件使用
defineExpose({ treeData, treeAllData, treeRef });
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
