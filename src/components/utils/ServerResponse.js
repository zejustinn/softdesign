export default class ServerResponse {
  constructor(
    statusCode,
    data,
    { contentType = 'application/json', isError = false } = {}
  ) {
    this.statusCode = statusCode;
    this.data = data;
    this.contentType = contentType;
    this.isError = isError;
  }

  toJSON() {
    if (this.isError) return { error: this.data };

    return { data: this.data };
  }
}
