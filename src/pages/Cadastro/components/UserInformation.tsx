import React, { useEffect, useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Box, Grid, MenuItem, TextField, Button } from '@mui/material';
import ButtonFormUser from './ButtonFormUser';
import { IAddTaskDefault, update } from '../../../store/slices/userSlice';
import AzureService from '../../../services/AzureService';
import { ProjetoModel } from '../../../repository/models/ProjetoModel';
import { TimeModel } from '../../../repository/models/TimeModel';
import { SprintModel } from '../../../repository/models/SprintModel';
import { AUTH_KEY, ORGANIZACAO } from '../../../shared/constants/Environment';

const UserInformation: React.FC = () => {
  const isFirstRender = useRef(true);

  const dispatch = useDispatch();

  const [projetos, setProjetos] = useState<ProjetoModel[]>([]);
  const [times, setTimes] = useState<TimeModel[]>([]);
  const [sprints, setSprints] = useState<SprintModel[]>([]);

  const idTeamForce = window.localStorage.getItem('idTeamForce');

  const timeValidation = idTeamForce ? yup.string() : yup.string().required('Time obrigatorio');

  const schema = yup
    .object({
      projeto: yup.string().required('Projeto obrigatorio'),
      time: timeValidation,
      sprint: yup.string().required('Sprint obrigatorio'),
      idUS: yup
        .string()
        .required()
        .matches(/^[0-9]+$/, 'Apenas numero')
        .min(5, 'Minimo 5 numeros'),
      nameTasks: yup.string().required('Titulo tasks obrigatorio'),
    })
    .required();

  const { handleSubmit, control, getValues, setValue } = useForm({
    mode: 'onSubmit',
    resolver: yupResolver(schema),
  });

  const projetoAtual = getValues('projeto') as unknown as string;
  const timeAtual = getValues('time') as unknown as string;

  const obterSprints = async (time: string) => setSprints(await AzureService.obterSprints(projetoAtual, time));
  const obterTimes = async () => setTimes(await AzureService.obterTimes());

  useEffect(() => {
    async function obterProjetos() {
      setProjetos(await AzureService.obterProjetos());
    }
    obterProjetos();
  }, []);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (idTeamForce) obterSprints(idTeamForce);
  }, [projetoAtual]);

  // #region elements page

  const inputSprint = (
    <Controller
      name="sprint"
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <Box mb={5} height={80}>
          <TextField
            margin="normal"
            id="sprint"
            select
            fullWidth
            label="Sprint"
            required
            value={value || ''}
            onChange={onChange}
            disabled={!timeAtual && !idTeamForce}
            error={!!error}
            helperText={error ? error.message : null}
          >
            {sprints.map((option) => (
              <MenuItem key={option.id} value={option.id}>
                {option.name}
              </MenuItem>
            ))}
          </TextField>
        </Box>
      )}
    />
  );

  const inputTime = (
    <Controller
      name="time"
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <Box mb={5} height={80}>
          <TextField
            margin="normal"
            id="time"
            select
            fullWidth
            label="Time"
            required
            value={value || ''}
            onChange={(e) => {
              onChange(e.target.value);
              obterSprints(e.target.value);
            }}
            disabled={!projetoAtual || !!idTeamForce}
            error={!!error}
            helperText={error ? error.message : null}
          >
            {times.map((option) => (
              <MenuItem key={option.id} value={option.id}>
                {option.name}
              </MenuItem>
            ))}
          </TextField>
        </Box>
      )}
    />
  );

  const inputProjeto = (
    <Controller
      name="projeto"
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <Box mb={5} height={80}>
          <TextField
            margin="normal"
            id="projeto"
            select
            disabled={!ORGANIZACAO || !AUTH_KEY}
            fullWidth
            label="Projeto"
            required
            value={value || ''}
            onChange={(e) => {
              onChange(e.target.value);
              obterTimes();
            }}
            error={!!error}
            helperText={error ? error.message : null}
          >
            {projetos.map((option) => (
              <MenuItem key={option.id} value={option.id}>
                {option.name}
              </MenuItem>
            ))}
          </TextField>
        </Box>
      )}
    />
  );

  const inputidUS = (
    <Controller
      name="idUS"
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <Box mb={5} height={80}>
          <TextField
            margin="normal"
            fullWidth
            id="idUS"
            autoComplete="off"
            label="Id US"
            autoFocus
            required
            variant="outlined"
            value={value || ''}
            onChange={onChange}
            error={!!error}
            helperText={error ? error.message : null}
          />
        </Box>
      )}
    />
  );

  const inputTasks = (
    <Controller
      name="nameTasks"
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <Box mb={5} height={80}>
          <TextField
            margin="normal"
            fullWidth
            id="nameTasks"
            autoComplete="off"
            label="Names Task"
            autoFocus
            required
            variant="outlined"
            value={value || ''}
            onChange={onChange}
            error={!!error}
            helperText={error ? error.message : 'Titulos da task separado por ";"'}
          />
        </Box>
      )}
    />
  );

  const buttonTaskDefault = (
    <Box my={2} height={80}>
      <Button
        variant="contained"
        fullWidth
        sx={{ height: '55px' }}
        onClick={() =>
          setValue(
            'nameTasks',
            '[dti flow] Reuniao de estoria;[dti Flow] Testes unitarios;[dti flow] Roteiro de Testes;[dti flow] Validação em dupla;[dti flow] Pull-Request;',
          )
        }
      >
        Usa Padrão
      </Button>
    </Box>
  );

  // #endregion elements page

  const elementsPage = {
    inputs: {
      time: inputTime,
      sprint: inputSprint,
      projeto: inputProjeto,
      idUS: inputidUS,
      nameTasks: inputTasks,
    },
    button: { buttonTaskDefault },
  };

  return (
    <>
      <Box
        component="form"
        onSubmit={handleSubmit((data) => {
          AzureService.criarTasksDefault(data as IAddTaskDefault);
          dispatch(update(data as IAddTaskDefault));
          alert('Criado com sucesso :)');
          setValue('idUS', '');
        })}
        noValidate
        sx={{ mt: 1 }}
      >
        <Grid container spacing={4} rowSpacing={1}>
          <Grid item xs={12} sm={6} md={4} height={85}>
            {elementsPage.inputs.projeto}
          </Grid>
          <Grid item xs={12} sm={6} md={4} height={85}>
            {elementsPage.inputs.time}
          </Grid>
          <Grid item xs={12} sm={6} md={4} height={85}>
            {elementsPage.inputs.sprint}
          </Grid>
          <Grid item xs={12} sm={6} md={4} height={85}>
            {elementsPage.inputs.idUS}
          </Grid>
          <Grid item xs={12} sm={6} md={4} height={85}>
            {elementsPage.inputs.nameTasks}
          </Grid>
          <Grid item xs={12} sm={4} md={3} height={85}>
            {elementsPage.button.buttonTaskDefault}
          </Grid>
        </Grid>
        <ButtonFormUser />
      </Box>
    </>
  );
};

export default UserInformation;
