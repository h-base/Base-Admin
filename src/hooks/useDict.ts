import { ref } from "vue";
import { getSessionData, setSessionData } from "@/utils/storage";
import dictJson from "@/assets/json/dict.json";

export interface DictProps {
	label: string;
	value: string;
}

interface DictOriginProps {
	[key: string]: DictProps[];
}

interface DictListProps {
	code: string;
	name: string;
	list: DictProps[];
}

const DICT_SESSION_KEY = "DICT_SESSION_DATA";
/**
 * 字典处理
 */
export const useDict = () => {
	const list = dictJson;

	const dictList = ref<DictListProps[]>(dictJson);
	const dictOrigin = ref<DictOriginProps>(getSessionData(DICT_SESSION_KEY) ?? {});
	/**
	 * 初始化字典
	 * @description 获取后台字典并存储
	 */
	const initDict = () => {
		for (const item of list) {
			dictOrigin.value[item.code] = item.list;
		}
		setSessionData(DICT_SESSION_KEY, dictOrigin.value);
	};

	return {
		initDict,
		dictOrigin,
		dictList
	};
};
