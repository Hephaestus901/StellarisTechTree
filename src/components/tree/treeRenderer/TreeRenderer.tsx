import * as React from 'react';
import {useCallback, useEffect, useMemo, useState} from 'react';

import "./treeRenderer.css";
import {Tooltip} from "react-tooltip";
import {Branch} from "../branch/Branch";

export const TreeRenderer = () => {
    const [loading, setLoading] = useState(true);
    const [technologies, setTechnologies] = useState<any[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const response = await fetch('json/v3.10.4/tech.json');
            const payload = await response.json();

            setLoading(false);
            setTechnologies(payload);
        }

        fetchData().catch(console.error);
    }, []);

    const renderFunc = useCallback((nodeDatum: any) => (<Branch key={nodeDatum.name} tech={nodeDatum}/>), []);

    const content = useMemo(() => {
        return loading
            ? <p><em>Loading...</em></p>
            : <div className={"tree"}>{technologies.filter(x => !x.is_event).map(renderFunc)}</div>
    }, [loading, technologies, renderFunc]);

    return (
        <>
            {content}
            <Tooltip id="my-tooltip" openOnClick clickable closeOnScroll={false} className="tree_tooltip" classNameArrow="tree_tooltip_arrow"/>
        </>
    );
};