import Day from 'models/day';

import getModelCollection from 'braindamage/api/getModelCollection';
import getModelMember from 'braindamage/api/getModelMember';
import useQuery from 'braindamage/api/useQuery';

export function useApiDays() {
  return useQuery(getModelCollection, ['/api/days', Day]);
}

export function useApiDay(dayId) {
  return useQuery(getModelMember, [`/api/days/${dayId}`, Day]);
}
