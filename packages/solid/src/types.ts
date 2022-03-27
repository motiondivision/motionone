import type { Component, PropsWithChildren, Accessor } from "solid-js";
import type { Options } from "@motionone/dom";
import { htmlElements, svgElements } from "./utils/supported-elements";
import type {
  MotionEvent,
  VariantDefinition,
  AnimationOptionsWithOverrides,
  CustomPointerEvent,
  ViewEvent
} from "@motionone/dom";

export interface MotionEventHandlers {
  onMotionStart?: (event: MotionEvent) => void;
  onMotionComplete?: (event: MotionEvent) => void;
  onHoverStart?: (event: CustomPointerEvent) => void;
  onHoverEnd?: (event: CustomPointerEvent) => void;
  onPressStart?: (event: CustomPointerEvent) => void;
  onPressEnd?: (event: CustomPointerEvent) => void;
  onViewEnter?: (event: ViewEvent) => void;
  onViewLeave?: (event: ViewEvent) => void;
}

type UnionStringArray<T extends Readonly<string[]>> = T[number];

export type HTMLElements = UnionStringArray<typeof htmlElements>;
export type SVGElements = UnionStringArray<typeof svgElements>;

export type MotionComponentProps = Options &
  PropsWithChildren &
  MotionEventHandlers & {
    style?: object;
    class?: string;
    tag: string;
    animate?: Accessor<VariantDefinition>;
    exit?: Accessor<VariantDefinition>;
    hover?: Accessor<VariantDefinition>;
    press?: Accessor<VariantDefinition>;
    transition?: Accessor<AnimationOptionsWithOverrides> | AnimationOptionsWithOverrides;
  };

export type MotionHTMLComponents = {
  [Element in keyof HTMLElements as Capitalize<HTMLElements>]: Component<MotionComponentProps>;
};
export type MotionSVGComponents = {
  [Element in keyof SVGElements as Capitalize<HTMLElements>]: Component<MotionComponentProps>;
};

export type MotionDOMComponents = MotionHTMLComponents & MotionSVGComponents;

export type KeyframeType = Keyframe[] | PropertyIndexedKeyframes;
export type MovedElement = [el: Element, x: number, y: number];
export type MoveIntegration = (allElements: Element[]) => void;
export type ExitIntegration = (
  exitingElements: Element[],
  finish: (elements: Element[]) => void
) => void;
export type EnterIntegration = (
  enteringElements: Element[],
  finish?: ((elements: Element[]) => void) | undefined
) => void;
