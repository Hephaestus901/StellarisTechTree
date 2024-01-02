import { TFunction } from "i18next";
import * as React from "react";
import FactorDisplay from "./FactorDisplay";

export const weightProcessor = (t: TFunction) => (weight: {
    factor?: number | string,
    always?: boolean,
    modifier?: any | any[]
}): any[] => {
    if (!weight) {
        return [];
    }

    if (Array.isArray(weight)) {
        return weight.map(processSingleWeight(t));
    }

    return [processSingleWeight(t)(weight)];
}

const processSingleWeight = (t: TFunction) => (modifier: any) => {
    if (modifier.always) {
        return;
    }

    const weight = {
        ...modifier,
        factor: modifier.factor === "value:tech_weight_likelihood" ? 1.5 : modifier.factor
    };

    if (weight.NOT) {
        return processNotValue(t)(weight);
    }

    let itemValue = getWeightValue(t)(weight);

    if (itemValue) {
        return <li>
            <FactorDisplay factor={weight.factor} />
            {itemValue}
        </li>
    }

    return <li>Value: {JSON.stringify(weight)}</li>
}

const processNotValue = (t: TFunction) => (modifier: {factor: number, NOT: any}) => {
    const weight = {
        ...modifier.NOT,
        factor: modifier.factor
    };

    let itemValue = getWeightValue(t)(weight);

    if (itemValue) {
        return <li>
            <FactorDisplay factor={weight.factor} />
            Following should be false: 
            {itemValue}
        </li>
    }

    return <li>Value: {JSON.stringify(weight)}</li>
}

// ALL SHOULD BE FALSE
const processNorValue = (t: TFunction) => (modifier: {factor: number, NOR: any[]}) => {
    
}

const getWeightValue = (tNames: TFunction) => (weight: any): string | JSX.Element => {
    if (weight.has_ethic) {
        return hasEthic(tNames)(weight.has_ethic);
    }

    if (weight.has_country_flag) {
        return hasCountryFlag(tNames)(weight.has_country_flag);
    }

    if (weight.years_passed) {
        return yearsPassed(weight.years_passed);
    }

    if (weight.has_tradition) {
        return hasTradition(tNames)(weight.has_tradition);
    }

    if (weight.has_modifier) {
        return hasModifier(tNames)(weight.has_modifier);
    }

    if (weight.has_technology) {
        return hasTechnology(tNames)(weight.has_technology);
    }

    if (weight.count_starbase_sizes) {
        return countStarbaseSizes(tNames)(weight.count_starbase_sizes);
    }

    if (weight.has_origin) {
        return hasOrigin(tNames)(weight.has_origin);
    }

    if (weight.any_owned_planet) {
        return anyOwnedPlanet(tNames)(weight.any_owned_planet);
    }

    if (weight.has_policy_flag) {
        return hasPolicyFlag(weight.has_policy_flag);
    }

    if (weight.is_specialist_subject_type) {
        return isSpecialistSubjectType(tNames)(weight.is_specialist_subject_type);
    }

    return "";
}

const hasCountryFlag = (tNames: TFunction) => (has_country_flag: string) => {
    return `Has country flag: ${tNames(has_country_flag)}`;
}

const yearsPassed = (years_passed: number) => {
    return `${years_passed} years passed`;
}

const hasEthic = (tNames: TFunction) => (has_ethic: string) => {
    return <>
        Has ethic: {tNames(has_ethic)}
        <span><img width={24} className={"weights_icon"} src={`/images/icons/ethics/${has_ethic}.png`}
            alt={has_ethic} /></span>
    </>;
}

const hasTradition = (tNames: TFunction) => (has_tradition: string) => {
    return `Has picked ${tNames(has_tradition)}`;
}

const hasModifier = (tNames: TFunction) => (has_modifier: string) => {
    return `Empire has modifier ${tNames(has_modifier)}`;
}

const hasTechnology = (tNames: TFunction) => (has_technology: string) => {
    return <>
        Technology
        <span><img width={24} className={"weights_icon"}
            src={`/images/tech_icons/${has_technology}.png`}
            alt={has_technology} /></span>
        {tNames(has_technology)} researched
    </>
}

const countStarbaseSizes = (tNames: TFunction) => (count_starbase_sizes: { starbase_size: string, count: number }) => {
    let definition = count_starbase_sizes.starbase_size;
    if (count_starbase_sizes.count > 1) {
        definition = `${definition}_plural`;
    }
    return `Empire has more than ${count_starbase_sizes.count} ${tNames(definition)}`
}

const hasOrigin = (tNames: TFunction) => (has_origin: string) => {
    return `Empire has ${tNames(has_origin)} origin`
}

const anyOwnedPlanet = (tNames: TFunction) => (any_owned_planet: { is_planet_class: string }) => {
    return `Empire own ${tNames(any_owned_planet.is_planet_class)}`
}

const hasPolicyFlag = (has_policy_flag: string) => {
    return `Has policy ${has_policy_flag}`
}

const isSpecialistSubjectType = (tNames: TFunction) => (is_specialist_subject_type: { TYPE: string }) => {
    return `If vassal with ${tNames(`specialist_${is_specialist_subject_type.TYPE}`)} type`
}

/*
    {"factor": 10, "any_neighbor_country": {"has_technology":"tech_destroyers"}}
 */
const anyNeighborCountry = () => {
    // TODO: implement
}