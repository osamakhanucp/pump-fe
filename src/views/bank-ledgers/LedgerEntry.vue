<template>
  <div>
    <Header title="Add Ledger Entry" />
    <div class="custom-grid" style="margin-top: 24px">
      <CSelect
        label="Customer"
        v-model="data.customerLedgerName"
        :options="customerLedgersList"
        @on-select="selectCustomerLedger"
        option-value="customerName"
        option-label="customerName"
      />
      <CDatePicker label="Date" v-model="data.entryDateLabel" :range="false" />
      <CInput label="Description" v-model="data.description" />
      <CSelect
        label="Amount Type"
        v-model="data.amountType"
        :options="[{ label: 'Credit' }, { label: 'Debit' }]"
        option-value="label"
        option-label="label"
      />
      <CInput label="Amount" v-model="data.amount" />
    </div>

    <div style="text-align: right">
      <q-btn color="primary" label="Add Ledger Entry" @click="addLedgerEntry" />
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
      customerLedgersList: [],
      data: {},
    };
  },

  methods: {
    selectCustomerLedger(val) {
      this.data.customerLedgerId = val.id;
    },
    addLedgerEntry() {
      this.data.entryDate = moment(this.data.entryDateLabel).toISOString();
      if (this.data.amountType === "Credit") {
        this.data.credit = this.data.amount;
        this.data.debit = null;
      } else {
        this.data.debit = this.data.amount;
        this.data.credit = null;
      }
      this.data.bankLedgerId = this.$route.params.id;
      PumpService.addBankLedgerEntry(this.data)
        .then((res) => {
          console.log(res);
          if (res.data.code === "S001") {
            this.$router.push({
              name: "view-bank-ledger",
              params: { id: this.$route.params.id },
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },

  created() {
    PumpService.getAllCustomerLedgers()
      .then((res) => {
        this.customerLedgersList = res.data;
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
</style>