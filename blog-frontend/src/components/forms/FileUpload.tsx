import FileUploadClient from "./FileUploadClient";

interface FileUploadProps {
  onFileUpload: (fileId: number, fileUrl: string, fileName: string) => void;
  onError?: (error: string) => void;
  acceptedFileTypes?: string;
  maxSizeMB?: number;
  buttonText?: string;
  className?: string;
}

export default function FileUpload(props: FileUploadProps) {
  return <FileUploadClient {...props} />;
}
