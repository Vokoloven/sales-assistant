import {useParams} from "react-router-dom";

const UpworkFeedDetail = () => {
  const {id} = useParams();

  return <div>{id}</div>;
};

export default UpworkFeedDetail;
