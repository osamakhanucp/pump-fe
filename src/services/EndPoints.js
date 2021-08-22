// let host = "http://52.77.209.169";
let host = "http://"+window.location.hostname;

// let host = window.location.hostname;
// if (process.env.VUE_APP_ENV === "dev") {
//   host = "app.erohal.io";
// }

// if (process.env.VUE_APP_SSL === "1") {
//   host = "https://" + host;
// } else {
//   host = "http://" + host;
// }
// create base urls

const authServiceUrl = host + process.env.VUE_APP_AUTH_SERVICE_URL;
const pumpServiceUrl = host + process.env.VUE_APP_PUMP_SERVICE_URL;

const auth = authServiceUrl;
const pump = pumpServiceUrl + "/pumpservice";
const rates = pumpServiceUrl + "/rates";
const sales = pumpServiceUrl + "/sales";

const stocks = pumpServiceUrl + "/stocks";
const expenses = pumpServiceUrl + "/expenses";
const customerLedger = pumpServiceUrl + "/customer-ledger";
const bankLedger = pumpServiceUrl + "/bank-ledger";

export default {
  authService: {
    auth: auth + "/authenticate"
  },
  pumpService: {
    machines: pump + "/nozzles",
    addMachine: pump + "/addMachine",
    addNozzle: pump + "/addNozzle",
    dailySales: pump + "/dailySaleTemplate",
    addDailySale: pump + "/addDailySale",
    addMeterReading:pump + "/addMeterReading",
    meterReadingTemplate: pump + "/meterReadingTemplate",
    authenticate: pump + "/authenticate",
    getRates: rates + "/getRates",
    addRate: rates + "/addRate",
    stockRateHistoryUpcoming:stocks,
    sales: sales,
    stocks: stocks,
    expenses: expenses,
    customerLedger: customerLedger,
    bankLedger: bankLedger

  },

};