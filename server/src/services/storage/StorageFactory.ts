import { IStorageService } from './IStorageService';
import { S3StorageService } from './S3StorageService';
import { GCPStorageService } from './GCPStorageService';

export class StorageFactory {
  static createStorageService(): IStorageService {
    const provider = process.env.STORAGE_PROVIDER || 'aws';

    switch (provider.toLowerCase()) {
      case 'aws':
      case 's3':
        return new S3StorageService();
      case 'gcp':
      case 'google':
        return new GCPStorageService();
      default:
        throw new Error(`Unsupported storage provider: ${provider}`);
    }
  }
}
