import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), `./src/database/db.json`);

export const readProduct = () => {
  // console.log(filePath)
  const products = fs.readFileSync(filePath, "utf-8");

  //   const parseData = JSON.parse(products.toString());
  const parseData = JSON.parse(products);

  return parseData;
};
