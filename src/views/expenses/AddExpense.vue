<template>
  <div>
    <div>
      <Header title="Add Expense" />
      <div class="custom-grid">
        <CDatePicker
          label="Date"
          v-model="data.date"
          :error="$v.data.date.$error"
          :range="false"
        />
        <CSelect
          label="Expense Type"
          v-model="data.expenseType"
          @on-select="selectExpenseType"
          option-value="name"
          option-label="name"
          :options="allExpenseTypes"
          :error="$v.data.expenseType.$error"
        />
        <CInput
          label="Amount"
          v-model="data.amount"
          type="number"
          :error="$v.data.amount.$error"
        />
      </div>
      <CInput
        label="Descripton"
        v-model="data.description"
        type="textarea"
        :error="$v.data.description.$error"
      />

      <div style="text-align: right; margin-top: 32px">
        <q-btn color="primary" label="Add Expense" @click="addExpense" />
      </div>
    </div>
  </div>
</template>

<script>
import Header from "../../components/Header";
import CInput from "../../components/CInput";
import CSelect from "../../components/CSelect";
import CDatePicker from "../../components/CDatePicker";
import { PumpService } from "../../services/PumpService";
import moment from "moment";
import { required } from "vuelidate/lib/validators";
export default {
  name: "AddExpense",

  components: {
    Header,
    CInput,
    CSelect,
    CDatePicker,
  },

  data() {
    return {
      data: {
        amount: "",
        type: "",
        date: "",
        description: "",
        expenseTypeId: "",
        expenseType: "",
      },
      allExpenseTypes: [],
    };
  },

  methods: {
    selectExpenseType(val) {
      this.data.expenseTypeId = val.id;
    },
    addExpense() {
      // this.data.dateCreated = moment(this.data.date).toISOString();
      this.$v.data.$touch();
      if (this.$v.data.$invalid) {
        return;
      }
      PumpService.addExpense(this.data)
        .then((res) => {
          console.log(res);
          if (res.data.code === "S001") {
            this.$router.push({
              name: "expenses",
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },

  created() {
    PumpService.getAllExpenseTypes()
      .then((res) => {
        console.log(res);
        this.allExpenseTypes = res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  },

  validations: function () {
    return {
      data: {
        expenseType: { required },
        amount: { required },
        description: { required },
        date: { required },
      },
    };
  },

  computed: {},
};
</script>

<style lang="scss" scoped>
.custom-grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  column-gap: 8px;
  row-gap: 16px;
}
.nozzles-grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 60px 60px;
  column-gap: 8px;
  row-gap: 16px;
  align-items: start;
}
</style>