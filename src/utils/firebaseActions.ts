import { firebaseCollection } from "@/const"
import { firestoreApp } from "@/lib/firebase"
import { SnbtDocument } from "@/types/document";

export const getSnbtData = async (key: string): Promise<SnbtDocument | undefined> => {
    const doc = await firestoreApp.collection(firebaseCollection)
        .where('key', '==', key).get();

    if (doc.empty) {
        return undefined;
    }

    return doc.docs.at(0)?.data() as SnbtDocument;
}

export const storeSnbtData = async (value: SnbtDocument) => firestoreApp.collection(firebaseCollection)
    .add(value);
