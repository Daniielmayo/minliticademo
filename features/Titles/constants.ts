import { TitleData } from './types';
import { COLOR_PALETTE } from '@/shared/constants/colors';

export const titlesData: TitleData[] = [
  {
    id: '550e8400-e29b-41d4-a716-446655440000',
    placa: 'M-12345',
    titular: 'Minera del Norte S.A.S.',
    tipo: 'Concesión',
    etapa: 'Explotación',
    vigencia: '2045',
    estado: 'Activo',
    extension: '450 Ha.',
    coordinates: { lat: 5.7153, lng: -72.9322 }, // Sogamoso, Boyacá
    polygon: [
      { lat: 5.72, lng: -72.94 },
      { lat: 5.72, lng: -72.92 },
      { lat: 5.71, lng: -72.92 },
      { lat: 5.71, lng: -72.94 },
    ],
    color: COLOR_PALETTE.secondary
  },
  {
    id: '123e4567-e89b-12d3-a456-426614174000',
    placa: 'L-98765',
    titular: 'Exploraciones Andes Ltda',
    tipo: 'Solicitud',
    etapa: 'Exploración',
    vigencia: '2038',
    estado: 'Inactivo',
    extension: '120 Ha.',
    coordinates: { lat: 7.1254, lng: -73.1198 }, // Bucaramanga, Santander
    polygon: [
      { lat: 7.13, lng: -73.12 },
      { lat: 7.13, lng: -73.11 },
      { lat: 7.12, lng: -73.11 },
      { lat: 7.12, lng: -73.12 },
    ],
    color: COLOR_PALETTE.primary
  },
  {
    id: '987fcdeb-51a2-43d7-9012-3456789abcde',
    placa: 'G-45612',
    titular: 'Canteras del Sur',
    tipo: 'Registro de propiedad privada',
    etapa: 'Construcción',
    vigencia: '2052',
    estado: 'Suspendido',
    extension: '300 Ha.',
    coordinates: { lat: 7.8939, lng: -72.5078 }, // Cúcuta, Norte de Santander
    polygon: [
      { lat: 7.90, lng: -72.51 },
      { lat: 7.90, lng: -72.49 },
      { lat: 7.88, lng: -72.49 },
      { lat: 7.88, lng: -72.51 },
    ],
    color: COLOR_PALETTE.details
  },
  {
    id: 'a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d',
    placa: 'S-77889',
    titular: 'Cooperativa Minera El Sol',
    tipo: 'Subcontrato',
    etapa: 'Operación',
    vigencia: '2030',
    estado: 'Activo',
    extension: '85 Ha.',
    coordinates: { lat: 5.5353, lng: -73.3678 }, // Tunja, Boyacá
    polygon: [
      { lat: 5.54, lng: -73.37 },
      { lat: 5.54, lng: -73.36 },
      { lat: 5.53, lng: -73.36 },
      { lat: 5.53, lng: -73.37 },
    ],
    color: COLOR_PALETTE.secondary
  },
];
