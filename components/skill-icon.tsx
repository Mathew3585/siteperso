import { type IconType } from "react-icons";
import {
  TbBrandCSharp,
  TbBrandCpp,
  TbBrandTypescript,
  TbBrandPython,
  TbBrandUnity,
  TbBrandGit,
  TbBrandAndroid,
  TbCube3dSphere,
  TbDeviceMobile,
  TbGauge,
  TbDeviceGamepad2,
  TbEngine,
  TbAugmentedReality,
  TbAtom2,
  TbBrain,
  TbCode,
} from "react-icons/tb";

/**
 * Associe un nom de compétence à une icône (Tabler, style ligne).
 * Ajoute simplement une entrée ici si tu ajoutes une nouvelle techno.
 */
const ICONS: Record<string, IconType> = {
  "C#": TbBrandCSharp,
  "C++": TbBrandCpp,
  TypeScript: TbBrandTypescript,
  Python: TbBrandPython,
  Unity: TbBrandUnity,
  "XR Toolkit": TbCube3dSphere,
  Git: TbBrandGit,
  Android: TbBrandAndroid,
  Profilers: TbGauge,
  Gameplay: TbDeviceGamepad2,
  "3D": TbCube3dSphere,
  Moteur: TbEngine,
  "AR/VR": TbAugmentedReality,
  Mobile: TbDeviceMobile,
  Simulation: TbAtom2,
  "IA / LLM": TbBrain,
};

export function SkillIcon({ name, className }: { name: string; className?: string }) {
  const Icon = ICONS[name] ?? TbCode;
  return <Icon className={className} aria-hidden />;
}
