### 1. Log e Mensagens

gs.log(message, source) → Log genérico (source = nome do app/script)

gs.info(message) → Log nível Info

gs.warn(message) → Log nível Warning

gs.error(message) → Log nível Error

gs.addInfoMessage(message) → Mensagem azul exibida ao usuário na UI

gs.addErrorMessage(message) → Mensagem vermelha exibida ao usuário

<br>

### 2. Data e Hora

gs.now() → Data/hora atual em string (GMT)

gs.nowDateTime() → Data/hora atual (objeto GlideDateTime)

gs.today() → Apenas a data de hoje

gs.daysAgoStart(n) → Data/hora do início do dia n dias atrás

gs.minutesAgoStart(n) → Data/hora de n minutos atrás

gs.beginningOfLastWeek() / gs.beginningOfNextWeek()

gs.dateGenerate(date, time) → Gera um GlideDateTime

<br>

### 3. Usuário

gs.getUserID() → Sys_id do usuário logado

gs.getUserName() → User name do usuário logado

gs.hasRole(role) → Verifica se usuário tem papel específico

gs.getUser() → Objeto GlideUser (com mais detalhes sobre o usuário)

<br>

### 4. Transações

gs.action.getGlideURI() → Pega a URL atual

gs.nil(obj) → Verifica se é nulo/vazio

gs.isInteractive() → Verdadeiro se a execução for via UI

gs.isLoggedIn() → Verifica se alguém está logado

<br>

### 5. Banco / Utilitários

gs.generateGUID() → Gera um sys_id novo (GUID)

gs.eventQueue(event, current, parm1, parm2) → Dispara evento (para notificações, flows, etc.)

gs.include(script) → Inclui script server-side

gs.sleep(ms) → Pausa execução (server scripts não recomendado)

gs.getProperty(name, default) → Lê uma system property