<template>
  <div>
    <Header title="Add a Ledger" />
    <div class="custom-grid" style="margin-top: 24px">
      <CInput label="Name" v-model="data.accountName" />
      <CInput label="Account Number" v-model="data.accountNumber" />
      <CInput label="Status" v-model="data.status" />
      <CInput label="Account Title" v-model="data.accountTitle" />
      <CInput label="Contact" v-model="data.contact" />
      <CInput label="Opening Balance" v-model="data.balance" />
    </div>
    <CInput label="Branch Address" v-model="data.branchAddress" />
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
      data: {},
    };
  },

  methods: {
    addLedger() {
      let date = new Date();
      this.data.createdAt = moment(date).toISOString();
      PumpService.addBankLedger(this.data)
        .then((res) => {
          console.log(res);
          if (res.data.code === "S001") {
            this.$router.push({
              name: "bank-ledgers",
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },

  created() {},

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
</style>