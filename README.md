# Form Task Add Azure
**form-task-add-azure** é uma aplicação para criação de tasks no board da Sprint dentro do Azure Devops, e possivel fazer isso utilizando template da aplicação, mas o objetivo é testar e implementar a integração com a API do Azure

- [x] Busca projetos
- [x] Busca times
- [x] Busca sprints 
- [x] Cria tasks com relacionamento a US

## Telas
![tasks create](https://user-images.githubusercontent.com/61028628/184025483-bcd32a4c-0d8a-4517-ac94-58d4a8e281cb.png)

## Como usar
Acesse o diretorio src\shared\constants\Environment.ts e preenche as contantes de ambiente
```
export const ORGANIZACAO: string = 'nomedaorganizaçãonoazure'; 
export const AUTH_KEY: string = 'tokenazuregerado';
```
OBS.: [token](https://docs.microsoft.com/pt-br/azure/devops/organizations/accounts/use-personal-access-tokens-to-authenticate?view=azure-devops&tabs=Windows), validar permissão de acesso para manipular o board 
## 1. Bibliotecas externas utilizadas
* [material-ui](https://www.npmjs.com/package/@material-ui/core) : Fremework de componentes estilizados
* [reduxjs-toolkit](https://www.npmjs.com/package/@reduxjs/toolkit) : Facilitador para implementação do paradigma Redux de um jeito menos verboso 
* [feather-icons-react](https://www.npmjs.com/package/feather-icons-react) : Icons
* [react-hook-form](https://www.npmjs.com/package/react-hook-form) : Gerenciar formularios
* [yup](https://www.npmjs.com/package/yup) : Validações de dados
* [axios](https://www.npmjs.com/package/axios) : Requisições HTTP
