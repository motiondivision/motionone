/**
 * Remember to set the pathLength="1" SVG attribute on
 * the elements you want to draw. This makes it easy
 * to use the same animation logic for elements of a
 * different path length.
 */

const draw = (progress) => ({
  // This property makes the line "draw" in when animated
  strokeDashoffset: 1 - progress,

  // Each line will be hidden until it starts drawing
  // to fix a bug in Safari where the line can be
  // partially visible even when progress is at 0
  visibility: "visible",
})

timeline([
  ["circle", draw(1), { duration: 0.8 }],
  ["path", draw(1), { duration: 0.6, at: "-0.2" }],
])
