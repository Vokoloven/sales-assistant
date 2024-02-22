import {useNavigate} from "react-router-dom";

import {AppRoutes} from "@/AppRoutes";
import Button from "@/components/Button/Button";
import {ButtonSize} from "@/components/Button/constants";

import styles from "./NotFound.module.scss";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <section className={styles.section}>
      <div className={styles.sectionBox}>
        <p className={styles.sectionTitle}>Oops!</p>
        <h1 className={styles.sectionHeading}>404 - Page not found</h1>
        <p className={styles.sectionDescription}>
          The page you are looking for might have been removed had its name changed or temporarily unavailable
        </p>
        <Button
          classname={styles.sectionButton}
          size={ButtonSize.Small}
          text="Go to home page"
          onClick={() => navigate(AppRoutes.BaseUrl, {replace: true})}
        />
      </div>
    </section>
  );
};

export default NotFound;
