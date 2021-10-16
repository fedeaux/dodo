export default {
  attributes: {
    id: {
      name: "id",
      type: "integer",
      writeable: false,
      default: null,
    },
    name: {
      name: "name",
      type: "string",
      writeable: true,
      default: null,
    },
    slug: {
      name: "slug",
      type: "string",
      writeable: true,
      default: null,
    },
    executor: {
      name: "executor",
      type: "jsonb",
      writeable: true,
      default: "{}",
    },
    trigger: {
      name: "trigger",
      type: "jsonb",
      writeable: true,
      default: "{}",
    },
    fields: {
      name: "fields",
      type: "jsonb",
      writeable: true,
      default: "{}",
    },
    userId: {
      name: "userId",
      type: "integer",
      writeable: true,
      default: null,
    },
    createdAt: {
      name: "createdAt",
      type: "datetime",
      writeable: true,
      default: null,
    },
    updatedAt: {
      name: "updatedAt",
      type: "datetime",
      writeable: true,
      default: null,
    },
  },
  names: {
    singularUnderscore: "dodoable",
    pluralUnderscore: "dodoables",
    singularDash: "dodoable",
    pluralDash: "dodoables",
    singularCamel: "dodoable",
    pluralCamel: "dodoables",
    singularClass: "Dodoable",
    pluralClass: "Dodoables",
  },
  validators: [
    {
      className: "ActiveRecord::Validations::PresenceValidator",
      options: {
        message: "required",
      },
      attributes: [
        "user",
      ],
    },
  ],
  enums: {
  },
}
