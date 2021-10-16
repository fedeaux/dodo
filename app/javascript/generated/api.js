import { BraindamageApiContext } from "braindamage/api/provider";

import getModelCollection from 'braindamage/api/getModelCollection';
import getModelMember from 'braindamage/api/getModelMember';
import updateModelMember from 'braindamage/api/updateModelMember';
import useQuery from 'braindamage/api/useQuery';
import useWrite from 'braindamage/api/useWrite';

import Day from 'models/day';
import Dodoable from 'models/dodoable';

export function useApiDays() {
  const queryCacheKey = '/api/days';

  return useQuery(queryCacheKey, getModelCollection, [queryCacheKey, Day]);
}

export function useApiDay(dayId) {
  const queryCacheKey = `/api/days/${dayId}`;

  return useQuery(queryCacheKey, getModelMember, [queryCacheKey, Day]);
}

export function useApiDodoables() {
  const queryCacheKey = '/api/dodoables';

  return useQuery(queryCacheKey, getModelCollection, [queryCacheKey, Dodoable]);
}

export function useApiDodoable(dodoableId) {
  const queryCacheKey = `/api/dodoables/${dodoableId}`;

  return useQuery(queryCacheKey, getModelMember, [queryCacheKey, Dodoable]);
}

export function useApiUpdateDay() {
  const { write: update, ...rest } = useWrite(updateModelMember, ['/api/days/:dayId', Day]);

  return { update, ...rest };
}

export function useApiUpdateDodoable() {
  const { write: update, ...rest } = useWrite(updateModelMember, ['/api/dodoables/:dodoableId', Dodoable]);

  return { update, ...rest };
}
