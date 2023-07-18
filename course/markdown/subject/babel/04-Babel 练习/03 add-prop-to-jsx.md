https://www.johno.com/add-a-prop-to-jsx-elements-with-babel

```js
export default (api) => {
  const { types: t } = api;

  return {
    visitor: {
      JSXOpeningElement(path) {
        const existingProp = path.node.attributes.find(
          (node) => node.name && node.name.name === "favoriteColor"
        );

        if (existingProp) {
          existingProp.node.value.value === "tomato";
          return;
        }

        const newProp = t.jSXAttribute(
          t.jSXIdentifier("favoriteColor"),
          t.stringLiteral("tomato")
        );

        path.node.attributes.push(newProp);
      },
    },
  };
};
```
