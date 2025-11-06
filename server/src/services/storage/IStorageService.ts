export interface UploadResult {
  url: string;
  key: string;
}

export interface IStorageService {
  uploadFile(file: Express.Multer.File, folder?: string): Promise<UploadResult>;
  deleteFile(key: string): Promise<void>;
  getFileUrl(key: string): string;
}
