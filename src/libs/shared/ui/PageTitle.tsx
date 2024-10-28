import { FC, ReactNode } from "react";

interface PageTitleProps {
  children: ReactNode;
}

const PageTitle: FC<PageTitleProps> = ({ children }) => {
  return <h1 className="text-center text-3xl font-bold">{children}</h1>;
};

export default PageTitle;
