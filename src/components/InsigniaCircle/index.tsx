import { ReactElement } from 'react';
import { Container } from './styles';

interface InsigniaCircleProps {
  upperText?: string,
  middleText?: string,
  bottomText?: string,
  size?: number
}

export const InsigniaCircle = ({ upperText, middleText, bottomText, size }: InsigniaCircleProps): ReactElement => {
  const sizer = size ?? 220;
  const radius = 100;
  const center = sizer / 2;

  return (
    <Container>
      <svg className="circle-text" width={sizer} height={sizer} viewBox={`0 0 ${sizer} ${sizer}`}>
        <circle cx={center} cy={center} r={radius} fill="none" stroke="white" />

        <text>
          <textPath href="#upper-text-circle" startOffset="50%" textAnchor="middle" fill="white">
            {upperText}
          </textPath>
        </text>

        <text x={center} y={center + 5} textAnchor="middle" fontSize="30" fill="white">
          {middleText}
        </text>

        <text>
          <textPath href="#bottom-text-circle" startOffset="50%" textAnchor="middle" fill="white">
            {bottomText}
          </textPath>
        </text>

        <defs>
          <path id="upper-text-circle" d={`M ${center},${center} m -${radius},0 a ${radius },${radius} 0 1,1 ${radius * 2},${0}`} />
          <path id="bottom-text-circle" d={`M ${center},${center - 10} m -${radius},0 a ${radius},${radius} 0 0,0 ${radius * 2},0`} />
        </defs>
      </svg>
    </Container>
  );
};
