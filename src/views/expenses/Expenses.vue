<template>
  <div>
    <Header title="Expenses" />

    <div style="text-align: right">
      <q-btn color="primary" label="Add Expense" @click="addExpense" />
    </div>

    <table>
      <tr>
        <th>#</th>
        <th>Description</th>
        <th>Type</th>
        <th>Amount</th>
      </tr>
      <tr v-for="(expense, index) in expenses" :key="index + '_expense'">
        <td>{{ index + 1 }}</td>
        <td>{{ expense.description }}</td>
        <td>{{ expense.type }}</td>
        <td>{{ expense.amount }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
import Header from "../../components/Header";
import { PumpService } from "../../services/PumpService";
export default {
  name: "Expenses",

  components: {
    Header,
  },

  data() {
    return {
      expenses: [
        
      ],
    };
  },

  methods: {
    addExpense() {
      this.$router.push({ name: "add-expense" });
    },
  },

  created() {
    PumpService.getAllExpenses(0,10)
      .then((res) => {
        this.expenses = res.data.content;
      })
      .catch((err) => {
        console.log(err);
      });
  },

  validations: function () {
    return {};
  },

  computed: {},
};
</script>

<style lang="scss" scoped>
table {
  margin-top: 16px;
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

table td,
table th {
  border: 1px solid #ddd;
  padding: 8px;
}
td {
  text-transform: capitalize;
}

table tr:nth-child(even) {
  background-color: #f2f2f2;
}

table tr:hover {
  background-color: #ddd;
}

table th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: #059DDB;
  color: #FAFAFA;
}
</style>