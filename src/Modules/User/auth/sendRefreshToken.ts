import { Response } from "express";

export const sendRefreshToken = (res: Response, token: string) => {
    res.cookie("jid", token, {
        httpOnly: true,
        path: "/",
        secure: true,
        domain: "studio.apollographql.com",
        sameSite: false,
    });
};
