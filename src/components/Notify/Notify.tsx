/* eslint-disable @typescript-eslint/no-unused-vars */
import classnames from "classnames";

import {KeyExtractor} from "../../utils/types/keyExtractor";

import {NotifyType} from "./constants";
import styles from "./Notify.module.scss";

interface IProps {
  type: KeyExtractor<typeof NotifyType>;
  message: string;
}

const Notify = ({type, message}: IProps) => {
  if (message) {
    return (
      <div className={styles.box}>
        <div className={classnames(styles.notify, styles[`${type}`])}>
          <div className={classnames(styles.notifyWrapper)}>
            <div className={styles.notifyWrapperOuter}>
              <div className={styles.notifyWrapperInner}>
                <span className={styles.notifyTitle}>
                  <b>Error</b>
                </span>
              </div>
            </div>
            <div className={styles.notifyWrapperOuter}>
              <div className={styles.notifyWrapperInner}>
                <span className={styles.notifyMessage}>{message}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return <></>;
};

export default Notify;
