import PulseLoader from 'react-spinners/PulseLoader'
import { CSSProperties, JSX } from "react";

interface IPropTypes {
    loaded: boolean
    onlySpinner: boolean
    children?: JSX.Element
}

const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
};

function Loader(props: IPropTypes): JSX.Element {
    if (!props.loaded || props.onlySpinner) {
        return (
            <div>
                <div>
                    <PulseLoader color="#00dfff" cssOverride={override} loading />
                </div>
            </div>
        )
    } else {
        return (
            <>
                {props.loaded && props.children}
            </>
        )
    }
}

export default Loader