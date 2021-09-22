<template>
  <div>
    <div>
      <Header title="Add a Stock" />
      <!-- <q-btn-toggle
        v-model="data.status"
        push
        toggle-color="primary"
        :options="[
          { label: 'Active', value: 'active' },
          { label: 'Disabled', value: 'disabled' },
        ]"
        dense
      /> -->
      <div class="custom-grid" style="margin-top: 24px">
        <CInput label="Name" v-model="data.name" :error="$v.data.name.$error" />

        <!-- <CSelect
        label="Status"
        v-model="status"
        @on-select="selectStatus"
        :options="[{ label: 'Active' }, { label: 'Disabled' }]"
      /> -->
        <!-- <div></div> -->
      </div>

      <div style="text-align: right; margin-top: 32px">
        <q-btn color="primary" label="Add Stock" @click="addStock" />
      </div>
    </div>
  </div>
</template>

<script>
import Header from "../../components/Header";
import CInput from "../../components/CInput";
import CSelect from "../../components/CSelect";
import { PumpService } from "../../services/PumpService";
import { required } from "vuelidate/lib/validators";
export default {
  name: "AddStock",

  components: {
    Header,
    CInput,
    CSelect,
  },

  data() {
    return {
      // , status: "active" 
      data: { id:"", name: "" }
    };
  },

  methods: {
    addStock() {
      this.$v.data.$touch();
      if (this.$v.data.$invalid) {
        return;
      }
      PumpService.addStock(this.data)
        .then((res) => {
          if (res.data.code === "S001") {
            this.$router.push({ name: "stocks" });
          }
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },

  created() {},

  validations: function () {
    return {
      data:{
        name:{required}
      }
    };
  },

  computed: {},
};
</script>

<style lang="scss" scoped>
.custom-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 8px;
  row-gap: 16px;
}
.nozzles-grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr auto;
  column-gap: 8px;
  row-gap: 16px;
  align-items: start;
}
</style>