<template>
	<div class="table-box">
		<ProTable ref="proTableRef" v-bind="proTableAttrs">
			<!-- 菜单操作 -->
			<template #operation="{ row }">
				<el-button
					v-auth="`button-look`"
					tag="router-link"
					:to="`/system/log/${row.name}`"
					type="primary"
					link
					icon="View"
				>
					查看
				</el-button>
			</template>
		</ProTable>
	</div>
</template>

<script setup lang="ts" name="system-log-list">
import { useTable } from "./useTable";
const { proTableRef, proTableAttrs } = useTable();
</script>
