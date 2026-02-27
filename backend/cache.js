import nodeCache from "node-cache";

export const cache = new nodeCache({ stdTTL: 600, checkperiod: 120 });
