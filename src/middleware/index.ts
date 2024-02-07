import { checkObjectId } from "./checkMongoId";
import errorRequest from "./errorRequest";
import notFound from "./notFound";
import requestLogger from "./requestLogger";
import userAuth from "./userAuth";
import validaton from "./validation";

export const middleware = {
userAuth,
checkObjectId,
requestLogger,
notFound,
validaton,
errorRequest
};