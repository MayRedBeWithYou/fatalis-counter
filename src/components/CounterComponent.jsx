import { Icon, IconButton, Tooltip } from "@mui/material";
import styles from "./CounterComponent.module.css";
import { useLocalStorage } from "../utils/useLocalStorage";
import { useEffect } from "react";

function CounterComponent() {
    const [counter, setCounter] = useLocalStorage("fatalis");

    useEffect(() => {
        if (counter === undefined) setCounter(0);
    }, [counter, setCounter])

    return (
    <div className={styles.container}>
        <div className={styles.imageContainer}>
            <img src='https://img.game8.co/3277849/73953a85412dad6ed3528b008201051d.png/show'/>
        </div>
        <div className={styles.infoPanel}>
            <p className={styles.category}>Monster Hunter World</p>
            <p className={styles.label}>Fatalis</p>
            <p className={styles.countLabel}>
                <span className={styles.count}>{counter}</span> attemps so far!
            </p>
            <div className={styles.actionPanel}>
            <Tooltip title="Increase">
                <IconButton onClick={() => setCounter((value) => value + 1)}>
                    <Icon>add</Icon>
                </IconButton>
            </Tooltip>
            <Tooltip title="Decrease">
                <IconButton onClick={() => setCounter((value) => value - 1)}>
                    <Icon>remove</Icon>
                </IconButton>
            </Tooltip>
            </div>
        </div>
    </div>
  );
}

export default CounterComponent;
