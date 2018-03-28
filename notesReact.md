# Graphql Client

- [Apollo-client-present](https://www.npmjs.com/package/apollo-client-preset) - this is a bundle of several useful packages when using Apollo.
- [React-apollo](https://www.npmjs.com/package/react-apollo) - apollo client core.
- [Graphql-tag](https://www.npmjs.com/package/graphql-tag) - graphql parses and printer.
- [Graphql](https://www.npmjs.com/package/graphql) - graphql core.

- [Graphql-request](https://github.com/graphcool/graphql-request) - very basic graphql client.

- [Flow](https://flow.org/en/docs/config/) - static type checker for JS
- [eslint](https://eslint.org/) - linting utility JS

# Different component types

https://www.peterbe.com/plog/4-different-kinds-of-react-component-styles

1) Default component class
2) Old style `createClass` component
3) Stateless Function component
4) Presentational component

# Resources

- [Graphql React Apollo Tute](https://www.howtographql.com/react-apollo/0-introduction/)

- [Best way to get key out of object](https://stackoverflow.com/questions/6268679/best-way-to-get-the-key-of-a-key-value-javascript-object)

- [Bootstrap 4](https://getbootstrap.com/docs/4.0/getting-started/introduction/)

# HELP


### FORM DATA
- Another way to iterate through form data and create an object:
```
function stringifyFormData(fd) {
  const data = {};
  for (let key of fd.keys()) {
    data[key] = fd.get(key);
    }
  return JSON.stringify(data, null, 2);
}
```
With the form data coming from this: `const data = new FormData(form);`

### Validation of form data

- [ReactFormValidation](https://moduscreate.com/blog/reactjs-form-validation-approaches/)
- [Use this for validation](https://github.com/tkrotoff/react-form-with-constraints) and [bootstrap4 version]()
  - NOTE: I had to change the `Bootstrap4.js` file to get it compatible with the latest bootstrap. It was a simple change that I followed from [here](https://github.com/tkrotoff/react-form-with-constraints/pull/18/commits/d191f8bfbd0420128d8c81edc700e5620a604598). The file I changed is in the `react-form-with-constraints-bootstrap4/lib/Bootstrap4.js`. It is kind of annoying cause the creator wouldn't merge a PR to update it to use BS4, the PR author made it backwards compatible as well.
- [A way to do](https://learnetto.com/blog/how-to-do-simple-form-validation-in-reactjs) it differently. The module I'm currently using is inspire from this.

### Extra formy stuff

- How to create a [text area with a form](https://stackoverflow.com/questions/18432376/what-does-for-attribute-do-in-html-label-tag#18432439).

### Routing between pages

- [React Router v4](https://reacttraining.com/react-router/web/example/auth-workflow) - this is what I'm to protect the pages from inauthentication. It's another layer of protection. I can probably use this for multiple protected pages. Just slot the PrivateRoute in and use different components.

# NOTES

## Security

### Hashing client side

I read a [good post on SO security](https://security.stackexchange.com/questions/8596/https-security-should-password-be-hashed-server-side-or-client-side) about the pointlessness in hashing client side. Basically, it is done if the server may be perceived as dangerous. A HTTPS tunnel is basically enough to secure from a MITM attack.

### Javascript spread syntax

- `...` - this will make an iterable such an array or string and break it apart to its iterable elements when entered as argument in of function call or an object can be expanded into another object, such as when using `Object.clone()`.

### React Router 4 - Redirection issues

I was having an annoying problem with the redirection after signin. Originally I put the call to `usernameCall()` in `App` after setting the state of `redirect: true, username: response.username` in `SignInPage`. However, that wouldn't immediately redirect the user to the profile page. I wasn't sure why. I think I know now. I switched the order around so `usernameCall()` is called first. This sets changes the username in the `App` to the current user name and the redirect to true. Then it goes back into the function and runs set state, and actually renders the resulting state. According to the [docs](https://reactjs.org/docs/faq-state.html#what-does-setstate-do) it batch updates the DOM. If both parent and child called `setState()`, the child isn't rendered twice but once because the state updates are "flushed" out at the end of the event.

# PROBLEMS

### Babel-eslint - I was having a `type undefined error`, it  was solved by [this](https://github.com/eslint/eslint/issues/9767). Basically just `$ npm i babel-eslint@8.1.1`.

### Login - there may be an issue when logging in the first time. It doesn't log in the first time I start up the application. Well, it logs in, but it will not redirect it to the profile page.

# SOLVED

### Cookie - I was finally able to get the cookie to save into local storage by add this: `var corsOptions = {origin: 'http://localhost:3000',credentials: true // <-- REQUIRED backend setting };` to the cors function in the server and `credentials: 'include'`, to the Apollo client.

### Textarea - I had an issue with `<textarea>`. When I transitioned to the `<textarea>` input it would refresh into a while screen. I thought it had something to do with it doing a post request or someting to do with the form, but there was not nextwork requests but a get. I tried it loading first and it gave me something like `<textarea> can only have one child` error. It has something to do with there being multiple blocks of text in the form of a JS block and regular text. Once the JS block was taken out it was okay. It doesn't like any children in the text area. The `value` property will override any children.
