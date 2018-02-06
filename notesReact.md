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

# NOTES

## Security

### Hashing client side

I read a [good post on SO security](https://security.stackexchange.com/questions/8596/https-security-should-password-be-hashed-server-side-or-client-side) about the pointlessness in hashing client side. Basically, it is done if the server may be perceived as dangerous. A HTTPS tunnel is basically enough to secure from a MITM attack.

# PROBLEMS

### Babel-eslint - I was having a `type undefined error`, it  was solved by [this](https://github.com/eslint/eslint/issues/9767). Basically just `$ npm i babel-eslint@8.1.1`.
