export interface GlobalState {
	layout: "vertical" | "classic" | "transverse" | "columns";
	assemblySize: "large" | "default" | "small";
	language: "zh" | "en";
	maximize: boolean;
	primary: string;
	isDark: boolean;
	isGrey: boolean;
	isWeak: boolean;
	asideInverted: boolean;
	isCollapse: boolean;
	breadcrumb: boolean;
	breadcrumbIcon: boolean;
	tabs: boolean;
	tabsIcon: boolean;
	footer: boolean;
}
