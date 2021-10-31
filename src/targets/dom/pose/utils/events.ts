import { Pose, PoseEventNames } from "../types"

export const poseEvent = (name: PoseEventNames, target: Pose) =>
  new CustomEvent(name, { detail: { target } })
