import session from "express-session";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import "express-async-errors";

import loginRouter from "./routes/login";
import logoutRouter from "./routes/logout";
import usersRouter from "./routes/users";
import booksRouter from "./routes/books";
import categoryRouter from "./routes/category";
import borrowRouter from "./routes/borrows";

import express from 'express'
const port = 3005
const app = express()

//设置了请求日志
app.use(logger("dev"));

//设置了解析json格式的中间体
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//设置了解析cookie的中间体
app.use(cookieParser());
//设置了静态资源目录
app.use(express.static(path.join(__dirname, "public")));

//设置session验证
app.use(
    session({
        secret: "abc123",
        resave: false,
        saveUninitialized: true,
        cookie: { maxAge: 60 * 60 * 24 * 1000 }, // 一天过期
    })
);

app.use((req, res, next) => {

    // console.log('%c [  ]-41', 'font-size:13px; background:pink; color:#bf2c9f;', req.session)
    if (!req.url.includes("/login") && !req.url.includes("/logout")) {
        if (!req.session.user) {
            return res.status(401).json({ message: "请登录" });
        }
    }
    next()
})

app.use("/api/login", loginRouter);
app.use("/api/logout", logoutRouter);
app.use("/api/users", usersRouter);
app.use("/api/books", booksRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/borrows", borrowRouter);

app.use(function (err, req, res, next) {
    res.status(500).json({ message: err.message });
})

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`⚡️ Example app listening on port http://localhost:${port}`)
})