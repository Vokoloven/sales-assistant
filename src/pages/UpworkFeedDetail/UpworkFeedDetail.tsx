import {useParams} from "react-router-dom";

import {useGetFeedsDetailQuery} from "../../redux/api/upworkFeedsApi";

const UpworkFeedDetail = () => {
  const {id} = useParams();
  const {data} = useGetFeedsDetailQuery({id}, {skip: !id});

  console.log(data);

  return <div>{id}</div>;
};

export default UpworkFeedDetail;
