import { KeyOf } from '@bull-board/api/typings/utils';
import { STATUSES } from '@bull-board/api/src/constants/statuses';

export const STATUS_LIST: Readonly<KeyOf<typeof STATUSES>> = [
  STATUSES.dashboard as any,
  STATUSES.latest as any,
  STATUSES.active,
  STATUSES.waiting,
  STATUSES.completed,
  STATUSES.failed,
  STATUSES.delayed,
  STATUSES.paused,
] as const;
