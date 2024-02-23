import classnames from "classnames";
import {useState} from "react";

import Button from "components/Button/Button";
import ButtonIcon from "components/ButtonIcon/ButtonIcon";
import {IconAppName} from "components/Icons/constants";
import {useTheme, ThemeConfig, getTheme} from "hooks/useTheme";

import styles from "./Feed.module.scss";

const Feed = () => {
  const {themeSwitcher} = useTheme();
  const theme = getTheme();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <section className={styles.section}>
      <div className={classnames(styles.sectionMenu, {[`${styles.collapsed}`]: collapsed})}>
        <div className={styles.sectionMenuBox}>
          <div className={styles.sectionMenuBoxOuter}>
            <div className={styles.sectionMenuBoxInner}>
              <Button
                type="button"
                text="New Chat"
              />
            </div>
          </div>
        </div>
      </div>
      <div className={classnames(styles.sectionMain, {[`${styles.collapsed}`]: collapsed})}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionHeaderBox}>
            <div className={classnames(styles.sectionHeaderBoxOuter, {[`${styles.collapsed}`]: collapsed})}>
              <div className={styles.sectionHeaderBoxInner}>
                <ButtonIcon
                  onClick={() => setCollapsed((prevCollapsed) => !prevCollapsed)}
                  icon={collapsed ? IconAppName.Menu : IconAppName.CollapseMenu}
                  iconProps={{className: styles.sectionIcon}}
                  className={styles.sectionHeaderMenuButton}
                />
              </div>
            </div>
            <div className={classnames(styles.sectionHeaderBoxOuter, {[`${styles.collapsed}`]: collapsed})}>
              <div className={styles.sectionHeaderBoxInner}>
                <ButtonIcon
                  onClick={themeSwitcher}
                  icon={theme === ThemeConfig.Light ? IconAppName.Moon : IconAppName.Sun}
                  iconProps={{className: styles.sectionIcon}}
                  className={classnames(styles.sectionHeaderMenuButton, {[`${styles.collapsed}`]: collapsed})}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Feed;
