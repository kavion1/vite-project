<template>
	<div class="Layout">
		<div class="Head">
			<el-card shadow="always">
				<div class="Search">
					<el-form :inline="true" :model="Tabelform">
						<el-form-item label="账单号">
							<el-input v-model="Tabelform.TransactionDocumentNumber" placeholder="账单号"></el-input>
						</el-form-item>
						<el-form-item label="交易日期">
							<el-date-picker
								v-model="Tabelform.date"
								type="datetimerange"
								start-placeholder="开始日期"
								end-placeholder="结束日期"
							/>
						</el-form-item>
					</el-form>
				</div>

				<div class="check">
					<el-button type="primary" plain size="medium" @click="ChechkForm">重置</el-button>
					<el-button type="primary" plain size="medium" @click="ChechkForm">查询</el-button>
				</div>
				<div class="tools">
					<el-button type="primary" plain @click="AddVisble">新增</el-button>
					<el-button type="primary" plain>编辑</el-button>
					<el-button type="primary" plain>导出</el-button>
				</div>
			</el-card>
		</div>
		<div class="Content">
			<el-card shadow="always">
				<el-table :data="tableData" height="500px" @selection-change="handleSelectionChange">
					<el-table-column type="selection" width="55"></el-table-column>
					<el-table-column prop="bill_id" label="账单号" width="180"></el-table-column>
					<el-table-column prop="bill_type" label="交易类型" width="180"></el-table-column>
					<el-table-column prop="bill_amount" width="100" label="资金"></el-table-column>
					<el-table-column prop="create_time" width="130" label="交易时间"></el-table-column>
					<el-table-column prop="bill_remarks" label="备注"></el-table-column>
				</el-table>
				<div class="Foot">
					<el-pagination
						@current-change="handleCurrentChange"
						v-model:current-page="currentPage"
						background="#ffffff"
						:total="tableData.length"
						page-size="100"
						layout="total, sizes, prev, pager, next, jumper"
					></el-pagination>
				</div>
			</el-card>
			<el-dialog v-model="dialogFormVisible" title="新增账单">
				<el-form :model="AddForm">
					<el-form-item label="账单类型" label-width="120px">
						<el-input v-model="AddForm.bill_type"></el-input>
					</el-form-item>
					<el-form-item label="账单金额" label-width="120px">
						<el-input v-model="AddForm.bill_amount"></el-input>
					</el-form-item>
					<el-form-item label="备注" label-width="120px">
						<el-input v-model="AddForm.bill_remarks" type="textarea"></el-input>
					</el-form-item>
				</el-form>
				<template #footer>
					<span class="dialog-footer">
						<el-button @click="dialogFormVisible = false">取消</el-button>
						<el-button type="primary" @click="dialogFormVisible = false">确定</el-button>
					</span>
				</template>
			</el-dialog>
			<!-- transaction record page:
    1、交易列表，分页可选
    2、支持按时间查询
    3、支持按时间导出对账账单 -->
		</div>
	</div>
</template>

<script lang="ts">
// 账单号，资金，备注，时间，交易类型
interface tableData {
	bill_id: string; //账单号
	bill_type: string; //交易类型
	bill_amount: number; //资金
	create_time: string; //时间
	bill_remarks: string; //备注
}
interface Tabelform {
	date: string;
	start_date: string; //开始时间
	end_date: string; //结束时间
	p: string; //第几页;
	TransactionDocumentNumber: string;
}
interface AddForm {
	bill_type: string; //账单类型
	bill_amount: string; //账单金额
	bill_remarks: string; //账单备注
}
import dayjs from "dayjs";
import { ref, defineComponent } from "vue";
export default defineComponent({
	setup() {
		const tableData = ref<tableData[]>([
			{
				bill_id: "012333221232",
				bill_type: "线上交易",
				bill_amount: 300,
				create_time: "2023-01-01",
				bill_remarks: "123",
			},
		]);
		const Tabelform = ref<Tabelform>({
			date: "",
			start_date: "",
			end_date: "",
			p: "",
			TransactionDocumentNumber: "",
		});
		const AddForm = ref<AddForm>({
			bill_type: "",
			bill_amount: "",
			bill_remarks: "",
		});
		const currentPage = ref<number>(1);
		const dialogFormVisible = ref<boolean>(false);
		// 每页多少条
		const handleSelectionChange = (val) => {};
		//当前页
		const handleCurrentChange = (page: any) => {
			currentPage.value = page;
		};

		const AddVisble = () => {
			console.log("进");

			dialogFormVisible.value = true;
			console.log("进", dialogFormVisible.value);
		};

		const ChechkForm = () => {
			console.log("Tabelform", Tabelform.value.date);
			const param = {
				start_date: dayjs(Tabelform.value.date[0]).format("YYYY-MM-DD HH:mm:ss"),
				end_date: dayjs(Tabelform.value.date[1]).format("YYYY-MM-DD HH:mm:ss"),
				p: currentPage.value,
			};
		};
		return {
			tableData,
			handleSelectionChange,
			handleCurrentChange,
			Tabelform,
			ChechkForm,
			currentPage,
			AddForm,
			AddVisble,
			dialogFormVisible,
		};
	},
});
</script>

<style scoped>
.Head {
	margin-bottom: 20px;
}
.Content {
	height: calc(100%-400px);
	margin-bottom: 20px;
}
.tools {
	margin-top: 20px;
}
.Foot {
	display: flex;
	justify-content: end;
	margin-top: 10px;
}
.Search {
	display: flex;
	gap: 10px;
}
.check {
	display: flex;
	justify-content: center;
	margin-top: 10px;
}
</style>
