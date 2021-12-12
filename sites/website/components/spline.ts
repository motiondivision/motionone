import { invariant } from "hey-listen"
import { clamp } from "popmotion"

export type Point = [number, number]

// export function curve(points: Point[], smoothing = 2) {
//   // TODO Pad points with [0,0], [1,1]
//   const numPoints = points.length;
//   const numSegments = numPoints - 1;

//   smoothing = clamp(1, numPoints - 1, smoothing);

//   return (t: number) => {
//     /**
//      * Find base segment
//      */
//     let segment = 0;
//     for (; segment < numSegments; segment++) {
//       if (t >= points[segment][0] && t <= points[segment + 1][0]) {
//         break;
//       }
//     }

//     let alpha = 0;
//     let eased = ;
//     for (let level = 1; level <= smoothing + 1; level++) {

//       console.log("while bigger than", segment - smoothing - 1 + level);
//       for (let i = segment; i > segment - smoothing - 1 + level; i--) {
//         alpha =
//           (t - points[i][0]) /
//           (points[i + smoothing + 1 - level][0] - points[i][0]);

//       }

//       // const a = points[segment - level + 1];
//       // const b = points[segment + level];

//       // if (!a || !b) break;

//       // const p = progress(a[0], b[0], t);
//       // if (typeof eased === "undefined") {
//       //   eased = mix(a[1], b[1], p);
//       // } else {

//       // }
//     }

//     return eased;
//   };
// }

//     for (let level = 1; level <= smoothing + 1; level++) {
//       let alpha = 0;
//       for (let i = segment; i > segment - smoothing - 1 + level; i--) {
//         alpha = (t - knots[i]) / (knots[i + smoothing + 1 - level] - knots[i]);

//         // Interpolate each point
//         weightedPoints[i][0] =
//           (1 - alpha) * weightedPoints[i - 1][0] + alpha * weightedPoints[i][0];
//         weightedPoints[i][1] =
//           (1 - alpha) * weightedPoints[i - 1][1] + alpha * weightedPoints[i][1];
//         weightedPoints[i][2] =
//           (1 - alpha) * weightedPoints[i - 1][2] + alpha * weightedPoints[i][2];
//       }
//     }

/**
 * Refactored from https://github.com/thibauts/b-spline/blob/master/index.js
 */
export function curve(
  points: Point[],
  smoothing = 2,
  weights = points.map(fillWeight)
) {
  const numPoints = points.length

  invariant(
    numPoints === weights.length,
    "Number of points and number of weights must be the same"
  )

  /**
   * Clamp smoothing to within the permitted range
   */
  smoothing = clamp(1, numPoints - 1, smoothing)

  /**
   * Automatically generate clamped knots
   */
  const knots = createKnots(points, smoothing)

  const domainMin = smoothing
  const domainMax = knots.length - 1 - smoothing

  const ease = (t: number) => {
    let segment = 0
    for (segment = domainMin; segment < domainMax; segment++) {
      // console.log(
      //   t,
      //   "s",
      //   segment,
      //   "k",
      //   knots[segment],
      //   "k+1",
      //   knots[segment + 1]
      // );

      if (t >= knots[segment] && t <= knots[segment + 1]) {
        break
      }
    }

    // console.log(domainMin, domainMax, segment);

    // return [0, 1];

    const weightedPoints = []
    for (let i = 0; i < numPoints; i++) {
      const point = [
        points[i][0] * weights[i],
        points[i][1] * weights[i],
        weights[i],
      ]
      weightedPoints[i] = point
    }

    for (let level = 1; level <= smoothing + 1; level++) {
      let alpha = 0
      for (let i = segment; i > segment - smoothing - 1 + level; i--) {
        alpha = (t - knots[i]) / (knots[i + smoothing + 1 - level] - knots[i])

        // Interpolate each point
        weightedPoints[i][0] =
          (1 - alpha) * weightedPoints[i - 1][0] + alpha * weightedPoints[i][0]
        weightedPoints[i][1] =
          (1 - alpha) * weightedPoints[i - 1][1] + alpha * weightedPoints[i][1]
        weightedPoints[i][2] =
          (1 - alpha) * weightedPoints[i - 1][2] + alpha * weightedPoints[i][2]
      }
    }

    return weightedPoints[segment][1] / weightedPoints[segment][2]
  }

  return ease
}

const fillWeight = () => 1

function createKnots(points: Point[], smoothing: number) {
  const knots: number[] = []
  const numKnots = points.length + smoothing + 1
  const clampThreshold = numKnots - points.length

  for (let i = 0; i < numKnots; i++) {
    if (i <= clampThreshold - 1) {
      knots.push(0)
    } else if (i >= numKnots - clampThreshold) {
      knots.push(1)
    } else {
      // const knot =
      //   smoothing === 1
      //     ? points[i - clampThreshold + 1][0]
      //     : progress(clampThreshold - 1, numKnots - clampThreshold, i)
      knots.push(points[i - clampThreshold + 1][0])
    }
  }
  // console.log(knots);
  return knots
}
