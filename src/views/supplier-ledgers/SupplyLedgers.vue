<template>
  <div>
    <Header title="Supply Ledgers" />

    <div
      style="text-align: right;"
    >
      <!-- <div style="text-align: left">
        <q-btn color="primary" label="Generate Bill" @click="generateBill" />
      </div> -->

      <div>
        <q-btn color="primary" label="Add Ledger" @click="addLedger" />
      </div>
    </div>

    <table>
      <tr>
        <th>#</th>
        <th>Supplier Name</th>
        <th>Registration Date</th>
        <th>Actions</th>
      </tr>
      <tr v-for="(ledger, index) in ledgers" :key="index + 'ledger'" >
        <td>{{ index + 1 }}</td>
        <td><CInput
            v-if="edit && selectedLedgerIndex === index"
            label="Supplier Name"
            v-model="name"
          />
          <span v-else>{{ ledger.supplierName }}</span></td>
        <td>{{ ledger.registrationDate | date }}</td>
        <td style="text-align: center; cursor: pointer">
          <span v-if="edit && selectedLedgerIndex===index">
            <q-icon name="done" size="md" color="positive" @click="editSupplierLedger" />
            <q-icon name="cancel" size="md" color="negative" @click="cancelEdit" />
          </span>
          <span v-else>
            <span style="margin-right=15px"> 
              <q-icon name="delete" size="md" color="negative" @click="deleteDialog(index)" />
            </span>
            <span style="margin-left=15px">
              <q-icon name="edit" size="md" @click="enableEdit(index)" />
            </span>
            <span style="margin-left=15px">
              <q-icon name="visibility" size="md" @click="()=>{openLedger(ledger)}" />
            </span>
          </span>
        </td>
      </tr>
    </table>
    <q-dialog v-model="confirm" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="delete" color="negative" text-color="white" />
          <span class="q-ml-sm">Are you sure you want to delete this entry?</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" v-close-popup />
          <q-btn flat label="Delete" color="primary" @click="deleteSupplierLedger()" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import Header from "../../components/Header";
import CInput from "../../components/CInput";
import { PumpService } from "../../services/PumpService";
export default {
  name: "Ledgers",

  components: {
    Header,
    CInput
  },

  data() {
    return {
      ledgers: [],
      edit: false,
      confirm: false,
      selectedLedgerIndex: -1,
    };
  },

  methods: {
    getAllSupplierLedgers() {
      PumpService.getSupplierLedgers()
      .then((res) => {
        this.ledgers = res.data;
      })
      .catch((err) => {
        console.log(err);
      });
    },
    addLedger() {
      this.$router.push({ name: "add-supplier-ledger" });
    },
    generateBill() {
      console.log("GENRATE BILL");
    },
    openLedger(val){
      console.log(val)
      this.$router.push({
        name: "view-supplier-ledger",
        params: { id: val.id },
      });
    },
    deleteDialog(index) {
      this.confirm = true;
      this.selectedLedgerIndex = index;

    },
    enableEdit(index) {
      this.selectedLedgerIndex = index;
      this.edit = true;
      console.log(this.ledgers[this.selectedLedgerIndex]);
      this.name = this.ledgers[this.selectedLedgerIndex].supplierName;
    },
    cancelEdit(){
      this.edit = false;
    },
    editSupplierLedger() {
      let supplierLedger = this.ledgers[this.selectedLedgerIndex];
      supplierLedger.supplierName = this.name;
      PumpService.editSupplierLedgers(supplierLedger)
      .then((res) => {
        this.edit = false;
        this.getAllSupplierLedgers();
      })
      .catch((err) => {
        console.log(err);
      });
    }, 
    deleteSupplierLedger() {
      PumpService.deleteSupplierLedger(this.ledgers[this.selectedLedgerIndex].id)
      .then((res) => {
        this.confirm = false;
        this.getAllSupplierLedgers();
      })
      .catch((err) => {
        console.log(err);
      });
    }
  },

  created() {
    this.getAllSupplierLedgers();
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