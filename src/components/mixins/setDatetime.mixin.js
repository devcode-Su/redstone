export default {
  methods: {
    setDatetime(num) {
      switch(num){
        case 0 :
          this.form.startTime = new Date(new Date().getTime() - 3600 * 1000 * 1);
          break;
        case 1 :
          this.form.startTime = new Date();
          this.form.startTime.setHours(0);
          this.form.startTime.setMinutes(0);
          this.form.startTime.setSeconds(0);
          this.form.startTime.setMilliseconds(0);
          break;
        case 2 :
          this.form.startTime = new Date();
          this.form.startTime.setDate(this.form.startTime.getDate() - ((this.form.startTime.getDay() + 7 - 1) % 7));
          this.form.startTime.setHours(0);
          this.form.startTime.setMinutes(0);
          this.form.startTime.setSeconds(0);
          this.form.startTime.setMilliseconds(0);
          break;
        case 3 :
          this.form.startTime = new Date();
          this.form.startTime.setDate(1);
          this.form.startTime.setHours(0);
          this.form.startTime.setMinutes(0);
          this.form.startTime.setSeconds(0);
          this.form.startTime.setMilliseconds(0);
          break;
        default :
          break;
      }
      this.form.endTime = new Date();
    },
    setDatelast(num) {
      switch(num){
        case 0 :
          this.form.startDate = new Date(new Date().getTime() - 3600 * 1000 * 1);
          break;
        case 1 :
          this.form.startDate = new Date(new Date().getTime() - 3600 * 1000 * 30);
          break;
        case 2 :
          this.form.startDate = new Date(new Date().getTime() - 3600 * 1000 * 90);
          break;
        case 3 :
          this.form.startDate = new Date(new Date().getTime() - 3600 * 1000 * 180);
          break;
        default :
          break;
      }
      this.form.endDate = new Date();
    }
  }
}
