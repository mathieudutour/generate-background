import { useState } from "react";
import "./App.css";

const colors = [
  "#D033DE",
  "#EB5772",
  "#8000FF",
  "#00FFD1",
  "#6C57EB",
  "#33D4DE",
  "#7340C7",
];

const lightColors = ["#1DF5F5", "#F5511D"];

function App() {
  const [, rerender] = useState(0);
  return (
    <div className="App">
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        width="100vw"
        height="100vh"
      >
        <defs>
          <linearGradient
            id="background-gradient"
            x1="0.15"
            x2="0.98"
            y1="1.05"
            y2="-0.3"
          >
            <RandomGradient />
          </linearGradient>
          <linearGradient
            id="first-gradient"
            x1="40"
            x2="60"
            y1="0"
            y2="100"
            gradientUnits="userSpaceOnUse"
          >
            <RandomGradient />
          </linearGradient>
          <linearGradient
            id="second-gradient"
            x1="0.50"
            x2="0.50"
            y1="0"
            y2="1"
          >
            <stop
              offset="0%"
              stop-color={
                lightColors[Math.floor(Math.random() * lightColors.length)]
              }
            />
            <stop offset="100%" stop-color="#FFFFFF" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="third-gradient" x1="0.50" x2="0.50" y1="0" y2="1">
            <stop offset="0%" stop-color="#FFFFFF" />
            <stop offset="100%" stop-color="#FFFFFF" stopOpacity="0" />
          </linearGradient>
        </defs>
        <rect
          x="0"
          y="0"
          width="100"
          height="100"
          fill="url(#background-gradient)"
        />

        <g
          opacity="0.95"
          style={{ filter: `drop-shadow( 0px -20px 20px rgba(0, 0, 0, .08))` }}
        >
          <FirstWave />
        </g>
        <g
          style={{
            mixBlendMode: "overlay",
            filter: `drop-shadow( 0px -8px 50px rgba(0, 0, 0, .25))`,
          }}
          opacity="0.4"
        >
          <ThirdWave />
        </g>
        <g
          style={{
            mixBlendMode: "overlay",
            filter: `drop-shadow( 0px 0px 50px rgba(0, 0, 0, .2))`,
          }}
          opacity="0.5"
        >
          <SecondWave />
        </g>
      </svg>
      <button onClick={() => rerender((x) => x + 1)} className="hud">
        Regenerate
      </button>
    </div>
  );
}

function boundRandom(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

function smoothPoint(p: number[], previousPoint: number[]) {
  return `${p[0] - (p[0] - previousPoint[0]) / 2} ${p[1]} ${p.join(" ")}`;
}

function FirstWave() {
  const firstPoint = [-10, boundRandom(15, 30)];
  const secondPoint = [boundRandom(0, 15), boundRandom(5, firstPoint[1] - 5)];
  const thirdPoint = [
    boundRandom(Math.max(secondPoint[0], 25), 35),
    boundRandom(secondPoint[1] + 10, 45),
  ];
  const fourthPoint = [
    boundRandom(Math.max(thirdPoint[0], 45), 55),
    boundRandom(15, thirdPoint[1]),
  ];
  const fifthPoint = [
    boundRandom(Math.max(fourthPoint[0], 65), 80),
    boundRandom(fourthPoint[1], 45),
  ];
  const sixthPoint = [110, boundRandom(0, Math.max(fifthPoint[1], 10))];

  return (
    <path
      opacity="0.5"
      d={`M ${firstPoint.join(" ")} C ${firstPoint[0] + 10} ${
        firstPoint[1]
      } ${smoothPoint(secondPoint, firstPoint)} S ${smoothPoint(
        thirdPoint,
        secondPoint
      )} S ${smoothPoint(fourthPoint, thirdPoint)} S ${smoothPoint(
        fifthPoint,
        fourthPoint
      )} S ${smoothPoint(sixthPoint, fifthPoint)} L 110 110 L -10 110 Z`}
      fill="url(#first-gradient)"
    />
  );
}

function SecondWave() {
  const firstPoint = [-10, boundRandom(50, 90)];
  const secondPoint = [
    boundRandom(0, 25),
    boundRandom(40, Math.min(firstPoint[1] - 5, 60)),
  ];
  const thirdPoint = [
    boundRandom(Math.max(secondPoint[0], 35), 55),
    boundRandom(secondPoint[1] + 10, 90),
  ];
  const fourthPoint = [
    boundRandom(Math.max(thirdPoint[0], 65), 95),
    boundRandom(60, thirdPoint[1] - 10),
  ];
  const fifthPoint = [110, boundRandom(fourthPoint[1] + 10, 100)];

  return (
    <path
      opacity="0.5"
      d={`M ${firstPoint.join(" ")} C ${firstPoint[0] + 10} ${
        firstPoint[1]
      } ${smoothPoint(secondPoint, firstPoint)} S ${smoothPoint(
        thirdPoint,
        secondPoint
      )} S ${smoothPoint(fourthPoint, thirdPoint)} S ${smoothPoint(
        fifthPoint,
        fourthPoint
      )} L 110 110 L -10 110 Z`}
      fill="url(#second-gradient)"
    />
  );
}

function ThirdWave() {
  const firstPoint = [-10, boundRandom(50, 70)];
  const secondPoint = [
    boundRandom(20, 45),
    boundRandom(Math.min(firstPoint[1] + 10, 65), 95),
  ];
  const thirdPoint = [
    boundRandom(Math.max(secondPoint[0], 75), 95),
    boundRandom(50, secondPoint[1] - 10),
  ];
  const fourthPoint = [110, boundRandom(thirdPoint[1] + 10, 90)];

  return (
    <path
      opacity="0.5"
      d={`M ${firstPoint.join(" ")} C ${firstPoint[0] + 10} ${
        firstPoint[1]
      } ${smoothPoint(secondPoint, firstPoint)} S ${smoothPoint(
        thirdPoint,
        secondPoint
      )} S ${smoothPoint(fourthPoint, thirdPoint)} L 110 110 L -10 110 Z`}
      fill="url(#third-gradient)"
    />
  );
}

function RandomGradient() {
  const firstColor = colors[Math.floor(Math.random() * colors.length)];
  const secondColor = colors.filter((x) => x !== firstColor)[
    Math.floor(Math.random() * (colors.length - 1))
  ];
  return (
    <>
      <stop offset="0%" stop-color={firstColor} />
      <stop offset="100%" stop-color={secondColor} />
    </>
  );
}

export default App;
