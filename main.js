let tarefas = [];
let tarefaAtual;

class Tarefa {
    constructor(titulo, prioridade) {
        this.titulo = titulo;
        this.prioridade = prioridade;
    }
}

// Função para adicionar a tarefa à lista e exibi-la no HTML
function adicionarTarefa(titulo, prioridade) {
    const novaTarefa = new Tarefa(titulo, prioridade);
    tarefas.push(novaTarefa);
    exibirTarefas();
}

// Função para exibir as tarefas cadastradas
function exibirTarefas() {
    const listaDeTarefas = document.getElementById('listaDeTarefas');
    listaDeTarefas.innerHTML = '';

    tarefas.forEach((tarefa, index) => {
        const item = document.createElement('li');
        item.classList.add('list-group-item', 'mb-3', 'd-flex', 'justify-content-between', 'align-items-center');

        item.innerHTML = `<span><strong>Título:</strong> ${tarefa.titulo} | <strong>Prioridade:</strong> ${tarefa.prioridade}</span>`;

        const divBotoes = document.createElement('div');

        // Botão de Editar
        const botaoEditar = document.createElement('button');
        botaoEditar.classList.add('btn', 'btn-warning', 'btn-sm', 'me-2');
        botaoEditar.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16">
                <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.5.5 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11z"/>
            </svg>`;

        botaoEditar.addEventListener('click', () => {
            tarefaAtual = index;
            document.getElementById('tituloEditar').value = tarefa.titulo;
            document.getElementById('prioridadeEditar').value = tarefa.prioridade;
            const modal = new bootstrap.Modal(document.getElementById('modalEditar'));
            modal.show();
        });

        const botaoApagar = document.createElement('button');
        botaoApagar.classList.add('btn', 'btn-danger', 'btn-sm');
        botaoApagar.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0"/>
            </svg>`;

        botaoApagar.addEventListener('click', () => {
            tarefas.splice(index, 1);
            exibirTarefas();
        });

        divBotoes.appendChild(botaoEditar);
        divBotoes.appendChild(botaoApagar);

        item.appendChild(divBotoes);

        listaDeTarefas.appendChild(item);
    });
}

// Captura o evento de envio do formulário
document.getElementById('gerenciadorDeTarefas').addEventListener('submit', function (event) {
    event.preventDefault();

    const titulo = document.getElementById('titulo-da-tarefa').value;
    const prioridade = document.getElementById('prioridade').value;

    adicionarTarefa(titulo, prioridade);

    document.getElementById('gerenciadorDeTarefas').reset();
});

// Evento para o envio do formulário do modal
document.getElementById('formEditar').addEventListener('submit', function (event) {
    event.preventDefault();

    const novoTitulo = document.getElementById('tituloEditar').value;
    const novaPrioridade = document.getElementById('prioridadeEditar').value;

    if (novoTitulo && novaPrioridade) {
        tarefas[tarefaAtual].titulo = novoTitulo;
        tarefas[tarefaAtual].prioridade = novaPrioridade;
        exibirTarefas();
        const modal = bootstrap.Modal.getInstance(document.getElementById('modalEditar'));
        modal.hide(); 
    }
});