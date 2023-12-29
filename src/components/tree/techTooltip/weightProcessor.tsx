import {TFunction} from "i18next";
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

    const {modifier} = weight;
    if (!modifier) {
        return [];
    }

    if (Array.isArray(modifier)) {
        return modifier.map(processSingleWeight(t));
    }

    return [processSingleWeight(t)(modifier)];
}

const processSingleWeight = (t: TFunction) => (modifier: any) => {
    if (modifier.always) {
        return;
    }

    const factor = {
        ...modifier,
        factor: modifier.factor === "value:tech_weight_likelihood" ? 1.5 : modifier.factor
    };

    if (factor.has_ethic) {
        return hasEthic(t)(factor);
    }

    if (factor.has_country_flag) {
        return hasCountryFlag(t)(factor);
    }

    if (factor.years_passed) {
        return yearsPassed(factor);
    }

    if (factor.has_tradition) {
        return hasTradition(t)(factor);
    }

    if (factor.has_modifier) {
        return hasModifier(t)(factor);
    }

    if (factor.has_technology) {
        return hasTechnology(t)(factor);
    }

    if (factor.count_starbase_sizes) {
        return countStarbaseSizes(t)(factor);
    }

    if (factor.has_origin) {
        return hasOrigin(t)(factor);
    }

    if (factor.any_owned_planet) {
        return anyOwnedPlanet(t)(factor);
    }

    if (factor.has_policy_flag) {
        return hasPolicyFlag(factor);
    }

    if (factor.is_specialist_subject_type) {
        return isSpecialistSubjectType(t)(factor);
    }

    return <li>Value: {JSON.stringify(factor)}</li>
}

const hasCountryFlag = (tNames: TFunction) => (weight: { factor: number, has_country_flag: string }) => {
    return <li>
        <FactorDisplay factor={weight.factor}/>
        Has country flag: {tNames(weight.has_country_flag)}
    </li>
}

const yearsPassed = (weight: { factor: number, years_passed: number }) => {
    return <li>
        <FactorDisplay factor={weight.factor}/>
        After {weight.years_passed} years passed
    </li>
}

const hasEthic = (tNames: TFunction) => (weight: { factor: number, has_ethic: string }) => {
    return <li>
        <FactorDisplay factor={weight.factor}/>
        Has ethic: {tNames(weight.has_ethic)}
        <span><img width={24} className={"weights_icon"} src={`/images/icons/ethics/${weight.has_ethic}.png`}
                   alt={weight.has_ethic}/></span>
    </li>
}

const hasTradition = (tNames: TFunction) => (weight: { factor: number, has_tradition: string }) => {
    return <li>
        <FactorDisplay factor={weight.factor}/>
        Has picked {tNames(weight.has_tradition)}
    </li>
}

const hasModifier = (tNames: TFunction) => (weight: { factor: number, has_modifier: string }) => {
    return <li>
        <FactorDisplay factor={weight.factor}/>
        Empire has modifier {tNames(weight.has_modifier)}
    </li>
}

const hasTechnology = (tNames: TFunction) => (weight: { factor: number, has_technology: string }) => {
    return <li>
        <FactorDisplay factor={weight.factor}/>
        Technology
        <span><img width={24} className={"weights_icon"}
                   src={`/images/tech_icons/${weight.has_technology}.png`}
                   alt={weight.has_technology}/></span>
        {tNames(weight.has_technology)} researched
    </li>
}

const countStarbaseSizes = (tNames: TFunction) => (weight: {
    factor: number,
    count_starbase_sizes: { starbase_size: string, count: number }
}) => {
    const {factor, count_starbase_sizes} = weight;
    let definition = count_starbase_sizes.starbase_size;
    if (count_starbase_sizes.count > 1) {
        definition = `${definition}_plural`;
    }
    return <li>
        <FactorDisplay factor={factor}/>
        Empire has more than {count_starbase_sizes.count} {tNames(definition)}
    </li>
}

const hasOrigin = (tNames: TFunction) => (weight: { factor: number, has_origin: string }) => {
    return <li>
        <FactorDisplay factor={weight.factor}/>
        Empire has {tNames(weight.has_origin)} origin
    </li>
}

const anyOwnedPlanet = (tNames: TFunction) => (weight: {
    factor: number,
    any_owned_planet: { is_planet_class: string }
}) => {
    return <li>
        <FactorDisplay factor={weight.factor}/>
        Empire own {tNames(weight.any_owned_planet.is_planet_class)}
    </li>
}

const hasPolicyFlag = (weight: { factor: number, has_policy_flag: string }) => {
    return <li>
        <FactorDisplay factor={weight.factor}/>
        Has policy {weight.has_policy_flag}
    </li>
}

const isSpecialistSubjectType = (tNames: TFunction) => (weight: {
    factor: number,
    is_specialist_subject_type: { TYPE: string }
}) => {
    return <li>
        <FactorDisplay factor={weight.factor}/>
        If vassal with {tNames(`specialist_${weight.is_specialist_subject_type.TYPE}`)} type
    </li>
}

/*
    {"factor": 10, "any_neighbor_country": {"has_technology":"tech_destroyers"}}
 */
const anyNeighborCountry = () => {
    // TODO: implement
}