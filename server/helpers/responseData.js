export default class ResData {
  constructor(result, error = false, message = null) {
    this.error = error;
    this.message = message;
    this.result = result;
  }
}
