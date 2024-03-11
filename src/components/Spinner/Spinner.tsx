import styles from "./Spinner.module.scss";

const Spinner = ({size}: {size?: string}) => {
  return (
    <div
      style={{width: size}}
      className={styles.spinner}
    ></div>
  );
};

export default Spinner;
