<template>
  <div>
    <Header title="View Supplier Ledger" />
    <div class="custom-grid" style="margin-top: 24px">
        <CInput label="Supplier Name" v-model="supplierLedger.supplierName" readonly />
        <CInput label="Date Registration" range v-model="supplierLedger.registrationDate" readonly/>
    </div>
    <CInput label="Address" v-model="supplierLedger.address" readonly />
    <div class="custom-grid"></div>
    <br />
    <span style="font-weight: bold">Add Ledger Entry</span>
    <div class="custom-grid">
        <CSelect
          label="Type"
          v-model="ledgerItem.stockType"
          :options="stockTypes"
          @on-select="selectStockType"
          option-value="stockTypeName"
          option-label="stockTypeName"
          :error="$v.ledgerItem.stockId.$error"
        /> 
         <CDatePicker
          label="Registration Date"
          v-model="ledgerItem.entryDate"
          :range="false"
          :error="$v.ledgerItem.entryDate.$error"
        />
        <CInput label="Rate" v-model="ledgerItem.perLiterPrice" readonly />
        <CInput
          label="Quantity"
          v-model="ledgerItem.quantity"
          :error="$v.ledgerItem.quantity.$error"
          :type="'number'"
          @input="quantityEntered"
        />
        <CInput
          label="Total Price"
          v-model="ledgerItem.totalPrice"
          :error="$v.ledgerItem.totalPrice.$error"
          :type="'number'"
          readonly
        />
      </div>
      <div style="text-align: right; margin-top: 32px">
        <q-btn color="primary" label="Add Ledger Item" @click="addLedgerItem" />
      </div>
    <!-- <div
      class="vehicle-grid"
      v-for="(vehicle, index) in data.customerVehicles"
      :key="index"
    >
      <CInput label="Name" v-model="vehicle.name" readonly />
      <CInput label="Number" v-model="vehicle.number" readonly />
      <CInput label="Type" v-model="vehicle.type" readonly />
      <CDatePicker label="Date Added" v-model="vehicle.dateAddedLabel" readonly />
      <div> -->
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
      <!-- </div>
      <div> -->
        <!-- <q-btn
          flat
          color="primary"
          icon="add"
          @click="addVehicle"
          v-if="index === data.customerVehicles.length - 1"
        /> -->
      <!-- </div>
    </div> -->
    <br />
    <span style="font-weight: bold">Ledgers</span>
    <!-- <div class="custom-grid"> -->
      <!-- <CDatePicker label="Date From" range v-model="dateFrom" />
      <CDatePicker label="Date To" range v-model="dateTo" /> -->
    <!-- </div> -->
    <!-- <q-date label="Date range" v-model="dateRange" range multiple /> -->
    <table>
      <tr>
        <th>#</th>
        <th>Date</th>
        <th>Type</th>
        <th>Rate</th>
        <th>Quantity(ltr)</th>
        <th>Total Price</th>
        <th>Action</th>
      </tr>
      <tr v-for="(ledgerItem, index) in ledgerItems" :key="index + 'ledger'">
        <td>{{ index + 1 }}</td>
        <td>{{ ledgerItem.entryDate | date }}</td>
        <td>{{ ledgerItem.perLiterPrice }}</td>
        <td>{{ ledgerItem.perLiterPrice }}</td>
        <td>{{ ledgerItem.quantity }}</td>
        <td>{{ ledgerItem.totalPrice }}</td>
        <td style="text-align: center; cursor: pointer"  @click="deleteDialog(index)">
            <q-icon name="delete" size="md" />
        </td>
      </tr>
    </table> 
    <div style="text-align: right">
      <!-- <q-btn color="primary" label="Add Sale" @click="addSale" /> -->
    </div>
    <q-dialog v-model="confirm" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="delete" color="negative" text-color="white" />
          <span class="q-ml-sm">Are you sure you want to delete this entry?</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" v-close-popup />
          <q-btn flat label="Delete" color="primary" @click="deleteLedgerItem()" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
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
  name: "ViewLedger",

  components: {
    Header,
    CInput,
    CSelect,
    CDatePicker,
  },

  data() {
    return {
        confirm: false,
        supplierLedger: {},
        selectedLedgerItemIndex: -1,
        ledgerItems: [],
        ledgerItem: {
            stockId: "",
            quantity: "",
            totalPrice: "",
            perLiterPrice: "",
            supplierLedgerId: "",
            entryDate: "",
            stockType:""
        },
        dateFrom: "",
        dateTo: "",
        stockTypes: [],

    };
  },

  methods: {
    quantityEntered() {
        this.ledgerItem.totalPrice = this.ledgerItem.quantity * this.ledgerItem.perLiterPrice;
    },
    selectStockType(val) {
      this.ledgerItem.perLiterPrice = val.pRate;
      this.ledgerItem.stockId=val.stockTypeId;
      console.log("val : ",this.ledgerItem.stockId);

    },
    addLedgerItem() {
        this.ledgerItem.entryDate = moment(this.ledgerItem.entryDate).toISOString();
        console.log("ledger item : ", this.ledgerItem);
        let ledgerItemList = [];
        ledgerItemList.push(this.ledgerItem);
        PumpService.addSupplierLedgerItem(this.supplierLedger.id, ledgerItemList)
        .then((res) => {
            this.ledgerItem.stockId = '';
            this.ledgerItem.quantity = '';
            this.ledgerItem.totalPrice = '';
            this.ledgerItem.perLiterPrice = '';
            this.ledgerItem.entryDate = '';
            this.ledgerItem.stockType = '';
            this.getAllLedgerItems();
        })
        .catch((err) => {
        console.log(err);
      });
    },
    getAllLedgerItems() {
        PumpService.getSupplierLedgerItems(this.$route.params.id)
        .then((res) => {
            this.ledgerItems = res.data;
        })
        .catch((err) => {
        console.log(err);
      });
    },
    deleteDialog(index) {
      this.confirm = true;
      this.selectedLedgerItemIndex = index;
    },
    deleteLedgerItem() {
        PumpService.deleteSupplierLedgerItem(this.$route.params.id, this.ledgerItems[this.selectedLedgerItemIndex].id)
        .then((res) => {
            this.getAllLedgerItems();
        })
        .catch((err) => {
        console.log(err);
      });
    }
  },

  created() {
    let date = new Date();
    PumpService.getSupplierLedgerById(this.$route.params.id)
      .then((res) => {
        console.log("ledger : ",res);
        this.supplierLedger=res.data
        this.ledgerItem.supplierLedgerId = this.supplierLedger.id;
        this.supplierLedger.registrationDate = moment(this.supplierLedger.registrationDate).toISOString('ddMMMYYYY');
      })
      .catch((err) => {
        console.log(err);
      });
    PumpService.getStocks({
      date: moment(date).toISOString(),
    })
      .then((res) => {
        this.stockTypes = res.data;
        console.log("stockTypes : ", this.stockTypes);
      })
      .catch((err) => {
        console.log(err);
      });
      this.getAllLedgerItems();
  },

  validations: function () {
    return {
         ledgerItem: {
        stockId: { required },
        quantity: { required },
        totalPrice: { required },
        perLiterPrice: { required },
        supplierLedgerId: { required },
        entryDate: { required }
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