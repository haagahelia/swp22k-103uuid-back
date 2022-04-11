import express from "express";

import list from "./list.js";
import generate from "./generate.js";
import sign from "./sign.js";

const routes = express.Router();
routes.use("/list", list);
routes.use("/generate", generate);
routes.use("/sign", sign);

export default routes;