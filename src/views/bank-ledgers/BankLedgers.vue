<template>
  <div>
    <Header title="Bank Ledgers" />

    <div style="text-align: right">

      <q-btn color="primary" label="Add Ledger" @click="addLedger" />
    </div>

    <table>
      <tr>
        <th>#</th>
        <th>Customer Name</th>
        <th>Date Added</th>
        <th>Balance</th>
        <th>Contact</th>
      </tr>
      <tr v-for="(ledger, index) in ledgers" :key="index + 'ledger'" @click="()=>{openLedger(ledger)}" >
        <td>{{ index + 1 }}</td>
        <td>{{ ledger.accountName }}</td>
        <td>{{ ledger.createdAt | date }}</td>
        <td>{{ ledger.balance }}</td>
        <td>{{ ledger.contact }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
import Header from "../../components/Header";
import { PumpService } from "../../services/PumpService";
export default {
  name: "Ledgers",

  components: {
    Header,
  },

  data() {
    return {
      ledgers: [],
    };
  },

  methods: {
    addLedger() {
      this.$router.push({ name: "add-bank-ledger" });
    },

    openLedger(val){
      console.log(val)
      this.$router.push({
        name: "view-bank-ledger",
        params: { id: val.id },
      });
    }
  },

  created() {
    PumpService.getAllBankLedgers()
      .then((res) => {
        this.ledgers = res.data;
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