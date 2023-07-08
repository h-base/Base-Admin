/**
 * 是否
 */
export enum enum_base_sf {
	yes = 1,
	no = 0
}

/**
 * 性别
 */
export enum enum_base_sex {
	man = 1,
	woman = 2,
	unknown = 3
}

export const enum_base_sex_options = [
	{
		label: "男",
		value: enum_base_sex.man
	},
	{
		label: "女",
		value: enum_base_sex.woman
	},
	{
		label: "未知",
		value: enum_base_sex.unknown
	}
];
