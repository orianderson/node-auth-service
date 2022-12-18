export class StatusCodeResponse {
  static CONTINUE = 100;
  static SWITCHING_PROTOCOLS = 101;
  static PROCESSING = 102;
  static OK = 200;
  static CREATED = 201;
  static ACCEPTED = 202;
  static NON_AUTHORITATIVE_INFORMATION = 203;
  static NO_CONTENT = 204;
  static RESET_CONTENT = 205;
  static PARTIAL_CONTENT = 206;
  static MULTI_STATUS = 207;
  static ALREADY_REPORTED = 208;
  static IM_USED = 226;
  static MULTIPLE_CHOICE = 300;
  static MOVED_PERMANENTLY = 301;
  static FOUND = 302;
  static SEE_OTHER = 303;
  static NOT_MODIFIED = 304;
  static USE_PROXY = 305;
  static TEMPORARY_REDIRECT = 307;
  static PERMANENT_REDIRECT = 308;
  static BAD_REQUEST = 400;
  static UNAUTHORIZED = 401;
  static PAYMENT_REQUIRED = 402;
  static FORBIDDEN = 403;
  static NOT_FOUND = 404;
  static METHOD_NOT_ALLOWED = 405;
  static NOT_ACCEPTABLE = 406;
  static PROXY_AUTHENTICATION_REQUIRED = 407;
  static REQUEST_TIMEOUT = 408;
  static CONFLICT = 409;
  static GONE = 410;
  static LENGTH_REQUIRED = 411;
  static PRECONDITION_FAILED = 412;
  static PAYLOAD_TOO_LARGE = 413;
  static REQUEST_URI_TOO_LONG = 414;
  static UNSUPPORTED_MEDIA_TYPE = 415;
  static REQUEST_RANGE_NOT_SATISFIABLE = 416;
  static EXPECTATION_FAILED = 417;
  static IM_A_TEAPOT = 418;
  static MISDIRECTED_REQUEST = 421;
  static UNPROCESSABLE_ENTITY = 422;
  static LOCKED = 423;
  static FAILED_DEPENDENCY = 424;
  static UPGRADE_REQUIRED = 426;
  static PRECONDITION_REQUIRED = 428;
  static TOO_MANY_REQUESTS = 429;
  static REQUEST_HEADER_FIELDS_TOO_LARGE = 431;
  static CONNECTION_CLOSED_WITHOUT_RESPONSE = 444;
  static UNAVAILABLE_FOR_LEGAL_REASONS = 451;
  static CLIENT_CLOSED_REQUEST = 499;
  static INTERNAL_SERVER_ERROR = 500;
  static NOT_IMPLEMENTED = 501;
  static BAD_GATEWAY = 502;
  static SERVICE_UNAVAILABLE = 503;
  static GATEWAY_TIMEOUT = 504;
  static HTTP_VERSION_NOT_SUPPORTED = 505;
  static VARIANT_ALSO_NEGOTIATES = 506;
  static INSUFFICIENT_STORAGE = 507;
  static LOOP_DETECTED = 508;
  static NOT_EXTEND = 510;
  static NETWORK_AUTHENTICATION_REQUIRED = 511;
  static NETWORK_CONNECT_TIMEOUT_ERROR = 599;
}

export const statusCode = [
  { status: 100, message: 'Continue ' },
  { status: 101, message: 'Switching Protocols ' },
  { status: 102, message: 'Processing ' },
  { status: 200, message: 'OK ' },
  { status: 201, message: 'Created ' },
  { status: 202, message: 'Accepted ' },
  { status: 203, message: 'Non - authoritative Information ' },
  { status: 204, message: 'No Content ' },
  { status: 205, message: 'Reset Content ' },
  { status: 206, message: 'Partial Content ' },
  { status: 207, message: 'Multi - Status ' },
  { status: 208, message: 'Already Reported ' },
  { status: 226, message: 'IM Used ' },
  { status: 300, message: 'Multiple Choices ' },
  { status: 301, message: 'Moved Permanently ' },
  { status: 302, message: 'Found ' },
  { status: 303, message: 'See Other ' },
  { status: 304, message: 'Not Modified ' },
  { status: 305, message: 'Use Proxy ' },
  { status: 307, message: 'Temporary Redirect ' },
  { status: 308, message: 'Permanent Redirect ' },
  { status: 400, message: 'Bad Request ' },
  { status: 401, message: 'Unauthorized ' },
  { status: 402, message: 'Payment Required ' },
  { status: 403, message: 'Forbidden ' },
  { status: 404, message: 'Not Found ' },
  { status: 405, message: 'Method Not Allowed ' },
  { status: 406, message: 'Not Acceptable ' },
  { status: 407, message: 'Proxy Authentication Required ' },
  { status: 408, message: 'Request Timeout ' },
  { status: 409, message: 'Conflict ' },
  { status: 410, message: 'Gone ' },
  { status: 411, message: 'Length Required ' },
  { status: 412, message: 'Precondition Failed ' },
  { status: 413, message: 'Payload Too Large ' },
  { status: 414, message: 'Request - URI Too Long ' },
  { status: 415, message: 'Unsupported Media Type ' },
  { status: 416, message: 'Requested Range Not Satisfiable ' },
  { status: 417, message: 'Expectation Failed ' },
  { status: 418, message: 'I’m a teapot ' },
  { status: 421, message: 'Misdirected Request ' },
  { status: 422, message: 'Unprocessable Entity ' },
  { status: 423, message: 'Locked ' },
  { status: 424, message: 'Failed Dependency ' },
  { status: 426, message: 'Upgrade Required ' },
  { status: 428, message: 'Precondition Required ' },
  { status: 429, message: 'Too Many Requests ' },
  { status: 431, message: 'Request Header Fields Too Large ' },
  { status: 444, message: 'Connection Closed Without Response ' },
  { status: 451, message: 'Unavailable For Legal Reasons ' },
  { status: 499, message: 'Client Closed Request ' },
  { status: 500, message: 'Internal Server Error ' },
  { status: 501, message: 'Not Implemented ' },
  { status: 502, message: 'Bad Gateway ' },
  { status: 503, message: 'Service Unavailable ' },
  { status: 504, message: 'Gateway Timeout ' },
  { status: 505, message: 'HTTP Version Not Supported ' },
  { status: 506, message: 'Variant Also Negotiates ' },
  { status: 507, message: 'Insufficient Storage ' },
  { status: 508, message: 'Loop Detected ' },
  { status: 510, message: 'Not Extended ' },
  { status: 511, message: 'Network Authentication Required ' },
  { status: 599, message: 'Network Connect Timeout Error' },
];
