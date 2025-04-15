import { useCallback, useEffect, useRef, useState } from "react";
import Phaser from "phaser";
import { gameConfig } from "../game/config";
import { ConnectDevice } from "./ConnectDevice";
import { GameScene } from "../game/scenes/GameScene";

const Game = () => {
  const [device, setDevice] = useState<HIDDevice | null>(null);

  const gameRef = useRef<Phaser.Game | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    // Only create the game once
    if (gameRef.current || !containerRef.current) return;

    // Initialize the game
    const config = {
      ...gameConfig,
    };

    // Small delay to ensure DOM has fully rendered
    const initTimer = setTimeout(() => {
      gameRef.current = new Phaser.Game(config);
    }, 50);

    // Handle orientation change and resize events
    const resizeGame = () => {
      if (gameRef.current) {
        gameRef.current.scale.refresh();

        // Update container size state to force React re-render
        if (containerRef.current) {
          setContainerSize({
            width: containerRef.current.clientWidth,
            height: containerRef.current.clientHeight,
          });
        }
      }
    };

    window.addEventListener("resize", resizeGame);
    window.addEventListener("orientationchange", resizeGame);

    // Trigger initial resize after game is created
    const initialResizeTimer = setTimeout(resizeGame, 200);

    // Cleanup when component unmounts
    return () => {
      clearTimeout(initTimer);
      clearTimeout(initialResizeTimer);
      window.removeEventListener("resize", resizeGame);
      window.removeEventListener("orientationchange", resizeGame);

      if (gameRef.current) {
        gameRef.current.destroy(true);
        gameRef.current = null;
      }
    };
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
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        gap: "1rem",
      }}
    >
      <ConnectDevice onConnect={onDeviceConnect} device={device} />
      <div style={{ width: "100%", height: "100%", position: "relative" }}>
        <div
          ref={containerRef}
          id="game-container"
          className="game-container"
          style={{ width: "100%", height: "100%" }}
        />
      </div>
    </div>
  );
};

export default Game;
