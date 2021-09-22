<template>
  <div>
    <div>
      <Header title="Add a Machine" />
      <div
        style="
          display: grid;
          grid-template-columns: 1fr auto;
          padding: 16px 0px;
          align-items: center;
        "
      ></div>
      <div class="nozzles-grid">
        <CInput
          label="Name"
          v-model="nozzle.name"
          :error="$v.nozzle.name.$error"
        />
        <CSelect
          label="Type"
          v-model="nozzle.type"
          :options="stockTypes"
          @on-select="selectStockType"
          option-value="stockTypeName"
          option-label="stockTypeName"
          :error="$v.nozzle.type.$error"
        />
        <CInput label="Rate" v-model="nozzle.rate" readonly />
        <CInput
          label="Opening"
          v-model="nozzle.opening"
          :error="$v.nozzle.opening.$error"
        />
        <CDatePicker
          label="Installation Date"
          v-model="nozzle.date"
          :range="false"
          :error="$v.nozzle.date.$error"
        />
      </div>
      <!-- </div> -->
      <div style="text-align: right; margin-top: 32px">
        <q-btn color="primary" label="Add Machine" @click="addMachine" />
      </div>
    </div>
  </div>
</template>

<script>
import Header from "../../components/Header";
import CInput from "../../components/CInput";
import CDatePicker from "../../components/CDatePicker";
import CSelect from "../../components/CSelect";
import { PumpService } from "../../services/PumpService";
import moment from "moment";
import { required } from "vuelidate/lib/validators";
export default {
  name: "AddMachine",

  components: {
    Header,
    CInput,
    CSelect,
    CDatePicker,
  },

  data() {
    return {
      name: "",
      type: "",
      nozzle: {
        name: "",
        type: "",
        rate: "",
        opening: "",
        date: "",
        installationDate: "",
        stockTypeId:""
      },
      stockTypes: [],
    };
  },

  methods: {
    addMachine() {
      this.$v.nozzle.$touch();
      if (this.$v.nozzle.$invalid) {
        return;
      }
      this.nozzle.installationDate = moment(this.nozzle.date).toISOString();
      PumpService.addNozzle(this.nozzle)
        .then((res) => {
          if (res.data.code === "201") {
            this.$router.push({ name: "machines" });
          }
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    selectStockType(val) {
      this.nozzle.rate = val.sRate;
      this.nozzle.stockTypeId=val.stockTypeId;
    },
  },

  created() {
    let date = new Date();
    PumpService.getStocks({
      date: moment(date).toISOString(),
    })
      .then((res) => {
        this.stockTypes = res.data;
      })
      .catch((err) => {
        console.log(err);
      });
    // PumpService.getAllStockTypes()
    //   .then((res) => {
    //     console.log(res);
    //     this.stockTypes = res.data;
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  },

  validations: function () {
    return {
      nozzle: {
        name: { required },
        type: { required },
        opening: { required },
        date: { required },
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
  row-gap: 16px;
}
.nozzles-grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  column-gap: 8px;
  row-gap: 16px;
  align-items: start;
}
</style>