// @flow
import * as React from 'react';
import {useTranslation} from "react-i18next";

type Props = {
    data: any;
};

export function NodeTooltip({data}: Props) {
    const {t} = useTranslation('descriptions');

    const {children, ...restData} = data;

    return (
        <div>
            <div>{t(data.name+'_desc')}</div>
            <div>{JSON.stringify(restData)}</div>
        </div>
    );
};