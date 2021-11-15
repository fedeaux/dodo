export default {
  modelName: 'Day',
  attributes: {
      createdAt: {
      name: "createdAt",
      type: "datetime",
      writeable: true,
      default: null,
    },
      day: {
      name: "day",
      type: "date",
      writeable: true,
      default: null,
    },
      dodones: {
      name: "dodones",
      type: "has_many",
      writeable: true,
      default: null,
      model: "Dodone",
    },
      id: {
      name: "id",
      type: "integer",
      writeable: false,
      default: null,
    },
      scheduleDodones: {
      name: "scheduleDodones",
      type: "has_many",
      writeable: true,
      default: null,
      model: "Dodone",
    },
      turnedOffAt: {
      name: "turnedOffAt",
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
      wokeupAt: {
      name: "wokeupAt",
      type: "datetime",
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
