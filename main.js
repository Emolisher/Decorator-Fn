// DECORATOR fn

// a wrap fn in another fn
//'decorate' the original FN with new capabilities
//benefits - D.R.Y. & clean code

// EX. 1
//using closure to low how many times a fn is called before

let sum = (...args) => {
  return [...args].reduce((acc, num) => acc + num);
};

const callCounter = (fn) => {
  let count = 0;

  return (...args) => {
    //write to logs, console, db, etc...
    console.log(`sum has been called ${(count += 1)} times`);
    return fn(...args);
  };
};

sum = callCounter(sum);
//by using LET we can reassign sum

console.log(sum(2, 3, 5));
console.log(sum(1, 5));

//EX.2
//Check for valid data & number of params

let rectangleArea = (length, width) => {
  return length * width;
};

const countParams = (fn) => {
  return (...params) => {
    if (params.length !== fn.length) {
      throw new Error(`incorrect number of params for ${fn.name}`);
    }
    return fn(...params);
  };
};

// add a second decorator fn

const requireIntegers = (fn) => {
  return (...params) => {
    params.forEach((param) => {
      //   if (!Number.isInteger(param)) {
      if (!param.isInteger) {
        throw new TypeError(`Params must be integers`);
      }
    });
    return fn(...params);
  };
};

rectangleArea = countParams(rectangleArea);
rectangleArea = requireIntegers(rectangleArea);

console.log(rectangleArea(20, 30));
//  console.log(rectangleArea(20,30,40));
console.log(rectangleArea(20, "hey"));

//EX. 3
//decorating an async API call function
//Time Data Requests during development

let requestData = async (url) => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
  }
};

const dataResponseTIme = (fn) => {
  return async (url) => {
    console.time("fn"); //this is a string
    const data = await fn(url);
    console.timeEnd("fn");
    return data;
    //big thing we call the data, not the fn
  };
};

const myTestFunction = async () => {
  requestData = dataResponseTIme(requestData);
  const data = await requestData("https://jsonplaceholder.typicode.com/");
  console.log(data);
};

myTestFunction();
