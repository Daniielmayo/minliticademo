export interface TituloRef {
  id: string;
  placa: string;
  titular: string;
  tipo: string;
  minasAsociadas: string[];
}

export interface TrabajadorRef {
  id: string;
  nombreCompleto: string;
  documento: string;
  tipo: 'mina' | 'administrativo' | 'área';
  areaNombre?: string;
  tituloPlaca?: string;
  minaNombre?: string;
  cargo: string;
  empresaTipo: 'propio' | 'contratista' | 'subcontrato';
  nombreEmpresa?: string;
}

export interface MinaRef {
  id: string;
  nombre: string;
  tituloPlaca: string;
  ubicacion: string;
}

export interface ResponsableRef {
  id: string;
  nombre: string;
  cargo: string;
  email?: string;
}
