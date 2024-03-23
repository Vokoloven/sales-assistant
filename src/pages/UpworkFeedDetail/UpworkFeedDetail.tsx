import {useParams} from "react-router-dom";

import Spinner from "../../components/Spinner/Spinner";
import {useGetFeedsDetailQuery} from "../../redux/api/upworkFeedsApi";

import styles from "./UpworkFeedDetail.module.scss";

const UpworkFeedDetail = () => {
  const {id} = useParams();
  const {data, isLoading} = useGetFeedsDetailQuery({id}, {skip: !id});

  console.log(data);

  if (isLoading) return <div className={styles.spinner}>Loading...{<Spinner />}</div>;
  return <div>{id}</div>;
};

export default UpworkFeedDetail;
