import React, {Fragment, useMemo} from "react";
import {TechNode} from "../../graph/techNode/TechNode";
import "./branch.css";

type Props = {
    tech: any,
    id?: string,
    parentId?: string,
    index?: number,
    totalChildren?: number
};
export const Branch = ({tech, id, parentId, index, totalChildren}: Props) => {
    const elementId = id ?? tech.name;
    const className = useMemo(() => {
        let name = 'branch-root';
        if (tech.children.length > 0) {
            name += ' with-line-start';
        }

        if (parentId) {
            name += ' with-line-end';
        }

        return name;
    }, [tech, parentId]);

    const branchClassName = useMemo(() => {
        let name: string = 'branch';

        if (parentId && index !== undefined && totalChildren !== undefined && totalChildren > 1) {
            if (index === 0) {
                name += ' with-down-line-connector';
                return name;
            }

            if (index === totalChildren - 1) {
                name += ' with-up-line-connector';
                return name;
            }

            name += ' with-both-side-connector';
        }

        return name;
    }, [totalChildren, index, parentId]);

    return (
        <>
            <div className={branchClassName}>
                <div className={className} id={elementId}>
                    <TechNode tech={tech}/>
                </div>
                <div className='children'>
                    {tech.children
                        ? tech.children.map((x: any, index: number) => {
                            const key = tech.name + x.name;
                            return (
                                <Fragment key={key}>
                                    <Branch
                                        id={key}
                                        tech={x}
                                        index={index}
                                        totalChildren={tech.children.length}
                                        parentId={elementId}
                                    />
                                </Fragment>
                            );
                        })
                        : <></>}
                </div>
            </div>
        </>
    );
};