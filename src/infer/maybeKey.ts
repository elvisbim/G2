import { InferComponent as IC, InferValue } from '../runtime';
import { composeTransform } from './utils';

export type MaybeKeyOptions = Record<string, never>;

const inferStatistic: InferValue['transform'] = (indexedValue, statistic) => {
  if (statistic.find(({ type }) => type === 'key')) return statistic;
  const { value } = indexedValue;
  const { key: K } = value;
  if (K !== undefined) return statistic;
  return [...statistic, { type: 'key' }];
};

/**
 * Add key for each mark.
 */
export const MaybeKey: IC<MaybeKeyOptions> = () => {
  return ({ encode, transform }) => ({
    encode,
    transform: composeTransform(transform, inferStatistic),
  });
};

MaybeKey.props = {};
