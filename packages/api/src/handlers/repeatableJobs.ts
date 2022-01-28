import { BaseAdapter } from '../queueAdapters/base';
import {
  BullBoardRequest,
  ControllerHandlerReturnType,
} from '../../typings/app';
import { queueProvider } from '../providers/queue';

async function repeatableJobs(
  _req: BullBoardRequest,
  queue: BaseAdapter
): Promise<ControllerHandlerReturnType> {
  const repeatableJobs = await queue.getRepeatableJobs();

  return {
    status: 200,
    body: repeatableJobs,
  };
}

export const repeatableJobsHandler = queueProvider(repeatableJobs, {
  skipReadOnlyModeCheck: true,
});