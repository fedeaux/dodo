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
}

export default Dodoable.define();
