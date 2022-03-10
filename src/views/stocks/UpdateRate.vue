<template>
  <div>
    <div>
      <Header :title="this.$route.params.add ? 'Add Rate' : 'Update Rate'" />
      <!-- <q-btn-toggle
        style="margin-top: 24px"
        v-model="data.status"
        push
        toggle-color="primary"
        :options="[
          { label: 'Active', value: 'active' },
          { label: 'Disabled', value: 'disabled' },
        ]"
      /> -->
      <div class="custom-grid" style="margin-top: 24px">
        <CInput
          label="Name"
          v-if="this.$route.params.add"
          v-model="data.stockType"
        />
        <CInput
          label="Stock Type"
          v-if="!this.$route.params.add"
          v-model="data.stockTypeName"
          readonly
        />
        <!-- <CSelect
          v-if="!this.$route.params.add"
          label="Stock Type"
          v-model="data.stockType"
          @on-select="selectStockType"
          option-value="name"
          option-label="name"
          :options="allStockTypes"
          :error="$v.data.stockType.$error"
        /> -->
        <CInput
          label="P. Rate"
          v-model="data.pRate"
          :error="$v.data.pRate.$error"
          :type="'number'"
        />
        <CInput
          label="S. Rate"
          v-model="data.sRate"
          :error="$v.data.sRate.$error"
          :type="'number'"
        />

        <CDatePicker
          v-model="data.activeDateLabel"
          :error="$v.data.activeDateLabel.$error"
          :range="false"
          @input="activeDateFunc"
        />

        <!-- <CSelect
        label="Status"
        v-model="status"
        @on-select="selectStatus"
        :options="[{ label: 'Active' }, { label: 'Disabled' }]"
      /> -->
        <!-- <div></div> -->
      </div>

      <div style="text-align: right; margin-top: 32px">
        <q-btn color="primary" label="Save" @click="addStock" />
      </div>
      <div style="border-bottom: 1px solid #e2e2e2; margin-top: 48px"></div>
        <div v-if="!this.$route.params.add">
        <div class="audit-trail">
          <q-btn-toggle
            style="margin-top: 48px"
            v-model="audit"
            toggle-color="primary"
            :options="[
              { label: 'History', value: 'history' },
              { label: 'Upcomings', value: 'upcomings' },
            ]"
          />
          <div v-if="audit == 'history'">
            <table>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>P. Rate</th>
                <th>S. Rate</th>
                <th>Entry Date</th>
                <th>Active Date</th>
                <th>Status</th>
              </tr>
              <tr
                v-for="(stock, index) in stockRatesHistory"
                :key="index + '_stock'"
              >
                <td>{{ index + 1 }}</td>
                <td>
                  <span v-if="stock && stock.stockTypeName">{{
                    stock.stockTypeName
                  }}</span>
                </td>
                <td>
                  <span v-if="stock && stock.pRate">{{ stock.pRate }}</span>
                </td>
                <td>
                  <span v-if="stock && stock.sRate">{{ stock.sRate }}</span>
                </td>
                <td>
                  <span v-if="stock && stock.entryDate">{{
                    stock.entryDate | date
                  }}</span>
                </td>
                <td>
                  <span v-if="stock && stock.activeDate">{{
                    stock.activeDate | date
                  }}</span>
                </td>
                <td>
                  <span v-if="stock && stock.status">{{ stock.status }}</span>
                </td>
              </tr>
            </table>
          </div>
          <div v-if="audit == 'upcomings'">
            <table>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>P. Rate</th>
                <th>S. Rate</th>
                <th>Entry Date</th>
                <th>Active Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
              <tr
                v-for="(stock, index) in stockRatesUpcoming"
                :key="index + '_stock'"
              >
                <td>{{ index + 1 }}</td>
                <td>
                  <span v-if="stock && stock.stockTypeName">{{
                    stock.stockTypeName
                  }}</span>
                </td>
                <td>
                  <span v-if="stock && stock.pRate">{{ stock.pRate }}</span>
                </td>
                <td>
                  <span v-if="stock && stock.sRate">{{ stock.sRate }}</span>
                </td>
                <td>
                  <span v-if="stock && stock.entryDate">{{
                    stock.entryDate | date
                  }}</span>
                </td>
                <td>
                  <span v-if="stock && stock.activeDate">{{
                    stock.activeDate | date
                  }}</span>
                </td>
                <td>
                  <span v-if="stock && stock.status">{{ stock.status }}</span>
                </td>
                <td style="text-align: center">
                  <span
                    style="cursor: pointer"
                    @click="
                      () => {
                        updateRate(stock);
                      }
                    "
                  >
                    <q-icon name="edit" />
                  </span>
                </td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "../../components/Header";
import CDatePicker from "../../components/CDatePicker";
import CInput from "../../components/CInput";
import CSelect from "../../components/CSelect";
import { PumpService } from "../../services/PumpService";
import moment from "moment";
import { required } from "vuelidate/lib/validators";
export default {
  name: "AddStock",

  components: {
    Header,
    CInput,
    CSelect,
    CDatePicker,
  },

  data() {
    return {
      data: {
        name: "",
        status: "active",
        pRate: "",
        sRate: "",
        stockTypeId: "",
        activeDateLabel: "",
      },
      allStockTypes: [],
      audit: "history",
      stockRatesHistory: [],
      stockRatesUpcoming: [],
      stockName: "",
    };
  },

  methods: {
    selectStockType(val) {
      this.data.stockTypeId = val.id;
    },
    addStock() {
      this.$v.data.$touch();
      if (this.$v.data.$invalid) {
        return;
      }
      let date = new Date();
      this.data.entryDate = moment(date).toISOString();

      this.data.activeDate = moment(this.data.activeDateLabel).toISOString();
      if (parseFloat(this.data.pRate) > parseFloat(this.data.sRate)) {
        alert("Purchase rate cannot be greater than sale rate");
        return;
      }
      // return;
      if (this.$route.params.add) {
        // for add
        PumpService.addStock({ id: "", name: this.data.stockType })
          .then((res) => {
            if (res.data.createdId) {
              this.data.stockTypeId = res.data.createdId;
              PumpService.updateRate(this.data)
                .then((res) => {
                  if (res.data.code === "S001") {
                    this.$router.push({ name: "stocks" });
                  }
                  console.log(res);
                })
                .catch((err) => {
                  console.log(err);
                });
            }
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        PumpService.updateRate(this.data)
          .then((res) => {
            if (res.data.code === "S001") {
              this.$router.push({ name: "stocks" });
            }
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    updateRate(stock) {
      console.log(stock);
    },
    activeDateFunc(val) {
      console.log(val);
      this.data.activeDateLabel = val;
    },
  },

  created() {
    if (this.$route.params.stock) {
      this.data = this.$route.params.stock;
      this.stockName = this.data.stockTypeName;
      this.data.activeDateLabel = moment(this.data.activeDate).format(
        "YYYY/MM/DD"
      );
      let date = new Date();
      PumpService.stockRateHistoryUpcoming(
        { date: moment(date).toISOString() },
        this.data.stockTypeId
      )
        .then((res) => {
          // this.allStockTypes = res.data;
          this.stockRatesHistory = res.data.stockRatesHistory;
          let currentStockIndex = -1;
          for (let i = 0; i < this.stockRatesHistory.length; i++) {
            if(this.stockRatesHistory[i].id === this.data.id) {
              currentStockIndex = i;
            }
            this.stockRatesHistory[i].stockTypeName = this.stockName;
          }
          this.stockRatesHistory.splice(currentStockIndex, 1)

          this.stockRatesUpcoming = res.data.stockRatesUpcoming;
          currentStockIndex = -1;
          for (let i = 0; i < this.stockRatesUpcoming.length; i++) {
            if(this.stockRatesUpcoming[i].id === this.data.id) {
              currentStockIndex = i;
            }
            this.stockRatesUpcoming[i].stockTypeName = this.stockName;
          }
          this.stockRatesUpcoming.splice(currentStockIndex, 1)
        })
        .catch((err) => {
          console.log(err);
        });
    }
  },

  validations: function () {
    return {
      data: {
        // stockType: { required },
        pRate: { required },
        sRate: { required },
        activeDateLabel: { required },
      },
    };
  },

  computed: {},
};
</script>

<style lang="scss" scoped>
.custom-grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
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