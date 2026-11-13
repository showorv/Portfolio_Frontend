export interface IMedia {
  _id: string;
  url: string;
  publicId: string;
  name?: string;
  format?: string;
  bytes?: number;
  width?: number;
  height?: number;
  uploadedAt?: string;
}

export interface IUploadSignature {
  timestamp: number;
  signature: string;
  folder: string;
  apiKey: string;
  cloudName: string;
}
