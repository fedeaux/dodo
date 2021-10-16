export default {
  attributes: {
    id: {
      name: "id",
      type: "integer",
      writeable: false,
      default: null,
    },
    dodoableId: {
      name: "dodoableId",
      type: "integer",
      writeable: true,
      default: null,
    },
    dayId: {
      name: "dayId",
      type: "integer",
      writeable: true,
      default: null,
    },
    startedAt: {
      name: "startedAt",
      type: "datetime",
      writeable: true,
      default: null,
    },
    finishedAt: {
      name: "finishedAt",
      type: "datetime",
      writeable: true,
      default: null,
    },
    fields: {
      name: "fields",
      type: "jsonb",
      writeable: true,
      default: "{}",
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
    singularUnderscore: "dodone",
    pluralUnderscore: "dodones",
    singularDash: "dodone",
    pluralDash: "dodones",
    singularCamel: "dodone",
    pluralCamel: "dodones",
    singularClass: "Dodone",
    pluralClass: "Dodones",
  },
  validators: [
    {
      className: "ActiveRecord::Validations::PresenceValidator",
      options: {
        message: "required",
      },
      attributes: [
        "dodoable",
      ],
    },
    {
      className: "ActiveRecord::Validations::PresenceValidator",
      options: {
        message: "required",
      },
      attributes: [
        "day",
      ],
    },
  ],
  enums: {
  },
}
