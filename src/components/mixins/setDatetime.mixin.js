export default {
  methods: {
    setDatetime(num) {
      switch (num) {
        case 0:
          this.startTime = new Date(new Date().getTime() - 3600 * 1000 * 1);
          break;
        case 1:
          this.startTime = new Date();
          this.startTime.setHours(0);
          this.startTime.setMinutes(0);
          this.startTime.setSeconds(0);
          this.startTime.setMilliseconds(0);
          break;
        case 2:
          this.startTime = new Date();
          this.startTime.setDate(this.startTime.getDate() - ((this.startTime.getDay() + 7 - 1) % 7));
          this.startTime.setHours(0);
          this.startTime.setMinutes(0);
          this.startTime.setSeconds(0);
          this.startTime.setMilliseconds(0);
          break;
        case 3:
          this.startTime = new Date();
          this.startTime.setDate(1);
          this.startTime.setHours(0);
          this.startTime.setMinutes(0);
          this.startTime.setSeconds(0);
          this.startTime.setMilliseconds(0);
          break;
        default:
          break;
      }
      this.endTime = new Date();
    },
    setDatelast(num) {
      switch (num) {
        case 0:
          this.startDate = new Date(new Date().getTime() - 3600 * 1000 * 24 * 7);
          break;
        case 1:
          this.startDate = new Date(new Date().getTime() - 3600 * 1000 * 24 * 30);
          break;
        case 2:
          this.startDate = new Date(new Date().getTime() - 3600 * 1000 * 24 * 90);
          break;
        case 3:
          this.startDate = new Date(new Date().getTime() - 3600 * 1000 * 24 * 180);
          break;
        default:
          break;
      }
      this.endDate = new Date();
    }
  }
}
