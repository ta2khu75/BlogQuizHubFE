import { storage } from "@/util/FirebaseConfig";
import { FirebaseError } from "firebase/app";
import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 as uuidv4 } from 'uuid';
export default class FileUtil {
    private static getFileExtension(file: File): string {
        return file.name.split('.').pop() ?? '';
    }
    static async uploadFile(folder: string, file: File): Promise<string> {
        const fileExtension = this.getFileExtension(file);
        const fileName = `${uuidv4()}.${fileExtension}`
        const storageRef = ref(storage, `${folder}/${fileName}`); try {
            await uploadBytes(storageRef, file)
            return await getDownloadURL(storageRef);
        } catch (err) {
            const error = err as FirebaseError;  // Type assertion to FirebaseError
            console.log("Upload error:", error);
            console.log("Error payload:", error.message);
            throw err;
        }
    }
    static async deleteFile(filePath: string) {
        const fileRef = ref(storage, filePath);
        try {
            await deleteObject(fileRef);
            return true
        } catch (error) {
            console.error("Error deleting file:", error);
            return false
        }
    };
}