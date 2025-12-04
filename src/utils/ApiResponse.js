class ApiResponse {
  constructor(statusCode, user, message = "success") {
    this.statusCode = statusCode;
    // Object.assign(this, payload);
    this.user = user;
    this.message = message;
    this.success = statusCode < 400;
  }
}

export { ApiResponse };
