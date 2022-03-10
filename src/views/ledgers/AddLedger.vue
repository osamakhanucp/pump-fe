<template>
  <div>
    <Header title="Add a Ledger" />
    <div class="custom-grid" style="margin-top: 24px">
      <CInput
        label="Name"
        v-model="data.customerName"
        :error="$v.data.customerName.$error"
      />
      <CInput
        label="Contact Person"
        v-model="data.contactPerson"
        :error="$v.data.contactPerson.$error"
      />
      <CInput
        label="Contact"
        v-model="data.contactNo"
        :error="$v.data.contactNo.$error"
      />
    </div>
    <CInput
      label="Address"
      v-model="data.address"
      :error="$v.data.address.$error"
    />
    <span style="font-weight: bold">Vehicles</span>
    <div
      class="vehicle-grid"
      v-for="(vehicle, index) in data.customerVehicles"
      :key="index"
    >
      <CInput
        label="Name"
        v-model="vehicle.name"
        :error="$v.data.customerVehicles.$each[index].name.$error"
      />
      <CInput
        label="Number"
        v-model="vehicle.number"
        :error="$v.data.customerVehicles.$each[index].number.$error"
      />
      <CSelect
        label="Type"
        v-model="vehicle.type"
        option-value="stockTypeName"
        option-label="stockTypeName"
        :options="allStockTypes"
        @on-select="
          (val) => {
            selectVehicle(val, index);
          }
        "
        :error="$v.data.customerVehicles.$each[index].type.$error"
      />
      <CDatePicker
        label="Date Added"
        v-model="vehicle.dateAddedLabel"
        :range="false"
        :error="$v.data.customerVehicles.$each[index].dateAddedLabel.$error"
        @input="
          (val) => {
            selectDate(val, index);
          }
        "
      />
      <div>
        <q-btn
          v-if="data.customerVehicles.length > 1"
          color="primary"
          flat
          @click="
            () => {
              deleteVehicle(index);
            }
          "
          icon="delete"
        />
      </div>
      <div>
        <q-btn
          flat
          color="primary"
          icon="add"
          @click="addVehicle"
          v-if="index === data.customerVehicles.length - 1"
        />
      </div>
    </div>
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
        customerVehicles: [
          {
            name: "",
            number: "",
            type: "",
            dateAdded: "",
            dateAddedLabel: "",
            stockTypeId: "",
          },
        ],
      },
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
        dateAddedLabel: "",
        stockTypeId: "",
      };
    },
    deleteVehicle(index) {
      this.data.customerVehicles.splice(index, 1);
    },
    selectVehicle(val, index) {
      // console.log(val);
      // console.log(index);
      this.data.customerVehicles[index].stockTypeId=val.stockTypeId;

    },
    selectDate(val, index) {
      this.data.customerVehicles[index].dateAdded = moment(
        this.data.customerVehicles[index].dateAddedLabel
      ).toISOString();
      console.log(index);
    },
    addLedger() {
      this.$v.data.$touch();
      if (this.$v.data.$invalid) {
        return;
      }
      let date = new Date();
      this.data.dateCreated = moment(date).toISOString();
      PumpService.addCustomerLedger(this.data)
        .then((res) => {
          console.log(res);
          if (res.data.code === "S001") {
            this.$router.push({
              name: "ledgers",
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
  },

  validations: function () {
    return {
      data: {
        customerName: { required },
        contactPerson: { required },
        contactNo: { required },
        address: { required },
        customerVehicles: {
          $each: {
            name: { required },
            number: { required },
            type: { required },
            dateAddedLabel: { required },
          },
        },
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