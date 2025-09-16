### 1. Campos (set/get valores, estado)

g_form.getValue('campo') → pega o valor de um campo

g_form.setValue('campo', 'valor') → define valor

g_form.clearValue('campo') → limpa valor

g_form.setMandatory('campo', true/false) → obriga/preenche obrigatório

g_form.setReadOnly('campo', true/false) → deixa somente leitura

g_form.setVisible('campo', true/false) → mostra/esconde campo

g_form.showFieldMsg('campo', 'mensagem', 'error|info|warning') → mensagem abaixo do campo

g_form.hideFieldMsg('campo') → esconde mensagem

<br>

### 2. Formulário (como um todo)

g_form.addInfoMessage('msg') → mensagem azul no topo

g_form.addErrorMessage('msg') → mensagem vermelha no topo

g_form.clearMessages() → limpa mensagens

g_form.isNewRecord() → true se for um registro novo

g_form.submit() → envia o formulário (equivalente ao botão Submit)

g_form.save() → salva (sem sair)

g_form.hideAllFieldMsgs() → esconde todas mensagens de campo

<br>

### 3. Opções de Choice (dropdowns)

g_form.addOption('campo', 'valor', 'rótulo', posicao) → adiciona opção

g_form.removeOption('campo', 'valor') → remove opção específica

g_form.clearOptions('campo') → remove todas opções

<br>

### 4. Controle do formulário

g_form.disableAttachments() / g_form.enableAttachments() → controla anexos

g_form.setDisplay('campo', true/false) → igual ao setVisible (mais antigo)

g_form.getTableName() → retorna nome da tabela atual

g_form.getUniqueValue() → retorna o sys_id do registro

<br>

### 5. Eventos em Client Scripts

onLoad → roda quando o form carrega

onChange → roda quando valor de um campo muda

onSubmit → roda quando o usuário clica em Save/Submit

onCellEdit → roda em List View quando edita célula inline
