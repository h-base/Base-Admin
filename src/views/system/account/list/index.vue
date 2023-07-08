<template>
	<div class="table-box">
		<ProTable ref="proTableRef" v-bind="proTableAttrs">
			<!-- 表格 header 按钮 -->
			<template #tableHeader="scope">
				<el-button
					v-auth="`button-create`"
					type="primary"
					icon="CirclePlus"
					tag="router-link"
					to="/system/account/create"
				>
					新增
				</el-button>
				<el-button v-auth="`button-import`" type="primary" icon="Upload" plain @click="batchAdd"> 批量添加 </el-button>
				<el-button
					v-auth="`button-delete`"
					type="danger"
					icon="Delete"
					plain
					:disabled="!scope.isSelected"
					@click="batchDelete(scope.selectedListIds)"
				>
					批量删除
				</el-button>
			</template>
			<!-- 菜单图标 -->
			<template #icon="scope">
				<el-icon :size="18">
					<component :is="scope.row.meta.icon"></component>
				</el-icon>
			</template>
			<!-- 菜单操作 -->
			<template #operation="{ row }">
				<el-button
					v-auth="`button-look`"
					tag="router-link"
					:to="`/system/account/${row.id}`"
					type="primary"
					icon="View"
					link
				>
					查看
				</el-button>
				<el-button
					v-auth="`button-update`"
					:to="`/system/account/update?id=${row.id}`"
					tag="router-link"
					type="primary"
					link
					icon="EditPen"
				>
					编辑
				</el-button>
				<el-button v-auth="`button-delete`" type="primary" link icon="Delete" @click="handleDelete(row)">
					删除
				</el-button>
			</template>
		</ProTable>

		<ImportExcel ref="importExcelRef" />
	</div>
</template>

<script setup lang="ts" name="system-account-list">
import { useTable } from "./useTable";
const { proTableRef, importExcelRef, proTableAttrs, batchAdd, batchDelete, handleDelete } = useTable();
</script>
