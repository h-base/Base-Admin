import { ref } from "vue";

/**
 * 弹窗
 * @param init 初始值
 */
export const useShow = (init?: boolean) => {
	const isShow = ref(init ?? false);

	const openShow = () => {
		isShow.value = true;
	};

	const closeShow = () => {
		isShow.value = false;
	};

	const changeShow = (val: boolean) => {
		isShow.value = val;
	};

	const toggleShow = () => {
		isShow.value = !isShow.value;
	};

	return {
		isShow,
		openShow,
		closeShow,
		changeShow,
		toggleShow
	};
};
