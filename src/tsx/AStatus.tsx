import { useAuthButtons } from "@/hooks/useAuthButtons";

import type { FunctionalComponent } from "vue";
import type { SwitchProps } from "element-plus";

export interface AStatusProps {
	/** 值 */
	value: boolean;
	/** 请求接口修改后 */
	change: (value: boolean) => void;
	/** 权限 */
	auth?: string;
	http: {
		/** 接口 */
		api: ((params?: any) => Promise<boolean>) | null;
		/** key 默认status */
		valueKey?: string;
		/** params */
		params?: { [key: string]: any };
	};
	/** SwitchProps  */
	attrs?: {
		[P in keyof Omit<SwitchProps, "modelValue" | "beforeChange">]?: Omit<SwitchProps, "modelValue" | "beforeChange">[P];
	};
}

/** 状态option */
export const statusOption = [
	{
		label: "显示",
		value: true
	},
	{
		label: "不显示",
		value: 2
	}
];

/**
 * 状态组件
 * @description 一般用于表格列表的状态快速修改
 * @example <AStatus value="true" change="(value) => value" auth="button-update" http={api: () => Promise.resolve(true)} />
 */
export const AStatus: FunctionalComponent<AStatusProps> = props => {
	const { getAuthButton } = useAuthButtons();
	const handleBeforeChange: SwitchProps["beforeChange"] = () => {
		if (props.http?.api) {
			const params = {
				...props.http.params,
				[props.http.valueKey ?? "status"]: !props.value
			};
			props.http.api(params).then(() => {
				props.value = !props.value;
				props.change(props.value);
			});
		}
		return false;
	};

	const isDisabled = () => {
		if (props.attrs?.disabled) {
			return props.attrs?.disabled;
		} else if (props.auth) {
			return !getAuthButton(props.auth);
		} else {
			return false;
		}
	};

	return (
		<>
			<el-switch {...props.attrs} disabled={isDisabled()} v-model={props.value} before-change={handleBeforeChange} />
		</>
	);
};
