import {
  CanvasHTMLAttributes,
  DetailedHTMLProps,
  RefObject,
  forwardRef,
  useEffect,
} from "react";

import { Dimension } from "../../constants";

import "./canvas.css";

type Props = DetailedHTMLProps<
  CanvasHTMLAttributes<HTMLCanvasElement>,
  HTMLCanvasElement
> & {
  draw: (ctx: CanvasRenderingContext2D) => void;
};

const Canvas = forwardRef<HTMLCanvasElement, Props>(
  ({ draw, ...props }, canvasRef) => {
    useEffect(() => {
      const canvas = (canvasRef as RefObject<HTMLCanvasElement>)?.current;

      if (!canvas) {
        return;
      }

      const context = canvas.getContext("2d");

      if (!context) {
        return;
      }

      draw(context);

      return () =>
        context.clearRect(0, 0, Dimension.canvasWidth, Dimension.canvasHeight);
    }, [draw, canvasRef]);

    if (!canvasRef) {
      return null;
    }

    return <canvas className="root" ref={canvasRef} {...props} />;
  }
);

export default Canvas;
