import classnames from "classnames";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {Outlet} from "react-router-dom";

import {AppRoutes} from "../../AppRoutes";
import Button from "../../components/Button/Button";
import {ButtonColor, ButtonSize} from "../../components/Button/constants";
import ButtonIcon from "../../components/ButtonIcon/ButtonIcon";
import {ButtonIconStyle} from "../../components/ButtonIcon/constants";
import {IconAppName} from "../../components/Icons/constants";
import Tooltip from "../../components/Tooltip/Tooltip";
import type {TElements} from "../../components/Tooltip/types/tooltip";
import {ThemeConfig, getTheme} from "../../hooks/useTheme";
import {selectUser} from "../../redux/slice/slice";
import {logOut} from "../../redux/slice/slice";

import styles from "./SharedLayout.module.scss";

const SharedLayout = ({themeSwitcher}: {themeSwitcher: () => void}) => {
  const theme = getTheme();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [collapsed, setCollapsed] = useState(true);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const elements: TElements = [
    {
      id: 1,
      iconBefore: IconAppName.LogOut,
      text: "Log Out",
      onClick: () => {
        dispatch(logOut());
      },
    },
  ];

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
        <div className={styles.sectionSidebarBox}>
          <div className={styles.sectionSidebarBoxOuter}>
            <div className={styles.sectionSidebarBoxInner}>
              <Button
                text={"Upwork feed"}
                color={ButtonColor.Tooltip}
                iconBefore={IconAppName.Feed}
                classname={styles.sectionSidebarBoxInnerUserButton}
                onClick={() => navigate(`/${AppRoutes.Feed}`)}
              />
              <Tooltip
                elements={elements}
                open={open}
                setOpen={setOpen}
              >
                <Button
                  text={user?.email ?? ""}
                  color={ButtonColor.Tooltip}
                  iconBefore={IconAppName.User}
                  iconAfter={IconAppName.ChevronRight}
                  classname={styles.sectionSidebarBoxInnerUserButton}
                  onClick={() => setOpen((prevOpen) => !prevOpen)}
                />
              </Tooltip>
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
                  ariaLabel={"Menu toggler"}
                  buttonIconStyle={ButtonIconStyle.Header}
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
                  ariaLabel={"Sidebar collapse"}
                  buttonIconStyle={ButtonIconStyle.Header}
                />
              </div>
            </div>
          </div>
        </header>
        <Outlet />
      </div>
    </section>
  );
};

export default SharedLayout;
