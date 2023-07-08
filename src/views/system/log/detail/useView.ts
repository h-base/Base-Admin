import { reactive } from "vue";
import { useRoute } from "vue-router";
import { getLogAdminDetail } from "@/api/modules/system/log";
import type { ProFormProps } from "@/components/ProForm/index.vue";

export const useView = () => {
	const route = useRoute();
	const { id } = route.params;

	const proFromData = reactive<ProFormProps>({
		title: "查看日志",
		type: "look",
		info: undefined,
		form: {
			disabled: true,
			hideRequiredAsterisk: true,
			labelWidth: "130px"
		},
		columns: [
			{
				formItem: {
					prop: "name",
					defaultValue: "",
					label: "昵称",
					rules: [{ required: true, message: "必填", trigger: ["blur", "change"] }]
				},
				attrs: {
					typeName: "ElInput",
					ElInput: {
						placeholder: "请输入昵称",
						clearable: true
					}
				}
			},
			{
				formItem: {
					prop: "userName",
					defaultValue: "",
					label: "用户名",
					rules: [{ required: true, message: "必填", trigger: ["blur", "change"] }]
				},
				attrs: {
					typeName: "ElInput",
					ElInput: {
						placeholder: "请输入用户名",
						clearable: true
					}
				}
			},
			{
				formItem: {
					prop: "ip",
					defaultValue: "",
					label: "ip",
					rules: [{ required: true, message: "必填", trigger: ["blur", "change"] }]
				},
				attrs: {
					typeName: "ElInput",
					ElInput: {
						placeholder: "请输入ip",
						clearable: true
					}
				}
			},
			{
				formItem: {
					prop: "order",
					defaultValue: 0,
					label: "序号",
					rules: [{ required: true, message: "必填", trigger: ["blur", "change"] }]
				},
				attrs: {
					typeName: "ElInputNumber",
					ElInputNumber: {
						placeholder: "请输入序号"
					}
				}
			}
		]
	});

	const getInfo = async () => {
		const { data } = await getLogAdminDetail(id as string);
		proFromData.info = data;
	};
	getInfo();

	return {
		proFromData
	};
};
