import { getTime } from 'date-fns';
import Model from "braindamage/model";
import DodoableSchema from 'generated/schemas/dodoable';

class Dodoable extends Model {
  static schema = DodoableSchema;

  // Fill-in your attribute overrides
  static attributesDefinitions() {
    return {};
  }

  get rank() {
    if(this.isDodoneToday) {
      return getTime(this.lastDodone.startedAt);
    }

    return Number.MAX_VALUE;
  }

  buildDodone({ day }) {
    const Dodone = this.constructor.models['Dodone'];

    return new Dodone({
      dayId: day.id,
      dodoableId: this.id,
      fields: Object.values(this.fields)
        .map((field) => {
          return { value: field.default, ...field };
        })
        .reduce((fields, field) => {
          return { ...fields, [field.name]: field };
        }, {}),
    })
  }
}

export default Dodoable.define();
