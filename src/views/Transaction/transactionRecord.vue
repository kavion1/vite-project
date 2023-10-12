<!-- transaction record page:
    1、交易列表，分页可选
    2、支持按时间查询
    3、支持按时间导出对账账单 
-->
<template>
	<div class="Layout">
		<div class="Head">
			<el-card shadow="always">
				<div class="Search">
					<!-- 列表查询条件 -->
					<el-form :inline="true" :model="Tabelform" class="SearchForm" label-width="100px">
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
				<!-- 工具栏 -->
				<div class="tools">
					<el-button type="primary" plain @click="dialogFormVisible = true">新增</el-button>
					<el-button
						:type="SelectRows.length != 1 ? 'info' : 'primary'"
						plain
						@click="EditeForm"
						:disabled="SelectRows.length != 1"
					>
						编辑
					</el-button>
					<el-button type="primary" plain @click="Export">导出</el-button>
				</div>
			</el-card>
		</div>
		<div class="Content">
			<!-- 列表 -->
			<el-card shadow="always">
				<el-table
					:data="tableData"
					height="500px"
					@selection-change="handleSelectionChange"
					highlight-current-row="true"
					stripe="true"
					v-loading="Tabelloading"
					element-loading-text="加载中..."
				>
					<el-table-column type="selection" width="55"></el-table-column>
					<el-table-column prop="bill_id" label="账单号" width="180"></el-table-column>
					<el-table-column prop="bill_type" label="交易类型" width="180"></el-table-column>
					<el-table-column prop="bill_amount" label="资金" width="100"></el-table-column>
					<el-table-column prop="create_time" label="交易时间" width="170"></el-table-column>
					<el-table-column prop="bill_remarks" label="备注" show-overflow-tooltip="true"></el-table-column>
					<template v-slot:empty>
						<el-empty description="暂无数据" />
					</template>
				</el-table>
				<div class="Content_Foot">
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
			<!-- 新增编辑 -->
			<el-dialog v-model="dialogFormVisible" title="新增账单" @closed="CancelForm(ruleFormRef)" width="500px">
				<el-form :model="AddForm" :rules="rules" ref="ruleFormRef">
					<el-form-item label="账单类型" label-width="120px" prop="bill_type">
						<el-select v-model="AddForm.bill_type" placeholder="请选择账单类型" clearable>
							<el-option label="线上交易" value="1" />
							<el-option label="线下交易" value="2" />
						</el-select>
					</el-form-item>
					<el-form-item label="账单金额" label-width="120px" prop="bill_amount">
						<el-input
							v-model="AddForm.bill_amount"
							:formatter="(value:any) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
							:parser="(value:any) => value.replace(/\$\s?|(,*)/g, '')"
							clearable
						></el-input>
					</el-form-item>
					<el-form-item label="备注" label-width="120px" prop="bill_remarks">
						<el-input v-model="AddForm.bill_remarks" type="textarea"></el-input>
					</el-form-item>
				</el-form>
				<template #footer>
					<span class="Footer_Button">
						<el-checkbox v-model="ContinuousEntry" label="连续录入" size="large" />
						<el-button @click="dialogFormVisible = false">取消</el-button>
						<el-button type="primary" @click="SubmitForm(ruleFormRef)">提交</el-button>
					</span>
				</template>
			</el-dialog>
		</div>
	</div>
</template>

<script lang="ts" setup>
import dayjs from "dayjs";
import { ref, reactive } from "vue";
import type { FormInstance, FormRules } from "element-plus";
import ExcelJS from "exceljs";

// 账单号，资金，备注，时间，交易类型
interface tableData {
	bill_id: string; //账单号
	bill_type: string; //交易类型
	bill_amount: number | undefined; //资金
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

const tableData = ref<tableData[]>([
	{
		bill_id: "012333221232",
		bill_type: "线上交易",
		bill_amount: 300,
		create_time: "2023-01-01",
		bill_remarks: "123",
	},
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
const AddForm = ref<tableData>({
	bill_id: "",
	bill_type: "",
	bill_amount: undefined,
	create_time: "",
	bill_remarks: "",
});

const ruleFormRef = ref<FormInstance>();
const currentPage = ref<number>(1);
const dialogFormVisible = ref<boolean>(false);
const Tabelloading = ref<boolean>(false);
const SelectRows = ref<tableData[]>([]);
const rules = reactive<FormRules<AddForm>>({
	bill_type: [{ required: true, message: "账单类型不能为空！", trigger: "blur" }],
	bill_amount: [{ required: true, message: "账单金额不能为空！", trigger: "blur" }],
});
const ContinuousEntry = ref<boolean>(false);
//当前页
const handleCurrentChange = (page: any) => {
	currentPage.value = page;
};
const handleSelectionChange = (val: tableData[]) => {
	SelectRows.value = val;
	console.log("val", val);
};

const SubmitForm = async (formrules: FormInstance | undefined) => {
	if (!formrules) return;
	await formrules.validate((valid, fields) => {
		if (valid) {
			tableData.value.push({ ...AddForm.value, create_time: dayjs().format("YYYY-MM-DD HH:mm:ss") });
			if (ContinuousEntry.value) {
				formrules?.resetFields();
			} else {
				dialogFormVisible.value = false;
			}
			console.log("submit!");
		} else {
			console.log("error submit!", fields);
		}
	});
};
const EditeForm = () => {
	AddForm.value = SelectRows.value[0];
	dialogFormVisible.value = true;
};
const CancelForm = (formrules: FormInstance | undefined) => {
	AddForm.value = { bill_id: "", bill_type: "", bill_amount: undefined, create_time: "", bill_remarks: "" };
	formrules?.clearValidate();
};
//查询
const ChechkForm = () => {
	Tabelloading.value = true;
	const t = setTimeout(() => {
		Tabelloading.value = false;
		clearTimeout(t);
	}, 3000);
	const param = {
		start_date: dayjs(Tabelform.value.date[0]).format("YYYY-MM-DD HH:mm:ss"),
		end_date: dayjs(Tabelform.value.date[1]).format("YYYY-MM-DD HH:mm:ss"),
		p: currentPage.value,
	};
};
//导出
const Export = () => {
	const workbook = new ExcelJS.Workbook();
	const sheet = workbook.addWorksheet("账单" + dayjs().format("YYYYMMDD"));
	const columns = [
		{
			header: "账单号",
			key: "bill_id",
			width: 20,
		},
		{
			header: "交易类型",
			key: "bill_type",
			width: 20,
		},
		{
			header: "资金",
			key: "bill_amount",
			width: 20,
		},
		{
			header: "交易时间",
			key: "create_time",
			width: 20,
		},
		{
			header: "备注",
			key: "bill_remarks",
			width: 10,
		},
	];
	sheet.columns = columns;
	// 数据行
	tableData.value.forEach((o) => {
		const rows = Object.values(o);
		sheet.addRow(rows);
	});
	// 表头样式
	const excelBaseStyle = {
		font: {
			size: 15,
			bold: true,
		},
		fill: {
			type: "pattern",
			pattern: "solid",
			fgColor: { argb: "808080" },
		},
		border: {
			top: { style: "thin", color: { argb: "9e9e9e" } },
			left: { style: "thin", color: { argb: "9e9e9e" } },
			bottom: { style: "thin", color: { argb: "9e9e9e" } },
			right: { style: "thin", color: { argb: "9e9e9e" } },
		},
	};
	const headerRow = sheet.getRow(1);
	headerRow.eachCell((cell) => {
		cell.style = excelBaseStyle as Partial<ExcelJS.Style>;
	});
	for (let i = 0; i < columns.length; i++) {
		const line = sheet.getColumn(i + 1);
		line.eachCell((cell) => {
			cell.style = {
				alignment: { vertical: "middle", horizontal: "center" },
			} as Partial<ExcelJS.Style>;
		});
	}
	workbook.xlsx.writeBuffer().then((buffer) => {
		let file = new Blob([buffer], {
			type: "application/octet-stream",
		});
		const downloadLink = document.createElement("a");
		downloadLink.href = URL.createObjectURL(file);
		downloadLink.download = "账单" + dayjs().format("YYYYMMDD") + ".xlsx";
		downloadLink.click();
	});
};
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
.Content_Foot {
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
.Footer_Button {
	display: flex;
	justify-content: end;
	gap: 10px;
	align-items: center;
}
</style>
