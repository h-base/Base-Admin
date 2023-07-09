<template>
	<div>
		<el-row :gutter="20">
			<el-col :span="12" class="mb20">
				<div class="card text-c">
					<h4>复制指令</h4>
					<div class="mt20">
						<el-input v-model="copyData" placeholder="请输入需要复制的内容">
							<template #append>
								<el-button v-copy="copyData"> 复制 </el-button>
							</template>
						</el-input>
					</div>
				</div>
			</el-col>

			<el-col :span="12" class="mb20">
				<div class="card text-c">
					<h4>长按指令</h4>
					<el-button v-longpress="handleLongpress" type="primary"> 长按2秒触发事件 </el-button>
				</div>
			</el-col>

			<el-col :span="12" class="mb20">
				<div class="card text-c">
					<h4>防抖指令</h4>
					<el-button v-debounce="debounceClick" type="primary"> 防抖按钮 (0.5秒后执行) </el-button>
				</div>
			</el-col>

			<el-col :span="12" class="mb20">
				<div class="card text-c">
					<h4>节流指令</h4>
					<el-button v-throttle="throttleClick" type="primary"> 节流按钮 (每隔1S秒后执行) </el-button>
				</div>
			</el-col>

			<el-col :span="12" class="mb20" style="height: 30vw">
				<div class="card text-c h-100-p" v-waterMarker="{ text: 'Base Admin', textColor: 'rgba(180, 180, 180, 0.6)' }">
					<h4>水印指令</h4>
					<h4>水印指令</h4>
					<h4>水印指令</h4>
				</div>
			</el-col>

			<el-col :span="12" class="mb20" style="height: 30vw">
				<div class="card text-c h-100-p darg-wapper">
					<h4>拖拽指令</h4>
					<div v-draggable class="drag-box">拖拽元素</div>
				</div>
			</el-col>
		</el-row>
	</div>
</template>

<script setup lang="ts" name="directives">
import { useModel } from "./useModel";
const { copyData, debounceClick, throttleClick, handleLongpress } = useModel();
</script>
