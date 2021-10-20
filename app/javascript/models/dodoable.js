import { getTime } from 'date-fns';
import Model from "braindamage/model";
import DodoableSchema from 'generated/schemas/dodoable';
import Dodone from "models/dodone";

class Dodoable extends Model {
  static schema = DodoableSchema;

  // Fill-in your attribute overrides
  static attributesDefinitions() {
    return {
      dodones: {
        type: "has_many",
        class: Dodone
      },
      beingTrackedDodone: {
        type: "belongs_to",
        class: Dodone,
      },
      lastDodone: {
        type: "belongs_to",
        class: Dodone,
      },
      todaysDodones: {
        type: "has_many",
        class: Dodone,
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
