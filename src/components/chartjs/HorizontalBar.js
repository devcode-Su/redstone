import VueChartJs from 'vue-chartjs'

export default {
  extends: VueChartJs.HorizontalBar,
  mixins: [VueChartJs.mixins.reactiveProp],
  props: {
    chartData: {
      type: Object | Array
    }
  },
  data() {
    return {
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            },
            gridLines: {
              display: true
            }
          }],
          xAxes: [{
            gridLines: {
              display: true
            }
          }]
        },
        legend: {
          display: false
        },
        responsive: true,
        maintainAspectRatio: false
      }
    }
  },
  mounted() {
    //console.log(VueChartJs)
    //console.log(this.chartData)
    this.renderChart(this.chartData, this.options)
  }
}
