import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  isMarginTopEqualHeaderHeight?: boolean;
};

function Container({ children, isMarginTopEqualHeaderHeight }: Props) {
  return (
    <div
      className={`container ${
        isMarginTopEqualHeaderHeight ? "mt-header-height" : " "
      }`}
    >
      {children}
    </div>
  );
}

export default Container;
