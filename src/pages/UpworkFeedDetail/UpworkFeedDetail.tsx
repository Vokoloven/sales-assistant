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
            <span>Upwork feed</span>
            <span className={styles.navArrow}>&#8250;</span>
          </div>
        </nav>
        <div className={styles.title}>
          <h2 className={styles.titleText}>{data?.title}</h2>
        </div>
        <div className={styles.wrapper}>
          <div className={styles.container}>
            <div className={styles.containerOuter}>
              <div className={styles.containerInner}>
                <div className={styles.containerInnerBox}>
                  <h3 className={styles.containerInnerBoxTitle}>Project info</h3>
                  <div className={styles.project}>
                    <div className={classnames(styles.projectScore, styles[`${scoreHandler(data?.score)}`])}>
                      <span>{data?.score}</span>
                    </div>
                    <div className={styles.projectTitle}>{data?.title}</div>
                    <div className={styles.projectDate}>{format(new Date(data?.published), "MM/dd/yyyy HH:mm")}</div>
                  </div>
                  <div className={styles.projectDescription}>
                    <ReactMarkdown remarkPlugins={[gfm]}>{data?.description}</ReactMarkdown>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {data?.keywords && (
            <div className={styles.container}>
              <div className={styles.containerOuter}>
                <div className={styles.containerInner}>
                  <div className={styles.containerInnerBox}>
                    <h3 className={styles.containerInnerBoxTitle}>Keywords</h3>
                    <div className={styles.keywords}>
                      <div className={styles.keywordsItems}>
                        {data.keywords.map((keyword, index) => (
                          <span key={index}>{keyword}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {data?.matchedCasesData && (
            <div className={styles.container}>
              <div className={styles.containerOuter}>
                <div className={styles.containerInner}>
                  <div className={styles.containerInnerBox}>
                    <h3 className={styles.containerInnerBoxTitle}>Matched cases</h3>
                    <div className={styles.matchedCases}>
                      {data.matchedCasesData.map((matchedCase, index) => (
                        <div
                          className={styles.matchedCasesBox}
                          key={index}
                        >
                          <a
                            href={matchedCase.link}
                            className={styles.matchedCasesTitle}
                            target="_blank"
                            rel="noreferrer noopener"
                          >
                            {matchedCase.title}
                          </a>
                          <div className={styles.matchedCasesDescription}>
                            <ReactMarkdown remarkPlugins={[gfm]}>{matchedCase.content}</ReactMarkdown>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </>
    );
  return null;
};

export default UpworkFeedDetail;
