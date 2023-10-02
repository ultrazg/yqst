import {useState, useRef, useEffect} from 'react'

export default function useStateCallback(initialState) {
    const [state, setState] = useState(initialState);
    const cbRef = useRef(null);
    useEffect(() => {
        if (cbRef.current) {
            cbRef.current(state);
            cbRef.current = null;
        }
    }, [state]);
    return [
        state,
        (value, cb) => {
            cbRef.current = typeof cb === "function" ? cb : null;
            setState(value);
        }
    ];
}
