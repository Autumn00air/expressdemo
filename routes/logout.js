import express, { Request, Response } from "express";
var router = express.Router();

router.get("/", async (req, res) => {
  (req.session).user = null;
  return res.status(200).json({ success: true });
});

export default router;
