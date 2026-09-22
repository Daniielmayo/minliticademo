export interface TitleCoordinate {
  lat: number;
  lng: number;
}

export interface TitleData {
  id: string;
  placa: string;
  titular: string;
  tipo: string;
  etapa: string;
  vigencia: string;
  estado: string;
  extension: string;
  coordinates: TitleCoordinate;
  polygon: TitleCoordinate[];
  color: string;
}
