class Cliente {
    constructor() {
        this.clientes = localStorage.getItem('tbClientes') === null
        ? []
        : JSON.parse(localStorage.getItem('tbClientes'))
    }

    salva(cliente) {
        if(document.getElementById('cpf').getAttribute('disabled') === 'disabled') {
            this.apaga(cliente.cpf)
        }
        this.clientes.push(cliente) 
        localStorage.setItem('tbClientes', JSON.stringify(this.clientes))
        alert('Cadastro salvo com sucesso!')
    }

    apaga(cpf) {
        let index = this.clientes.findIndex(cliente => cliente.cpf == cpf)
        this.clientes.splice(index, 1)
        localStorage.setItem('tbClientes', JSON.stringify(this.clientes))
        cliente.atualiza()
    }

    edita(cliente) {
        document.getElementById('cpf').setAttribute('disabled', 'disabled')
        document.getElementById('cpf').value = cliente.cpf
        document.getElementById('nome').value = cliente.nome
        document.getElementById('telefone').value = cliente.telefone
        document.getElementById('email').value = cliente.email
        document.getElementById('senha').value = cliente.senha

    }

    lista() {
        const listagem = this.clientes.map((cliente) => (
            `<tr>
                <td>${cliente.nome}</td>
                <td>${cliente.cpf}</td>
                <td>${cliente.telefone}</td>
                <td>${cliente.email}</td>
                <td>${cliente.senha}</td>

                <td>
                    <button class='button' id='apagar' onClick='cliente.apaga(${cliente.cpf})'>🗑️Apagar</button>
                    <button class='button' id='editar' onClick='cliente.edita(${JSON.stringify(cliente)})'>✏️Editar</button>
                </td>
            </tr>`
        ))
        return (`
            <table border='1' class='paleBlueRows'>
                <caption class='title-h2'>Cadastros Realizados</caption>
                <thead>
                    <th>Nome</th>
                    <th>CPF</th>
                    <th>Telefone</th>
                    <th>Email</th>
                    <th>Senha</th>
                    <th>Opções</th>                    
                </thead>
                <tbody>${listagem}</tbody>
            </table>
        `)
    }
    atualiza() {
        document.getElementById('listagem').innerHTML = cliente.lista()
    }
}

const cliente = new Cliente()
document.getElementById('cadastro').onclick = function() {
    const registro = {
        nome: document.getElementById('nome').value,
        cpf: document.getElementById('cpf').value,
        telefone: document.getElementById('telefone').value,
        email: document.getElementById('email').value,
        senha: btoa(document.getElementById('senha').value)
    }
    cliente.salva(registro)
}

window.onload = function() {
    cliente.atualiza()
}

