// import spline from "b-spline";
// import { curve } from "../components/spline";
// import { clamp, progress, mix, animate } from "popmotion";
// import { useEffect, useReducer, useRef, useState } from "react";

// var knots = [0, 1, 2, 2];

// function NurbEditor() {
//   const { points, addPoint, removePoint } = useNurbEditor([]);
//   let [degree, setDegree] = useState(points.length - 1);

//   let splinePath = "M 0 500 ";
//   let splinePathB = "M 0 500 ";

//   let a = 0;
//   if (typeof performance !== "undefined") {
//     a = performance.now();
//   }

//   const ease = curve(points, degree);
//   for (let p = 0; p <= 1000; p += 100) {
//     const point = ease(p / 1000);

//     const s = spline(p / 1000, degree, points);
//     splinePath += `L ${(p / 1000) * 500} ${point * 500} `;
//     splinePathB += `L ${s[0] * 500} ${s[1] * 500} `;
//   }

//   if (typeof performance !== "undefined") {
//     console.log("Duration", performance.now() - a);
//   }

//   function handleClick(event) {
//     const { pageX: x, pageY: y } = event;
//     addPoint(x / 500, y / 500);
//   }

//   const linkPath = points.map(([x, y]) => `${x * 500},${y * 500}`).join(" ");

//   const ref = useRef(null);
//   useEffect(() => {
//     // animate({
//     //   from: 0,
//     //   to: 500,
//     //   duration: 1000,
//     //   ease: (t) => {
//     //     return 1 - ease(t);
//     //   },
//     //   onUpdate: (v) => (ref.current.style.transform = `translateX(${v}px)`),
//     // });
//   });

//   return (
//     <>
//       <svg width="500" height="500" viewBox="0 0 500 500" onClick={handleClick}>
//         <polyline
//           points={linkPath}
//           stroke-dasharray="4"
//           stroke="rgba(255,255,255,0.2)"
//           fill="none"
//         />
//         <path d={splinePath} fill="none" stroke="#0f0" strokeWidth={1} />
//         <path d={splinePathB} fill="none" stroke="#f00" strokeWidth={1} />
//         {points.map(([x, y], i) => (
//           <circle
//             r={10}
//             cx={x * 500}
//             cy={y * 500}
//             fill="#fff"
//             onClick={(event) => {
//               event.stopPropagation();
//               removePoint(i);
//             }}
//           />
//         ))}
//       </svg>
//       <input
//         value={degree}
//         type="number"
//         onChange={(event) => {
//           setDegree(parseFloat(event.currentTarget.value));
//         }}
//       />
//       <div style={{ width: 100, height: 100, background: "white" }} ref={ref} />
//     </>
//   );
// }

// type Points = [number, number][];

// type AddAction = {
//   type: "add";
//   x: number;
//   y: number;
// };
// type RemoveAction = {
//   type: "remove";
//   index: number;
// };

// function compareByX([xA]: [number, number], [xB]: [number, number]) {
//   return xA - xB;
// }

// function nurbReducer(
//   state: Points,
//   { type, ...payload }: AddAction | RemoveAction
// ) {
//   if (type === "add") {
//     const { x, y } = payload;
//     return [...state, [x, y]].sort(compareByX);
//   } else if (type === "remove") {
//     const newState = [...state];
//     newState.splice(payload.index, 1);
//     return newState;
//   }

//   return state;
// }

// function useNurbEditor(initialPoints: Points) {
//   const [points, dispatch] = useReducer(nurbReducer, [
//     [0.0, 1.0],
//     ...initialPoints,
//     [1.0, 0.0],
//   ]);

//   function addPoint(x: number, y: number) {
//     dispatch({
//       type: "add",
//       x,
//       y,
//     });
//   }

//   function removePoint(index: number) {
//     dispatch({ type: "remove", index });
//   }

//   return { points, addPoint, removePoint };
// }

// export default NurbEditor;
export default () => null;
