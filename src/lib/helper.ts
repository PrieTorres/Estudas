export function transformArrayToObject<T, K extends keyof T>(array: T[], key: K): Record<T[K] & (string | number | symbol), T> {
  return array.reduce<Record<T[K] & (string | number | symbol), T>>((acc, item) => {
    const keyValue = item[key];
    if (typeof keyValue === 'string' || typeof keyValue === 'number') {
      acc[keyValue] = item;
    } else {
      throw new Error(`Key value of type ${typeof keyValue} is not a valid object key.`);
    }
    return acc;
  }, {} as Record<T[K] & (string | number | symbol), T>);
};

export function isProd() {
  return process.env.ENVIRONMENT == "production"
};

export function getApiURL(){
  return (isProd() ? process.env.PROD_URL : process.env.DEV_URL) ?? "http://localhost:3000"
}