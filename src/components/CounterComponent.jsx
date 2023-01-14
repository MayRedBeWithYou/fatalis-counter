import { Icon, IconButton, Tooltip, Snackbar } from "@mui/material";
import styles from "./CounterComponent.module.css";
import { useLocalStorage } from "../utils/useLocalStorage";
import { useEffect, useState } from "react";

function CounterComponent() {
  const [snack, setSnack] = useState(false);
  const [counter, setCounter] = useLocalStorage("fatalis");
  console.log(counter);

  useEffect(() => {
    if (counter === undefined) setCounter({ count: 0, cleared: false });
  }, [counter, setCounter]);

  if (counter === undefined) return null;
  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <img src="https://img.game8.co/3277849/73953a85412dad6ed3528b008201051d.png/show" />
      </div>
      <div className={styles.infoPanel}>
        <p className={styles.category}>Monster Hunter World</p>
        <p className={styles.label}>
          <span>Fatalis</span>
          <Tooltip title="See on Monster Hunter World Wiki">
            <IconButton
              size="small"
              onClick={() =>
                window.open(
                  "https://monsterhunterworld.wiki.fextralife.com/Fatalis",
                  "_blank"
                )
              }
            >
              <Icon>link</Icon>
            </IconButton>
          </Tooltip>
        </p>
        {counter.cleared ? (
          <div className={styles.victoryPanel}>
            <p className={styles.victoryLabel}>We did it!</p>
            <p className={styles.victoryText}>
              It only took <span className={styles.count}>{counter.count}</span>{" "}
              attempts!
              <Tooltip title="Reset?">
                <IconButton
                  onClick={() =>
                    setCounter((value) => {
                      return { ...value, cleared: false };
                    })
                  }
                >
                  <Icon>clear</Icon>
                </IconButton>
              </Tooltip>
            </p>
          </div>
        ) : (
          <div className={styles.attemptPanel}>
            <p className={styles.countLabel}>
              <span className={styles.count}>{counter.count}</span> attemps so
              far!
            </p>
            <div className={styles.actionPanel}>
              <Tooltip title="Increase">
                <IconButton
                  onClick={() =>
                    setCounter((value) => {
                      return { ...value, count: value.count + 1 };
                    })
                  }
                >
                  <Icon>add</Icon>
                </IconButton>
              </Tooltip>
              <Tooltip title="Decrease">
                <IconButton
                  onClick={() =>
                    setCounter((value) => {
                      if (value.count === 0) return;
                      return { ...value, count: value.count - 1 };
                    })
                  }
                  disabled={counter.count === 0}
                >
                  <Icon>remove</Icon>
                </IconButton>
              </Tooltip>
              <Tooltip title="Done!">
                <IconButton
                  onClick={() => {
                    setCounter({ ...counter, cleared: true });
                    setSnack(true);
                  }}
                >
                  <Icon>done</Icon>
                </IconButton>
              </Tooltip>
            </div>
          </div>
        )}
      </div>
      <Snackbar
        color="var(--accent-color)"
        open={snack}
        autoHideDuration={5000}
        message="Great job! You've beat Fatalis!"
        onClose={() => setSnack(false)}
      />
    </div>
  );
}

export default CounterComponent;
