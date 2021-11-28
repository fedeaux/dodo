export default {
  modelName: 'Week',
  attributes: {
      createdAt: {
      name: "createdAt",
      type: "datetime",
      writeable: true,
      default: null,
    },
      endDay: {
      name: "endDay",
      type: "datetime",
      writeable: true,
      default: null,
    },
      id: {
      name: "id",
      type: "integer",
      writeable: false,
      default: null,
    },
      startDay: {
      name: "startDay",
      type: "date",
      writeable: true,
      default: null,
    },
      statistics: {
      name: "statistics",
      type: "jsonb",
      writeable: true,
      default: null,
    },
      updatedAt: {
      name: "updatedAt",
      type: "datetime",
      writeable: true,
      default: null,
    },
      userId: {
      name: "userId",
      type: "integer",
      writeable: true,
      default: null,
    },
  },
  names: {
    singularUnderscore: "week",
    pluralUnderscore: "weeks",
    singularDash: "week",
    pluralDash: "weeks",
    singularCamel: "week",
    pluralCamel: "weeks",
    singularClass: "Week",
    pluralClass: "Weeks",
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
