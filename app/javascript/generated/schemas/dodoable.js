export default {
  modelName: 'Dodoable',
  attributes: {
      aboutTime: {
      name: "aboutTime",
      type: "string",
      writeable: true,
      default: "chronometrable",
    },
      active: {
      name: "active",
      type: "boolean",
      writeable: true,
      default: "true",
    },
      beingTrackedDodone: {
      name: "beingTrackedDodone",
      type: "has_one",
      writeable: true,
      default: null,
      model: "Dodone",
    },
      createdAt: {
      name: "createdAt",
      type: "datetime",
      writeable: true,
      default: null,
    },
      days: {
      name: "days",
      type: "has_many",
      writeable: true,
      default: null,
      model: "Day",
    },
      dodones: {
      name: "dodones",
      type: "has_many",
      writeable: true,
      default: null,
      model: "Dodone",
    },
      executor: {
      name: "executor",
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
      id: {
      name: "id",
      type: "integer",
      writeable: false,
      default: null,
    },
      isDodoneToday: {
      name: "isDodoneToday",
      type: "boolean",
      writeable: true,
      default: null,
    },
      lastDodone: {
      name: "lastDodone",
      type: "has_one",
      writeable: true,
      default: null,
      model: "Dodone",
    },
      lastDodoneDay: {
      name: "lastDodoneDay",
      type: "belongs_to",
      writeable: true,
      default: null,
      model: "Day",
    },
      lastDodoneDayId: {
      name: "lastDodoneDayId",
      type: "integer",
      writeable: true,
      default: null,
    },
      name: {
      name: "name",
      type: "string",
      writeable: true,
      default: null,
    },
      nature: {
      name: "nature",
      type: "string",
      writeable: true,
      default: "scheduled",
    },
      slug: {
      name: "slug",
      type: "string",
      writeable: true,
      default: null,
    },
      todaysDodones: {
      name: "todaysDodones",
      type: "has_many",
      writeable: true,
      default: null,
      model: "Dodone",
    },
      trigger: {
      name: "trigger",
      type: "jsonb",
      writeable: true,
      default: "{}",
    },
      updatedAt: {
      name: "updatedAt",
      type: "datetime",
      writeable: true,
      default: null,
    },
      user: {
      name: "user",
      type: "belongs_to",
      writeable: true,
      default: null,
      model: "User",
    },
      userId: {
      name: "userId",
      type: "integer",
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
        nested: 3,
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
