import { getTime } from 'date-fns';
import Model from "braindamage/model";
import DodoneSchema from 'generated/schemas/dodone';

class Dodone extends Model {
  static schema = DodoneSchema;

  // Fill-in your attribute overrides
  static attributesDefinitions() {
    return {
      dodoable: {
        type: "belongs_to",
        model: 'Dodoable'
      }
    };
  }

  get timeRank() {
    if(this.isStarted) {
      return getTime(this.startedAt);
    }

    if(this.scheduledTo) {
      return getTime(this.scheduledTo);
    }

    return 0;
  }
}

export default Dodone.define();
