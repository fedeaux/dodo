import Model from "braindamage/model";
import DayDodoableSchema from 'generated/schemas/day_dodoable';

class DayDodoable extends Model {
  static schema = DayDodoableSchema;

  // Fill-in your attribute overrides
  static attributesDefinitions() {
    return {};
  }
}

export default DayDodoable.define();
