import { ReactElement } from 'react';
import { Container } from './styles';
import { StepButton } from '../StepButton';

export interface StepsVisualizerProps {
  stepQuantity: number;
  currentStep: number;
  onClickStep: CallableFunction;
}

export const StepsVisualizer = ({ stepQuantity, currentStep, onClickStep }: StepsVisualizerProps): ReactElement => {
  const steps = new Array(stepQuantity).fill("");

  return (
    <Container >
      {steps.map((step, i) =>
        <div key={`step_${i}`} style={{
          flexGrow: (i <= currentStep && i < stepQuantity - 1) ? 2 : 0,
          display: "flex",
          alignItems: "center",
          alignContent: "center",
        }}>
          <StepButton
            step={i + 1}
            active={i <= currentStep}
            onClick={() => onClickStep(i)}
          />
          {
            (i <= currentStep && i < stepQuantity - 1) ?
              <div className={`line ${i < currentStep ? "active" : ""}`} ></div>
              : undefined
          }
        </div>
      )}
    </Container>
  );
};