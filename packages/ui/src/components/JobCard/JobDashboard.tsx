import React, { useCallback, useEffect, useState } from 'react';
import s from './JobCard.module.css';
import { AppQueue, Status } from '@bull-board/api/typings/app';
// import InputLabel from '@mui/material/InputLabel';
// import FormControl from '@mui/material/FormControl';
// import NativeSelect from '@mui/material/NativeSelect';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import Grid from '@mui/material/Grid';
import { JobInformation } from 'bull';
import { config } from '../../config';
import axios from 'axios';

interface JobDashboardProps {
  queues: AppQueue[] | undefined;
  status?: Status;
  actions: {
    getRepeatableJobs: () => Promise<JobInformation[]>;
  };
}

export const JobDashboard = ({ queues, actions }: JobDashboardProps) => {

  const [isLoading, setIsLoading] = useState(true);
  const [repeatableJobs, setRepeatableJobs] = useState<JobInformation[] | undefined>();

  const getRepeatableJobsCallback = useCallback(async () => {
    setIsLoading(true);
    const repeatableJobs = await actions.getRepeatableJobs();
    setRepeatableJobs(repeatableJobs)
    setIsLoading(false);
  }, []);

  useEffect(() => {
    getRepeatableJobsCallback();
  }, []);

  console.log(isLoading, repeatableJobs, queues, config);

  return (<div className={s.containerDashboard}>

    {!isLoading ? (
      repeatableJobs && repeatableJobs.length > 0 ? (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <span>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Code name</TableCell>
                      <TableCell align="right">Cron</TableCell>
                      <TableCell align="right">Next (timestamp)</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {repeatableJobs.map((repeatableJob) => (
                      <TableRow
                        key={repeatableJob.name}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell component="th" scope="row">
                          {repeatableJob.name}
                        </TableCell>
                        <TableCell align="right">{repeatableJob.cron}</TableCell>
                        <TableCell align="right">{repeatableJob.next}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </span>
          </Grid>
        </Grid>) : (<span>No scheduled jobs</span>)) : (<span>Loading</span>)}

    {config && config.jobTrigger && config.jobTrigger.length > 0 ? (
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <span>
            {config.jobTrigger.map((trigger: any) => (

              <Button variant="contained" onClick={() => {
                axios.get(trigger.value);
              } 
            }
                endIcon={<SendIcon />}>
                {trigger.name}
              </Button>
            ))}
          </span>
        </Grid>
      </Grid>
    ) : (<></>)};

  </div>);
};
