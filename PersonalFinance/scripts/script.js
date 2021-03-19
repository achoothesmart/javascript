let lst_trans = [];
let TRAN_ID = 1;

lst_trans = [
    { id: 1, particular: 'Salary', amount: 50000.00, type: 'credit' },
    { id: 2, particular: 'Maligai', amount: 2500.00, type: 'debit' },
    { id: 3, particular: 'Rent', amount: 10000.00, type: 'debit' }
];



loadTransactions();

function newTranId(){
    return TRAN_ID++;
}
function addTrans() {
    if (!validateEntry()) {
        return;
    }
    lst_trans.push({
        id: newTranId(),
        particular: particular.value,
        amount: Number.parseFloat(amount.value),
        type: Array.from(document.getElementsByName('entry_type')).filter(el => el.checked)[0].value
    });
    closeEntryDialog();
    clearEntry();
    loadTransactions();
}

function validateEntry() {
    return particular.value.trim() != '' && amount.value.trim() != '';
}

function clearEntry() {
    particular.value = '';
    amount.value = '';
    entry_type_credit.checked = false;
    entry_type_debit.checked = false;
}

function getTotal(tranType = 'all') {
    let total = 0;
    if(tranType == 'all'){
        total += lst_trans.filter(tran => tran.type == 'credit').map(cred_tran => cred_tran.amount).reduce((a, b) => a + b, 0)
        total -= lst_trans.filter(tran => tran.type == 'debit').map(debt_tran => debt_tran.amount).reduce((a, b) => a + b, 0)
    }
    else {
        total += lst_trans.filter(tran => tran.type == tranType).map(tran => tran.amount).reduce((a, b) => a + b, 0)
    }
    return total;
}

function loadTransactions() {
    let html = '<table>';
    html += '<tr> <th class="id-col"><input id="chk_all" type="checkbox" class="chk" onclick="selectAllTrans()"/>ID</th> <th>Particular</th> <th>Debit (INR)</th> <th>Credit (INR)</th> </tr>';
    html += lst_trans.map(tran =>
        `<tr onclick='onTranClick(event, ${tran.id})'> 
                    <td class="id-col"><input id='chk_${tran.id}' type='checkbox' class='chk'/>${tran.id}</td> 
                    <td>${tran.particular}</td> 
                    <td>${tran.type == 'debit' ? currency(tran.amount) : 0}</td> 
                    <td>${tran.type == 'credit' ? currency(tran.amount) : 0}</td> 
                </tr>`
    ).join(' ');
    html += `<tr class='total-row'> <td colspan='2'>Total</td> <td>${currency(getTotal('debit'))}</td> <td>${currency(getTotal('credit'))}</td> </tr>`;
    html += `<tr class='total-row'> <td colspan='2'>Balance</td> <td colspan='2'>${currency(getTotal())}</td>  </tr>`;
    html += '</table>';
    all_transactions.innerHTML = html;
}

function onTranClick(event, tranId){
    if(!event.target.classList.contains('chk')){
        selectTran(tranId);
    }
    // event.stopPropagation();
    
}

function selectTran(tranId, selected=null){
    let chkTran = document.getElementById(`chk_${tranId}`);
    if(selected == null){
        chkTran.checked = !chkTran.checked;
    }
    else{
        chkTran.checked = selected;
    }
}

function selectAllTrans(){
    let chkAll = document.getElementById('chk_all');
    lst_trans.forEach(tran => {
        selectTran(tran.id, chkAll.checked);
    });
}

function deleteSelected(){
    let selectedIds = Array.from(document.querySelectorAll('#all_transactions .chk:checked')).map(chk => chk.id.split('_')[1]);
    selectedIds = selectedIds.map(id => Number.parseInt(id));
    lst_trans = lst_trans.filter(tran => !selectedIds.includes(tran.id));
    loadTransactions();
}

function importTrans() {
    lst_trans = [];
    document.getElementById('import').value.split('\n').forEach(tran => {
        let tr = tran.split('\t');
        // debit trans
        if (tr[1] && tr[1] != '') {
            lst_trans.push({
                id: newTranId(),
                particular: tr[0],
                amount: Number.parseFloat(tr[1]),
                type: 'debit'
            });
        }

        // credit trans
        if (tr[2] && tr[2] != '') {
            lst_trans.push({
                id: newTranId(),
                particular: tr[0],
                amount: Number.parseFloat(tr[2]),
                type: 'credit'
            });
        }
    });

    closeImportDialog();
    clearEntry();
    loadTransactions();
}

function loadImportDialog(){
    document.getElementById('import-dialog').classList.remove('fadeOut');
    document.getElementById('import-dialog').classList.add('fadeIn');
}

function closeImportDialog(){
    document.getElementById('import-dialog').classList.add('fadeOut');
    document.getElementById('import-dialog').classList.remove('fadeIn');  
}

function loadEntryDialog(){
    document.getElementById('entry-dialog').classList.remove('fadeOut');
    document.getElementById('entry-dialog').classList.add('fadeIn');
}

function closeEntryDialog(){
    document.getElementById('entry-dialog').classList.add('fadeOut');
    document.getElementById('entry-dialog').classList.remove('fadeIn');  
}

function currency(amt = 0){
    amt = Number.parseFloat(amt);
    amt += '';
    let index = amt.length-1;
    if(amt.indexOf('.')>0){
        index = amt.indexOf('.')-1;
        if(index == amt.length-3){
            amt += '0';
        }
    }
    else{
        amt += '.00';
    }

    while(index > 2){
        index-=2;
        amt = amt.substring(0,index) + ',' + amt.substring(index, amt.length);
    }
    return amt;
}