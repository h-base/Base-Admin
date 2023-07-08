import { isArray } from "./is";

/**
 * 合并对象
 */
export const mergeObject = (origin: any, mergeData: any) => {
	// Do nothing if they're the same object
	if (origin === mergeData) {
		return;
	}

	Object.keys(mergeData).forEach(function (key) {
		const val = mergeData[key];

		if (val !== null && typeof val === "object") {
			if (!origin.hasOwnProperty(key)) {
				origin[key] = isArray(val) ? [] : {};
			}
			mergeObject(origin[key], mergeData[key]);
		} else if (!origin.hasOwnProperty(key)) {
			origin[key] = mergeData[key];
		}
	});
};

/**
 * 数组去重
 * @param arr 目标数组
 * @param uuid key
 * @param key
 * @returns
 */
export const uniqueFunc = (arr: any[], uuid = "id", key?: string) => {
	const res = new Map();
	if (key) {
		return arr.filter(item => !res.has(item[key][uuid]) && res.set(item[key][uuid], 1));
	} else {
		return arr.filter(item => !res.has(item[uuid]) && res.set(item[uuid], 1));
	}
};

/**
 * 扁平化数组
 * @param list 数组
 * @returns {Array}
 */
export const formatTree = (list: any[], hashMap = new Map()) => {
	const result = [];

	for (const item of list) {
		hashMap.set(item.id, { ...item, children: [] });
	}

	for (const item of list) {
		const id = item.id;
		const pid = item.pid;

		if (hashMap.get(pid)) {
			hashMap.get(pid).children.push(hashMap.get(id));
		} else {
			result.push(hashMap.get(id));
		}
	}
	return result;
};

/**
 * @description 深拷贝
 */
export const deepCopy = (origin: any, map = new Map()) => {
	if (origin && typeof origin === "object") {
		const target: any = Array.isArray(origin) ? [] : {};
		if (map.get(origin)) return map.get(origin);
		map.set(origin, target);

		for (const key in origin) {
			target[key] = deepCopy(origin[key], map);
		}
		return target;
	} else {
		return origin;
	}
};

/**
 * @desc 获取给定变量的原始类型字符串，[[Class]]: [object Object] => Object
 * @param {*} value - 给定变量
 * @return {String} 返回给定变量的原始类型的小写形式，e.g. getRawType(new Date) return 'date'
 */
export const getRawType = (value: any): string => {
	return toString.call(value).slice(8, -1).toLowerCase();
};

/**
 * @description 校验某个值是否为空
 * @param {*} val
 * @returns {boolean} 返回该值是否为空
 */
export const isEmpty = (val: any): boolean => {
	// null, undefined
	if (val == null) return true;

	if (typeof val === "boolean") return false;

	// 0 不视为空
	if (typeof val === "number") return false;

	// Error 对象的 `message` 属性是否为空
	// see: https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/TypeError
	if (val instanceof Error) return val.message === "";
	switch (getRawType(val)) {
		// String, Array
		case "string":
		case "array":
			return !val.length;

		// Set, Map, File
		case "set":
		case "map":
		case "file":
			return !val.size;

		// 纯对象
		case "object":
			return !Object.keys(val).length;
	}

	return false;
};
