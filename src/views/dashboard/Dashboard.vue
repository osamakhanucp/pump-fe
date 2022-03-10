<template>
        <div class="content">
            <div class="md-layout">
                <div class="row q-col-gutter-md">
                    <div class="col-sm-6">
                        <echarts
                            :option="lineChart"
                            style="width:100%;height:420px;"
                        ></echarts>
                    </div>
                    <div class="col-sm-6">
                        <echarts
                            :option="pieChart"
                            style="width:100%;height:420px;"
                        ></echarts>
                    </div>
                </div>
                <div class="row">
            <div class="col-sm-10">
                <echarts
                    :option="barChart"
                    style="width:100%;height:320px;"
                ></echarts>
            </div>
        </div>
            </div>
        </div>
</template>

<script>
import "echarts/lib/chart/bar";
import "echarts/lib/chart/pie";
import "echarts/lib/chart/line";
import "echarts/lib/component/title";
import "echarts/lib/component/legend";
export default {
    name: "Dashboard",

    components: {
    
    },

    data() {
        return {

            pieChart: {
                title: {
                    text: "Sales Analysis",
                    left: "center"
                },
                series: [
                    {
                        type: "pie",
                        radius: "50%",
                        data: [
                            { value: 20, name: "Buy" },
                            { value: 50, name: "Sale" }
                        ]
                    }
                ]
            },
            lineChart: {
              title: {
                    text: "Petrol price in last 30 days",
                    left: "center"
                },
                
                legend: {
                    data: [
                        "Previous" + " - " + 4400,
                        "Predicted" + " - " + 10232,
                    ],
                    left: 100,
                    top: 50,
                    orient: "vertical"
                },
                xAxis: {
                    type: "category",
                    data: [50, 100, 150, 200, 250]
                },
                yAxis: {
                    type: "value"
                },
                 series: [
                    {
                        name: "Previous" + " - " + 3438,
                        data: [0, 19, 37, 55, 67],
                        type: "line"
                    },
                    {
                        name: "Predicted" + " - " + 10232,
                        data: [0, 21, 36, 45, 67],
                        type: "line"
                    }
                ]
            },
            barChart: {
                title: {
                    text: "Daily Sales",
                    left: "center"
                },
                xAxis: {
                    data: [
                        "Day-1",
                        "Day-2",
                        "Day-3",
                        "Day-4",
                        "Day-5",
                    ]
                },
                yAxis: {},
                series: [
                    {
                        name: "Daily Sales",
                        type: "bar",
                        barMaxWidth: 70,
                        data: [100, 20, 50, 30, 80]
                    }
                ]
            }

        };
    },

    methods: {

    },

    created() {
    },

    validations: function() {
        return {

        };
    },

    computed: {

    }

};
</script>

<style lang="scss" scoped>
</style>