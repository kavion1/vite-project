<script lang="ts">
import { ref, onMounted, defineComponent } from "vue";
export default defineComponent({
	setup() {
		// 账单号，资金，备注，时间，交易类型
		interface tableData {
			TransactionDocumentNumber: number; //账单号
			TradingClassification: string; //交易类型
			Fund: number; //资金
			TradingDate: string; //时间
			Remarks: string; //备注
		}

		const tableData = ref<tableData>([
			{
				TransactionDocumentNumber: "012333221232",
				TradingClassification: "线上交易",
				Fund: 300,
				TradingDate: "2023-01-01",
				Remarks: "123",
			},
			{
				TransactionDocumentNumber: "012333221232",
				TradingClassification: "线上交易",
				Fund: 300,
				TradingDate: "2023-01-01",
				Remarks: "123",
			},
			{
				TransactionDocumentNumber: "012333221232",
				TradingClassification: "线上交易",
				Fund: 300,
				TradingDate: "2023-01-01",
				Remarks: "123",
			},
			{
				TransactionDocumentNumber: "012333221232",
				TradingClassification: "线上交易",
				Fund: 300,
				TradingDate: "2023-01-01",
				Remarks: "123",
			},
			{
				TransactionDocumentNumber: "012333221232",
				TradingClassification: "线上交易",
				Fund: 300,
				TradingDate: "2023-01-01",
				Remarks: "123",
			},
			{
				TransactionDocumentNumber: "012333221232",
				TradingClassification: "线上交易",
				Fund: 300,
				TradingDate: "2023-01-01",
				Remarks: "123",
			},
			{
				TransactionDocumentNumber: "012333221232",
				TradingClassification: "线上交易",
				Fund: 300,
				TradingDate: "2023-01-01",
				Remarks: "123",
			},
			{
				TransactionDocumentNumber: "012333221232",
				TradingClassification: "线上交易",
				Fund: 300,
				TradingDate: "2023-01-01",
				Remarks: "123",
			},
			{
				TransactionDocumentNumber: "012333221232",
				TradingClassification: "线上交易",
				Fund: 300,
				TradingDate: "2023-01-01",
				Remarks: "123",
			},
			{
				TransactionDocumentNumber: "012333221232",
				TradingClassification: "线上交易",
				Fund: 300,
				TradingDate: "2023-01-01",
				Remarks: "123",
			},
			{
				TransactionDocumentNumber: "012333221232",
				TradingClassification: "线上交易",
				Fund: 300,
				TradingDate: "2023-01-01",
				Remarks: "123",
			},
			{
				TransactionDocumentNumber: "012333221232",
				TradingClassification: "线上交易",
				Fund: 300,
				TradingDate: "2023-01-01",
				Remarks: "123",
			},
			{
				TransactionDocumentNumber: "012333221232",
				TradingClassification: "线上交易",
				Fund: 300,
				TradingDate: "2023-01-01",
				Remarks: "123",
			},
			{
				TransactionDocumentNumber: "012333221232",
				TradingClassification: "线上交易",
				Fund: 300,
				TradingDate: "2023-01-01",
				Remarks: "123",
			},
			{
				TransactionDocumentNumber: "012333221232",
				TradingClassification: "线上交易",
				Fund: 300,
				TradingDate: "2023-01-01",
				Remarks: "123",
			},
		]);

		return {
			tableData,
		};
	},
});
</script>

<template>
	<div class="Layout">
		<div class="Head">
			<el-card shadow="always">
				<el-row :gutter="20">
					<el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
					<el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
					<el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
					<el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
				</el-row>
			</el-card>
		</div>
		<div class="Content">
			<el-card shadow="always" class="tools">
				<el-button type="primary" plain>导出</el-button>
			</el-card>
			<el-card shadow="always">
				<el-table :data="tableData" height="500px" @selection-change="handleSelectionChange">
					<el-table-column type="selection" width="55"></el-table-column>
					<el-table-column prop="TransactionDocumentNumber" label="账单号" width="180"></el-table-column>
					<el-table-column prop="TradingClassification" label="交易类型" width="180"></el-table-column>
					<el-table-column prop="Fund" width="100" label="资金"></el-table-column>
					<el-table-column prop="TradingDate" width="130" label="交易时间"></el-table-column>
					<el-table-column prop="Remarks" label="备注"></el-table-column>
				</el-table>
			</el-card>
			<!-- transaction record page:
    1、交易列表，分页可选
    2、支持按时间查询
    3、支持按时间导出对账账单 -->
		</div>
		<div class="Foot">
			<el-card shadow="always">
				<el-pagination
					background="#ffffff"
					:total="1000"
					:page-sizes="[100, 200, 300, 400]"
					:page-size="100"
				></el-pagination>
			</el-card>
		</div>
	</div>
</template>

<style scoped>
.Layout {
}
.Head {
	margin-bottom: 20px;
}
.Content {
	height: calc(100%-400px);
	margin-bottom: 20px;
}
.tools {
	margin-bottom: 20px;
}
.Foot {
	display: flex;
	justify-content: end;
}
.el-row {
}
.el-col {
	border-radius: 4px;
}
.bg-purple-dark {
	background: #99a9bf;
}
.bg-purple {
	background: #d3dce6;
}
.bg-purple-light {
	background: #e5e9f2;
}
.grid-content {
	border-radius: 4px;
	min-height: 36px;
}
.row-bg {
	padding: 10px 0;
	background-color: #f9fafc;
}
</style>
