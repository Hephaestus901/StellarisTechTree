// @flow
import * as React from 'react';
import {useMemo} from 'react';
import {useTranslation} from "react-i18next";
import classNames from "classnames";

import "./Tech.css";

type Props = {
    tech: any;
};

export function Tech({tech}: Props) {
    const {t} = useTranslation('names');

    const categoryIcon = useMemo(() => {
        let imgSrc = "";
        if (Array.isArray(tech.category)) {
            imgSrc = `/images/category_icons/${tech.category[0]}.png`;
        }

        return <img src={imgSrc} alt={'tech.category'}/>
    }, [tech]);

    const techIcon = useMemo(() => {
        const imgSrc = `/images/tech_icons/${tech.name}.png`;

        return <img className='tech_icon_img' src={imgSrc} alt={'tech.name'}/>
    }, [tech]);

    const costIconSrc = useMemo(() => {
        switch (tech.area) {
            case 'society':
                return '/images/icons/concept_society_research.png';
            case 'physics':
                return '/images/icons/concept_physics_research.png';
            case 'engineering':
                return '/images/icons/concept_engineering_research.png';
        }
    }, [tech]);

    return (
        <div className={classNames(
            'wrapper',
            tech.area,
            {"rare": tech.is_rare}
        )}>
            <div className="title">
                {t(tech.name)}
            </div>
            <div className="content">
                <div className="tech_icon">
                    {techIcon}
                </div>
                <div className="tech_main_info">
                    {tech.tier > 0 &&
                        <div className={classNames('tier_wrapper', `tier_${tech.tier}`)}>Tier: {tech.tier}</div>}
                    {tech.cost > 0 &&
                        <p className='cost_wrapper'>Cost: <img width={12} src={costIconSrc} alt='cost'/>{tech.cost}</p>}
                    {!!tech.weight && tech.weight && <p className='weight_wrapper'>{`, Weight: ${tech.weight}`}</p>}
                </div>
                <div className="tech_additional_info">
                    {
                        categoryIcon
                    }
                    {
                        tech.start_tech && <img src={"/images/icons/yes.png"} alt={'is starting tech'}/>
                    }
                </div>
            </div>
        </div>
    )
}