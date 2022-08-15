import { NextApiRequest, NextApiResponse } from "next";
import Cors from "cors";

// Initializing the cors middleware
// You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
export const corsConfig = Cors({
  origin: [
    "http://localhost:3000",
    "https://igsr5.dev",
    new RegExp(/\Ahttps:\/\/igsr5-front.*\.vercel.app\z/),
  ],
  methods: ["POST", "GET", "HEAD"],
});
