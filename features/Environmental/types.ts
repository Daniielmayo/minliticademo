export type InstrumentType = 'EIA' | 'PMA';
export type LicenseStatus = 'Vigente' | 'No Vigente' | 'En Trámite' | 'Rechazado';
export type ProcessStateId = 'A' | 'B' | 'C' | 'D' | 'E';
export type TaskStatus = 'No Realizado' | 'En Proceso' | 'Realizado';
export type ComponentType = 'Biótico' | 'Abiótico' | 'Social';

export interface ComplianceTask {
  id: string;
  description: string;
  responsible: string;
  dueDate: string;
  status: TaskStatus;
  evidenceUrl?: string;
  component?: ComponentType; // Used in Step 3
}

export interface ICAReport {
  id: string;
  period: string; // e.g., "2023-S1"
  status: 'En Elaboración' | 'Presentado';
  presentationDate?: string;
  documentUrl?: string;
}

export interface ProcessTrackingInfo {
  stateId: ProcessStateId;
  // State A: En Elaboración
  elaborationStartDate?: string;
  estimatedEndDate?: string;
  modality?: 'Propia' | 'Contratista';
  contractorName?: string;
  elaborationSupportUrl?: string;

  // State B: Presentado
  presentationDate?: string;
  approvedBy?: string;
  radicationDate?: string;
  financialRightsPaid?: boolean;
  financialRightsAmount?: number;
  financialRightsDate?: string;
  presentationSupportUrl?: string;

  // State C: En Requerimientos
  requirementsNotificationDate?: string;
  requirementsDeadline?: string;
  requirementsTasks?: ComplianceTask[];
  requirementsSupportUrl?: string;

  // State D: Aprobado
  resolutionNumber?: string;
  resolutionDate?: string;
  approvalSupportUrl?: string;

  // State E: Rechazado
  rejectionDate?: string;
  rejectionResolutionNumber?: string;
  rejectionObservations?: string;
  rejectionSupportUrl?: string;
}

export interface EnvironmentalTitle {
  id: string; // Título identifier
  instrumentType: InstrumentType;
  licenseStatus: LicenseStatus;
  processInfo: ProcessTrackingInfo;
  operationalTasks?: ComplianceTask[]; // Step 3
  icaReports?: ICAReport[]; // Step 4
}
