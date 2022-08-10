export interface TimeDto {
    id: string;
    name: string;
    url: string;
    description: string;
    identityUrl: number;
    projectName: string;
    projectId: string;
  }
  
  export interface ObterTimeDto {
    value: TimeDto[];
  }