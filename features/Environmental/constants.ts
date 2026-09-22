import { EnvironmentalTitle, ComplianceTask, ICAReport } from './types';

export const mockComplianceTasks: ComplianceTask[] = [
  {
    id: 'TSK-001',
    description: 'Instalar puntos de monitoreo de calidad del aire en los linderos norte y sur',
    responsible: 'Área Abiótica - Juan Pérez',
    dueDate: '2023-11-30',
    status: 'Realizado',
    evidenceUrl: '#',
    component: 'Abiótico'
  },
  {
    id: 'TSK-002',
    description: 'Reforestación compensatoria con 500 árboles nativos en la microcuenca',
    responsible: 'Área Biótica - Ana Gómez',
    dueDate: '2024-03-15',
    status: 'En Proceso',
    evidenceUrl: '#',
    component: 'Biótico'
  },
  {
    id: 'TSK-003',
    description: 'Taller de socialización de impactos con la junta de acción comunal',
    responsible: 'Área Social - Carlos Ruiz',
    dueDate: '2024-01-20',
    status: 'No Realizado',
    component: 'Social'
  }
];

export const mockRequirementsTasks: ComplianceTask[] = [
  {
    id: 'REQ-001',
    description: 'Actualizar mapa de vertimientos escala 1:5000',
    responsible: 'Topografía / SIG',
    dueDate: '2023-10-15',
    status: 'En Proceso'
  },
  {
    id: 'REQ-002',
    description: 'Aclarar metodología de cálculo para emisiones de material particulado',
    responsible: 'Ambiental - Juan Pérez',
    dueDate: '2023-10-12',
    status: 'Realizado'
  }
];

export const mockICAReports: ICAReport[] = [
  {
    id: 'ICA-2023-S1',
    period: '2023 Semestre 1',
    status: 'Presentado',
    presentationDate: '2023-07-15',
    documentUrl: '#'
  },
  {
    id: 'ICA-2023-S2',
    period: '2023 Semestre 2',
    status: 'En Elaboración'
  }
];

export const mockEnvironmentalTitles: EnvironmentalTitle[] = [
  {
    id: 'T-001',
    instrumentType: 'EIA',
    licenseStatus: 'Vigente',
    processInfo: {
      stateId: 'D',
      // Phase A history
      elaborationStartDate: '2021-01-15',
      estimatedEndDate: '2021-08-30',
      modality: 'Contratista',
      contractorName: 'Consultoría Geominera S.A.S',
      elaborationSupportUrl: '#',
      // Phase B history
      presentationDate: '2021-09-10',
      radicationDate: '2021-09-15',
      financialRightsPaid: true,
      financialRightsAmount: 25000000,
      financialRightsDate: '2021-09-01',
      presentationSupportUrl: '#',
      // Phase C history
      requirementsNotificationDate: '2022-02-10',
      requirementsDeadline: '2022-03-10',
      requirementsTasks: mockRequirementsTasks,
      // Phase D current
      resolutionNumber: 'RES-2022-0450',
      resolutionDate: '2022-08-12',
      approvalSupportUrl: '#'
    },
    operationalTasks: mockComplianceTasks,
    icaReports: mockICAReports
  },
  {
    id: 'T-002',
    instrumentType: 'PMA',
    licenseStatus: 'En Trámite',
    processInfo: {
      stateId: 'C',
      // Phase A history
      elaborationStartDate: '2023-01-20',
      estimatedEndDate: '2023-05-30',
      modality: 'Propia',
      contractorName: 'Equipo Ambiental Minlitica',
      elaborationSupportUrl: '#',
      // Phase B history
      presentationDate: '2023-06-15',
      radicationDate: '2023-06-20',
      financialRightsPaid: true,
      financialRightsAmount: 18500000,
      financialRightsDate: '2023-06-05',
      presentationSupportUrl: '#',
      // Phase C current
      requirementsNotificationDate: '2023-09-25',
      requirementsDeadline: '2023-10-25',
      requirementsTasks: mockRequirementsTasks,
      requirementsSupportUrl: '#'
    }
  },
  {
    id: 'T-003',
    instrumentType: 'EIA',
    licenseStatus: 'En Trámite',
    processInfo: {
      stateId: 'A',
      // Phase A current
      elaborationStartDate: '2023-08-01',
      estimatedEndDate: '2023-12-15',
      modality: 'Contratista',
      contractorName: 'Consultoría Ambiental S.A.S',
      elaborationSupportUrl: '#'
    }
  },
  {
    id: 'T-004',
    instrumentType: 'PMA',
    licenseStatus: 'En Trámite',
    processInfo: {
      stateId: 'B',
      // Phase A history
      elaborationStartDate: '2022-10-01',
      estimatedEndDate: '2023-03-30',
      modality: 'Propia',
      contractorName: 'Equipo Ambiental Minlitica',
      elaborationSupportUrl: '#',
      // Phase B current
      presentationDate: '2023-05-10',
      approvedBy: 'Director Ambiental',
      radicationDate: '2023-05-15',
      financialRightsPaid: true,
      financialRightsAmount: 15000000,
      financialRightsDate: '2023-05-01',
      presentationSupportUrl: '#'
    }
  },
  {
    id: 'T-005',
    instrumentType: 'EIA',
    licenseStatus: 'Rechazado',
    processInfo: {
      stateId: 'E',
      // Phase A history
      elaborationStartDate: '2020-03-01',
      estimatedEndDate: '2020-12-15',
      modality: 'Contratista',
      contractorName: 'GeoAmbiente Ltda',
      elaborationSupportUrl: '#',
      // Phase B history
      presentationDate: '2021-01-20',
      radicationDate: '2021-01-25',
      financialRightsPaid: true,
      financialRightsAmount: 30000000,
      financialRightsDate: '2021-01-10',
      presentationSupportUrl: '#',
      // Phase C history
      requirementsNotificationDate: '2021-06-15',
      requirementsDeadline: '2021-07-15',
      // Phase E current
      rejectionDate: '2021-11-20',
      rejectionResolutionNumber: 'RES-2021-0899',
      rejectionObservations: 'Estudio hidrológico insuficiente para zona de recarga de acuíferos.',
      rejectionSupportUrl: '#'
    }
  }
];
