import type { VerifyOptions, SignOptions } from 'jsonwebtoken';

export const SNBT_URL = 'https://pengumuman-snbt-snpmb.bppp.kemdikbud.go.id';

export const jwtOptions: {
    verify: VerifyOptions;
    sign: SignOptions;
} = {
    verify: {
        issuer: 'SNBT Mirror (github.com/hansputera/snbt-mirror)',
        algorithms: ['HS512'],
        subject: 'SNBT Mirror',
        maxAge: '5m',
    },
    sign: {
        algorithm: 'HS512',
        issuer: 'SNBT Mirror (github.com/hansputera/snbt-mirror)',
        subject: 'SNBT Mirror',
        expiresIn: '5m',
    },
}

export const firebaseCollection = 'snbt';
