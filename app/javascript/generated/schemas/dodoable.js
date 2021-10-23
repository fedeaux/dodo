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
    nature: {
      name: "nature",
      type: "string",
      writeable: true,
      default: "0",
    },
    lastDodoneDayId: {
      name: "lastDodoneDayId",
      type: "integer",
      writeable: true,
      default: null,
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
    aboutTime: {
      name: "aboutTime",
      type: "string",
      writeable: true,
      default: "0",
    },
    isDodoneToday: {
      name: "isDodoneToday",
      type: "boolean",
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
    nature: {
      name: "nature",
      valueMap: {
        other: 0,
        independent: 1,
        habit: 2,
      },
      options: {
      },
    },
    aboutTime: {
      name: "aboutTime",
      valueMap: {
        chronometrable: 0,
        durable: 1,
        instantaneous: 2,
      },
      options: {
      },
    },
  },
}
