import type { IncomingMessage, ServerResponse } from "http";
import { readProduct } from "../service/product.service";
import type { IProduct } from "../type/product.type";

export const productController = (
  req: IncomingMessage,
  res: ServerResponse,
) => {
  const url = req.url;
  const method = req.method;
  const urlParts = url?.split("/");
  const id =
    urlParts && urlParts[1] === "products" ? Number(urlParts[2]) : null;
  console.log(id);

  if (url === "/products" && method === "GET") {
    const products = readProduct();

    res.writeHead(200, { "content-type": "application/json" }).end(
      JSON.stringify({
        message: "This is product route updatedddd",
        data: products,
      }),
    );
  } else if (method === "GET" && id !== null) {
    const products = readProduct();

    const product = products.find((p: IProduct) => p.id === id);
    res.writeHead(200, { "content-type": "application/json" }).end(
      JSON.stringify({
        message: "Product data retrieve successfully",
        data: product,
      }),
    );
  } else if (method === "POST" && url === "/product") {
    const body = ""
    res.writeHead(200, { "content-type": "application/json" }).end(
      JSON.stringify({
        message: "This is product route updatedddd",
        data: products,
      }),
    );
  }
};
