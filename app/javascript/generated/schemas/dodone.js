export default {
  modelName: 'Dodone',
  attributes: {
      createdAt: {
      name: "createdAt",
      type: "datetime",
      writeable: true,
      default: null,
    },
      day: {
      name: "day",
      type: "belongs_to",
      writeable: true,
      default: null,
      model: "Day",
    },
      dayId: {
      name: "dayId",
      type: "integer",
      writeable: true,
      default: null,
    },
      dodoable: {
      name: "dodoable",
      type: "belongs_to",
      writeable: true,
      default: null,
      model: "Dodoable",
    },
      dodoableId: {
      name: "dodoableId",
      type: "integer",
      writeable: true,
      default: null,
    },
      fields: {
      name: "fields",
      type: "jsonb",
      writeable: true,
      default: "{}",
    },
      finishedAt: {
      name: "finishedAt",
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
      isBeingTracked: {
      name: "isBeingTracked",
      type: "string",
      writeable: true,
      default: null,
    },
      isFinished: {
      name: "isFinished",
      type: "string",
      writeable: true,
      default: null,
    },
      isStarted: {
      name: "isStarted",
      type: "string",
      writeable: true,
      default: null,
    },
      isStatusable: {
      name: "isStatusable",
      type: "string",
      writeable: true,
      default: null,
    },
      scheduledTo: {
      name: "scheduledTo",
      type: "datetime",
      writeable: true,
      default: null,
    },
      startedAt: {
      name: "startedAt",
      type: "datetime",
      writeable: true,
      default: null,
    },
      status: {
      name: "status",
      type: "string",
      writeable: true,
      default: "unstatusable",
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
    status: {
      name: "status",
      valueMap: {
        unstatusable: 0,
        pending: 1,
        succeeded: 2,
        questionable: 3,
        failed: 4,
        skipped: 5,
      },
      options: {
      },
    },
  },
}
