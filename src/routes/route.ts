import type { IncomingMessage, ServerResponse } from "http";
import { productController } from "../controller/product.controller";

export const routeHandler = (req: IncomingMessage, res: ServerResponse) => {
  // console.log(req.url)
  // console.log(req.method)

  const url = req.url;
  const method = req.method;

  if (url === "/" && method === "GET") {
    res
      .writeHead(200, { "content-type": "application/json" })
      .end(JSON.stringify({ message: "This is root route data" }));
  } else if (url?.startsWith("/products")) {
    productController(req, res);
  } else {
    res
      .writeHead(404, { "content-type": "application/json" })
      .end(JSON.stringify({ error: "Route not found" }));
  }
};
