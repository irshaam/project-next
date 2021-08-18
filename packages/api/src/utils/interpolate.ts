import get from 'lodash/get';
// eslint-disable-next-line @typescript-eslint/ban-types
export const interpolate = (template: string, vars: object) => {
  // return template;
  const jsonString = JSON.stringify(template);

  const jsonObj = JSON.parse(jsonString, (_, rawValue) => {
    if (rawValue[0] !== '$') {
      return rawValue;
    }

    const name = rawValue.slice(2, -1);
    const value = get(vars, name);
    if (typeof value === 'undefined') {
      throw new ReferenceError(`Variable ${name} is not defined`);
    }
    return value;
  });

  return jsonObj;
  // return JSON.parse(jsonString, (_, rawValue) => {
  //   if (rawValue[0] !== '$') {
  //     // console.log(rawValue[0]);clear
  //     return rawValue;
  //   }
  //   // const value = get(vars, name);
  //   // if (typeof value === 'undefined') {
  //   //   throw new ReferenceError(`Variable ${name} is not defined`);
  //   // }
  //   // return value;
  // });
};
