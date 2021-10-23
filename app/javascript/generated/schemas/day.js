export default {
  modelName: 'Day',
  attributes: {
    createdAt: {
      name: "createdAt",
      type: "datetime",
      model: "string",
      writeable: true,
      default: null,
    },
    day: {
      name: "day",
      type: "date",
      model: "string",
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
    id: {
      name: "id",
      type: "integer",
      model: "string",
      writeable: false,
      default: null,
    },
    scheduleDodones: {
      name: "scheduleDodones",
      type: "has_many",
      model: "Dodone",
      writeable: true,
      default: null,
    },
    turnedOffAt: {
      name: "turnedOffAt",
      type: "datetime",
      model: "string",
      writeable: true,
      default: null,
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
    wokeupAt: {
      name: "wokeupAt",
      type: "datetime",
      model: "string",
      writeable: true,
      default: null,
    },
  },
  names: {
    singularUnderscore: "day",
    pluralUnderscore: "days",
    singularDash: "day",
    pluralDash: "days",
    singularCamel: "day",
    pluralCamel: "days",
    singularClass: "Day",
    pluralClass: "Days",
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
