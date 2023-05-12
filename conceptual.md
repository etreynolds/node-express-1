### Conceptual Exercise

Answer the following questions below:

- What are some ways of managing asynchronous code in JavaScript?
  - A few ways of managing asynchronous code in JS are callback functions, Promises, and async/await.

- What is a Promise?
  - A Promise is an object that represents the eventual completion or failure of an asynchronous operation. It's a more structured way to handle asynchronous code compared to callbacks.

- What are the differences between an async function and a regular function?
  - Regular functions return a value, while async functions return a Promise. Regular functions execute synchronously (meaning next line of code doesn't execute until current line has finished), while async functions execute asynchronously (meaning they allow other code to run while they wait for an asynchronous operation to complete).

- What is the difference between Node.js and Express.js?
  - Node.js is a JavaScript runtime environment that runs server-side while Express.js is a web application framework for Node.js that provides tools and features for building web apps and APIs.

- What is the error-first callback pattern?
  - It's what Node.js callbacks usually conform to. The callback's first param is listed as ***error***. Node then supplies an ***error object*** if something bad happens, otherwise ***null*** as args.

- What is middleware?
  - Middleware are functions that can intercept and run in the middle of the request/response cycle. In Express they get access to the ***req*** and ***res*** objects and can call the ***next*** function.

- What does the `next` function do?
  - If it isn't included, the following routes won't run. It's used to pass control to the next middleware function in the chain.

- What are some issues with the following code? (consider all aspects: performance, structure, naming, etc)

  ```js
  async function getUsers() {
    const elie = await $.getJSON('https://api.github.com/users/elie');
    const joel = await $.getJSON('https://api.github.com/users/joelburton');
    const matt = await $.getJSON('https://api.github.com/users/mmmaaatttttt');

    return [elie, matt, joel];
  }
  ```
  - This code makes three separate HTTP requests using ***$.getJSON*** which can be slow and inefficient. Instead of calling it three separate times, we could use an array of usernames and loop over them to make the HTTP requests:
    ```js
    async function getUserData(usernames) {
      const requests = usernames.map(username => $.getJSON(`https://api.github.com/users/${username}`));
      const userData = await Promise.all(requests);
      return userData;
    }

    const usernames = ['elie', 'joelburton', 'mmmaaatttttt'];
    const userData = await getUserData(usernames);
    ```
