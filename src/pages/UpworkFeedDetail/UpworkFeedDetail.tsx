import {useEffect} from "react";
import {useParams} from "react-router-dom";
import {useNavigate} from "react-router-dom";

import {NotifyType} from "../../components/Notify/constants";
import Notify from "../../components/Notify/Notify";
import Spinner from "../../components/Spinner/Spinner";
import {useGetFeedsDetailMutation} from "../../redux/api/upworkFeedsApi";
import {STATUS_CODE} from "../../redux/utils";

import styles from "./UpworkFeedDetail.module.scss";

const UpworkFeedDetail = () => {
  const {id} = useParams();
  const [getFeedsDetail, {data, error, isLoading}] = useGetFeedsDetailMutation();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      try {
        getFeedsDetail({id});
      } catch (error) {
        /*empty*/
      }
    }
  }, [id]);

  console.log(data);

  if (isLoading) return <div className={styles.spinner}>Loading...{<Spinner />}</div>;

  if (error) {
    if ("status" in error && error.status === STATUS_CODE.UNAUTHORIZED) {
      return (
        <div>
          <Notify
            type={NotifyType.Error}
            message={"Something went wrong"}
          />
          <div className={styles.error}>
            Please try again later.&nbsp;
            <span
              onClick={() => {
                getFeedsDetail({id});
              }}
              className={styles.errorReload}
            >
              Reload
            </span>
          </div>
        </div>
      );
    }
  }

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
      <h2 className={styles.title}>{data?.data?.title}</h2>
    </>
  );
};

export default UpworkFeedDetail;
