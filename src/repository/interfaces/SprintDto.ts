export interface SprintDto {
  id: string;
  name: string;
  path: string;
  attributes: { startDate: string; finishDate: string; timeFrame: string };
  url: number;
}

export interface ObterSprintDto {
  count: number;
  value: SprintDto[];
}
