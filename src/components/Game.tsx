import { useCallback, useEffect, useRef, useState } from "react";
import Phaser from "phaser";
import { gameConfig } from "../game/config";
import { ConnectDevice } from "./ConnectDevice";
import { GameScene } from "../game/scenes/GameScene";
import { MenuScene } from "../game/scenes/MenuScene";
import { GameOverScene } from "../game/scenes/GameOverScene";
import { NameEntryScene } from "../game/scenes/NameEntryScene";
import { HighScoresScene } from "../game/scenes/HighScoresScene";
import { ScenarioScene } from "../game/scenes/ScenarioScene";

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
      gameRef.current = new Phaser.Game({
        ...config,
        scene: [
          MenuScene,
          GameScene,
          GameOverScene,
          NameEntryScene,
          HighScoresScene,
          ScenarioScene,
        ],
      });
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

  useEffect(() => {
    if (device) {
      (
        gameRef.current?.scene.getScene("ScenarioScene") as GameScene
      )?.setDevice(device);
    } else {
      (
        gameRef.current?.scene.getScene("ScenarioScene") as GameScene
      )?.closeDevice();
    }
  }, [device, gameRef, gameRef.current]);

  const onDeviceConnect = useCallback((device: HIDDevice) => {
    setDevice((existing) => {
      if (existing) {
        existing.close();
      }

      return device;
    });
  }, []);

  const onDeviceDisconnect = useCallback(() => {
    setDevice(null);
  }, []);

  return (
    <div className="game-root">
      <ConnectDevice
        onConnect={onDeviceConnect}
        onDisconnect={onDeviceDisconnect}
        device={device}
      />
      <div className="game-wrapper">
        <div
          ref={containerRef}
          id="game-container"
          className="game-container"
          tabIndex={0}
          onClick={() => containerRef.current?.focus()}
        />
      </div>
    </div>
  );
};

export default Game;
