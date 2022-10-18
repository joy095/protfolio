import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const prisma = new PrismaClient();
    if (req.method === 'GET') {
        const Details = await prisma.MyProfile.findMany();
        return res.send(Details);
    } else if (req.method === 'POST') {
        res.status(201).send('POST');
    }
}