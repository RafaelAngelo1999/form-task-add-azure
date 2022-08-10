export interface IStepperGeneric {
  name: string;
  isSkipped?: boolean;
  component: React.ReactNode;
  functionNext?: () => void;
}
