import { ErrorResponse } from "../http/HttpClientInterface";

type SingleErrorResponseData = {
  id: string;
  status: string | number;
  message: string;
  devMessage: string;
  data?: any;
  errors?: any;
};

type HaloErrorResponseData = SingleErrorResponseData;

export type HaloErrorResponse = ErrorResponse<HaloErrorResponseData>;

export class HaloRestAPIError extends Error {
  status: number | string;
  devMessage?: string;
  data?: any;
  headers: any;

  private static buildErrorResponseDate(error: HaloErrorResponse): {
    data: SingleErrorResponseData;
  } {
    // improvable
    return { data: error.data };
  }

  constructor(error: HaloErrorResponse) {
    const { data } = HaloRestAPIError.buildErrorResponseDate(error);

    super(data.message);

    this.name = "HaloRestAPIError";
    this.data = data.data;
    this.devMessage = data.devMessage;
    this.status = data.status;
    this.headers = error.headers;
    this.message = `[${this.status}] ${this.message}`;

    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error#Custom_Error_Types
    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, HaloRestAPIError);
    }

    // https://github.com/Microsoft/TypeScript/wiki/Breaking-Changes#extending-built-ins-like-error-array-and-map-may-no-longer-work
    // Set the prototype explicitly.
    Object.setPrototypeOf(this, HaloRestAPIError.prototype);
  }
}