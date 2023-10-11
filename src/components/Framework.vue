<template>
	<div class="layout">
		<el-container v-if="authenticated.includes($route.name)" style="height: 100%; overflow: hidden">
			<el-aside width="200px">
				<el-scrollbar>
					<el-menu :router="true">
						<el-sub-menu index="2">
							<template #title>
								<el-icon><message /></el-icon>
								交易管理
							</template>
							<el-menu-item-group>
								<el-menu-item index="/transaction_record">交易列表</el-menu-item>
							</el-menu-item-group>
						</el-sub-menu>
					</el-menu>
				</el-scrollbar>
			</el-aside>
			<el-container>
				<el-header>Header11</el-header>
				<el-main>
					<router-view />
				</el-main>
			</el-container>
		</el-container>
		<div v-else>
			<router-view />
		</div>
	</div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const authenticated = ref<string[]>(["transactionRecord"]);
</script>

<style scoped>
.layout {
}

.el-aside {
	/* background-color: #1F2937; */
	height: 100vh;
	overflow: auto;
}

.el-header {
	/* background-color:yellow; */
	background-color: white;
}

.el-main {
	background-color: #eeeff3;
	height: calc(100vh - 80px);
	overflow: auto;
}
</style>

<!-- #4F46E5 -->
