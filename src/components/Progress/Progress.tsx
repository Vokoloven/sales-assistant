import {useState, useEffect} from "react";

import styles from "./Progress.module.scss";

const Progress = () => {
  const [value, setValue] = useState(50);

  useEffect(() => {
    const id = setInterval(() => {
      setValue((prevValue) => {
        if (prevValue >= 1000) {
          return (prevValue = 50);
        } else {
          return (prevValue += prevValue * (1 / 50));
        }
      });
    }, 10);

    return () => clearInterval(id);
  }, []);

  return (
    <div className={styles.cover}>
      <div className={styles.progressBox}>
        <progress
          role="progressbar"
          className={styles.progressBoxProgress}
          value={value}
          max={1000}
        ></progress>
      </div>
    </div>
  );
};

export default Progress;
