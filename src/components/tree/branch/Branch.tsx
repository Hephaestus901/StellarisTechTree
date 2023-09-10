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
            const isOdd = totalChildren % 2 !== 0;
            const middleGround = totalChildren / 2 - 0.5;
            if (isOdd && index === middleGround) {
                return name;
            }

            const offset = index / totalChildren;
            if (offset < 0.5) {
                name += ' with-down-line-connector';
            }

            if (offset >= 0.5) {
                name += ' with-up-line-connector';
            }
        }

        return name;
    }, [totalChildren, index, parentId]);

    const childrenClassName = useMemo(() => {
        let name = 'children';
        name += tech.children.length % 2 === 0 ? ' isEven' : ' isOdd';
        return name;
    }, [tech]);

    return (
        <>
            <div className={branchClassName}>
                <div className={className} id={elementId}>
                    <TechNode tech={tech}/>
                </div>
                <div className={childrenClassName}>
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