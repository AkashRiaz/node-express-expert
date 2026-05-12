import dotenv from "dotenv";
import path from "path";

// console.log(path.join(process.cwd(), ".env"), "path-----")

dotenv.config({
  path: path.join(process.cwd(), ".env"),
});

const config = {
    port : process.env.PORT,

}

export default config;
