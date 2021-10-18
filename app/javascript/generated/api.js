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

export function useApiDays(query) {
  const endpoint = '/api/days';
  const queryCacheKey = `${endpoint}/${JSON.stringify(query)}`;

  return useQuery(queryCacheKey, getModelCollection, [endpoint, Day, query]);
}

export function useApiDodoables(query) {
  const endpoint = '/api/dodoables';
  const queryCacheKey = `${endpoint}/${JSON.stringify(query)}`;

  return useQuery(queryCacheKey, getModelCollection, [endpoint, Dodoable, query]);
}

export function useApiDodones(query) {
  const endpoint = '/api/dodones';
  const queryCacheKey = `${endpoint}/${JSON.stringify(query)}`;

  return useQuery(queryCacheKey, getModelCollection, [endpoint, Dodone, query]);
}

export function useApiDay(dayId) {
  const endpoint = `/api/days/${dayId}`;
  const queryCacheKey = endpoint;

  return useQuery(queryCacheKey, getModelMember, [endpoint, Day, dayId]);
}

export function useApiDodoable(dodoableId) {
  const endpoint = `/api/dodoables/${dodoableId}`;
  const queryCacheKey = endpoint;

  return useQuery(queryCacheKey, getModelMember, [endpoint, Dodoable, dodoableId]);
}

export function useApiDodone(dodoneId) {
  const endpoint = `/api/dodones/${dodoneId}`;
  const queryCacheKey = endpoint;

  return useQuery(queryCacheKey, getModelMember, [endpoint, Dodone, dodoneId]);
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
