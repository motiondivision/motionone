// import { hasChanged } from "./utils/has-changed"
// import { getOptions } from "../utils/options"
// import { hover } from "./gestures/hover"
// import { inView } from "./gestures/in-view"
// import { press } from "./gestures/press"
// import type {
//   GestureHandler,
//   GestureSubscriptions,
//   Poses,
//   Pose,
//   PoserOptions,
//   Poser,
// } from "./types"
// import { animateStyle } from "../animate-style"
// import type { AcceptedElements, AnimationFactory } from "../types"
// import { noop } from "../../utils/noop"
// import { style } from "../style"
// import { getPose } from "./utils/get-pose"
// import { resolveElements } from "../utils/resolve-elements"
// import { poseEvent } from "./utils/events"
// import { addUniqueItem } from "../../utils/array"

// const gestures = { style: () => () => {}, inView, hover, press }
// const poseStateNames = Object.keys(gestures)
// const gesturePriority = [style, inView, hover, press]
// const numGestures = gesturePriority.length

// type FrameProcess = (framestamp: number) => Generator
// let scheduled: FrameProcess[] = []

// function processAnimations(framestamp: number) {
//   const generators: Generator[] = []
//   for (let i = 0; i < scheduled.length; i++) {}

//   thisFrame.map((process) => process(framestamp))
// }

// function schedule(process: FrameProcess) {
//   if (!scheduled.length) requestAnimationFrame(processAnimations)
//   addUniqueItem(scheduled, process)
// }

// let id = 0
// export function createPoser(
//   element: HTMLElement | SVGElement,
//   poses: Poses,
//   options: PoserOptions = {}
// ): Poser {
//   const poserId = `${id++}`
//   const childrenSelector = `[data-pose]:not([data-pose="${poserId}"] [data-pose] [data-pose])`
//   element.dataset.pose = poserId

//   let target: Pose = {}
//   const baseTarget: Pose = {}
//   const activeStates = poseStateNames.map(() => false)
//   const gestureSubscriptions: GestureSubscriptions = {}

//   function update() {
//     schedule(animate)
//   }

//   function* animate(framestamp: number) {
//     /**
//      * TODO: Redo this bit -
//      * Pose label animations need to be collected by a single traversal
//      * function because that will more easily do before/after scheduling
//      */

//     /**
//      * Figure out which poses have changed this frame.
//      */

//     /**
//      * Add any direct posed children to the update queue.
//      * TODO: What happens if this have already been updated?
//      * Poses won't be propagated correctly.
//      */

//     /**
//      * Save the index of each posed child.
//      */

//     yield

//     /**
//      * Resolve applied poses and create animations.
//      */

//     yield

//     /**
//      * Trigger animations
//      */
//   }

//   // const update = () => {
//   //   const prevTarget = target
//   //   target = {}
//   //   const animationOptions = {}

//   //   for (let i = 0; i < numGestures; i++) {
//   //     const name = poseStateNames[i]
//   //     const gesturePose = getPose(name, poses)

//   //     if (!activeStates[name] || !gesturePose) continue

//   //     for (const key in gesturePose) {
//   //       if (key === "options") continue

//   //       target[key] = gesturePose[key]
//   //       animationOptions[key] = getOptions(
//   //         gesturePose.options ?? options,
//   //         key
//   //       )
//   //     }
//   //   }

//   //   const allTargetKeys = new Set([
//   //     ...Object.keys(target),
//   //     ...Object.keys(prevTarget),
//   //   ])

//   //   const animationFactories: AnimationFactory[] = []

//   //   allTargetKeys.forEach((key) => {
//   //     if (target[key] === undefined) {
//   //       target[key] = baseTarget[key]
//   //     }

//   //     if (hasChanged(prevTarget[key], target[key])) {
//   //       baseTarget[key] ??= style.get(element, key) as string

//   //       animationFactories.push(
//   //         animateStyle(
//   //           element,
//   //           key,
//   //           target[key],
//   //           animationOptions[key] || options
//   //         )
//   //       )
//   //     }
//   //   })

//   //   return () => {
//   //     const animations = animationFactories
//   //       .map((factory) => factory())
//   //       .filter(Boolean)

//   //     if (!animations.length) return

//   //     element.dispatchEvent(poseEvent("posestart", target))
//   //     Promise.all(animations.map((animation: any) => animation.finished))
//   //       .then(() => element.dispatchEvent(poseEvent("posecomplete", target)))
//   //       .catch(noop)
//   //   }
//   // }

//   const setPoseState = (name: string, state: boolean) => () => {
//     activeStates[name] = state
//     update()
//   }

//   const updateGestureHandlers = () => {
//     for (const name in gestures) {
//       const removeHandler = gestureSubscriptions[name]
//       if (poses[name] && !removeHandler) {
//         const handler = gestures[name] as GestureHandler
//         gestureSubscriptions[name] = handler(element, {
//           enable: setPoseState(name, true),
//           disable: setPoseState(name, false),
//         })
//       } else if (!poses[name] && removeHandler) {
//         removeHandler()
//         gestureSubscriptions[name] = undefined
//       }
//     }
//   }

//   setPoseState("style", true)()
//   updateGestureHandlers()

//   return {
//     update: (newPoses: Poses, newOptions: PoserOptions) => {
//       poses = newPoses
//       options = newOptions
//       updateGestureHandlers()
//       update()
//     },
//     clear() {
//       for (const key in gestureSubscriptions) {
//         gestureSubscriptions[key]?.()
//       }
//     },
//   }
// }

// const cache = new WeakMap<Element, Poser>()
// export function pose(
//   elements: AcceptedElements,
//   poses: Poses,
//   options: PoserOptions = {}
// ) {
//   resolveElements(elements).forEach((element) => {
//     if (cache.has(element)) {
//       const poser = cache.get(element)!
//       poser.update(poses, options)
//     } else {
//       const poser = createPoser(element as HTMLElement, poses, options)
//       cache.set(element, poser)
//     }
//   })
// }
export {}
