import { getTime } from 'date-fns';
import Model from "braindamage/model";
import DodoneSchema from 'generated/schemas/dodone';

class Dodone extends Model {
  static schema = DodoneSchema;

  // Fill-in your attribute overrides
  static attributesDefinitions() {
    return {};
  }

  get dateRank() {
    if(this.startedAt) {
      return this.startedAt;
    }

    if(this.scheduledTo) {
      return this.scheduledTo;
    }

    return null;
  }

  get timeRank() {
    if(this.dateRank) {
      return getTime(this.dateRank);
    }

    return 0;
  }
}

export default Dodone.define();
