import AzureRepository from '../repository/AzureRepository';
import AzureMapper from '../repository/mappers/AzureMapper';
import { IAddTaskDefault } from '../store/slices/userSlice';

class AzureService {
  async obterProjetos() {
    return AzureMapper.mapperProjetoDtoToProjetoModel(
      await AzureRepository.obterProjetos()
        .then((resposta) => resposta.data.value)
        .catch((erro) => erro),
    );
  }

  async obterTimes() {
    return AzureMapper.mapperTimeDtoToTimeModel(
      await AzureRepository.obterTimes()
        .then((resposta) => resposta.data.value)
        .catch((erro) => erro),
    );
  }

  async obterSprints(projeto: string, time: string) {
    return AzureMapper.mapperSprintDtoToSprintModel(
      await AzureRepository.obterSprints(projeto, time)
        .then((resposta) => resposta.data.value)
        .catch((erro) => erro),
    );
  }

  async criarTasksDefault(addTaskDefault: IAddTaskDefault) {
    const tituloTasks = addTaskDefault.nameTasks.split(';');
    tituloTasks.forEach(async (titulo) => {
      const result = await AzureRepository.criarTask(titulo, addTaskDefault.projeto)
        .then((resposta) => resposta.data.id)
        .catch((erro) => erro);

      await AzureRepository.adicionarRelacao(result.toString(), addTaskDefault.idUS)
        .then((resposta) => resposta.data)
        .catch((erro) => erro);

      await AzureRepository.adicionarSprint(result.toString(), addTaskDefault.sprint)
        .then((resposta) => resposta.data)
        .catch((erro) => erro);
    });
  }
}

export default new AzureService();
