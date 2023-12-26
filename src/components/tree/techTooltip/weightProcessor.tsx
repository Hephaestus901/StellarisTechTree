import {TFunction} from "i18next";

export const weightProcessor = (t: TFunction) => ({factor, always, modifier}: { factor?: number|string, always?: boolean, modifier?: any | any[] }) => {
    if (!modifier) {
        return;
    }

    if (Array.isArray(modifier)) {
        modifier.map(processSingleWeight(t));
        return;
    }

    processSingleWeight(t)(modifier);
}

const processSingleWeight = (t: TFunction) => (modifier: any) => {
    if (modifier.always) {
        return;
    }

    const factor = {
        ...modifier,
        factor: modifier.factor === "value:tech_weight_likelihood" ? 1.5 : modifier.factor
    };
    console.log(factor);
}


const technologyWeightModifier = (t: TFunction) => (weight: { has_technology: string[] }) => {
    // "has_technology":["tech_mine_exotic_gases","tech_exotic_gases"]
    return weight.has_technology.map(x => `Has technology ${t(x)}`);
}

const hasCountryFlag = (weight: { has_country_flag: string }) => {
    return `Has country flag: ${weight.has_country_flag}`
}

const norModifierGroup = (norGroup: any) => {
    return
}