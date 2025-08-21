import type { VercelRequest, VercelResponse } from "@vercel/node";
import axios from "axios";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const response = await axios.get("https://www.freetogame.com/api/games");
    res.status(200).json(response.data);
  } catch (error: any) {
    console.error("Error fetching FreeToGame API:", error.message);
    res.status(500).json({ error: error.message });
  }
}
