import { ProjetoDto } from '../interfaces/ProjetoDto';
import { SprintDto } from '../interfaces/SprintDto';
import { TimeDto } from '../interfaces/TimeDto';
import { ProjetoModel } from '../models/ProjetoModel';
import { SprintModel } from '../models/SprintModel';
import { TimeModel } from '../models/TimeModel';

class AzureMapper {
  mapperProjetoDtoToProjetoModel(projetosDto: ProjetoDto[]): ProjetoModel[] {
    return projetosDto.map((projetoDto: ProjetoDto): ProjetoModel => {
      return {
        id: projetoDto.id,
        name: projetoDto.name,
      };
    });
  }

  mapperTimeDtoToTimeModel(timesDto: TimeDto[]): TimeModel[] {
    return timesDto?.map((timeDto: TimeDto): TimeModel => {
      return {
        id: timeDto.id,
        name: timeDto.name,
      };
    });
  }

  mapperSprintDtoToSprintModel(sprintsDto: SprintDto[]): SprintModel[] {
    return sprintsDto?.map((sprintDto: SprintDto): SprintModel => {
      return {
        id: sprintDto.path,
        name: sprintDto.name,
      };
    });
  }
}

export default new AzureMapper();
