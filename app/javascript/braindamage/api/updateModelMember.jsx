export default async function updateModelMember(path, Model, modelParams = {}) {
  const idParamName = `${Model.singularCamelName}Id`;
  const attributesParamName = `${Model.singularCamelName}Attributes`;
  const parameterizedPath = path.replace(
    `:${idParamName}`,
    modelParams[idParamName]
  );

  return fetch(parameterizedPath, {
    method: "put",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      [Model.singularCamelName]: modelParams[attributesParamName],
    }),
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      const instance = new Model(data[Model.singularCamelName]);
      return { ...data, [Model.singularCamelName]: instance };
    });
}
