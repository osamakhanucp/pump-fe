<template>
  <div>
    <Header title="View Ledger" />
    <div class="custom-grid" style="margin-top: 24px">
      <CInput label="Name" v-model="data.name" readonly />
      <CInput label="Account Number" v-model="data.accountNumber" readonly />
      <CInput label="Status" v-model="data.status" readonly />
      <CInput label="Account Title" v-model="data.accountTitle" readonly />
      <CInput label="Contact" v-model="data.contact" readonly />
      <CInput label="Opening Balance" v-model="data.balance" readonly />
    </div>
    <CInput label="Branch Address" v-model="data.branchAddress" readonly />
    <div style="text-align: right">
      <!-- <q-btn color="primary" label="Add Sale" @click="addSale" /> -->
    </div>

    <br /><br />
    <span style="font-weight: bold">Ledgers</span>
    <div class="custom-grid">
      <CDatePicker label="Date From" range v-model="dateFrom" />
      <CDatePicker label="Date To" range v-model="dateTo" />
    </div>
    <!-- <q-date label="Date range" v-model="dateRange" range multiple /> -->
    <table>
      <tr>
        <th>#</th>
        <th>Date</th>
        <th>Description</th>
        <th>Debit</th>
        <th>Credit</th>
      </tr>
      <tr
        v-for="(ledger, index) in data.bankLedgerCreditDebits"
        :key="index + 'ledger'"
      >
        <td>{{ index + 1 }}</td>
        <td>{{ ledger.entryDate | date }}</td>
        <td>{{ ledger.description }}</td>
        <td>{{ ledger.debit }}</td>
        <td>{{ ledger.credit }}</td>
      </tr>
    </table>
    <div style="text-align: right; margin-top: 16px">
      <q-btn
        color="primary"
        label="Add Entry"
        @click="addEntry"
        style="margin-right: 16px"
      />
      <q-btn color="primary" label="Generate Bill" @click="generateBill" />
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

export default {
  name: "ViewLedger",

  components: {
    Header,
    CInput,
    CSelect,
    CDatePicker,
  },

  data() {
    return {
      data: {
        vehicles: [
          {
            name: "",
            number: "",
            type: "",
            dateAdded: "",
          },
        ],
      },
    };
  },

  methods: {
    addVehicle() {
      this.data.vehicles.push(this.vehicleArray());
    },
    vehicleArray() {
      return {
        name: "",
        number: "",
        type: "",
        dateAdded: "",
      };
    },
    deleteVehicle(index) {
      this.data.vehicles.splice(index, 1);
    },
    generateBill() {},
    addEntry() {
      this.$router.push({
        name: "ledger-entry",
        params: { id: this.$route.params.id },
      });
    },
  },

  created() {
    PumpService.getBankLedgerById(this.$route.params.id)
      .then((res) => {
        console.log(res);
        this.data = res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  },

  computed: {},
};
</script>

<style lang="scss" scoped>
.custom-grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  column-gap: 8px;
  // row-gap: 8px;
}
.vehicle-grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 30px 30px;
  column-gap: 8px;
  // row-gap: 8px;
}
table {
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 100%;
  border-bottom: 1px solid black;
}

table td,
table th {
  padding: 8px;
}
th {
  border: 1px solid black;
}
td {
  text-transform: capitalize;
  border-right: 1px solid black;
}

td:first-child {
  border-left: 1px solid black;
}
table th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: #059DDB;
  color: #FAFAFA;
}
</style>