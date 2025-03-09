import { storage } from "@/util/FirebaseConfig";
import { FirebaseError } from "firebase/app";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export default class FileUtil {
    private static getFileExtension(file: File): string {
        return file.name.split('.').pop() || '';
    }
    static async uploadFile(fileName: string, file: File): Promise<string> {
        const storageRef = ref(storage, `files/${fileName}`);
        try {
            await uploadBytes(storageRef, file)
            return await getDownloadURL(storageRef);
        } catch (err) {
            const error = err as FirebaseError;  // Type assertion to FirebaseError
            console.log("Upload error:", error);
            console.log("Error payload:", error.message);
            throw err;
        }
    }
}