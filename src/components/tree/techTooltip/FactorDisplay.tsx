import * as React from "react";
import classNames from "classnames";

function FactorDisplay({factor}: { factor: number }) {
    return (<text
        className={classNames({"multiplier_positive": factor >= 1}, {"multiplier_negative": factor < 1})}>x{factor} </text>)
}

export default FactorDisplay;