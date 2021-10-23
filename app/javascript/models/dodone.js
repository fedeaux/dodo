import { getTime } from 'date-fns';
import { humanize } from 'inflected';
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

  get useVisibleStatuses() {
    return this.statuses.slice(1);
  }

  get statusesAsOptions() {
    return this.useVisibleStatuses.map((status) => {
      return { label: humanize(status), value: status };
    })
  }
}

export default Dodone.define();
