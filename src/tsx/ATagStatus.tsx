import { useDict } from "@/hooks/useDict";

import type { FunctionalComponent } from "vue";
import type { TagProps } from "element-plus";
import type { DictProps } from "@/hooks/useDict";

export interface ATagStatusProps {
	/** 值 */
	value: DictProps["value"];
	/** dictKey */
	dictKey?: string;
	attrs?: {
		[P in keyof Omit<TagProps, "closable" | "type">]?: Omit<TagProps, "closable" | "type">[P];
	};
}

export const ColorMap = new Map<DictProps["value"], TagProps["type"]>([
	["1", "success"],
	["2", "danger"],
	["3", "info"],
	["4", "warning"]
]);

/**
 * 状态tag
 */
export const ATagStatus: FunctionalComponent<ATagStatusProps> = ({ value, dictKey = "base_status", attrs }) => {
	const { dictOrigin } = useDict();
	const info = dictOrigin.value[dictKey]?.find(item => item.value === value);

	return (
		<>
			<el-tag {...attrs} type={ColorMap.get(value)}>
				{info?.label}
			</el-tag>
		</>
	);
};
