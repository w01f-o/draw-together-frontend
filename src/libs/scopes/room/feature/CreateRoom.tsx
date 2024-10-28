"use client";

import { FC, useState } from "react";
import { Button } from "@nextui-org/button";
import { PlusIcon } from "lucide-react";
import { useDisclosure } from "@nextui-org/react";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/modal";
import { Input } from "@nextui-org/input";
import { socket } from "@/libs/scopes/room/data-access/websocket";
import { SocketEvents } from "@/libs/enums/SocketEvents.enum";
import { useUser } from "@/libs/scopes/user/hooks/useUser";
import { RoomsApi } from "@/libs/scopes/room/data-access/Rooms.api";
import { useRouter } from "next/navigation";
import { RoutePaths } from "@/libs/enums/RoutePaths.enum";
import { useForm } from "react-hook-form";

interface FormState {
  name: string;
}

const CreateRoom: FC = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { user } = useUser();
  const router = useRouter();

  const submitHandler = async ({ name }: FormState) => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 500));

    const room = await RoomsApi.create({ user, name });

    socket.emit(SocketEvents.CREATE_ROOM);
    router.push(`${RoutePaths.ROOM}/${room.id}`);
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormState>();

  return (
    <div className="flex justify-center">
      <Button isIconOnly onClick={onOpen} color="primary">
        <PlusIcon />
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center">
        <ModalContent className="py-3">
          {() => (
            <>
              <ModalHeader>Create Room</ModalHeader>
              <form onSubmit={handleSubmit(submitHandler)}>
                <ModalBody>
                  <Input
                    placeholder="Room name"
                    size="lg"
                    {...register("name", { required: true })}
                    autoFocus
                    isInvalid={!!errors.name}
                  />
                </ModalBody>
                <ModalFooter>
                  <Button color="primary" isLoading={isLoading} type="submit">
                    Create
                  </Button>
                </ModalFooter>
              </form>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default CreateRoom;
