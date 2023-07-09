<template>
	<div class="table-box">
		<div class="card mb10 pt0 pb0">
			<SelectFilter :data="selectFilterData" :default-values="selectFilterValues" @change="changeSelectFilter" />
		</div>

		<ProTable ref="proTableRef" v-bind="proTableAttrs">
			<!-- 表格 header 按钮 -->
			<template #tableHeader>
				<el-button type="primary" icon="Search" @click="getTableData(false)"> 获取数据 </el-button>
				<el-button type="success" icon="Search" @click="getTableData(true)"> 获取数据(修改默认参数) </el-button>
			</template>
			<!-- 菜单图标 -->
			<template #icon="scope">
				<el-icon :size="18">
					<component :is="scope.row.meta.icon"></component>
				</el-icon>
			</template>
			<!-- 菜单操作 -->
			<template #operation="{ row }">
				<el-button type="primary" icon="View" link> 查看 </el-button>
				<el-button type="primary" link icon="EditPen"> 编辑 </el-button>
				<el-button type="primary" link icon="Delete" @click="handleDelete(row)"> 删除 </el-button>
			</template>
		</ProTable>

		<ImportExcel ref="importExcelRef" />
	</div>
</template>

<script setup lang="ts" name="table-manual">
import { useTable } from "./useTable";
const {
	proTableRef,
	proTableAttrs,
	selectFilterData,
	selectFilterValues,
	changeSelectFilter,
	getTableData,
	handleDelete
} = useTable();
</script>
