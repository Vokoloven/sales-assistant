import classnames from "classnames";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

import {AppRoutes} from "../../AppRoutes";
import Button from "../../components/Button/Button";
import {ButtonColor, ButtonSize} from "../../components/Button/constants";
import ButtonIcon from "../../components/ButtonIcon/ButtonIcon";
import {IconAppName} from "../../components/Icons/constants";
import Tooltip from "../../components/Tooltip/Tooltip";
import type {TElements} from "../../components/Tooltip/types/tooltip";
import {useAuth} from "../../hooks/useAuth";
import {ThemeConfig, getTheme} from "../../hooks/useTheme";
import {useGetFeedsQuery} from "../../redux/api/feedApi";
import {selectUser} from "../../redux/slice/authSlice";
import {logOut} from "../../redux/slice/authSlice";
import {SortDirection} from "../../submodules/enums/common/sort-direction.enum";
import {UpworkFeedSortBy} from "../../submodules/enums/upwork-feed/upwork-feed-sort-by.enum";

import styles from "./Feed.module.scss";

const Feed = ({themeSwitcher}: {themeSwitcher: () => void}) => {
  const {isLogged} = useAuth();
  const theme = getTheme();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [collapsed, setCollapsed] = useState(false);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useGetFeedsQuery(
    {
      sortDirection: SortDirection.ASC,
      sortBy: UpworkFeedSortBy.Title,
    },
    {skip: !isLogged},
  );

  const elements: TElements = [
    {
      id: 1,
      iconBefore: IconAppName.LogOut,
      text: "Test",
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
                  iconProps={{className: styles.sectionIcon}}
                  className={styles.sectionHeaderBoxInnerIconButton}
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
                  className={classnames(styles.sectionHeaderBoxInnerIconButton, {[`${styles.collapsed}`]: collapsed})}
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
