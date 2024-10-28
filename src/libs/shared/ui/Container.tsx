import { FC, ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
}

const Container: FC<ContainerProps> = ({ children }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-8 w-full max-w-screen-xl mx-auto">
      {children}
    </div>
  );
};

export default Container;
