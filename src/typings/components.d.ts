import AGrid from "@/components/AGrid/index.vue";
import AGridItem from "@/components/AGrid/AGridItem/index.vue";
import ALoading from "@/components/ALoading/index.vue";
import ASelect from "@/components/ASelect/index.vue";
import ASwitch from "@/components/ASwitch/index.vue";
import ImportExcel from "@/components/ImportExcel/index.vue";
import ProTable from "@/components/ProTable/index.vue";
import ProFrom from "@/components/ProForm/index.vue";
import SearchForm from "@/components/SearchForm/index.vue";
import SelectFilter from "@/components/SelectFilter/index.vue";
import SwitchDark from "@/components/SwitchDark/index.vue";
import ATreeFilter from "@/components/ATreeFilter/index.vue";
import ARichEditor from "@/components/ARichEditor/index.vue";
import AFormTable from "@/components/AFormTable/index.vue";
import AUploadImg from "@/components/AUpload/AUploadImg/index.vue";
import AUploadImgs from "@/components/AUpload/AUploadImgs/index.vue";
import ASelectIcon from "@/components/ASelectIcon/index.vue";

declare module "@vue/runtime-core" {
	export interface GlobalComponents {
		AGrid: typeof AGrid;
		AGridItem: typeof AGridItem;
		ALoading: typeof ALoading;
		ASelect: typeof ASelect;
		ASwitch: typeof ASwitch;
		ImportExcel: typeof ImportExcel;
		ProFrom: typeof ProFrom;
		ProTable: typeof ProTable;
		SearchForm: typeof SearchForm;
		SelectFilter: typeof SelectFilter;
		SwitchDark: typeof SwitchDark;
		ATreeFilter: typeof ATreeFilter;
		ARichEditor: typeof ARichEditor;
		AFormTable: typeof AFormTable;
		AUploadImg: typeof AUploadImg;
		AUploadImgs: typeof AUploadImgs;
		ASelectIcon: typeof ASelectIcon;
	}
}

export {};
