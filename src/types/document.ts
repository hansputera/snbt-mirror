export type SnbtDocument = {
    key: string;
    data: {
        no: string; // No UTBK
        na: string; // Nama
        dob: string; // Date of Birth
        bm: number; // Bidik Misi
        ac: number; // Accepted
        npt?: string; // Nama Universitas
        kpt?: number; // Kode Universitas
        nps?: string; // Nama Program Studi
        kps?: number; // Kode Program Studi
        upt?: string; // Universitas URL (SMB)
    };
    last_fetched_at: number;
}