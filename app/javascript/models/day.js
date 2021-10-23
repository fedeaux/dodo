import Model from "braindamage/model";
import DaySchema from 'generated/schemas/day';

class Day extends Model {
  static schema = DaySchema;

  // Fill-in your attribute overrides
  static attributesDefinitions() {
    return {};
  }
}

export default Day.define();
