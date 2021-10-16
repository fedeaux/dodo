import Model from "braindamage/model";
import DodoneSchema from 'generated/schemas/dodone';

class Dodone extends Model {
  static schema = DodoneSchema;

  // Fill-in your attribute overrides
  static attributesDefinitions() {
    return {};
  }
}

export default Dodone.define();
