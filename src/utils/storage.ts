/**
 * @description `sessionStorage.setItem()`|`localStorage.setItem()` 方法封装
 * @param {Object} storage - sessionStorage|localStorage
 * @param {String} key - 要存储的键
 * @param {*} value - 要存储的数据
 */
const setData = (storage: Storage, key: string, value: any) => {
	// 如果是对象或数组，则先转成 JSON 字符串，再存储
	if (value !== null && typeof value === "object") {
		value = JSON.stringify(value);
	}

	storage?.setItem(key, value);
};

/**
 * @description `sessionStorage.getItem()`|`localStorage.getItem()` 方法封装
 * @param {Object} storage - sessionStorage|localStorage
 * @param {String} key - 要获取的键
 * @return {*} 返回键对应的值
 */
const getData = (storage: Storage, key: string) => {
	try {
		// 如果 key 对应的 value 为对象，则尝试使用 `JSON.parse()` 方法解析
		return JSON.parse((storage.getItem(key) as string) || "");
	} catch (error) {
		// 解析失败直接返回
		return storage.getItem(key);
	}
};

/**
 * @description `sessionStorage.removeItem()`|`localStorage.removeItem()` 方法封装
 * @author Monkey Chen
 * @param {Object} storage - sessionStorage|localStorage
 * @param {String} key - 要移除的键
 */
const removeData = (storage: Storage, key: string) => {
	if (!key || typeof key !== "string" || (typeof key === "string" && key.trim() === "")) {
		throw new Error(`key 必须为非空字符串：${key}`);
	}
	storage && storage.removeItem(key);
};

/**
 * @description `sessionStorage.clear()`|`localStorage.clear()` 方法封装
 * @author Monkey Chen
 * @param {Object} storage - sessionStorage|localStorage
 */
const clear = (storage: Storage) => {
	storage && storage.clear();
};

/**
 * @description `sessionStorage.setItem()` 方法封装
 * @param {String} key - 要存储的键
 * @param {*} value - 要存储的数据
 */
export const setSessionData = (key: string, value: any) => {
	setData(window.sessionStorage, key, value);
};

/**
 * @description `sessionStorage.getItem()` 方法封装
 * @param {String} key - 要获取的键
 * @return {*} 返回键对应的值
 */
export const getSessionData = (key: string) => {
	return getData(window.sessionStorage, key);
};

/**
 * @description `localStorage.setItem()` 方法封装
 * @param {String} key - 要存储的键
 * @param {*} value - 要存储的数据
 */
export const setLocalData = (key: string, value: any) => {
	setData(window.localStorage, key, value);
};

/**
 * @description `localStorage.getItem()` 方法封装
 * @param {String} key - 要获取的键
 * @return {*} 返回键对应的值
 */
export const getLocalData = (key: string) => {
	return getData(window.localStorage, key);
};

/**
 * @description `sessionStorage.removeItem()` 方法封装
 * @param {String} key - 要移除的键
 */
export const removeSessionData = (key: string) => {
	removeData(window.sessionStorage, key);
};

/**
 * @description `sessionStorage.clear()` 方法封装
 */
export const clearSession = () => {
	clear(window.sessionStorage);
};

/**
 * @description `localStorage.removeItem()` 方法封装
 * @param {String} key - 要移除的键
 */
export const removeLocalData = (key: string) => {
	removeData(window.localStorage, key);
};

/**
 * @description `localStorage.clear()` 方法封装
 */
export const clearLocal = () => {
	clear(window.localStorage);
};
