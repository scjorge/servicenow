/* 
| Valor (`state`) | Label (Rótulo exibido) |
| --------------- | ---------------------- |
| **1**           | New                    |
| **2**           | In Progress            |
| **3**           | On Hold                |
| **6**           | Resolved               |
| **7**           | Closed                 |
| **8**           | Canceled               |
*/

(function() {
    var gr = new GlideRecord("incident");
    gr.addQuery("state", "Resolved");  // somente incidentes resolvidos
    gr.addQuery("resolved_at", "<=", gs.daysAgoStart(7)); // mais de 7 dias
    gr.query();

    var count = 0;
    while (gr.next()) {
        gr.state = 7; // Closed
        gr.update();
        count++;
    }

    // Registrar log no system log
    gs.info("Scheduled Job: " + count + " incidentes fechados automaticamente.", "CloseResolvedIncidents");
})();
