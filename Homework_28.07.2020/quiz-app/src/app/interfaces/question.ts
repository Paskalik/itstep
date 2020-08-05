import { Variants } from './variants';

export interface Question {
  id: number;
  text: string;
  variants: Array<Variants>;
}
