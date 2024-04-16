class ApiError extends Error {
  status: number;
  errors: any;

  constructor(
    status: number,
    message: string,
    errors: any = [],
  ) {
    super(message);
    this.status = status;
    this.errors = errors;
  }

  static UnautorizedError() {
    return new ApiError(401, 'Unautorized user');
  }

  static BadRequest(massage: string, errors: any = []) {
    return new ApiError(400, massage, errors);
  }

  static NotFound(massage: string, errors: any = []) {
    return new ApiError(404, massage, errors);
  }
}

export default ApiError;
