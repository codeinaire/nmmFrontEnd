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

### Routing between pages

- [React Router v4](https://reacttraining.com/react-router/web/example/auth-workflow) - this is what I'm to protect the pages from inauthentication. It's another layer of protection. I can probably use this for multiple protected pages. Just slot the PrivateRoute in and use different components.

# NOTES

## Security

### Hashing client side

I read a [good post on SO security](https://security.stackexchange.com/questions/8596/https-security-should-password-be-hashed-server-side-or-client-side) about the pointlessness in hashing client side. Basically, it is done if the server may be perceived as dangerous. A HTTPS tunnel is basically enough to secure from a MITM attack.

### Javascript spread syntax

- `...` - this will make an iterable such an array or string and break it apart to its iterable elements when entered as argument in of function call or an object can be expanded into another object, such as when using `Object.clone()`.

# PROBLEMS

### Babel-eslint - I was having a `type undefined error`, it  was solved by [this](https://github.com/eslint/eslint/issues/9767). Basically just `$ npm i babel-eslint@8.1.1`.
