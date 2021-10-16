import Model from "braindamage/model";
import DodoableSchema from 'generated/schemas/dodoable';
import Dodone from "models/dodone";

class Dodoable extends Model {
  static schema = DodoableSchema;

  // Fill-in your attribute overrides
  static attributesDefinitions() {
    return {
      dodones: {
        type: "belongs_to",
        class: Dodone
      }
    };
  }
}

export default Dodoable.define();
