import classnames from "classnames";
import {useState} from "react";

import Button from "../../components/Button/Button";
import {ButtonSize} from "../../components/Button/constants";
import ButtonIcon from "../../components/ButtonIcon/ButtonIcon";
import {IconAppName} from "../../components/Icons/constants";
import {ThemeConfig, getTheme} from "../../hooks/useTheme";

import styles from "./Feed.module.scss";

const Feed = ({themeSwitcher}: {themeSwitcher: () => void}) => {
  const theme = getTheme();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <section className={styles.section}>
      <aside className={classnames(styles.sectionSidebar, {[`${styles.collapsed}`]: collapsed})}>
        <div className={styles.sectionSidebarBox}>
          <div className={styles.sectionSidebarBoxOuter}>
            <div className={styles.sectionSidebarBoxInner}>
              <Button
                text="New Chat"
                iconBefore={IconAppName.Cross}
                iconBeforeClassname={styles.sectionButton}
              />
            </div>
          </div>
        </div>
      </aside>
      <div className={classnames(styles.sectionContent, {[`${styles.collapsed}`]: collapsed})}>
        <header className={styles.sectionHeader}>
          <div className={styles.sectionHeaderBox}>
            <div className={classnames(styles.sectionHeaderBoxOuter, {[`${styles.collapsed}`]: collapsed})}>
              <div className={styles.sectionHeaderBoxInner}>
                <ButtonIcon
                  onClick={() => setCollapsed((prevCollapsed) => !prevCollapsed)}
                  icon={collapsed ? IconAppName.Menu : IconAppName.CollapseMenu}
                  iconProps={{className: styles.sectionIcon}}
                  className={styles.sectionSidebarIconButton}
                  ariaLabel={"Menu toggler"}
                />
              </div>
            </div>
            <div className={classnames(styles.sectionHeaderBoxOuter, {[`${styles.collapsed}`]: collapsed})}>
              <div className={styles.sectionHeaderBoxInner}>
                <Button
                  size={ButtonSize.Small}
                  text="New Chat"
                  iconBeforeClassname={styles.sectionButton}
                  iconBefore={IconAppName.Cross}
                />
              </div>
            </div>
            <div className={classnames(styles.sectionHeaderBoxOuter, {[`${styles.collapsed}`]: collapsed})}>
              <div className={styles.sectionHeaderBoxInner}>
                <ButtonIcon
                  onClick={themeSwitcher}
                  icon={theme === ThemeConfig.Light ? IconAppName.Moon : IconAppName.Sun}
                  iconProps={{className: styles.sectionIcon}}
                  className={classnames(styles.sectionSidebarIconButton, {[`${styles.collapsed}`]: collapsed})}
                  ariaLabel={"Sidebar collapse"}
                />
              </div>
            </div>
          </div>
        </header>
        <main></main>
        <footer></footer>
      </div>
    </section>
  );
};

export default Feed;
