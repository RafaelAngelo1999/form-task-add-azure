export interface ProjetoDto {
  id: string;
  name: string;
  url: string;
  state: string;
  revision: number;
  visibility: string;
  lastUpdateTime: string;
}

export interface ObterProjetoDto {
  count: number;
  value: ProjetoDto[];
}
