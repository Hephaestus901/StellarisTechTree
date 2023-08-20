// @flow
import * as React from 'react';
import {useCallback} from "react";
import "./TechNode.css";
import {useTranslation} from "react-i18next";
import classNames from "classnames";

type Props = {
    tech: any;
};

export function TechNode({tech}: Props) {
    const {t} = useTranslation();

    const categoryIcon = useCallback(() => {
        let imgSrc = "";
        if (Array.isArray(tech.category)) {
            imgSrc = `/images/category_icons/${tech.category[0]}.png`;
        }

        return <img src={imgSrc} alt={'tech.category'}/>
    }, [tech]);

    const techIcon = useCallback(() => {
        const imgSrc = `/images/tech_icons/${tech.name}.png`;

        return <img className='tech_icon_img' src={imgSrc} alt={'tech.name'}/>
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
                    {techIcon()}
                </div>
                <div className="tech_main_info">

                </div>
                <div className="tech_additional_info">
                    {
                        categoryIcon()
                    }
                    {
                        tech.start_tech && <img src={"/images/icons/yes.png"} alt={'is starting tech'}/>
                    }
                </div>
            </div>
        </div>
    )
}