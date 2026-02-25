export interface FormOption<V = string | number> {
  label: string;
  value: V;
  [key: string]: unknown;
}
