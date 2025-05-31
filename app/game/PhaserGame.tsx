'use client';
import { forwardRef, useEffect, useLayoutEffect, useRef } from 'react';
import StartGame from './main';
import { EventBus } from './EventBus';

// Type definitions
export interface PhaserGameRef {
  game: Phaser.Game;
  scene: Phaser.Scene | null;
}

interface PhaserGameProps {
  currentActiveScene?: (scene: Phaser.Scene) => void;
}

export const PhaserGame = forwardRef<PhaserGameRef, PhaserGameProps>(
  function PhaserGame({ currentActiveScene }, ref) {
    const game = useRef<Phaser.Game | undefined>(undefined);

    // Create the game inside a useLayoutEffect hook to avoid the game being created outside the DOM
    useLayoutEffect(() => {
      if (game.current === undefined) {
        game.current = StartGame("game-container");

        if (ref && typeof ref === 'object') {
          ref.current = { game: game.current, scene: null };
        }
      }

      return () => {
        if (game.current) {
          game.current.destroy(true);
          game.current = undefined;
        }
      };
    }, [ref]);

    useEffect(() => {
      const handleSceneReady = (currentScene: Phaser.Scene) => {
        if (currentActiveScene && typeof currentActiveScene === 'function') {
          currentActiveScene(currentScene);
        }
        
        if (ref && typeof ref === 'object' && ref.current) {
          ref.current.scene = currentScene;
        }
      };

      EventBus.on('current-scene-ready', handleSceneReady);

      return () => {
        EventBus.removeListener('current-scene-ready', handleSceneReady);
      };
    }, [currentActiveScene, ref]);

    return <div id="game-container"></div>;
  }
);