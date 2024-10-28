import { FC } from "react";
import NameChanger from "@/libs/scopes/user/feature/NameChanger";
import Container from "@/libs/shared/ui/Container";
import PageTitle from "@/libs/shared/ui/PageTitle";
import RoomList from "@/libs/scopes/room/ui/RoomList";

const Page: FC = () => {
  return (
    <Container>
      <PageTitle>Draw together!</PageTitle>
      <NameChanger />
      <RoomList />
    </Container>
  );
};

export default Page;
