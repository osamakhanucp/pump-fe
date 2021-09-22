<template>
  <div>
    <Header title="Add a Sale" />
    <div class="custom-grid" style="margin-top: 24px">
      <CSelect
        label="Customer"
        v-model="data.customer"
        @on-select="selectCustomer"
        option-value="customerName"
        option-label="customerName"
        :options="customers"
        :error="$v.data.customer.$error"
      />
      <CSelect
        label="Vehicle"
        v-model="data.vehicle"
        @on-select="selectVehicle"
        option-value="displayName"
        option-label="displayName"
        :options="allVehicles"
        :error="$v.data.vehicle.$error"
      />
        <!-- @on-select="selectStockType" -->
      <!-- <CSelect
        label="Stock Type"
        v-model="data.stockType"
        option-value="stockTypeName"
        option-label="stockTypeName"
        :options="allStockTypes"
        :error="$v.data.stockType.$error"
      /> -->
      <CInput
        label="Stock Type"
        v-model="data.stockType"
        readonly
      />

      <CInput
        label="Quantity (L)"
        v-model="data.quantity"
        :error="$v.data.quantity.$error"
      />

      <CInput
        label="Amount (PKR)"
        v-model="sRate"
        readonly
      />
        <!-- :error="$v.sRate.$error" -->
      <div></div>
    </div>

    <div style="text-align: right">
      <q-btn color="primary" label="Add Sale" @click="addSale" />
    </div>
  </div>
</template>

<script>
import Header from "../../components/Header";
import CInput from "../../components/CInput";
import CSelect from "../../components/CSelect";
import { PumpService } from "../../services/PumpService";
import moment from "moment";
import { required } from "vuelidate/lib/validators";
export default {
  name: "AddDailySale",

  components: {
    Header,
    CInput,
    CSelect,
  },

  data() {
    return {
      allVehicles: [],
      customers: [],
      data: {},
      allStockTypes: [],
    };
  },

  methods: {
    selectCustomer(val) {
      this.data.customerId = val.id;
      PumpService.getCustomerLedgerById(this.data.customerId)
        .then((res) => {
          console.log(res);
          this.allVehicles = res.data.customerVehicles;
          this.allVehicles.map((item) => {
            item.displayName = item.name + ", " + item.number;
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    selectVehicle(val) {
      this.data.vehicleId = val.id;
      this.data.stockTypeId= val.stockTypeId;
      this.data.stockType= val.type;
      for (let i = 0; i < this.allStockTypes.length; i++) {
        if(this.allStockTypes[i].stockTypeId===val.stockTypeId){

          this.data.sRate = this.allStockTypes[i].sRate;
        }
      }
      console.log(val)
    },
    // selectStockType(val) {
    //   this.data.stockTypeId = val.stockTypeId;
    //   this.data.sRate = val.sRate;
    // },
    addSale() {
      this.$v.data.$touch();
      if (this.$v.data.$invalid) {
        return;
      }
      let date = new Date();
      this.data.dateCreated = moment(date).toISOString();
      this.data.amount = this.sRate;
      PumpService.addSale(this.data)
        .then((res) => {
          console.log(res);
          if (res.data.code === "S001") {
            this.$router.push({
              name: "daily-sales",
            });
          }
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

    PumpService.getAllCustomerLedgers()
      .then((res) => {
        this.customers = res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  },

  validations: function () {
    return {
      data: {
        customer: { required },
        vehicle: { required },
        // stockType: { required },
        quantity: { required },
        // sRate: { required },
      },
    };
  },

  computed: {
    sRate() {
      return (
        (this.data.sRate ? this.data.sRate : 1) *
        (this.data.quantity ? this.data.quantity : 0)
      );
    },
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
</style>