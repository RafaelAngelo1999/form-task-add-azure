import { ORGANIZACAO } from '../shared/constants/Environment';
import axiosInstance from '../shared/utils/AxiosInstance';
import { ObterProjetoDto } from './interfaces/ProjetoDto';
import { ObterSprintDto } from './interfaces/SprintDto';
import { ObterTimeDto } from './interfaces/TimeDto';

const URL_OBTER_PROJETOS = `https://dev.azure.com/${ORGANIZACAO}/_apis/projects?api-version=6.0`;
const URL_OBTER_TIMES = `https://dev.azure.com/${ORGANIZACAO}/_apis/teams?api-version=6.0-preview.3`;
const URL_OBTER_SPRINTS = (projeto: string, time: string) =>
  `https://dev.azure.com/${ORGANIZACAO}/${projeto}/${time}/_apis/work/teamsettings/iterations?api-version=6.0`;
const URL_CRIAR_TASK = (projeto: string) =>
  `https://dev.azure.com/${ORGANIZACAO}/${projeto}/_apis/wit/workitems/$Task?api-version=6.0`;
const URL_CRIAR_RELACAO = (idTask: string) =>
  `https://dev.azure.com/${ORGANIZACAO}/_apis/wit/workitems/${idTask}?api-version=6.0`;
const URL_CRIAR_RELACAO_SPRINT = (idTask: string) =>
  `https://dev.azure.com/${ORGANIZACAO}/_apis/wit/workitems/${idTask}?api-version=6.0`;

class AzureRepository {
  obterProjetos = async () => {
    return axiosInstance.get<ObterProjetoDto>(URL_OBTER_PROJETOS);
  };

  obterTimes = async () => {
    return axiosInstance.get<ObterTimeDto>(URL_OBTER_TIMES);
  };

  obterSprints = async (projeto: string, time: string) => {
    return axiosInstance.get<ObterSprintDto>(URL_OBTER_SPRINTS(projeto, time));
  };

  criarTask = async (tituloTask: string, projeto: string) => {
    return axiosInstance.post<{ id: number }>(URL_CRIAR_TASK(projeto), [
      { op: 'add', path: '/fields/System.Title', from: null, value: tituloTask },
    ]);
  };

  adicionarRelacao = async (idTask: string, idUS: string) => {
    return axiosInstance.patch(URL_CRIAR_RELACAO(idTask), [
      {
        op: 'add',
        path: '/relations/-',
        value: {
          rel: 'System.LinkTypes.Hierarchy-Reverse',
          url: `https://dev.azure.com/${ORGANIZACAO}/_apis/wit/workItems/${idUS}`,
        },
      },
    ]);
  };

  adicionarSprint = async (idTask: string, sprint: string) => {
    return axiosInstance.patch(URL_CRIAR_RELACAO_SPRINT(idTask), [
      {
        op: 'add',
        path: '/fields/System.IterationPath',
        value: sprint,
      },
    ]);
  };
}

export default new AzureRepository();
