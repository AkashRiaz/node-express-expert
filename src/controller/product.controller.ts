import type { IncomingMessage, ServerResponse } from "http";
import { insertProduct, readProduct } from "../service/product.service";
import type { IProduct } from "../type/product.type";
import { parseBody } from "../utility/parseBody";
import { sendResponse } from "../utility/sendResponse";

export const productController = async (
  req: IncomingMessage,
  res: ServerResponse,
) => {
  const url = req.url;
  const method = req.method;
  const urlParts = url?.split("/");
  const id =
    urlParts && urlParts[1] === "products" ? Number(urlParts[2]) : null;
  // console.log(req, "Request");

  if (url === "/products" && method === "GET") {
    const products = readProduct();

    sendResponse(
      res,
      true,
      "Product data retrieve successfully",
      200,
      products,
    );
  } else if (method === "GET" && id !== null) {
    const products = readProduct();

    const product = products.find((p: IProduct) => p.id === id);

    if (!product) {
      sendResponse(res, true, "Product not found", 404);
    }

    sendResponse(res, true, "Product data retrieve successfully", 200, product);
  } else if (method === "POST" && url === "/products") {
    const body = await parseBody(req);
    // console.log(body, "this is body")
    const newProduct = {
      id: Date.now(),
      ...body,
    };
    const products = readProduct();
    products.push(newProduct);
    insertProduct(products);

    sendResponse(res, true, "product created successfully", 200, newProduct);
  } else if (method === "PUT" && id !== null) {
    const body = await parseBody(req);

    const products = readProduct();
    const index = products.findIndex((p: IProduct) => p.id === id);
    if (index < 0) {
      sendResponse(res, true, "Product not found", 404);
    }

    products[index] = {
      id: products[index]?.id,
      ...body,
    };

    insertProduct(products);

    sendResponse(
      res,
      true,
      "product is updated successfully",
      200,
      products[index],
    );
  } else if (method === "DELETE" && id !== null) {
    const products = readProduct();

    const index = products.findIndex((p: IProduct) => p.id === id);
    if (index < 0) {
      sendResponse(res, true, "Product not found", 404);
    }

    products.splice(index, 1);
    // console.log(products, "deleted products");
    insertProduct(products);

     sendResponse(res, true, "Product deleted successfully", 200);
  }
};
