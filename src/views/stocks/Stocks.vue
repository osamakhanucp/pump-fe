<template>
  <div>
    <Header title="Stocks" />

    <div style="text-align: right">
      <!-- <q-btn
        color="primary"
        label="Update Rate"
        @click="updateRate"
        style="margin-right: 8px"
      /> -->
      <q-btn color="primary" label="Add Stock" @click="addStock" />
    </div>

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
      <tr v-for="(stock, index) in stocks" :key="index + '_stock'">
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
        <td style="text-align: center; cursor: pointer"  @click="
              () => {
                updateRate(stock);
              }
            ">
          <span>
            <q-icon name="edit" />
          </span>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import Header from "../../components/Header";
import { PumpService } from "../../services/PumpService";
import moment from "moment";
export default {
  name: "Stocks",

  components: {
    Header,
  },

  data() {
    return {
      stocks: [],
    };
  },

  methods: {
    addStock() {
      this.$router.push({
        name: "update-rate",
        params: {
          add: true,
        },
      });
    },
    updateRate(stock) {
      this.$router.push({
        name: "update-rate",
        params: {
          stock: stock,
        },
      });
    },
  },

  created() {
    let date = new Date();
    PumpService.getStocks({
      date: moment(date).toISOString(),
    })
      .then((res) => {
        this.stocks = res.data;
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
  background-color: #059DDB;
  color: #FAFAFA;
}
</style>