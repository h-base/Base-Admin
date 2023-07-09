import { ref } from "vue";
import { ElMessage } from "element-plus";

export const useModel = () => {
	const copyData = ref("");

	const debounceClick = () => {
		ElMessage.success("防抖事件");
	};

	const throttleClick = () => {
		ElMessage.success("节流事件");
	};

	const handleLongpress = () => {
		ElMessage.success("长按事件");
	};

	return {
		copyData,
		debounceClick,
		throttleClick,
		handleLongpress
	};
};
