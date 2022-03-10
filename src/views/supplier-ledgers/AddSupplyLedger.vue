<template>
  <div>
    <Header title="Add a Supplier Ledger" />
    <div class="custom-grid" style="margin-top: 24px">
      <CInput
        label="Name"
        v-model="data.supplierName"
        :error="$v.data.supplierName.$error"
      />
      <CDatePicker
        label="Date Added"
        v-model="data.registrationDate"
        :range="false"
        :error="$v.data.registrationDate.$error"
      />
    </div>
    <CInput
      label="Address"
      v-model="data.address"
      :error="$v.data.address.$error"
    />
    <div style="text-align: right">
      <q-btn color="primary" label="Add Ledger" @click="addLedger" />
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
  name: "AddLedger",

  components: {
    Header,
    CInput,
    CSelect,
    CDatePicker,
  },

  data() {
    return {
      allStockTypes: [],
      data: {
        supplierName: '',
        address: '',
        registrationDate: '',
      },
    };
  },

  methods: {
    addLedger() {
      this.$v.data.$touch();
      if (this.$v.data.$invalid) {
        return;
      }
      this.data.registrationDate = moment(
        this.data.registrationDate
      ).toISOString();
      console.log("data : ", this.data);
      PumpService.addSupplierLedgerEntry(this.data)
        .then((res) => {
          console.log(res);
          this.$router.push({ name: "supplier-ledgers" });
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },

  created() {
    let date = new Date();
    PumpService.getStocks({
      date: moment(date).toISOString(),
    })
      .then((res) => {
        this.allStockTypes = res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  },

  validations: function () {
    return {
      data: {
        supplierName: { required },
        address: { required },
        registrationDate: { required },
      },
    };
  },
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
</style>