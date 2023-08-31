// @flow
import * as React from 'react';
import {SVGProps, useCallback, useEffect, useMemo, useState} from 'react';
import Tree, {CustomNodeElementProps} from "react-d3-tree";
import {TechNode} from "./techNode/TechNode";
import {Tooltip} from "react-tooltip";
import {renderToStaticMarkup} from "react-dom/server";
import {NodeTooltip} from "./nodeTooltip/NodeTooltip";

import "./Graph.css";

type ForeignObjectProps = Partial<SVGProps<SVGForeignObjectElement>>;

export function Graph() {
    const [loading, setLoading] = useState(true);
    const [technologies, setTechnologies] = useState<{ Tech: any[] }>({Tech: []});

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            // const response = await fetch('json/physics.json');
            const response = await fetch('json/root.json');
            const payload = await response.json();

            setLoading(false);
            setTechnologies(payload);
        }

        fetchData().catch(console.error);
    }, []);

    const renderFunc = useCallback(({nodeDatum}: CustomNodeElementProps, foreignObjectProps: ForeignObjectProps) => {
        return nodeDatum.name !== '' ? (
            <foreignObject data-tooltip-id="my-tooltip"
                           data-tooltip-html={renderToStaticMarkup(<NodeTooltip data={nodeDatum}/>)}
                           data-tooltip-place="top"
                           key={nodeDatum.name}
                           {...foreignObjectProps}>
                <TechNode tech={nodeDatum}/>
            </foreignObject>
        ) : (<foreignObject key={nodeDatum.name} {...foreignObjectProps} />)
    }, [])

    const content = useMemo(() => {
        const nodeSize = {x: 400, y: 80};
        const foreignObjectProps: ForeignObjectProps = {
            width: nodeSize.x * 0.7,
            height: nodeSize.y,
            x: -nodeSize.x * 0.4,
            y: -nodeSize.y * 0.2
        };

        return loading
            ? <p><em>Loading...</em></p>
            : <Tree
                rootNodeClassName={'root-node'}
                svgClassName='graph'
                data={{name: '', children: technologies.Tech}}
                pathFunc={"step"}
                orientation={'horizontal'}
                collapsible={true}
                draggable={true}
                zoomable={true}
                nodeSize={nodeSize}
                separation={{siblings: 1.25, nonSiblings: 1.5}}
                renderCustomNodeElement={props => renderFunc(props, foreignObjectProps)}
            />
    }, [loading, technologies, renderFunc]);

    useEffect(() => {
        const rootNode: any = document.getElementsByClassName('root-node')[0];
        if (rootNode) {
            rootNode.style.opacity = 0
        }

        for (let i = 0; i < technologies.Tech.length; i++) {
            (document.getElementsByClassName('rd3t-link')[i] as any).style.opacity = 0;
        }
    }, [content, technologies]);

    return (
        <>
            {content}
            <Tooltip id="my-tooltip" variant="info" openOnClick clickable closeOnScroll={false}/>
        </>
    );
}