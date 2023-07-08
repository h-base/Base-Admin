/* tabsMenuProps */
export interface TabsMenuProps {
	icon?: string;
	title: string;
	path: string;
	name: string;
	close: boolean;
}

export interface TabsState {
	tabsMenuList: TabsMenuProps[];
}
