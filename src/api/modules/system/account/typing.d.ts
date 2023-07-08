import { enum_base_sex } from "@/enum/base";

declare global {
	namespace SystemAccount {
		/** 列表查询参数 */
		interface AccountListParams extends API.PageRequest {
			name?: string;
			userName?: string;
			sex?: enum_base_sex;
		}

		/** 账号参数 */
		interface AccountProps {
			id?: string;
			userName: string;
			name: string;
			role: string;
			sex: enum_base_sex;
			avatar: string;
			brief: string;
			status: boolean;
		}

		interface AccountListProps extends AccountProps {
			roleName: string;
		}

		interface AccountDeleteRequest {
			id: string[];
		}
	}
}
