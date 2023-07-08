<template>
	<div class="home">
		<div class="card flex-align-center">
			<el-avatar :size="60" :src="userInfo.avatar" alt="avatar" />
			<div class="ml10">
				{{ userInfo.name }}
			</div>
			<div class="flex-align-center m-l-auto">
				<el-link target="_blank" type="primary" href="https://gitee.com/hickey_symbol_admin/base-admin">
					💥 使用文档
				</el-link>
				<el-divider direction="vertical" />
				<el-link target="_blank" type="danger" href="https://gitee.com/hickey_symbol_admin/base-admin">Gitee</el-link>
				<el-divider direction="vertical" />
				<el-link target="_blank" type="info" href="https://github.com/h-base/Base-Admin">GitHub </el-link>
			</div>
		</div>

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
					<LineChart id="LineChart" class="w100p" style="height: 500px" />
				</el-card>
			</el-col>
			<el-col :xs="24" :sm="12" :lg="8" class="mb20">
				<el-card>
					<template #header>
						<h4>雷达图</h4>
					</template>
					<RadarChart id="radarChart" class="w100p" style="height: 500px" />
				</el-card>
			</el-col>

			<el-col :xs="24" :sm="12" :lg="8" class="mb20">
				<el-card>
					<template #header>
						<h4>饼状图</h4>
					</template>
					<PieChart id="PieChart" class="w100p" style="height: 500px" />
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
