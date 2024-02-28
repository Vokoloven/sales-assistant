import {useState, useEffect} from "react";

import styles from "./Progress.module.scss";

const Progress = () => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setValue((prevValue) => {
        if (prevValue >= 100) {
          return (prevValue = 0);
        } else {
          return (prevValue += 20);
        }
      });
    }, 300);

    return () => clearInterval(id);
  }, []);

  return (
    <div className={styles.cover}>
      <div className={styles.progressBox}>
        <progress
          role="progressbar"
          className={styles.progressBoxProgress}
          value={value}
          max={100}
        ></progress>
      </div>
    </div>
  );
};

export default Progress;
