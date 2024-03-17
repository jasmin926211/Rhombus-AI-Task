export default class Response {
  public status: boolean;
  public data: unknown;
  public message: string;
  public exception: string;

  constructor(status: boolean, data: unknown, mess: string, exception: string) {
    this.status = status;
    this.data = data;
    this.message = mess;
    this.exception = exception;
  }
}
