import * as espree from 'espree';
import jwt from 'jsonwebtoken';
import { jwtOptions, SNBT_URL } from "@/const";
import { NextRequest } from "next/server";
import { parseDeadlinejsCode } from '@/utils/parseDeadlinejsCode';
import { generateDeadlinejsCode } from '@/utils/generateDeadlinejsCode';

export async function GET(request: NextRequest) {
    const isJson = new URL(request.url).searchParams.has('json');

    const deadlineUrl = new URL('./deadline.js', SNBT_URL);
    const response = await fetch(deadlineUrl).catch(() => undefined);

    if (!response) {
        if (isJson) {
            return Response.json({
                error: 'Couldnt fetch deadline.js',
            }, { status: 500 });
        } else {
            return new Response('couldnt fetch deadline.js', { status: 500 });
        }
    }

    const ast = espree.parse(await response.text(), {
        comment: false,
    });
    const parsedData = parseDeadlinejsCode(ast);

    if (isJson) {
        return Response.json({
            data: parsedData,
        });
    } else {
        if (!parsedData) {
            return new Response('fail to generate deadline.js code', { status: 500 });
        }

        const tokenJwt = jwt.sign(parsedData, process.env.JWT_SECRET!, jwtOptions.sign);
        parsedData.snbtDataUrl = `/data/${tokenJwt}`;

        const generatedJsCode = generateDeadlinejsCode(parsedData);
        return new Response(generatedJsCode, {
            headers: {
                'Content-Type': 'text/javascript',
            },
        });
    }
}