export default {
  modelName: 'Dodone',
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
      type: "belongs_to",
      model: "Day",
      writeable: true,
      default: null,
    },
    dayId: {
      name: "dayId",
      type: "integer",
      model: "string",
      writeable: true,
      default: null,
    },
    dodoable: {
      name: "dodoable",
      type: "belongs_to",
      model: "Dodoable",
      writeable: true,
      default: null,
    },
    dodoableId: {
      name: "dodoableId",
      type: "integer",
      model: "string",
      writeable: true,
      default: null,
    },
    fields: {
      name: "fields",
      type: "jsonb",
      model: "string",
      writeable: true,
      default: "{}",
    },
    finishedAt: {
      name: "finishedAt",
      type: "datetime",
      model: "string",
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
    isBeingTracked: {
      name: "isBeingTracked",
      type: "string",
      model: "string",
      writeable: true,
      default: null,
    },
    isFinished: {
      name: "isFinished",
      type: "string",
      model: "string",
      writeable: true,
      default: null,
    },
    isStarted: {
      name: "isStarted",
      type: "string",
      model: "string",
      writeable: true,
      default: null,
    },
    scheduledTo: {
      name: "scheduledTo",
      type: "datetime",
      model: "string",
      writeable: true,
      default: null,
    },
    startedAt: {
      name: "startedAt",
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
