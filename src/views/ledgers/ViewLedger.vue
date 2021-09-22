<template>
  <div>
    <Header title="View Ledger" />
    <div class="custom-grid" style="margin-top: 24px">
      <CInput label="customerName" v-model="data.customerName" readonly />
      <CInput label="Status" v-model="data.status" readonly />
      <CInput label="Contact Person" v-model="data.contactPerson" readonly />
      <CInput label="Contact" v-model="data.contactNo" readonly />
    </div>
    <CInput label="Address" v-model="data.address" readonly />
    <span style="font-weight: bold">Vehicles</span>
    <div
      class="vehicle-grid"
      v-for="(vehicle, index) in data.customerVehicles"
      :key="index"
    >
      <CInput label="Name" v-model="vehicle.name" readonly />
      <CInput label="Number" v-model="vehicle.number" readonly />
      <CInput label="Type" v-model="vehicle.type" readonly />
      <CDatePicker label="Date Added" v-model="vehicle.dateAddedLabel" readonly />
      <div>
        <!-- <q-btn
          v-if="data.customerVehicles.length > 1"
          color="primary"
          flat
          @click="
            () => {
              deleteVehicle(index);
            }
          "
          icon="delete"
        /> -->
      </div>
      <div>
        <!-- <q-btn
          flat
          color="primary"
          icon="add"
          @click="addVehicle"
          v-if="index === data.customerVehicles.length - 1"
        /> -->
      </div>
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
      <tr v-for="(ledger, index) in data.customerLedgerCreditDebits" :key="index + 'ledger'">
        <td>{{ index + 1 }}</td>
        <td>{{ ledger.date | date }}</td>
        <td>{{ ledger.description }}</td>
        <td>{{ ledger.debit }}</td>
        <td>{{ ledger.credit }}</td>
      </tr>
    </table>
    <div style="text-align: right">
      <!-- <q-btn color="primary" label="Add Sale" @click="addSale" /> -->
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
        customerVehicles: [
          {
            name: "",
            number: "",
            type: "",
            dateAdded: "",
          },
        ],
      },
      dateFrom: "",
      dateTo: "",
    };
  },

  methods: {
    addVehicle() {
      this.data.customerVehicles.push(this.vehicleArray());
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
      this.data.customerVehicles.splice(index, 1);
    },
  },

  created() {
    PumpService.getCustomerLedgerById(this.$route.params.id)
      .then((res) => {
        console.log(res);
        this.data=res.data
        this.data.customerVehicles.map(item=>{
          item.dateAddedLabel=moment(item.dateAdded).format('DD MMM YYYY')
        })
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