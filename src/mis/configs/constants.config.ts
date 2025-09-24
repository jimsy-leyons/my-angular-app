import { environment } from "../../environments/environment";

const APP_NAME = "nh_sjt";

const CONSTANTS = {
  APP: {
    DISPLAY_NAME: "NEWHOLM",
    ENVIRONMENT: environment.production ? "PRODUCTION" : "DEVELOPMENT",
  },
  STORAGE_PREFIX : APP_NAME + "_",
  STORAGES: {
    TOKEN_KEY: "tokenData",
    USER_KEY: "userData",
    CURRENT_USER: "currentUser"
  }
};

export { CONSTANTS };
