"use client";

import { FC } from "react";
import { Avatar } from "@nextui-org/avatar";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { PencilLine } from "lucide-react";
import { useUser } from "@/libs/scopes/user/hooks/useUser";
import { useForm } from "react-hook-form";

interface FormState {
  username: string;
}

const NameChanger: FC = () => {
  const {
    user: { name: username },
    setName: setUsername,
  } = useUser();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormState>();

  const submitHandler = ({ username }: FormState) => {
    setUsername(username);
  };

  return (
    <div className="flex justify-center gap-6 w-1/2">
      <Avatar name={username} size={"lg"} />
      <form
        className="flex items-center gap-4 w-2/3"
        onSubmit={handleSubmit(submitHandler)}
        autoComplete={"off"}
      >
        <Input
          type="text"
          label="Username"
          isInvalid={!!errors.username}
          errorMessage={"Username is required"}
          {...register("username", {
            required: true,
          })}
          defaultValue={username === "Guest" ? "" : username}
        />
        <Button type="submit" isIconOnly>
          <PencilLine />
        </Button>
      </form>
    </div>
  );
};

export default NameChanger;
