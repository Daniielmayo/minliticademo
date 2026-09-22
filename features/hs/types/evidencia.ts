export type TipoEvidencia = 'archivo' | 'link';

export interface Evidencia {
  id: string;
  tipo: TipoEvidencia;
  archivo_url?: string;
  link_url?: string;
  nombre_archivo?: string;
  descripcion?: string;
  fecha_carga: string;
  cargado_por: string;
}
