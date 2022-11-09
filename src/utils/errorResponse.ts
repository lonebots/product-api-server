// export an extension of the Error class
class ErrorResponse extends Error {
  constructor(message: string, statusCode: number) {
    super(message);
    statusCode = statusCode;
    Object.setPrototypeOf(this,ErrorResponse.prototype);
  }
}

export default ErrorResponse;
