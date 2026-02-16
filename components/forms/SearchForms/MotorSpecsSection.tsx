import { MotorBodyType, MotorTransmission } from "@/types/enums";
import { EnumSelect } from "./EnumSelect";
import { ToggleField } from "./ToggleField";
import { MotorSpecs } from "@/types/filters";

interface Props {
  states: MotorSpecs;
  setStates: (val: Partial<MotorSpecs>) => void;
}
export const MotorSpecsSection = ({ states, setStates }: Props) => (
  <div className="space-y-4 animate-in fade-in duration-300">
    <EnumSelect
      label="ناقل الحركة (موتور)"
      value={states.MotorTransmission ?? ""}
      onChange={(v: MotorTransmission) =>
        setStates({ ...states, MotorTransmission: v as MotorTransmission })
      }
      options={[
        MotorTransmission.Manual,
        MotorTransmission.SemiAutomatic,
        MotorTransmission.Automatic,
      ]}
      enumKey="MotorTransmission"
    />
    <EnumSelect
      label="نوع الهيكل"
      value={states.MotorBodyType ?? ""}
      onChange={(v: MotorBodyType) =>
        setStates({ ...states, MotorBodyType: v as MotorBodyType })
      }
      options={[
        MotorBodyType.Aluminum,
        MotorBodyType.CarbonFiber,
        MotorBodyType.Chrome,
        MotorBodyType.Steel,
        MotorBodyType.NotSpecified,
      ]}
      enumKey="MotorBodyType"
    />
    <ToggleField
      label="معدل (Modified)"
      value={states.IsModified}
      onChange={(v: boolean) => setStates({ ...states, IsModified: v })}
    />
  </div>
);
