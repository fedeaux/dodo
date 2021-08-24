export default {
  attributes: {
    id: {
      name: "id",
      type: "integer",
      writeable: false,
      default: null,
    },
    day: {
      name: "day",
      type: "date",
      writeable: true,
      default: null,
    },
    wokeupAt: {
      name: "wokeupAt",
      type: "datetime",
      writeable: true,
      default: null,
    },
    turnedOffAt: {
      name: "turnedOffAt",
      type: "datetime",
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
  ],
  enums: {
  },
}
