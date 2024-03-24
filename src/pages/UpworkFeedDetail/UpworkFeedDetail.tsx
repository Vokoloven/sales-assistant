/* eslint-disable @typescript-eslint/no-unused-vars */
import classnames from "classnames";
import {format} from "date-fns";
import {useEffect, useMemo} from "react";
import ReactMarkdown from "react-markdown";
import {useParams} from "react-router-dom";
import {useNavigate} from "react-router-dom";
import gfm from "remark-gfm";

import Spinner from "../../components/Spinner/Spinner";
import {useGetFeedsDetailMutation} from "../../redux/api/upworkFeedsApi";
import {scoreHandler} from "../UpworkFeed/utils";

import styles from "./UpworkFeedDetail.module.scss";

const UpworkFeedDetail = () => {
  const {id} = useParams();
  const [getFeedsDetail, {data: fetchedData, isLoading}] = useGetFeedsDetailMutation();
  const navigate = useNavigate();

  const data = useMemo(() => {
    if (fetchedData) {
      const {data} = fetchedData;
      return data;
    }
  }, [fetchedData]);

  useEffect(() => {
    if (id) {
      try {
        getFeedsDetail({id});
      } catch (error) {
        /*empty*/
      }
    }
  }, [id]);

  if (isLoading) return <div className={styles.spinner}>Loading...{<Spinner />}</div>;

  if (data)
    return (
      <>
        <nav className={styles.nav}>
          <div
            className={styles.navBox}
            onClick={() => navigate(-1)}
          >
            Upwork feed <span className={styles.navArrow}>&#8250;</span>
          </div>
        </nav>
        <h2 className={styles.title}>{data?.title}</h2>
        <div className={styles.container}>
          <div className={styles.containerOuter}>
            <div className={styles.containerInner}>
              <div className={styles.project}>
                <h3 className={styles.projectTitle}>Project info</h3>
                <div className={styles.projectInfo}>
                  <div className={classnames(styles.projectInfoScore, styles[`${scoreHandler(data?.score)}`])}>
                    {data?.score}
                  </div>
                  <div className={styles.projectInfoTitle}>{data?.title}</div>
                  <div className={styles.projectInfoDate}>{format(new Date(data?.published), "MM/dd/yyyy HH:mm")}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <ReactMarkdown remarkPlugins={[gfm]}>{data?.description}</ReactMarkdown> */}
      </>
    );
  return null;
};

export default UpworkFeedDetail;
