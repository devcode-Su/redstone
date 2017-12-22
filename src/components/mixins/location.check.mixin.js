export default {
  methods: {
    isDashboard() {
      return !!location.href.match('Dashboard');
    }
  }
}
