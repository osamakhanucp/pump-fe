import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
    {
        path: "/login",
        name: "login",

        component: () =>
            import("../views/auth/Login.vue")
    },
    {
        path: "/",
        component: () =>
            import("../views/Index.vue"),
        children: [
            {
                path: "/dashboard",
                name: "dashboard",
                component: () =>
                    import("../views/dashboard/Dashboard.vue")
            },
            {
                path: "/machines",
                component: () =>
                    import("../views/machines/Index.vue"),
                children: [
                    {
                        path: "",
                        name: "machines",
                        component: () =>
                            import("../views/machines/Machines.vue"),
                    },
                    {

                        path: "add-machine",
                        name: "add-machine",
                        component: () =>
                            import("../views/machines/AddMachine.vue"),

                    }
                ]
            },
            {
                path: "/meter-reading",
                component: () =>
                    import("../views/meter-reading/Index.vue"),
                children: [
                    {
                        path: "",
                        name: "meter-reading",
                        component: () =>
                            import("../views/meter-reading/MeterReading.vue"),
                    }
                ]
            },

            {
                path: "/stocks",
                component: () =>
                    import("../views/stocks/Index.vue"),
                children: [
                    {
                        path: "",
                        name: "stocks",
                        component: () =>
                            import("../views/stocks/Stocks.vue"),
                    },
                    {

                        path: "add-stock",
                        name: "add-stock",
                        component: () =>
                            import("../views/stocks/AddStock.vue"),

                    },
                    {

                        path: "update-rate",
                        name: "update-rate",
                        component: () =>
                            import("../views/stocks/UpdateRate.vue"),

                    }
                ]
            },
            {
                path: "/expenses",
                component: () =>
                    import("../views/expenses/Index.vue"),
                children: [
                    {
                        path: "",
                        name: "expenses",
                        component: () =>
                            import("../views/expenses/Expenses.vue"),
                    },
                    {

                        path: "add-expense",
                        name: "add-expense",
                        component: () =>
                            import("../views/expenses/AddExpense.vue"),

                    }
                ]
            },
            {
                path: "/daily-sales",
                component: () =>
                    import("../views/daily-sales/Index.vue"),
                children: [
                    {
                        path: "",
                        name: "daily-sales",
                        component: () =>
                            import("../views/daily-sales/DailySales.vue"),
                    },
                    {
                        path: "add-daily-sale",
                        name: "add-daily-sale",
                        component: () =>
                            import("../views/daily-sales/AddDailySale.vue"),
                    }
                ]
            },
            {
                path: "/ledgers",
                component: () =>
                    import("../views/ledgers/Index.vue"),
                children: [
                    {
                        path: "",
                        name: "ledgers",
                        component: () =>
                            import("../views/ledgers/Ledgers.vue"),
                    },
                    {

                        path: "add-ledger",
                        name: "add-ledger",
                        component: () =>
                            import("../views/ledgers/AddLedger.vue"),

                    },
                    {

                        path: "view-ledger/:id",
                        name: "view-ledger",
                        component: () =>
                            import("../views/ledgers/ViewLedger.vue"),

                    },
                    
                ]
            },
            {
                path: "/bank-ledgers",
                component: () =>
                    import("../views/bank-ledgers/Index.vue"),
                children: [
                    {
                        path: "",
                        name: "bank-ledgers",
                        component: () =>
                            import("../views/bank-ledgers/BankLedgers.vue"),
                    },
                    {

                        path: "add-bank-ledger",
                        name: "add-bank-ledger",
                        component: () =>
                            import("../views/bank-ledgers/AddBankLedger.vue"),

                    },
                    {

                        path: "view-bank-ledger/:id",
                        name: "view-bank-ledger",
                        component: () =>
                            import("../views/bank-ledgers/ViewBankLedger.vue"),

                    },
                    {

                        path: "ledger-entry/:id",
                        name: "ledger-entry",
                        component: () =>
                            import("../views/bank-ledgers/LedgerEntry.vue"),

                    },
                    
                ]
            },

        ]
    }

];

// Always leave this as last one
if (process.env.MODE !== "ssr") {
    routes.push({
        path: "*",
        component: () =>
            import("../views/Error404.vue")
    });
}

const router = new VueRouter({
    mode: "hash",
    base: process.env.BASE_URL,
    routes
});

export default router;
