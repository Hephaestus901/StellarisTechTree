import React, {Fragment} from "react";
import {TechNode} from "../../graph/techNode/TechNode";
import "./branch.css";

type Props = {
    tech: any,
    id?: any
};
export const Branch = ({tech, id}: Props) => {
    return (
        <>
            <div className="branch">
                <div className="branch-root" id={id ?? tech.name}>
                    <TechNode tech={tech}/>
                </div>
                <div className={"children"}>
                    {tech.children
                        ? tech.children.map((x: any) => {
                            const key = tech.name + x.name;
                            return (
                                <Fragment key={key}>
                                    <Branch
                                        id={key}
                                        tech={x}/>
                                </Fragment>
                            );
                        })
                        : <></>}
                </div>
            </div>
        </>
    );
};