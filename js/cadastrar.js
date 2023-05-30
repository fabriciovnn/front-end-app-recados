const formCadastroElement = document.getElementById('form-cadastro')

formCadastroElement.addEventListener('submit', async (e) => {
  e.preventDefault();

  const nomeInput = document.getElementById('nome')
  const emailInput = document.getElementById('email')
  const senhaInput = document.getElementById('senha')
  const repetirSenhaInput = document.getElementById('re-senha')

  const nomeValido = validarPreenchimentoCampo(nomeInput.value)
  const emailValido = validarPreenchimentoCampo(emailInput.value)
  const senhaValido = validarPreenchimentoCampo(senhaInput.value)
  const repetirSenhaValido = validarPreenchimentoCampo(repetirSenhaInput.value)

  if(!emailValido || !senhaValido || !repetirSenhaValido || !nomeValido) {
    alert('Preencha os campos corretamente')
    return
  }

  if(!validarSenhas(senhaInput.value, repetirSenhaInput.value)) {
    alert('As senhas não coincidem')
    return
  }

  const novoUsuario = {
    nome: nomeInput.value,
    email: emailInput.value,
    senha: senhaInput.value
  }

 const deuBom = await cadastrarUsuario(novoUsuario);

 if(deuBom) {
  nomeInput.value = ''
  emailInput.value = ''
  senhaInput.value = ''
  repetirSenhaInput.value = ''

  window.location.href = 'index.html'
 }
})

function validarPreenchimentoCampo(valorDigitado) {
  if(valorDigitado === '') {
    return false
  }

  return true
}

function validarSenhas(senha, repetirSenha) {
  if(senha !== repetirSenha) {
    return false
  }

  return true
}

async function cadastrarUsuario(novoUsuario) {
  try{
  const response = await apiConfig.post('/users', novoUsuario)

  alert(response.data.mensagem)
  return true
  } catch(erro) {
    alert(erro.response.data.mensagem)
    return false
  }
}