export default {
  attributes: {
    id: {
      name: "id",
      type: "integer",
      writeable: false,
      default: null,
    },
    dayId: {
      name: "dayId",
      type: "integer",
      writeable: true,
      default: null,
    },
    dodoableId: {
      name: "dodoableId",
      type: "integer",
      writeable: true,
      default: null,
    },
    order: {
      name: "order",
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
    singularUnderscore: "day_dodoable",
    pluralUnderscore: "day_dodoables",
    singularDash: "day-dodoable",
    pluralDash: "day-dodoables",
    singularCamel: "dayDodoable",
    pluralCamel: "dayDodoables",
    singularClass: "DayDodoable",
    pluralClass: "DayDodoables",
  },
  validators: [
    {
      className: "ActiveRecord::Validations::PresenceValidator",
      options: {
        message: "required",
      },
      attributes: [
        "day",
      ],
    },
    {
      className: "ActiveRecord::Validations::PresenceValidator",
      options: {
        message: "required",
      },
      attributes: [
        "dodoable",
      ],
    },
  ],
  enums: {
  },
}
