import type { ServerResponse } from "http";

export const sendResponse = (
  res: ServerResponse,
  success: boolean,
  message: string,
  status: number,
  data?: any,
) => {
  const response = {
    success: success,
    message: message,
    data: data,
  };
  res
    .writeHead(status, { "content-type": "application/json" })
    .end(JSON.stringify(response));
};
