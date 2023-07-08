<template>
	<div class="table-box">
		<ProTable ref="proTableRef" v-bind="proTableAttrs">
			<!-- 表格 header 按钮 -->
			<template #tableHeader="scope">
				<el-button v-auth="`button-create`" type="primary" icon="CirclePlus" tag="router-link" to="/system/menu/create">
					新增
				</el-button>
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
				<el-icon v-if="scope.row.meta.icon" :size="18">
					<component :is="scope.row.meta.icon"></component>
				</el-icon>
			</template>
			<!-- 菜单操作 -->
			<template #operation="{ row }">
				<el-button
					v-auth="`button-look`"
					:to="`/system/menu/${row.name}`"
					tag="router-link"
					type="primary"
					link
					icon="View"
				>
					查看
				</el-button>
				<el-button
					v-auth="`button-update`"
					:to="`/system/menu/update?id=${row.name}`"
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
	</div>
</template>

<script setup lang="ts" name="system-menu-list">
import { useTable } from "./useTable";
const { proTableRef, proTableAttrs, batchDelete, handleDelete } = useTable();
</script>
