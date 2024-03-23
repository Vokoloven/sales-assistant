import {AuthRoutes} from "./submodules/enums/routes/auth-routes.enum";
import {BaseRoutes} from "./submodules/enums/routes/base-routes.enum";
import {UpworkFeedsRoutesEnum} from "./submodules/enums/routes/upwork-feeds-routes.enum";

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const AppConfig = {
  BaseUrl: BASE_URL,
  Login: `${BaseRoutes.V1}/${AuthRoutes.BasePrefix}/${AuthRoutes.Login}`,
  RefreshToken: `${BaseRoutes.V1}/${AuthRoutes.BasePrefix}/${AuthRoutes.RefreshToken}`,
  RecoverUser: `${BaseRoutes.V1}/${AuthRoutes.BasePrefix}/${AuthRoutes.RecoverUser}`,
  Feeds: `${BaseRoutes.V1}/${UpworkFeedsRoutesEnum.BasePrefix}`,
  GetFeed: `${BaseRoutes.V1}/${UpworkFeedsRoutesEnum.BasePrefix}/${UpworkFeedsRoutesEnum.GetFeeds}`,
} as const;
