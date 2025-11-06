import { Storage } from '@google-cloud/storage';
import { v4 as uuidv4 } from 'uuid';
import { IStorageService, UploadResult } from './IStorageService';

export class GCPStorageService implements IStorageService {
  private storage: Storage;
  private bucketName: string;

  constructor() {
    this.bucketName = process.env.GCP_STORAGE_BUCKET || '';

    const keyFilename = process.env.GCP_KEY_FILE;
    const projectId = process.env.GCP_PROJECT_ID;

    this.storage = new Storage({
      projectId,
      keyFilename,
    });
  }

  async uploadFile(file: Express.Multer.File, folder: string = 'uploads'): Promise<UploadResult> {
    const fileExtension = file.originalname.split('.').pop();
    const key = `${folder}/${uuidv4()}.${fileExtension}`;

    const bucket = this.storage.bucket(this.bucketName);
    const blob = bucket.file(key);

    await blob.save(file.buffer, {
      contentType: file.mimetype,
      metadata: {
        cacheControl: 'public, max-age=31536000',
      },
    });

    // Make the file public (optional, remove if you want private files)
    await blob.makePublic();

    const url = `https://storage.googleapis.com/${this.bucketName}/${key}`;

    return { url, key };
  }

  async deleteFile(key: string): Promise<void> {
    const bucket = this.storage.bucket(this.bucketName);
    await bucket.file(key).delete();
  }

  getFileUrl(key: string): string {
    return `https://storage.googleapis.com/${this.bucketName}/${key}`;
  }

  async getSignedUrl(key: string, expiresIn: number = 3600): Promise<string> {
    const bucket = this.storage.bucket(this.bucketName);
    const file = bucket.file(key);

    const [url] = await file.getSignedUrl({
      version: 'v4',
      action: 'read',
      expires: Date.now() + expiresIn * 1000,
    });

    return url;
  }
}
