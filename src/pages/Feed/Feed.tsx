import classnames from 'classnames';
import {useState} from 'react';

import Button from '@/components/Button/Button';
import ButtonIcon from '@/components/ButtonIcon/ButtonIcon';
import {IconAppName} from '@/components/Icons/constants';
import {useTheme, ThemeConfig, getTheme} from '@/hooks/useTheme';

import styles from './Feed.module.scss';

const Feed = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {themeSwitcher} = useTheme();
  const theme = getTheme();

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
      <div className={classnames(styles.sectionMain, {[`${styles.sectionMainFullWidth}`]: collapsed})}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionHeaderBox}>
            <ButtonIcon
              onClick={() => setCollapsed((prevCollapsed) => !prevCollapsed)}
              icon={collapsed ? IconAppName.Menu : IconAppName.CollapseMenu}
              iconProps={{width: '24', height: '24'}}
              className={styles.sectionHeaderMenuButton}
            />
            <ButtonIcon
              onClick={themeSwitcher}
              icon={theme === ThemeConfig.Light ? IconAppName.Moon : IconAppName.Sun}
              iconProps={{width: '24', height: '24'}}
              className={styles.sectionHeaderMenuButton}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Feed;
