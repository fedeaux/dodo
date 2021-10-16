import { BraindamageApiContext } from "braindamage/api/provider";

import getModelCollection from 'braindamage/api/getModelCollection';
import getModelMember from 'braindamage/api/getModelMember';
import createModelMember from 'braindamage/api/createModelMember';
import destroyModelMember from 'braindamage/api/destroyModelMember';
import updateModelMember from 'braindamage/api/updateModelMember';

import useQuery from 'braindamage/api/useQuery';
import useWrite from 'braindamage/api/useWrite';

import Day from 'models/day';
import Dodoable from 'models/dodoable';
import Dodone from 'models/dodone';

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

export function useApiDodones() {
  const queryCacheKey = '/api/dodones';

  return useQuery(queryCacheKey, getModelCollection, [queryCacheKey, Dodone]);
}

export function useApiDodone(dodoneId) {
  const queryCacheKey = `/api/dodones/${dodoneId}`;

  return useQuery(queryCacheKey, getModelMember, [queryCacheKey, Dodone]);
}

export function useApiUpdateDay() {
  const { write: update, ...rest } = useWrite(updateModelMember, ['/api/days/:dayId', Day]);

  return { update, ...rest };
}

export function useApiUpdateDodoable() {
  const { write: update, ...rest } = useWrite(updateModelMember, ['/api/dodoables/:dodoableId', Dodoable]);

  return { update, ...rest };
}

export function useApiUpdateDodone() {
  const { write: update, ...rest } = useWrite(updateModelMember, ['/api/dodones/:dodoneId', Dodone]);

  return { update, ...rest };
}

export function useApiCreateDay() {
  const { write: create, ...rest } = useWrite(createModelMember, ['/api/days', Day]);

  return { create, ...rest };
}

export function useApiCreateDodoable() {
  const { write: create, ...rest } = useWrite(createModelMember, ['/api/dodoables', Dodoable]);

  return { create, ...rest };
}

export function useApiCreateDodone() {
  const { write: create, ...rest } = useWrite(createModelMember, ['/api/dodones', Dodone]);

  return { create, ...rest };
}

export function useApiDestroyDay() {
  const { write: destroy, ...rest } = useWrite(destroyModelMember, ['/api/days/:dayId', Day]);

  return { destroy, ...rest };
}

export function useApiDestroyDodoable() {
  const { write: destroy, ...rest } = useWrite(destroyModelMember, ['/api/dodoables/:dodoableId', Dodoable]);

  return { destroy, ...rest };
}

export function useApiDestroyDodone() {
  const { write: destroy, ...rest } = useWrite(destroyModelMember, ['/api/dodones/:dodoneId', Dodone]);

  return { destroy, ...rest };
}
