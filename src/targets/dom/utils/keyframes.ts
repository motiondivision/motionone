// TODO This should create a new keyframe of the last values found in each
export function getTargetKeyframe(keyframes: Keyframe | Keyframe[]): Keyframe {
  return Array.isArray(keyframes) ? keyframes[keyframes.length - 1] : keyframes
}
