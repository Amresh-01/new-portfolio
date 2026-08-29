"use client";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";

export const BackgroundRippleEffect = ({
  rows = 8,
  cols = 27,
  cellSize = 56,
  interactive = true,
  autoRipple = true,
  rippleInterval = 1800,
}: {
  rows?: number;
  cols?: number;
  cellSize?: number;
  interactive?: boolean;
  autoRipple?: boolean;
  rippleInterval?: number;
}) => {
  const [clickedCell, setClickedCell] = useState<{
    row: number;
    col: number;
  } | null>(null);
  const [rippleKey, setRippleKey] = useState(0);
  const clearRippleTimerRef = useRef<number | null>(null);

  useEffect(() => {
    if (!autoRipple) return;

    const tick = () => {
      const row = Math.floor(Math.random() * rows);
      const col = Math.floor(Math.random() * cols);
      setClickedCell({ row, col });
      setRippleKey((k) => k + 1);
    };

    tick();
    const id = window.setInterval(tick, rippleInterval);
    return () => window.clearInterval(id);
  }, [autoRipple, cols, rippleInterval, rows]);

  useEffect(() => {
    return () => {
      if (clearRippleTimerRef.current) {
        window.clearTimeout(clearRippleTimerRef.current);
      }
    };
  }, []);

  const triggerRipple = useCallback((row: number, col: number) => {
    setClickedCell({ row, col });
    setRippleKey((k) => k + 1);

    const maxDistance = Math.hypot(rows - 1, cols - 1);
    const maxDuration = 200 + maxDistance * 80;
    const oneWaveMs = maxDuration + maxDistance * 55;
    const totalMs = oneWaveMs * 2 + 160;

    if (clearRippleTimerRef.current) {
      window.clearTimeout(clearRippleTimerRef.current);
    }
    clearRippleTimerRef.current = window.setTimeout(() => {
      setClickedCell(null);
    }, totalMs);
  }, [cols, rows]);

  return (
    <>
      <style jsx>{`
        @keyframes cell-ripple {
          0% {
            opacity: 0.4;
            transform: scale(1);
          }
          15% {
            opacity: 1;
            transform: scale(1.05);
            box-shadow: 0px 0px 40px 8px var(--cell-shadow-color) inset;
          }
          30% {
            opacity: 0.8;
            transform: scale(1);
          }
          100% {
            opacity: 0.4;
            transform: scale(1);
          }
        }

        .ripple-container {
          position: absolute;
          inset: 0;
          height: 100%;
          width: 100%;
          --cell-border-color: rgba(200, 200, 220, 0.4);
          --cell-fill-color: rgba(240, 240, 250, 0.5);
          --cell-shadow-color: rgba(100, 100, 200, 0.3);
        }

        @media (prefers-color-scheme: dark) {
          .ripple-container {
            --cell-border-color: rgba(100, 100, 150, 0.35);
            --cell-fill-color: rgba(30, 30, 50, 0.4);
            --cell-shadow-color: rgba(150, 150, 255, 0.4);
          }
        }

        .ripple-inner {
          position: relative;
          height: auto;
          width: auto;
          overflow: hidden;
        }

        .ripple-overlay {
          pointer-events: none;
          position: absolute;
          inset: 0;
          z-index: 2;
          height: 100%;
          width: 100%;
          overflow: hidden;
        }

        .grid-container {
          position: relative;
          z-index: 3;
          opacity: 1;
        }
      `}</style>
      <div className="ripple-container">
        <div className="ripple-inner">
          <div className="ripple-overlay" />
          <DivGrid
            key={`base-${rippleKey}`}
            className="grid-container"
            rows={rows}
            cols={cols}
            cellSize={cellSize}
            borderColor="var(--cell-border-color)"
            fillColor="var(--cell-fill-color)"
            clickedCell={clickedCell}
            onCellClick={triggerRipple}
            interactive={interactive}
          />
        </div>
      </div>
    </>
  );
};

type DivGridProps = {
  className?: string;
  rows: number;
  cols: number;
  cellSize: number;
  borderColor: string;
  fillColor: string;
  clickedCell: { row: number; col: number } | null;
  onCellClick?: (row: number, col: number) => void;
  interactive?: boolean;
};

type CellStyle = React.CSSProperties & {
  ["--delay"]?: string;
  ["--duration"]?: string;
};

const DivGrid = ({
  className,
  rows = 7,
  cols = 30,
  cellSize = 56,
  borderColor = "#3f3f46",
  fillColor = "rgba(14,165,233,0.3)",
  clickedCell = null,
  onCellClick = () => {},
  interactive = true,
}: DivGridProps) => {
  const cells = useMemo(
    () => Array.from({ length: rows * cols }, (_, idx) => idx),
    [rows, cols],
  );

  const gridStyle: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
    gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))`,
    width: "100%",
    height: "100%",
    minHeight: rows * cellSize,
  };

  return (
    <>
      <style jsx>{`
        .cell {
          position: relative;
          border: 1px solid;
          opacity: 0.4;
          transition: opacity 150ms;
          will-change: transform;
        }

        .cell:hover {
          opacity: 1;
        }

        .cell.animate {
          animation: cell-ripple var(--duration, 400ms) ease-out var(--delay, 0ms) 1;
          animation-fill-mode: none;
        }

        .cell.non-interactive {
          pointer-events: none;
        }

        @media (prefers-color-scheme: dark) {
          .cell {
            box-shadow: 0px 0px 20px 1px var(--cell-shadow-color) inset;
          }
        }
      `}</style>
      <div className={className} style={gridStyle}>
        {cells.map((idx) => {
          const rowIdx = Math.floor(idx / cols);
          const colIdx = idx % cols;
          const distance = clickedCell
            ? Math.hypot(clickedCell.row - rowIdx, clickedCell.col - colIdx)
            : 0;
          const delay = clickedCell ? Math.max(0, distance * 55) : 0;
          const duration = 200 + distance * 80;

          const style: CellStyle = clickedCell
            ? {
                "--delay": `${delay}ms`,
                "--duration": `${duration}ms`,
                backgroundColor: fillColor,
                borderColor: borderColor,
              }
            : {
                backgroundColor: fillColor,
                borderColor: borderColor,
              };

          const cellClasses = [
            "cell",
            clickedCell && "animate",
            !interactive && "non-interactive",
          ]
            .filter(Boolean)
            .join(" ");

          return (
            <div
              key={idx}
              className={cellClasses}
              style={style}
              onClick={
                interactive ? () => onCellClick?.(rowIdx, colIdx) : undefined
              }
            />
          );
        })}
      </div>
    </>
  );
};