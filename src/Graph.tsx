import { useState } from "react";

interface DataProp {
  twoPlusBelowGradeLevel: number;
  belowGradeLevel: number;
  onGradeLevel: number;
  aboveGradeLevel: number;
  blankBelowGrade?: number;
  blankAboveGrade?: number;
  sum?: number;
}

interface Props {
  data?: DataProp[];
}

interface MapLeftAndRightBlankSpaceDataProp {
  data: DataProp[];
  maxBelowGrade: number;
  maxAboveGrade: number;
}

const grapghData: DataProp[] = [
  {
    twoPlusBelowGradeLevel: 5,
    belowGradeLevel: 10,
    onGradeLevel: 0,
    aboveGradeLevel: 3
  },
  {
    twoPlusBelowGradeLevel: 0,
    belowGradeLevel: 8,
    onGradeLevel: 7,
    aboveGradeLevel: 0
  },
  {
    twoPlusBelowGradeLevel: 5,
    belowGradeLevel: 4,
    onGradeLevel: 1,
    aboveGradeLevel: 3
  },
  {
    twoPlusBelowGradeLevel: 7,
    belowGradeLevel: 2.5,
    onGradeLevel: 2,
    aboveGradeLevel: 3
  }
];

const spacing = 1;
const vSpacing = 20;
const barHeight = "25px";
const minWidthPecent = 5;

const bgColors = {
  twoPlusBelowGradeLevel: "#E46F72",
  belowGradeLevel: "#F9C58E",
  onGradeLevel: "#C5F2E0",
  aboveGradeLevel: "#2B6866"
};

const textColors = {
  twoPlusBelowGradeLevel: "#000000",
  belowGradeLevel: "#000000",
  onGradeLevel: "#000000",
  aboveGradeLevel: "#ffffff"
};

const getClaculatedWith = (count: number, total: number) => {
  return `calc(${(count * 100) / total}% - ${spacing}px)`;
};

const GrapgBlock = ({ data }: { data: DataProp }) => {
  return (
    <div className="g-block" style={{ marginBottom: `${vSpacing}px` }}>
      {Number(data.blankBelowGrade) !== 0 && (
        <div
          className="b blank-space"
          style={{
            marginLeft: `${spacing}px`,
            width: getClaculatedWith(
              Number(data.blankBelowGrade),
              Number(data.sum)
            ),
            height: barHeight,
            lineHeight: barHeight
          }}
        >
          {data.blankBelowGrade}
        </div>
      )}
      {Number(data.twoPlusBelowGradeLevel) !== 0 && (
        <div
          className="b"
          style={{
            marginLeft: `${spacing}px`,
            width: getClaculatedWith(
              Number(data.twoPlusBelowGradeLevel),
              Number(data.sum)
            ),
            background: bgColors.twoPlusBelowGradeLevel,
            color: textColors.twoPlusBelowGradeLevel,
            height: barHeight,
            lineHeight: barHeight
          }}
        >
          {data.twoPlusBelowGradeLevel}
        </div>
      )}
      {Number(data.belowGradeLevel) !== 0 && (
        <div
          className="b"
          style={{
            marginLeft: `${spacing}px`,
            width: getClaculatedWith(
              Number(data.belowGradeLevel),
              Number(data.sum)
            ),
            background: bgColors.belowGradeLevel,
            color: textColors.belowGradeLevel,
            height: barHeight,
            lineHeight: barHeight
          }}
        >
          {data.belowGradeLevel}
        </div>
      )}
      {Number(data.onGradeLevel) !== 0 && (
        <div
          className="b"
          style={{
            marginLeft: `${spacing}px`,
            width: getClaculatedWith(
              Number(data.onGradeLevel),
              Number(data.sum)
            ),
            background: bgColors.onGradeLevel,
            color: textColors.onGradeLevel,
            height: barHeight,
            lineHeight: barHeight
          }}
        >
          {data.onGradeLevel}
        </div>
      )}
      {Number(data.aboveGradeLevel) !== 0 && (
        <div
          className="b"
          style={{
            marginLeft: `${spacing}px`,
            width: getClaculatedWith(
              Number(data.aboveGradeLevel),
              Number(data.sum)
            ),
            background: bgColors.aboveGradeLevel,
            color: textColors.aboveGradeLevel,
            height: barHeight,
            lineHeight: barHeight
          }}
        >
          {data.aboveGradeLevel}
        </div>
      )}
    </div>
  );
};

const StackedBarHtml = ({ data }: Props) => {
  const [gData] = useState(data ?? grapghData);

  const getMaxRanges = (gData: DataProp[]) => {
    let maxBelowGrade = 0;
    let maxAboveGrade = 0;
    for (const key in gData) {
      const maxBelow =
        Number(gData[key].belowGradeLevel) +
        Number(gData[key].twoPlusBelowGradeLevel);
      const maxAbove =
        Number(gData[key].onGradeLevel) + Number(gData[key].aboveGradeLevel);
      if (maxBelow > maxBelowGrade) maxBelowGrade = maxBelow;

      if (maxAbove > maxAboveGrade) maxAboveGrade = maxAbove;
    }
    return { maxBelowGrade, maxAboveGrade };
  };

  const mapLeftAndRightBlankSpaceData = ({
    data,
    maxAboveGrade,
    maxBelowGrade
  }: MapLeftAndRightBlankSpaceDataProp) => {
    for (const element of data) {
      element.blankBelowGrade =
        maxBelowGrade -
        (Number(element.twoPlusBelowGradeLevel) +
          Number(element.belowGradeLevel));
      element.blankAboveGrade =
        maxAboveGrade -
        (Number(element.onGradeLevel) + Number(element.aboveGradeLevel));
      const e: any = element;
      let sum = 0;
      for (const v in element) {
        sum = sum + e[v];
      }
      element.sum = sum;
    }
  };

  const { maxBelowGrade, maxAboveGrade } = getMaxRanges(gData);

  mapLeftAndRightBlankSpaceData({ data: gData, maxAboveGrade, maxBelowGrade });

  console.log({gData});
  

  return (
    <div className="graph-wrapper">
      <div className="graph-levels">
        <div
          className="graph-devider"
          style={{
            position: "absolute",
            top: `-${vSpacing}px`,
            left: `${(maxBelowGrade * 100) / (gData[0].sum ?? 100)}%`,
            width: "1px",
            background: "#000",
            height: `calc(100% + 10px + ${vSpacing}px)`
          }}
        ></div>
        <span
          style={{
            position: "absolute",
            top: `-${vSpacing}px`,
            left: `calc((${
              (maxBelowGrade * 100) / (gData[0].sum ?? 100)
            }%) + 20px)`,
            fontSize: "13px",
            fontWeight: "bold"
          }}
        >
          On & Above Grade
        </span>
        <span
          style={{
            position: "absolute",
            top: `-${vSpacing}px`,
            left: `calc((${
              (maxBelowGrade * 100) / (gData[0].sum ?? 100)
            }%) - 100px)`,
            fontSize: "13px",
            fontWeight: "bold"
          }}
        >
          Below Grade
        </span>
        <div className="grapghs">
          {gData.map((row: DataProp) => {
            return <GrapgBlock data={row} key={JSON.stringify(row)} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default StackedBarHtml;
