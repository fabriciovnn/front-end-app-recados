document.addEventListener('DOMContentLoaded', () => {

  const emailLocalStorage = localStorage.getItem('email')

  const emailSessionStorage = sessionStorage.getItem('email')

  if(emailLocalStorage || emailSessionStorage) {
     window.location.href = 'home.html'
  }

})

const formLoginElement = document.getElementById('form-login')

formLoginElement.addEventListener('submit', async (e) => {
  e.preventDefault();

  const emailInput = document.getElementById('email')
  const senhaInput = document.getElementById('senha')
  const permanecerConectado = document.getElementById('lembrar').checked

  const emailValido = validarPreenchimentoCampo(emailInput.value)
  const senhaValido = validarPreenchimentoCampo(senhaInput.value)

  if(!emailValido || !senhaValido) {
    alert('Preencha os campos corretamente')
    return
  }

  const dadosUsuario = {
    email: emailInput.value,
    senha: senhaInput.value,
  }

 const deuBom = await login(dadosUsuario, permanecerConectado);

  if(deuBom) {
   emailInput.value = ''
   senhaInput.value = ''
   window.location.href = 'home.html'
  } else {
    senhaInput.value = ''
  }
})

function validarPreenchimentoCampo(valorDigitado) {
  if(valorDigitado === '') {
    return false
  }

  return true
}

async function login(dadosUsuario, permanecerConectado) {
  try{
  const response = await apiConfig.post('/login', dadosUsuario)
  console.log(response.data)
  alert(response.data.mensagem)

  if(permanecerConectado) {
    // localStorage.setItem('token', response.data.dados.token)
    localStorage.setItem('email', response.data.dados.email)

  } else {
    // sessionStorage.setItem('token', response.data.dados.token)
    sessionStorage.setItem('email', response.data.dados.email)
  }

  return true

  } catch(erro) {
      alert(erro.response.data.mensagem) 
    return false
  }
}