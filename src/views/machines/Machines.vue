<template>
  <div style="
      box-shadow: 0 0 20px #e1e1e1;
      padding: 32px;
      margin-top: 16px;
      padding-bottom: 48px;
    ">
    <Header title="Machines" />

    <div style="text-align: right">
      <q-btn color="primary" label="Add Machine" @click="addMachine" />
    </div>

    <table>
      <tr>
        <th>#</th>
        <th>Name</th>
        <th>Type</th>
        <th>Opening</th>
        <th>Rate</th>
        <th>Installation Date</th>
      </tr>
      <tr v-for="(machine, index) in machines" :key="index + '_machine'">
        <td>{{ index + 1 }}</td>
        <td>{{ machine.name }}</td>
        <td>{{ machine.type }}</td>
        <td>{{ machine.opening }}</td>
        <td>{{ machine.rate }}</td>
        <td>{{ machine.installationDate | date }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
import Header from "../../components/Header";
import { PumpService } from "../../services/PumpService";
export default {
  name: "Machines",

  components: {
    Header,
  },

  data() {
    return {
      machines: [],
    };
  },

  methods: {
    addMachine() {
      this.$router.push({ name: "add-machine" });
    },
  },

  created() {
    PumpService.getAllMachines()
      .then((res) => {
        this.machines = res.data;
      })
      .catch((err) => {
        console.log(err);
      });
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
  background-color: #4caf50;
  color: white;
}
</style>