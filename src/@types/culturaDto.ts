export interface  PontoCultivo {
    latitude: string;
    longitude: string;
  }
  
  export interface Temperatura {
    data: string;
    temperatura: number;
  }
  
  export interface Pluviometria {
    data: string;
    pluviometria: number;
  }
  
  export interface Cultivo {
    _id ?: string 
    ponto_cultivo: PontoCultivo;
    nome_cultivo: string;
    temperatura_max: number;
    pluviometria_max: number;
    temperatura_min: number;
    pluviometria_min: number;
    temperaturas: Temperatura[];
    pluviometrias: Pluviometria[];
    alertasTemp: Temperatura[];
    alertasPluvi: Pluviometria[];
    lastUpdate: string;
  }
  