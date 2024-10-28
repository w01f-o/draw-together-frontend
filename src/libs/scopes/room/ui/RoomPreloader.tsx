import { FC } from "react";
import { Card, CardBody } from "@nextui-org/card";
import { Skeleton } from "@nextui-org/skeleton";

const RoomPreloader: FC = () => {
  return (
    <Card className="px-4 py-3">
      <CardBody className="gap-4">
        <Skeleton className="flex rounded-2xl h-7" />
        <div className="flex gap-3 flex-grow">
          {Array.from({ length: 3 }, (_, i) => (
            <Skeleton className="flex rounded-full size-10" key={i} />
          ))}
        </div>
      </CardBody>
    </Card>
  );
};

export default RoomPreloader;
