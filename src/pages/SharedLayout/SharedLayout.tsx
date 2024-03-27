import classnames from "classnames";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {Outlet} from "react-router-dom";

import {AppRoutes} from "../../AppRoutes";
import Button from "../../components/Button/Button";
import {ButtonStyle, ButtonSize} from "../../components/Button/constants";
import ButtonIcon from "../../components/ButtonIcon/ButtonIcon";
import {ButtonIconStyle} from "../../components/ButtonIcon/constants";
import {IconAppName} from "../../components/Icons/constants";
import CreateChat from "../../components/Modal/ModalInstance/CreateChat";
import Tooltip from "../../components/Tooltip/Tooltip";
import type {TElements} from "../../components/Tooltip/types/tooltip";
import {useModal} from "../../hooks/useModal";
import {ThemeConfig, getTheme} from "../../hooks/useTheme";
import {selectUser} from "../../redux/slice/slice";
import {logOut} from "../../redux/slice/slice";

import styles from "./SharedLayout.module.scss";

const portalDivElement = document.getElementById("modal-create-chat") as HTMLElement;

const SharedLayout = ({themeSwitcher}: {themeSwitcher: () => void}) => {
  const theme = getTheme();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [collapsed, setCollapsed] = useState(true);
  const [openTooltip, setOpenTooltip] = useState(false);
  const [createChat, setCreateChat] = useState<{name: string}>({name: ""});
  const navigate = useNavigate();

  const handleChangeCreateChat = (e: React.ChangeEvent<HTMLInputElement>) => setCreateChat({name: e.target.value});

  const {modal, openModal, closeModal} = useModal({
    children: (
      <CreateChat
        handleClose={() => closeModal()}
        handleSubmit={() => console.log(createChat)}
        onChange={handleChangeCreateChat}
        value={createChat.name}
      />
    ),
    isRenderInPortal: {domNode: portalDivElement},
  });

  const handleOpenTooltip = () => {
    setOpenTooltip((prevOpen) => !prevOpen);
  };

  const handleCollapse = () => {
    setCollapsed((prevCollapsed) => !prevCollapsed);
  };

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
    <>
      <section className={styles.section}>
        <aside className={classnames(styles.sectionSidebar, {[`${styles.collapsed}`]: collapsed})}>
          <div className={styles.sectionSidebarBox}>
            <div className={styles.sectionSidebarBoxOuter}>
              <div className={styles.sectionSidebarBoxInner}>
                <Button
                  text="New Chat"
                  iconBefore={IconAppName.Cross}
                  onClick={() => openModal()}
                />
              </div>
            </div>
          </div>
          <div className={styles.sectionSidebarBox}>
            <div className={styles.sectionSidebarBoxOuter}>
              <div className={styles.sectionSidebarBoxInner}></div>
            </div>
          </div>
          <div className={styles.sectionSidebarBox}>
            <div className={styles.sectionSidebarBoxOuter}>
              <div className={styles.sectionSidebarBoxInner}>
                <Button
                  text={"Upwork feed"}
                  buttonStyle={ButtonStyle.Tooltip}
                  iconBefore={IconAppName.Feed}
                  onClick={() => navigate(`/${AppRoutes.Feed}`)}
                />
                <Tooltip
                  elements={elements}
                  open={openTooltip}
                  setOpen={setOpenTooltip}
                >
                  <Button
                    text={user?.email ?? ""}
                    buttonStyle={ButtonStyle.Tooltip}
                    iconBefore={IconAppName.User}
                    iconAfter={IconAppName.ChevronRight}
                    onClick={handleOpenTooltip}
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
                    onClick={handleCollapse}
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
      {modal}
    </>
  );
};

export default SharedLayout;
