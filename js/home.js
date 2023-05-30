let recadosUsuarioLogado = [];
let paginaAtual = 1
document.addEventListener('DOMContentLoaded',async () => {
  const emailLocal = localStorage.getItem('email')
  const emailSession = sessionStorage.getItem('email')
  const paragrafo = document.getElementById('texto-apresentacao')

  if(!emailLocal && !emailSession) {
    window.location.href = 'index.html'
    return
  }

  if(emailLocal) {
    paragrafo.innerText = `Bem vindo, ${emailLocal}`

    const respostaApi = await buscarRecados()

   if(!respostaApi) {
    return
   }

   recadosUsuarioLogado = respostaApi.dados


   montarCard(recadosUsuarioLogado)
   montarBotoes(emailLocal, respostaApi.totalPaginas)
   
  }

  if(emailSession) {
    paragrafo.innerText = `Bem vindo, ${emailSession}`
    
    const respostaApi = await buscarRecados()

   if(!respostaApi) {
    return
   }

   recadosUsuarioLogado = respostaApi.dados


   montarCard(recadosUsuarioLogado)
   montarBotoes(emailLocal, respostaApi.totalPaginas)
  }

})

async function buscarRecados(paginaMostrada) {
  paginaAtual = paginaMostrada
  try {
    const response = await apiConfig.get('/recados/', {
      params: {
        pagina: paginaMostrada || 1
      }
    })

    console.log(response.data)

    return response.data

  } catch (erro) {
    console.log(erro)

    return []
  }
}

//construir os cards de recados
function montarCard(recados) {

    const main = document.getElementById('espaco-cards');
    main.innerHTML = ''

    recados.forEach(recado => {
      const div = document.createElement('div')
      div.classList.add('container-recado')
  
      const h3 = document.createElement('h3')
      h3.innerText = `Título: ${recado.titulo}`
  
      const paragrafoDescricao = document.createElement('p')
      paragrafoDescricao.innerText = `Descrição: ${recado.descricao}`
  
      const paragrafoIdRecado = document.createElement('p')
      paragrafoIdRecado.innerText = `Identificador: ${recado.id}`
  
      //cuidado com a ordem de montagem da DOM
      // começar do mais interno para o mais externo
  
      div.appendChild(h3)
      div.appendChild(paragrafoDescricao)
      div.appendChild(paragrafoIdRecado)
      main.appendChild(div)
    });
} 

//construir botoes de navegação
function montarBotoes(emailUsuario, quantidade) {
  const divEspaco = document.getElementById('espaco-botoes')

  for(let contador = 1; contador <= quantidade; contador++) {
    const button = document.createElement('button')
    button.setAttribute('class', `btn-paginacao pagina-${contador}`)
    button.innerText = `Página ${contador}`

    if(contador === paginaAtual) {
      button.disabled = true
    }

    button.addEventListener('click', async () => {
      const respostaApi = await buscarRecados(contador)
      const buttons = document.querySelectorAll('.btn-paginacao')
      buttons.forEach(item => item.disabled = false)
      button.disabled = true
      
      montarCard(respostaApi.dados)
    })

    divEspaco.appendChild(button)
  }
}


//LOGOUT DO USUARIO
const btnSair = document.getElementById('btn-sair')

btnSair.addEventListener('click', () => {

  localStorage.removeItem('email')
  sessionStorage.removeItem('email')

  window.location.href = 'index.html'
})