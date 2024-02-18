import {ButtonType} from './constants';

type KeyExtractor<T> = T[keyof T];

interface Button {
  type: KeyExtractor<typeof ButtonType>;
  children: React.ReactNode;
}

export const Button = ({type = ButtonType.Button, children}: Button) => {
  return <button type={type}>{children}</button>;
};
