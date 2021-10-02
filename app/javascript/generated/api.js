import { useContext } from "react";
import { BraindamageApiContext } from "braindamage/api/provider";

import getModelCollection from 'braindamage/api/getModelCollection';
import getModelMember from 'braindamage/api/getModelMember';
import updateModelMember from 'braindamage/api/updateModelMember';
import useQuery from 'braindamage/api/useQuery';
import useWrite from 'braindamage/api/useWrite';

import Day from 'models/day';

export function useApiDays() {
  const queryCacheKey = '/api/days';

  return useQuery(queryCacheKey, getModelCollection, [queryCacheKey, Day]);
}

export function useApiDay(dayId) {
  const queryCacheKey = `/api/days/${dayId}`;

  return useQuery(queryCacheKey, getModelMember, [queryCacheKey, Day]);
}

export function useApiUpdateDay() {
  const { write: update, ...rest } = useWrite(updateModelMember, ['/api/days/:dayId', Day]);

  return { update, ...rest };
}
