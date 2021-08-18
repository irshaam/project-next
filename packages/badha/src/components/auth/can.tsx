import { AbilityBuilder, Ability, AbilityClass, RawRuleOf, ForcedSubject } from "@casl/ability";
import { createContextualCan } from "@casl/react";
import React, { createContext } from "react";

export const actions = ["manage", "create", "read", "moderate", "publish", "update", "delete"] as const;
export const subjects = ["Post", "Tag", "Media", "User", "Creative", "Slot", "Client", "all"] as const;

// type Actions = "manage" | "create" | "read" | "update" | "delete";
// type Subjects = "Post" | "Tag" | "Media" | "User" | "Creative" | "Slot" | "Client" | "all";

export type Abilities = [
  typeof actions[number],
  typeof subjects[number] | ForcedSubject<Exclude<typeof subjects[number], "all">>
];
export type AppAbility = Ability<Abilities>;
// export const createAbility = (rules: RawRuleOf<AppAbility>[]) => new Ability<Abilities>(rules);

// export const { can, rules } = new Ability();

export const AppAbility = (rules: RawRuleOf<AppAbility>[]) => rules.length > 0 && new Ability<Abilities>(rules);

// export type AppAbility = Ability<[Actions, Subjects]>;
// export const AppAbility = Ability as AbilityClass<AppAbility>;

// console.log(AppAbility);

// const { can, rules } = new AbilityBuilder(AppAbility);

export const AbilityContext = createContext<AppAbility>(undefined!);
export const Can = createContextualCan(AbilityContext.Consumer);
