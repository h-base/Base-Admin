<template>
	<div class="home">
		<el-row :gutter="20">
			<el-col :span="12">
				<div class="card h-100-p">
					<el-descriptions title="项目介绍" :column="1" border>
						<el-descriptions-item label="name" align="center">
							<h3>Base Admin</h3>
						</el-descriptions-item>
						<el-descriptions-item label="Document" align="center">
							<el-link target="_blank" type="primary" href="https://docs.h-base.online"> 💥 使用文档 </el-link>
						</el-descriptions-item>
						<el-descriptions-item label="Gitee" align="center">
							<el-link target="_blank" type="danger" href="https://gitee.com/hickey_symbol_admin/base-admin"
								>Gitee</el-link
							>
						</el-descriptions-item>
						<el-descriptions-item label="Github" align="center">
							<el-link target="_blank" type="info" href="https://github.com/h-base/Base-Admin">GitHub </el-link>
						</el-descriptions-item>
					</el-descriptions>
				</div>
			</el-col>

			<el-col :span="12">
				<div class="card">
					<el-descriptions title="有关作者" :column="1" border>
						<el-descriptions-item label="Avatar" align="center" width="100px">
							<el-avatar :size="60" :src="userInfo.avatar" alt="avatar" />
						</el-descriptions-item>
						<el-descriptions-item label="Name" align="center">Hickey</el-descriptions-item>
						<el-descriptions-item label="Email" align="center">
							<el-text type="primary"> h_base@163.com </el-text>
						</el-descriptions-item>
						<el-descriptions-item label="Gitee" align="center">
							<el-link target="_blank" type="danger" href="https://gitee.com/hickey_symbol_admin"> Gitee </el-link>
						</el-descriptions-item>
						<el-descriptions-item label="Github" align="center">
							<el-link target="_blank" type="info" href="https://github.com/h-base">GitHub </el-link>
						</el-descriptions-item>
					</el-descriptions>
				</div>
			</el-col>
		</el-row>

		<!-- 数据卡片 -->
		<el-row :gutter="40" class="mt20">
			<el-col :xs="24" :sm="12" :lg="6" class="mb20">
				<div class="card flex-justify-between">
					<SvgIcon name="xianxinglvhangriji"></SvgIcon>
					<div class="flex-direction-column text-c">
						<el-text class="mb10 fs-20">访问数</el-text>
						<div class="fs-20">10000</div>
					</div>
				</div>
			</el-col>

			<!--消息数-->
			<el-col :xs="24" :sm="12" :lg="6" class="mb20">
				<div class="card flex-justify-between">
					<SvgIcon name="xianxingtianqiyubao"></SvgIcon>
					<div class="flex-direction-column text-c">
						<el-text class="mb10 fs-20">天气</el-text>
						<div class="fs-20">🌤 晴朗</div>
					</div>
				</div>
			</el-col>

			<el-col :xs="24" :sm="12" :lg="6" class="mb20">
				<div class="card flex-justify-between">
					<SvgIcon name="xianxingfanchuan"></SvgIcon>
					<div class="flex-direction-column text-c">
						<el-text class="mb10 fs-20">收入金额</el-text>
						<div class="fs-20">10000</div>
					</div>
				</div>
			</el-col>

			<el-col :xs="24" :sm="12" :lg="6" class="mb20">
				<div class="card flex-justify-between">
					<SvgIcon name="xianxingdaoyu"></SvgIcon>
					<div class="flex-direction-column text-c">
						<el-text class="mb10 fs-20">订单数</el-text>
						<div class="fs-20">555</div>
					</div>
				</div>
			</el-col>
		</el-row>

		<!-- Echarts 图表 -->
		<el-row :gutter="40" class="mt20">
			<el-col :xs="24" :sm="12" :lg="8" class="mb20">
				<el-card>
					<template #header>
						<h4>折线图</h4>
					</template>
					<LineChart id="LineChart" class="w-100-p" style="height: 500px" />
				</el-card>
			</el-col>
			<el-col :xs="24" :sm="12" :lg="8" class="mb20">
				<el-card>
					<template #header>
						<h4>雷达图</h4>
					</template>
					<RadarChart id="radarChart" class="w-100-p" style="height: 500px" />
				</el-card>
			</el-col>

			<el-col :xs="24" :sm="12" :lg="8" class="mb20">
				<el-card>
					<template #header>
						<h4>饼状图</h4>
					</template>
					<PieChart id="PieChart" class="w-100-p" style="height: 500px" />
				</el-card>
			</el-col>
		</el-row>
	</div>
</template>

<script setup lang="ts" name="home">
import { computed } from "vue";
import { useAuthStore } from "@/stores/modules/auth";
import RadarChart from "./components/radarChart/index.vue";
import PieChart from "./components/pieChart/index.vue";
import LineChart from "./components/lineChart/index.vue";

const authStore = useAuthStore();

const userInfo = computed(() => authStore.userInfoGet);
</script>
