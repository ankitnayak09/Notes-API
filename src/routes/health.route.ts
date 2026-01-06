import { Router } from "express";

const healthRouter = Router()

healthRouter.get("/", (_,res) => {
    res.json({
        status: "OK",
        uptime: process.uptime()
    })
})

export default healthRouter