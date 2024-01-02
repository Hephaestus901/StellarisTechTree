// @flow
import * as React from 'react';
import {useTranslation} from "react-i18next";

import "./TechTooltip.css";
import {weightProcessor} from "./weightProcessor";

type Props = {
    data: any;
};

export function TechTooltip({data}: Props) {
    const {t} = useTranslation('descriptions');

    const {children, ...restData} = data;

    return (
        <div className="tech_tooltip_root">
            <div className="header_text">Description</div>
            <div>{t(data.name + '_desc')}</div>
            {
                !data.start_tech && (
                    <>
                        <div className="header_text">Weight Modifiers</div>
                        <div>{RenderWeights(restData['weight_modifier'])}</div>
                    </>
                )
            }
            {/*<div>{JSON.stringify(restData)}</div>*/}
        </div>
    );
}

function RenderWeights(weights: any) {
    const {t} = useTranslation('names');

    const techAscendancy = (
        <li>
                <text className="multiplier_positive">x1.5</text>
                <span><img width={24} className={"weights_icon"} src="/images/icons/ap_technological_ascendancy.png"
                           alt='ap_technology_ascendency'/></span>
                {t("ap_technological_ascendancy")} taken
            </li>
    );

    const processedWeights = [techAscendancy, ...weightProcessor(t)(weights.modifier)];

    return (
        <ul className="weights_list">
            {processedWeights}
        </ul>
    )
}