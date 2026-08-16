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
