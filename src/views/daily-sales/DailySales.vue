<template>
  <!-- <div style="padding-bottom: 48px"> -->

  <div>
    <Header title="Daily Sales" />
    <div style="text-align: right">
      <q-btn color="primary" label="Add Daily Sale" @click="gotoAddDailySale" />
    </div>
    <div
      style="display: grid; grid-template-columns: 1fr 1fr 1fr; column-gap: 8px"
    >
      <CDatePicker v-model="date" @input="dateFilter" />
      <div>
        <q-btn style="margin-top: 2px" color="primary" label="Download PDF" />
      </div>
      <div></div>
    </div>
    <table>
      <tr>
        <th>#</th>
        <th>Customer</th>
        <th>Vehicle</th>
        <th>Fuel Type</th>
        <th>Quantity</th>
        <th>Amount</th>
      </tr>
      <tr
        v-for="(sale, index) in dailySales"
        :key="index + '_sale'"
      >
        <td>{{ index + 1 }}</td>
        <td>{{ sale.customerName }}</td>
        <td>{{ sale.vehicleName }}</td>
        <td>{{ sale.stockTypeName }}</td>
        <td>{{ sale.quantity }}</td>
        <td>{{ sale.amount }}</td>
      </tr>
    </table>
    <!-- <div style="text-align: right; margin-top: 16px" v-if="dailySales.canEdit">
      <q-btn color="primary" label="Add Daily Sale" @click="addDailySale" />
    </div> -->
  </div>
</template>

<script>
import Header from "../../components/Header";
import CInput from "../../components/CInput";
import CDatePicker from "../../components/CDatePicker";
import { PumpService } from "../../services/PumpService";
import moment from "moment";
export default {
  name: "DailySales",

  components: {
    Header,
    CInput,
    CDatePicker,
  },

  data() {
    return {
      dailySales: [],
      date:""
    };
  },

  methods: {
    gotoAddDailySale() {
      this.$router.push({
        name: "add-daily-sale",
      });
    },
   
    dateFilter() {
      console.log(this.date);
      let date;
      if (this.date) {
        date = moment(this.date).format("DD-MM-yyyy");
      } else {
        date = "";
      }
      // this.readings = [];
      console.log(date);
      // PumpService.getMeterReadings(date)
      //   .then((res) => {
      //     this.readings = res.data;
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //   });
    },
    getDailySales() {
      PumpService.getDailySales(0,1000)
        .then((res) => {
          this.dailySales = res.data.content;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },

  created() {
    this.getDailySales();
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
  //   background-color: #f2f2f2;
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
.q-field--with-bottom {
  padding-bottom: 0px !important;
}
</style>