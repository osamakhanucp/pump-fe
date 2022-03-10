<template>
  <div>
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
        <th>Actions</th>
      </tr>
      <tr v-for="(machine, index) in machines" :key="index + '_machine'">
        <td>{{ index + 1 }}</td>
        <td><CInput
            v-if="edit && selectedMachineIndex === index"
            label="Machine Name"
            v-model="name"
          />
          <span v-else>{{ machine.name }}</span></td>
        <td>{{ machine.type }}</td>
        <td>{{ machine.opening }}</td>
        <td>{{ machine.rate }}</td>
        <td>{{ machine.installationDate | date }}</td>
        <td style="text-align: center; cursor: pointer">
          <span v-if="edit && selectedMachineIndex===index">
            <q-icon name="done" size="md" color="positive" @click="editMachine" />
            <q-icon name="cancel" size="md" color="negative" @click="cancelEdit" />
          </span>
          <span v-else>
            <span style="margin-right=15px">
              <q-icon name="delete" size="md" color="negative" @click="deleteDialog(index)" />
            </span>
            <span style="margin-left=15px">
              <q-icon name="edit" size="md" @click="enableEdit(index)" />
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
          <q-btn flat label="Delete" color="primary" @click="deleteReading()" v-close-popup />
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
  name: "Machines",

  components: {
    CInput,
    Header,
  },

  data() {
    return {
      machines: [],
      selectedMachineIndex: -1,
      confirm:false,
      edit: false,
      name:''
    };
  },

  methods: {
    getAllMachines() {
      PumpService.getAllMachines()
      .then((res) => {
        this.machines = res.data;
      })
      .catch((err) => {
        console.log(err);
      });
    },
    addMachine() {
      this.$router.push({ name: "add-machine" });
    },
    deleteDialog(index) {
      this.confirm = true;
      this.selectedMachineIndex = index;

    },
    deleteReading() {
      let machine = {
        id : this.machines[this.selectedMachineIndex].id, 
        name : this.machines[this.selectedMachineIndex].name,
        type : this.machines[this.selectedMachineIndex].type,
        stockTypeId : this.machines[this.selectedMachineIndex].stockTypeId,
        rate : this.machines[this.selectedMachineIndex].rate, 
        opening : this.machines[this.selectedMachineIndex].opening,
        installationDate : this.machines[this.selectedMachineIndex].installationDate
      }
      console.log("machine : ",machine)
      PumpService.deleteNozzleEntry(this.machines[this.selectedMachineIndex])
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err)
      })
    },
    enableEdit(index) {
      this.selectedMachineIndex = index;
      this.edit = true;
      console.log(this.machines[this.selectedMachineIndex]);
      this.name = this.machines[this.selectedMachineIndex].name;
    },
    cancelEdit(){
      this.edit = false;
    },
    editMachine() {
      let machine = this.machines[this.selectedMachineIndex];
      machine.name = this.name;
      PumpService.editNozzleEntry(machine)
      .then((res) => {
        this.edit = false;
        this.getAllMachines();
      })
      .catch((err) => {
        console.log(err)
      });
    }
    
  },

  created() {
    this.getAllMachines();
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