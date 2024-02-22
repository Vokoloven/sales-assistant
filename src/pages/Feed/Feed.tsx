import classnames from "classnames";
import {useState} from "react";

import Button from "@/components/Button/Button";
import ButtonIcon from "@/components/ButtonIcon/ButtonIcon";
import {IconAppName} from "@/components/Icons/constants";
import {useTheme, ThemeConfig, getTheme} from "@/hooks/useTheme";

import styles from "./Feed.module.scss";

const Feed = () => {
  const {themeSwitcher} = useTheme();
  const theme = getTheme();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <section className={styles.section}>
      <div className={classnames(styles.sectionMenu, {[`${styles.collapsed}`]: collapsed})}>
        <div className={styles.sectionMenuContent}>
          <Button
            type="button"
            text="New Chat"
          />
        </div>
      </div>
      <div className={classnames(styles.sectionMain, {[`${styles.collapsed}`]: collapsed})}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionHeaderBox}>
            <ButtonIcon
              onClick={() => setCollapsed((prevCollapsed) => !prevCollapsed)}
              icon={collapsed ? IconAppName.Menu : IconAppName.CollapseMenu}
              iconProps={{className: styles.sectionIcon}}
              className={styles.sectionHeaderMenuButton}
            />
            <ButtonIcon
              onClick={themeSwitcher}
              icon={theme === ThemeConfig.Light ? IconAppName.Moon : IconAppName.Sun}
              iconProps={{className: styles.sectionIcon}}
              className={classnames(styles.sectionHeaderMenuButton, {[`${styles.collapsed}`]: !collapsed})}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Feed;
