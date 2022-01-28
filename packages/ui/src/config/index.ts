import { prod } from './prod';
import { dev } from './dev';
import { common } from './default';

const configFormEnv = (env: any): any => {
  switch (env) {
    case 'production':
      return { ...(prod || {}), env: 'PROD' };
    case 'test':
      return { ...(dev || {}), env: 'TEST' };
    default:
      return { ...common, env: 'DEV' };
  }
};

export const config = configFormEnv(process.env.CONFIG_FILE);
