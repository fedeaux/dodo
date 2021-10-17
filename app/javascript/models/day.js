import Model from "braindamage/model";
import DaySchema from 'generated/schemas/day';
import Dodoable from "models/dodoable";

class Day extends Model {
  static schema = DaySchema;

  // Fill-in your attribute overrides
  static attributesDefinitions() {
    return {
      dodoables: {
        type: "belongs_to",
        class: Dodoable
      }
    };
  }
}

export default Day.define();
