import type { NextRequest } from "next/server";
import jwt from 'jsonwebtoken';
import { jwtOptions } from "@/const";
import type { Deadlinejs } from "@/types/deadlinejs";
import { getSnbtData, storeSnbtData } from "@/utils/firebaseActions";

export async function GET(request: NextRequest) {
    const url = new URL(request.url);

    const path = url.searchParams.get('p') ?? url.pathname;
    const paths = path.split('/').slice(path.startsWith('/api') ? 2 : 1); // -> ['jwt', ...nested path]
    const [token, ...nestedPaths] = paths;

    if (!token.length || !nestedPaths.length) {
        return Response.json({
            err: 'missing token or nestedPaths',
        }, { status: 400 });
    }

    try {
        const dataOnDatabase = await getSnbtData(nestedPaths.join('/'));
        if (!dataOnDatabase) {
            const data = jwt.verify(token, process.env.JWT_SECRET!, jwtOptions.verify) as Deadlinejs;
            const response = await fetch(new URL(`./${nestedPaths.join('/')}`, data.snbtDataUrl));
            const json = await response.json();

            await storeSnbtData({
                key: nestedPaths.join('/'),
                last_fetched_at: Date.now(),
                data: json,
            });

            return Response.json(json, {
                status: response.status,
                statusText: response.statusText,
                headers: response.headers,
            });
        }

        return Response.json(dataOnDatabase.data);
    } catch (err) {
        return Response.json({
            err: (err as Error).message,
        }, { status: 500 });
    }
}