export default {
  modelName: 'Dodoable',
  attributes: {
    aboutTime: {
      name: "aboutTime",
      type: "string",
      model: "string",
      writeable: true,
      default: "0",
    },
    beingTrackedDodone: {
      name: "beingTrackedDodone",
      type: "has_one",
      model: "Dodone",
      writeable: true,
      default: null,
    },
    createdAt: {
      name: "createdAt",
      type: "datetime",
      model: "string",
      writeable: true,
      default: null,
    },
    days: {
      name: "days",
      type: "has_many",
      model: "Day",
      writeable: true,
      default: null,
    },
    dodones: {
      name: "dodones",
      type: "has_many",
      model: "Dodone",
      writeable: true,
      default: null,
    },
    executor: {
      name: "executor",
      type: "jsonb",
      model: "string",
      writeable: true,
      default: "{}",
    },
    fields: {
      name: "fields",
      type: "jsonb",
      model: "string",
      writeable: true,
      default: "{}",
    },
    id: {
      name: "id",
      type: "integer",
      model: "string",
      writeable: false,
      default: null,
    },
    isDodoneToday: {
      name: "isDodoneToday",
      type: "boolean",
      model: "string",
      writeable: true,
      default: null,
    },
    isStatusable: {
      name: "isStatusable",
      type: "boolean",
      model: "string",
      writeable: true,
      default: null,
    },
    lastDodone: {
      name: "lastDodone",
      type: "has_one",
      model: "Dodone",
      writeable: true,
      default: null,
    },
    lastDodoneDay: {
      name: "lastDodoneDay",
      type: "belongs_to",
      model: "Day",
      writeable: true,
      default: null,
    },
    lastDodoneDayId: {
      name: "lastDodoneDayId",
      type: "integer",
      model: "string",
      writeable: true,
      default: null,
    },
    name: {
      name: "name",
      type: "string",
      model: "string",
      writeable: true,
      default: null,
    },
    nature: {
      name: "nature",
      type: "string",
      model: "string",
      writeable: true,
      default: "0",
    },
    slug: {
      name: "slug",
      type: "string",
      model: "string",
      writeable: true,
      default: null,
    },
    todaysDodones: {
      name: "todaysDodones",
      type: "has_many",
      model: "Dodone",
      writeable: true,
      default: null,
    },
    trigger: {
      name: "trigger",
      type: "jsonb",
      model: "string",
      writeable: true,
      default: "{}",
    },
    updatedAt: {
      name: "updatedAt",
      type: "datetime",
      model: "string",
      writeable: true,
      default: null,
    },
    user: {
      name: "user",
      type: "belongs_to",
      model: "User",
      writeable: true,
      default: null,
    },
    userId: {
      name: "userId",
      type: "integer",
      model: "string",
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
        scheduled: 0,
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
