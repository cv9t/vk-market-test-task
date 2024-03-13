import {
  HttpErrorStatus,
  type HttpError,
  BadDataError,
  UnauthorizedError,
  ForbiddenError,
  NotFoundError,
  ServerError,
  ConflictError,
  PreparationError,
  NetworkError,
} from './api-error';
import { errorToString } from '../string/error-to-string';

export type ContentType = 'application/json' | 'multipart/form-data';

export type ResponseType = 'json' | 'arraybuffer' | 'stream';

export type RequestMethod = 'POST' | 'GET' | 'DELETE' | 'PUT' | 'PATCH';

export type RequestOptions<T> = {
  path: string;
  method: RequestMethod;
  data?: T;
  query?: Record<string, any>;
  headers?: Record<string, string>;
  contentType?: ContentType;
  responseType?: ResponseType;
};

export const request = async <TData, TResult>(options: RequestOptions<TData>): Promise<TResult> => {
  const headers = new Headers(options.headers);
  if (options.contentType !== 'multipart/form-data') {
    contentDefault(headers, options.contentType ?? 'application/json');
  }

  const endpoint = `${options.path.trim()}${queryToString(options.query)}`;
  const body =
    contentIs(headers, 'application/json') && options.data
      ? JSON.stringify(options.data)
      : (options.data as BodyInit);

  const res = await fetch(endpoint, {
    method: options.method,
    headers,
    body,
  }).catch((error) => {
    throw new NetworkError(errorToString(error));
  });

  if (res.ok) {
    try {
      const data = await parseResponse(res);
      return data;
    } catch (error) {
      throw new PreparationError(errorToString(error));
    }
  }
  throw await parseHttpError(res);
};

function contentIs(headers: Headers, type: ContentType): boolean {
  return Boolean(headers.get('content-type')?.includes(type));
}

function contentDefault(headers: Headers, type: ContentType): void {
  if (!headers.has('content-type')) {
    headers.set('content-type', type);
  }
}

// NOTE: Нет обработки вложенности (решил ее не добавлять, тк в задание вообще нет запросов с кверями)
function queryToString(query: Record<string, any> | undefined): string {
  return query ? `?${new URLSearchParams(query).toString()}` : '';
}

async function parseResponse(res: Response): Promise<any> {
  const contentType = res.headers.get('content-type') ?? 'json';
  switch (contentType) {
    case 'stream':
      return res.text();
    case 'arraybuffer':
      return res.arrayBuffer();
    default:
      return res.json();
  }
}

async function parseHttpError(res: Response): Promise<HttpError> {
  const message = await res.text();
  switch (res.status) {
    case HttpErrorStatus.BAD_DATA:
      return new BadDataError(message);
    case HttpErrorStatus.UNAUTHORIZED:
      return new UnauthorizedError(message);
    case HttpErrorStatus.FORBIDDEN:
      return new ForbiddenError(message);
    case HttpErrorStatus.NOT_FOUND:
      return new NotFoundError(message);
    case HttpErrorStatus.CONFLICT:
      return new ConflictError(message);
    default:
      return new ServerError(message);
  }
}
