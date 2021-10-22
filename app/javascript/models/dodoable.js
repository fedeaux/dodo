import { getTime } from 'date-fns';
import Model from "braindamage/model";
import DodoableSchema from 'generated/schemas/dodoable';

class Dodoable extends Model {
  static schema = DodoableSchema;
  static modelName = 'Dodoable';

  // Fill-in your attribute overrides
  static attributesDefinitions() {
    return {
      dodones: {
        type: "has_many",
        model: 'Dodone'
      },
      beingTrackedDodone: {
        type: "belongs_to",
        model: 'Dodone',
      },
      lastDodone: {
        type: "belongs_to",
        model: 'Dodone',
      },
      todaysDodones: {
        type: "has_many",
        model: 'Dodone',
        default: []
      }
    };
  }

  get rank() {
    if(this.isDodoneToday) {
      return getTime(this.lastDodone.startedAt);
    }

    return Number.MAX_VALUE;
  }
}

export default Dodoable.define();
