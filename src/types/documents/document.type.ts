export interface DocumentSummary {
  totalCount: number;
  registeredCount: number;
  unregisteredCount: number;
}

export interface DocumentMedication {
  medicationId: number;
  productKoName: string;
}

export interface DocumentsMainResult {
  summary: DocumentSummary;
  medications: DocumentMedication[];
}

export interface MedicationDocument {
  checklistItemId: number;
  documentId: number | null;
  type: string | null;
  title: string;
  registered: boolean;
  registeredOn: string | null;
}

export interface MedicationDocumentsResult {
  medicationId: number;
  productKoName: string;
  documents: MedicationDocument[];
}

export interface DocumentDetailResult {
  documentId: number;
  medicationId: number;
  productKoName: string;
  type: string;
  title: string;
  originalFilename: string;
  fileSize: number;
  registeredOn: string;
  previewUrl: string;
}
