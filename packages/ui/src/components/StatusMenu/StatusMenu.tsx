import React from 'react';
import { NavLink, useRouteMatch } from 'react-router-dom';
import s from './StatusMenu.module.css';
import { AppQueue } from '@bull-board/api/typings/app';
import { STATUS_LIST } from '../../constants/status-list';
import { Store } from '../../hooks/useStore';
import { QueueDropdownActions } from '../QueueDropdownActions/QueueDropdownActions';

export const StatusMenu = ({ queue, actions }: { queue: AppQueue; actions: Store['actions'] }) => {
  const { url } = useRouteMatch();

  return (
    <div className={s.statusMenu}>
      {STATUS_LIST.map((status) => {
        const displayStatus = status.toLocaleUpperCase();
        return (
          <NavLink
            to={`${url}?status=${status}`}
            activeClassName={s.active}
            isActive={(_path, { search }) => {
              const query = new URLSearchParams(search);
              return query.get('status') === status;
            }}
            key={`${queue.name}-${status}`}
          >
            <span title={displayStatus}>{displayStatus}</span>
            {queue.counts[status] > 0 && <span className={s.badge}>{queue.counts[status]}</span>}
          </NavLink>
        );
      })}
      <div>
        <QueueDropdownActions queue={queue} actions={actions} />
      </div>
    </div>
  );
};
