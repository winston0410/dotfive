Question 1

- `++a` will first increment `a`, and then return `a`

- `a++` will first return `a`, the increment a

Question 2

- The key difference would be the use of **composition and inheritance**

- Object-oriented programming would avoid duplication with **classical inheritance**, functional-programming would avoid duplication with **composition**. 

- **composition** is possible with constructors and classes as well, but less intuitive

Question 3

The following is explained using Javascript as the context:

- a closure is a scope. Variables defined in the closure cannot be accessed outside. Closure can be nested, and the inner closure will have access to variables defined in its outer closure.

- a callback is a function you provide to another function. That function may pass certain values as the parameters of your callback, and it will call your callback for you. By using callback, it allows easy customization while retaining the privacy of the inner working of the function.

- a lambda might refer to an arrow function in Javascript. I think it is called lambda as it can be used easily for currying, and creating functions that follows lambda calculus. For example, `identity`, `apply` and `map`.

- a promise is a monad, having two possible outcome, `resolve` and `reject`. Just like a box, the value of a promise cannot be reached, unless it has been unwrapped. Promise can be used for passing value across threads(e.g `worker thread` in browser, the `greenlet` library)

Question 4

- I think logic short-circuiting is also called guarding. You will return a function early when certain condition is not met. By using a guard, you can reduce nesting `if-else` statement in your code, making your code more readable, and properly have a better performance as you avoided excess calulation as you end the function early.

Question 5

- I prefer composition over classical inheritance. Describing something by its features(e.g it can fly), is easier than descibing something by its category(e.g it is a bird). Classical inheritance would create problems like `banana-jungle`, `fragile-base` problem. A good Java developer will use composition in their classical inheritance as well through constructors, therefore I think composition is a better solution to avoid duplication.

Question 6

- I will use simple string search if there is no specific constraints for the data, for example searching for an item in todo list by its name.

- I will use regexp if there are certain condition in the search. For example, searching for a credit card number would have certain known constraints, and they cannot be expressed by a simple string search.

- I will use a parser if the logic of matching is very complicated. For example when I try to turn code from string to AST for transformation(i.e. TreeSitter or PostCSS), I will be using parser. 

Question 7

- Dependency injection allow us to test our code independently, so that it is a unit test not integration test. For example, if I am going to test the service layer of a REST API, with dependency injection, I can test it directly, and with whatever database I want. I can use a mock database, stub, or even a real database instance. The controller layer would be irrelavant

Question 8

- always keep a `try...catch` for code that might be failed, to avoid exception. Try to match all errors when the langauge allows it, like Rust

Question 9

- Depends on what that built files might be. If the source of that artifect will be changed in that project, it should not be check-in in version control, as it is a derived result, and by your source should already be able to generate it.

- You might want to check in some built files, if you are not going to change its source in your project, and you want to make sure the same version is being used across teams. For example, a `gradlew` binary is provided and checked in version control for all Java Spring Boot project, so that all developers will be using the same version of Gradle for building the project.

Question 10

- You would want to use JSON column if that data doesn't have any relationship with other data in your database/warehouse

- You would want to use normalized form, if that data has relationship with other data in the database

Question 11

- I would use store procedure to keep the integrity of my data, as it would be faster than executing another query from backend. For example, if I am using database to save up generated authorization code of OAuth2 authorization code flow, I will create a store procedure to remove code that has been expired after insert, so that I can keep my table small.

Question 12

- You should not rely upon an ORM, if you have to write a lot of specific SQL query. ORM can only handle generic query(like CRUD) for you.

Question 13

Spread operator in Javascript

```javascript
const defaultOpts = {
    featureA: false,
    featureB: false,
}

const setup = (opts) => {
    const overridden = {
        ...defaultOpts,
        ...opts
    }

    // Do something with that overriden options here
}
```

Question 14

Fluid design. Use `rem` for all values, and then only update `font-size` for `html` with media queries

Question 15

- Use JSON as the request/response body for REST-API

- Send JSON as string from a REST-API server to a WebSocket broadcaster, and then parse and execute certain action based on the received messsage in Client(JSON-RPC)
