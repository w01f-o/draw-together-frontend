"use client";

import { FC, useEffect, useRef } from "react";
import { socket } from "@/libs/scopes/room/data-access/websocket";
import { SocketEvents } from "@/libs/enums/SocketEvents.enum";
import { throttle } from "lodash";
import { Room } from "@/libs/types/Room.type";

interface CanvasProps {
  room: Room;
}

const Canvas: FC<CanvasProps> = ({ room }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  const sendCanvasData = throttle(() => {
    const canvasEl = canvasRef.current;
    if (canvasEl) {
      const dataUrl = canvasEl.toDataURL();
      socket.emit(SocketEvents.DRAW, { roomId: room.id, dataUrl });
    }
  }, 50);

  useEffect(() => {
    const canvasEl = canvasRef.current;
    const wrapperEl = wrapperRef.current;

    if (
      !canvasEl ||
      !(canvasEl instanceof HTMLCanvasElement) ||
      !canvasEl.getContext("2d") ||
      !wrapperEl
    ) {
      throw new Error("Canvas not found or canvas context not found");
    }

    const ctx = canvasEl.getContext("2d")!;

    const mouseLeaveHandler = () => {
      canvasEl.removeEventListener("mousemove", mouseMoveHandler);
      ctx.closePath();
    };

    const mouseDownHandler = () => {
      canvasEl.addEventListener("mousemove", mouseMoveHandler);
      canvasEl.addEventListener("mouseup", mouseUpHandler, { once: true });
      canvasEl.addEventListener("mouseleave", mouseLeaveHandler, {
        once: true,
      });

      ctx.beginPath();
    };

    const mouseMoveHandler = (e: MouseEvent) => {
      const { offsetX, offsetY } = e;

      ctx.lineTo(offsetX, offsetY);
      ctx.stroke();
      sendCanvasData();
    };

    const mouseUpHandler = () => {
      canvasEl.removeEventListener("mousemove", mouseMoveHandler);
      ctx.closePath();

      sendCanvasData();
    };

    canvasEl.addEventListener("mousedown", mouseDownHandler);

    canvasEl.width = wrapperEl.offsetWidth;
    canvasEl.height = wrapperEl.offsetHeight;

    return () => {
      if (canvasEl) {
        canvasEl.removeEventListener("mousedown", mouseDownHandler);
        canvasEl.removeEventListener("mousemove", mouseMoveHandler);
        canvasEl.removeEventListener("mouseup", mouseUpHandler);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canvasRef.current]);

  const drawFromServer = ({
    dataUrl,
    roomId: id,
  }: {
    dataUrl: string;
    roomId: string;
  }) => {
    if (id === room.id && canvasRef.current) {
      const canvasEl = canvasRef.current;
      const ctx = canvasEl.getContext("2d");
      if (ctx) {
        const img = new Image();
        img.src = dataUrl;
        img.onload = () => {
          ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);
          ctx.drawImage(img, 0, 0);
        };
      }
    }
  };

  useEffect(() => {
    socket.on(SocketEvents.DRAW, ({ dataUrl, roomId: id }) => {
      drawFromServer({ dataUrl, roomId: id });
    });

    return () => {
      socket.off(SocketEvents.DRAW);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [room.id, canvasRef.current]);

  useEffect(() => {
    if (room.dataUrl !== null) {
      drawFromServer({ dataUrl: room.dataUrl, roomId: room.id });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canvasRef.current]);

  return (
    <div
      className="w-full h-[700px] rounded-2xl overflow-hidden"
      ref={wrapperRef}
    >
      <canvas ref={canvasRef} className="bg-amber-50"></canvas>
    </div>
  );
};

export default Canvas;
