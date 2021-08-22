<template>
  <!-- <div style="padding-bottom: 48px"> -->

  <div
    style="
      box-shadow: 0 0 20px #e1e1e1;
      padding: 32px;
      margin-top: 16px;
      padding-bottom: 48px;
    "
  >
    <Header title="Meter Reading" />
    <div
      style="display: grid; grid-template-columns: 1fr 1fr 1fr; column-gap: 8px"
    >
      <CDatePicker v-model="dateLabel" @input="dateFilter" :range="false" />
      <div>
        <q-btn style="margin-top: 2px" color="primary" label="Download PDF" />
      </div>
      <div></div>
    </div>
    <table>
      <tr>
        <th>#</th>
        <th>Name</th>
        <th>Fuel Type</th>
        <th>Rate</th>
        <th>Opening</th>
        <th>Add Closing</th>
      </tr>
      <tr
        v-for="(reading, index) in readings.dailySaleNozzles"
        :key="index + '_reading'"
      >
        <td>{{ index + 1 }}</td>
        <td>{{ reading.name }}</td>
        <td>{{ reading.fuelType }}</td>
        <td>{{ reading.rate }}</td>
        <td>{{ reading.opening }}</td>
        <td>
          <CInput
            v-if="readings.canEdit"
            label="Closing"
            v-model="reading.closing"
          />
          <span v-if="!readings.canEdit">{{ reading.closing }}</span>
        </td>
      </tr>
    </table>
    <div style="text-align: right; margin-top: 16px" v-if="readings.canEdit">
      <q-btn color="primary" label="Add Readings" @click="addReadings" />
    </div>
  </div>
</template>

<script>
import Header from "../../components/Header";
import CInput from "../../components/CInput";
import CDatePicker from "../../components/CDatePicker";
import { PumpService } from "../../services/PumpService";
import moment from "moment";
export default {
  name: "MeterReading",

  components: {
    Header,
    CInput,
    CDatePicker,
  },

  data() {
    return {
      readings: [],
      date: "",
    };
  },

  methods: {
    addReadings() {
      PumpService.addMeterReadings(this.readings)
        .then((res) => {
          console.log(res);
          if (res.data.code === "201") {
            this.readings = [];
            this.getMeterReadings();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    dateFilter() {
      console.log(this.date);
      let date;
      if (this.dateLabel) {
        date = moment(this.dateLabel).format("DD MMM YYYY");
        this.dateLabel= moment(date).format("DD MMM YYYY")
      } else {
        date = "";
      }
      this.readings = [];
      console.log(date);
      PumpService.getMeterReadings({date:date})
        .then((res) => {
          this.readings = res.data;
          this.readings.entryDate=date;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getMeterReadings() {
      let date = new Date();
      this.date = moment(date).format("DD MMM YYYY");
      this.dateLabel= moment(this.date).format("DD MMM YYYY")
      PumpService.getMeterReadings({date:this.date})
        .then((res) => {
          this.readings = res.data;
          this.readings.entryDate=this.date
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },

  created() {
    this.getMeterReadings();
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
  background-color: #4caf50;
  color: white;
}
.q-field--with-bottom {
  padding-bottom: 0px !important;
}
</style>