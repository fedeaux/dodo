import Model from "braindamage/model";
import WeekSchema from 'generated/schemas/week';

class Week extends Model {
  static schema = WeekSchema;
  static modelName = 'Week';

  // Fill-in your attribute overrides
  static attributesDefinitions() {
    return {};
  }
}

export default Week.define();
