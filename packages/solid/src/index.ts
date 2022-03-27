import type { Component } from "solid-js";
import type { MotionDOMComponents, MotionComponentProps } from "./types";
import { createMotionComponent } from "./component";

const components = new Map<string, any>()
export const Motion = new Proxy(
  {},
  {
    get: (_, tag: string): Component => {
      tag = tag.toLowerCase();
      if (!components.has(tag)) {
        components.set(tag, (props: MotionComponentProps) =>
          createMotionComponent({ ...props, tag })
        )
      }
      return components.get(tag)!
    },
  }
) as MotionDOMComponents
