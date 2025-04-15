import { useCallback, useEffect, useRef, useState } from "react";
import Phaser from "phaser";
import { gameConfig } from "../game/config";
import { ConnectDevice } from "./ConnectDevice";
import { GameScene } from "../game/scenes/GameScene";

const Game = () => {
  const [device, setDevice] = useState<HIDDevice | null>(null);

  const gameRef = useRef<Phaser.Game | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only create the game once
    if (gameRef.current || !containerRef.current) return;

    gameRef.current = new Phaser.Game(gameConfig);
  }, []);

  // Force container to take up full size
  useEffect(() => {
    if (containerRef.current) {
      const resizeObserver = new ResizeObserver(() => {
        if (gameRef.current) {
          gameRef.current.scale.refresh();
        }
      });

      resizeObserver.observe(containerRef.current);
      return () => resizeObserver.disconnect();
    }
  }, []);

  const onDeviceConnect = useCallback((device: HIDDevice) => {
    setDevice((existing) => {
      if (existing) {
        existing.close();
      }

      (gameRef.current?.scene.getScene("GameScene") as GameScene)?.setDevice(
        device
      );

      return device;
    });
  }, []);

  // Handle device disconnect
  useEffect(() => {
    const handler = (event: HIDConnectionEvent) => {
      console.log("Device disconnected", event);

      setDevice((existing) => {
        if (existing && existing === event.device) {
          existing.close();
          (
            gameRef.current?.scene.getScene("GameScene") as GameScene
          )?.closeDevice();
          return null;
        }

        return existing;
      });
    };

    navigator.hid.addEventListener("disconnect", handler);

    // Cleanup
    return () => {
      navigator.hid.removeEventListener("disconnect", handler);
    };
  }, []);

  return (
    <>
      <ConnectDevice onConnect={onDeviceConnect} device={device} />

      <div
        id="game-div"
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "75%",
          position: "relative",
        }}
      >
        <div style={{ width: "100%", height: "100%", position: "relative" }}>
          <div
            ref={containerRef}
            id="game-container"
            className="game-container"
            style={{ width: "100%", height: "100%" }}
          />
        </div>
      </div>
    </>
  );
};

export default Game;
