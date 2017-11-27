import VueChartJs from 'vue-chartjs'

export default {
  extends: VueChartJs.Line,
  mixins: [VueChartJs.mixins.reactiveProp],
  props: {
    datacollection: {
      type: Object | Array
    }
  },
  data() {
    return {
      // gradient: null,
      // gradient2: null,
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
          display: true
        },
        responsive: true,
        maintainAspectRatio: false
      }
    }
  },
  mounted() {
    // this.gradient = this.$refs.canvas.getContext('2d').createLinearGradient(0, 0, 0, 450)
    // this.gradient2 = this.$refs.canvas.getContext('2d').createLinearGradient(0, 0, 0, 450)

    // this.gradient.addColorStop(0, 'rgba(255, 0,0, 0.5)')
    // this.gradient.addColorStop(0.5, 'rgba(255, 0, 0, 0.25)');
    // this.gradient.addColorStop(1, 'rgba(255, 0, 0, 0)');

    // this.gradient2.addColorStop(0, 'rgba(0, 231, 255, 0.9)')
    // this.gradient2.addColorStop(0.5, 'rgba(0, 231, 255, 0.25)');
    // this.gradient2.addColorStop(1, 'rgba(0, 231, 255, 0)');

    // this.renderChart({
    //   labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    //   datasets: [
    //     {
    //       label: 'Data One',
    //       borderColor: '#FC2525',
    //       pointBackgroundColor: 'grey',
    //       borderWidth: 1,
    //       pointBorderColor: 'white',
    //       backgroundColor: this.gradient,
    //       data: [ 70,69,96, 69,79,62,40,80,85,74,26,31]
    //     }, {
    //       label: 'Data Two',
    //       borderColor: '#05CBE1',
    //       pointBackgroundColor: 'grey',
    //       pointBorderColor: 'white',
    //       borderWidth: 1,
    //       backgroundColor: this.gradient2,
    //       data: [76,34,51,60,48,21,78,100,84,13,70,42]
    //     }
    //   ]
    // }, this.options)
    //console.log(this.chartData)
    this.renderChart(this.chartData, this.options)
  }
}
