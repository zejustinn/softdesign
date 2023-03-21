export default class ServerError extends Error {
  constructor(statusCode, friendlyFeedback, errorMessage = '') {
    super(errorMessage);

    this.statusCode = statusCode;
    this.friendlyFeedback = friendlyFeedback;
  }
}
