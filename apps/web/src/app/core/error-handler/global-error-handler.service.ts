import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Service } from '@angular/core';

type ErrorPayload =
  | {
      type: 'http';
      message: string;
      status: number;
      url?: string;
    }
  | {
      type: 'client' | 'unknown';
      message: string;
      stack?: string;
    };

@Service()
export class GlobalErrorHandler implements ErrorHandler {
  public handleError(error: unknown): void {
    const payload = this.createPayload(error);

    console.error(`[${payload.type} error]`, error);
    this.sendToSentry(payload);
    this.sendToDatadog(payload);
  }

  private createPayload(error: unknown): ErrorPayload {
    if (error instanceof HttpErrorResponse) {
      return {
        type: 'http',
        message: error.message,
        status: error.status,
        ...(error.url ? { url: error.url } : {}),
      };
    }

    if (error instanceof Error) {
      return {
        type: 'client',
        message: error.message,
        ...(error.stack ? { stack: error.stack } : {}),
      };
    }

    return {
      type: 'unknown',
      message: String(error),
    };
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
  private sendToSentry(_payload: ErrorPayload): void {}

  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
  private sendToDatadog(_payload: ErrorPayload): void {}
}
