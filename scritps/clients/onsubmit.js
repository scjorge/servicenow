function onSubmit() {
    var caller = g_form.getValue('caller_id');
    var shortDesc = g_form.getValue('short_description');
    var priority = g_form.getValue('priority');
    var impact = g_form.getValue('impact');

    // Validação Caller
    if (!caller) {
        g_form.showFieldMsg('caller_id', 'O campo Caller é obrigatório.', 'error');
        return false;
    }

    // Validação Short Description
    if (!shortDesc) {
        g_form.showFieldMsg('short_description', 'O campo Short Description é obrigatório.', 'error');
        return false;
    }

    // Validação Priority 1 → Impact obrigatório
    if (priority == '1' && !impact) {
        g_form.showFieldMsg('impact', 'Se a prioridade for 1, o campo Impact deve ser preenchido.', 'error');
        return false;
    }

    return true; // Se passou por todas as validações, permite o envio
}
