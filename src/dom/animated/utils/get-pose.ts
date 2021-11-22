import { Pose, PoseDefinition, Poses } from "../types"

// TODO This is a risk of infinite loop
export function getPose(definition: PoseDefinition, poses: Poses): Pose {
  return typeof definition === "string"
    ? getPose(poses[definition], poses)
    : definition
}
