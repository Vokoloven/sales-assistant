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
import Modal from "../../components/Modal/Modal";
import CreateChat from "../../components/Modal/ModalInstance/CreateChat";
import Tooltip from "../../components/Tooltip/Tooltip";
import type {TElements} from "../../components/Tooltip/types/tooltip";
import {ThemeConfig, getTheme} from "../../hooks/useTheme";
import {selectUser} from "../../redux/slice/slice";
import {logOut} from "../../redux/slice/slice";

import styles from "./SharedLayout.module.scss";

const modalCreateChat = document.getElementById("modal-create-chat") as HTMLDivElement;

const SharedLayout = ({themeSwitcher}: {themeSwitcher: () => void}) => {
  const theme = getTheme();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [collapsed, setCollapsed] = useState(true);
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [modalValue, setModalValue] = useState("");
  const navigate = useNavigate();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setModalValue(event.target.value);
  };
  const handleOpenModal = () => {
    setOpenModal((prevOpen) => !prevOpen);
  };

  const handleOpen = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleCollapse = () => {
    setCollapsed((prevCollapsed) => !prevCollapsed);
  };

  const handleSubmit = () => {
    console.log(modalValue);
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
                  onClick={handleOpenModal}
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
                  open={open}
                  setOpen={setOpen}
                >
                  <Button
                    text={user?.email ?? ""}
                    buttonStyle={ButtonStyle.Tooltip}
                    iconBefore={IconAppName.User}
                    iconAfter={IconAppName.ChevronRight}
                    onClick={handleOpen}
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
                    onClick={handleOpenModal}
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
      <Modal
        component={
          <CreateChat
            onChange={handleChange}
            handleOpen={handleOpenModal}
            value={modalValue}
            handleSubmit={handleSubmit}
          />
        }
        portal={{domeNode: modalCreateChat}}
        isOpen={openModal}
        handleClose={handleOpenModal}
      />
    </>
  );
};

export default SharedLayout;
