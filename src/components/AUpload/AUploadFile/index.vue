<template>
	<div class="upload-file w-100-p">
		<el-upload
			ref="uploadRef"
			class="upload-box"
			action="#"
			v-bind="attrs"
			:disabled="self_disabled"
			:show-file-list="false"
			:http-request="handleHttpUpload"
			:before-upload="handleBeforeUpload"
			:on-success="uploadSuccess"
			:on-error="uploadError"
		>
			<el-icon class="el-icon--upload"><upload-filled /></el-icon>
			<div class="el-upload__text">将文件拖到这里或<em>点击上传</em></div>
			<pre class="el-upload__tip">{{ tips ?? defaultTips }}</pre>
		</el-upload>

		<ul v-show="showList" class="file-list">
			<template v-if="attrs.multiple">
				<transition-group name="col">
					<li v-for="item in modelValue" :key="item[valueKey.id]" class="file-list-item">
						<el-icon><Document /></el-icon>
						<a
							class="item-name sle"
							:href="item[valueKey.value]"
							:title="item[valueKey.label]"
							target="_blank"
							download
						>
							{{ item[valueKey.label] }}
						</a>
						<el-icon class="item-remove" @click="handleRemove(item)"><CircleClose /></el-icon>
					</li>
				</transition-group>
			</template>
			<template v-else>
				<li class="file-list-item">
					<el-icon><Document /></el-icon>
					<a
						class="item-name sle"
						:href="`${(modelValue as Record<string, any>)[valueKey.value]}`"
						:title="`${(modelValue as Record<string, any>)[valueKey.label]}`"
						target="_blank"
						download
					>
						{{ `${(modelValue as any)[valueKey.label]}` }}
					</a>
					<el-icon class="item-remove" @click="handleRemove(modelValue)"><CircleClose /></el-icon>
				</li>
			</template>
		</ul>
	</div>
</template>

<script setup lang="ts" name="AUploadFile">
import { ref, computed, inject } from "vue";
import { ElNotification, formContextKey, formItemContextKey } from "element-plus";
import { isArray } from "@/utils/is";
import { deepCopy } from "@/utils/utils";
import { uploadImg } from "@/api/modules/upload";

import type { UploadProps, UploadInstance, UploadRequestOptions } from "element-plus";

export interface AUploadFileProps {
	modelValue: Record<string, any> | Record<string, any>[]; // 图片地址 ==> 必传
	valueKey?: {
		/** 默认: name */
		label: string;
		/** 默认: url */
		value: string;
		/** 默认: id */
		id: string | number;
	};
	api?: (params: any) => Promise<any>; // 上传图片的 api 方法，一般项目上传都是同一个 api 方法，在组件里直接引入即可 ==> 非必传
	attrs?: {
		multiple?: UploadProps["multiple"];
		showFileList?: UploadProps["showFileList"];
		drag?: UploadProps["drag"];
		disabled?: UploadProps["disabled"];
		limit?: UploadProps["limit"];
	};
	/** 单位 M */
	size?: number;
	/** 上传类型 */
	type?: string[];
	/** 提示 */
	tips?: string;
}
interface UploadEmits {
	(e: "update:modelValue", value: AUploadFileProps["modelValue"]): void;
}

// 接受父组件参数
const props = withDefaults(defineProps<AUploadFileProps>(), {
	modelValue: () => ({}),
	api: undefined,
	valueKey: () => ({
		label: "name",
		value: "url",
		id: "id"
	}),
	attrs: () => ({
		multiple: false,
		showFileList: undefined,
		drag: true,
		disabled: undefined,
		limit: 1
	}),
	size: 100,
	type: undefined,
	tips: undefined
});

const emit = defineEmits<UploadEmits>();

// 获取 el-form 组件上下文
const formContext = inject(formContextKey, void 0);
// 获取 el-form-item 组件上下文
const formItemContext = inject(formItemContextKey, void 0);
// 判断是否禁用上传和删除
const self_disabled = computed(() => {
	return props.attrs.disabled || formContext?.disabled;
});

const defaultTips = computed(() => {
	return `上传数量限制为：${props.attrs.limit}\n上传大小限制为：${props.size}M\n上传类型限制为：${
		props.type?.join(",") ?? "无"
	}`;
});

// 最大上传限制
const isExceed = computed(() => {
	return (
		(!props.attrs.multiple && Boolean((props.modelValue as Record<string, any>)[props.valueKey.value])) ||
		(props.attrs.multiple && props.modelValue.length === props.attrs.limit)
	);
});

// 显示上传列表
const showList = computed(() => {
	if (isArray(props.modelValue)) {
		return props.modelValue.length > 0;
	} else {
		return Boolean(props.modelValue[props.valueKey.value]);
	}
});

const uploadRef = ref<UploadInstance>();

const handleBeforeUpload: UploadProps["beforeUpload"] = rawFile => {
	const imgSize = rawFile.size / 1024 / 1024 < (props?.size ?? 0);
	const imgType = props?.type?.includes(rawFile.type) ?? true;
	if (!imgType)
		ElNotification({
			title: "温馨提示",
			message: "上传文件不符合所需的格式！",
			type: "warning"
		});
	if (!imgSize)
		setTimeout(() => {
			ElNotification({
				title: "温馨提示",
				message: `上传文件大小不能超过 ${props?.size ?? 0}M！`,
				type: "warning"
			});
		}, 0);
	if (isExceed.value) {
		setTimeout(() => {
			ElNotification({
				title: "温馨提示",
				message: "文件上传失败，已超过最大限制数据，请先删除后再上传！",
				type: "warning"
			});
		}, 0);
	}
	return imgType && imgSize && !isExceed.value;
};

const handleHttpUpload: UploadProps["httpRequest"] = async (options: UploadRequestOptions) => {
	let formData = new FormData();
	formData.append("file", options.file);
	try {
		const api = props.api ?? uploadImg;
		const { data } = await api(formData);
		if (props.attrs.multiple) {
			const list = deepCopy(props.modelValue);
			list.push(data);
			emit("update:modelValue", list);
		} else {
			emit("update:modelValue", data);
		}
		// 调用 el-form 内部的校验方法（可自动校验）
		formItemContext?.prop && formContext?.validateField([formItemContext.prop as string]);
	} catch (error) {
		options.onError(error as any);
	}
};

/**
 * 删除文件
 */
const handleRemove = (file: AUploadFileProps["modelValue"]) => {
	if (self_disabled.value) {
		return;
	}
	if (props.attrs.multiple) {
		const removeIndex = props.modelValue?.findIndex(
			(it: Record<string, any>) => it[props.valueKey.id] === (file as Record<string, any>)[props.valueKey.id as string]
		);
		const list = deepCopy(props.modelValue);
		list.splice(removeIndex, 1);
		emit("update:modelValue", list);
	} else {
		emit("update:modelValue", {});
	}
};

/**
 * 图片上传成功
 */
const uploadSuccess = () => {
	ElNotification({
		title: "温馨提示",
		message: "文件上传成功！",
		type: "success"
	});
};

/**
 *
 * 图片上传错误
 */
const uploadError = () => {
	ElNotification({
		title: "温馨提示",
		message: "文件上传失败，请您重新上传！",
		type: "error"
	});
};
</script>

<style scoped lang="scss">
.upload-file {
	.el-upload__tip {
		text-align: center;
		line-height: 24px;
	}
	.file-list {
		padding: 0;
		margin: 20px 0 0;
		list-style: none;
		&-item {
			padding: 0 8px;
			display: flex;
			align-items: center;
			cursor: pointer;
			border-radius: 4px;
			color: var(--el-text-color-regular);
			&:hover {
				background-color: var(--el-fill-color-light);
			}
			.item-name {
				flex-shrink: 0;
				width: calc(100% - 28px - 16px);
				margin-left: 10px;
				color: var(--el-text-color-regular);
				&:hover {
					color: $primary-color;
				}
			}
			.item-remove {
				margin-left: auto;
				font-size: 16px;
				&:hover {
					color: $primary-color;
				}
			}
		}
	}
}
</style>
