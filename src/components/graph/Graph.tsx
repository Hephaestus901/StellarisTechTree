// @flow
import * as React from 'react';
import {SVGProps, useCallback, useEffect, useMemo, useState} from 'react';
import Tree, {CustomNodeElementProps} from "react-d3-tree";
import {TechNode} from "./techNode/TechNode";

type ForeignObjectProps = Partial<SVGProps<SVGForeignObjectElement>>;

export function Graph() {
    const [loading, setLoading] = useState(true);
    const [technologies, setTechnologies] = useState<{ Tech: any[] }>({Tech: []});

    const renderFunc = useCallback(({nodeDatum}: CustomNodeElementProps, foreignObjectProps: ForeignObjectProps) => {
        console.log(nodeDatum);
        return nodeDatum.name !== '' ? (
            <foreignObject key={nodeDatum.name} {...foreignObjectProps}>
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
                data={{name: '', children: technologies.Tech}}
                pathFunc={"step"}
                orientation={'horizontal'}
                collapsible={true}
                draggable
                zoomable
                nodeSize={nodeSize}
                separation={{siblings: 2, nonSiblings: 2}}
                renderCustomNodeElement={props => renderFunc(props, foreignObjectProps)}
            />
    }, [loading, technologies, renderFunc]);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const response = await fetch('relations.json');
            const payload = await response.json();

            setLoading(false);
            setTechnologies(payload);
        }

        fetchData().catch(console.error);
    }, []);

    return (
        content
    );
}