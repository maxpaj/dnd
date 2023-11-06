import { Dice } from "./dice";

export enum ElementType {
  Slashing = "Slashing",
  Piercing = "Piercing",
  Bludgeoning = "Bludgeoning",
  Poison = "Poison",
  Acid = "Acid",
  Fire = "Fire",
  Cold = "Cold",
  Radiant = "Radiant",
  Necrotic = "Necrotic",
  Lightning = "Lightning",
  Thunder = "Thunder",
  Force = "Force",
  Psychic = "Psychic",
}

export type Effect = {
  amountVariable: Dice;
  amountStatic: number;
  element: ElementType;
};
