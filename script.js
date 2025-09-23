const cdt = 1000000;
const cajita_ahorro = 144790;
let total_Ahorro = 0;
let total_pre_mes = 0;
let total_real_mes = 0;
let aporte_D = 0;
let aporte_G = 0;
let saldo = 0;

let tbody = document.getElementById('tbody');
let total_pre = document.getElementById('total_pre');
let total_real = document.getElementById('total_real');
let tr_aporte_D = document.getElementById('aporte60');
let tr_aporte_G = document.getElementById('aporte40');
let td_saldo = document.getElementById('saldo');
let cajitaNu = document.getElementById('cajitaNu');
let cdtNu = document.getElementById('cdtNu');
let totalNu = document.getElementById('totalNu');

let formateador = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0
});


async function data() {
    try{
        const response = await fetch('json/oct.json');
        if(!response.ok){
            throw new Error(`HTTP error! status: ${response.status}`)
        }

        const datos = await response.json();
        datos.forEach(element => {
            total_pre_mes += element.presupuesto;
            total_real_mes += element.gasto_real;
            const tr = document.createElement('tr');
            const tdConcepto = document.createElement('td');
            const tdPresupuesto = document.createElement('td');
            const tdGastoReal = document.createElement('td');
            const tdEstado = document.createElement('td');
            tdConcepto.textContent = element.concepto;
            tdPresupuesto.textContent = formateador.format(element.presupuesto);
            tdGastoReal.textContent = formateador.format(element.gasto_real);
            tdEstado.textContent = element.estado;
            tr.appendChild(tdConcepto);
            tr.appendChild(tdPresupuesto);
            tr.appendChild(tdGastoReal);
            tr.appendChild(tdEstado);
            tbody.appendChild(tr);

            if(element.estado == 'pago'){
                tr.style.background = 'green';
                tr.style.color = '#fff';
            }
        });

        total_pre.textContent = formateador.format(total_pre_mes);
        total_real.textContent = formateador.format(total_real_mes);

        aporte_D = total_pre_mes*0.6;
        aporte_G = total_pre_mes*0.4;

        const td_aporte_D = document.createElement('td');
        const td_aporteReal_D = document.createElement('td');
        const td_difer_D = document.createElement('td');
        const td_aporte_G = document.createElement('td');
        const td_aporteReal_G = document.createElement('td');
        const td_difer_G = document.createElement('td');

        td_aporte_D.textContent = formateador.format(aporte_D);
        td_aporteReal_D.textContent = formateador.format(total_real_mes*0.6);
        td_difer_D.textContent = formateador.format(aporte_D-(total_real_mes*0.6));
        td_aporte_G.textContent = formateador.format(aporte_G);
        td_aporteReal_G.textContent = formateador.format(total_real_mes*0.4);
        td_difer_G.textContent = formateador.format(aporte_G-(total_real_mes*0.4));

        tr_aporte_D.appendChild(td_aporte_D);
        tr_aporte_D.appendChild(td_aporteReal_D);
        tr_aporte_D.appendChild(td_difer_D);
        tr_aporte_G.appendChild(td_aporte_G);
        tr_aporte_G.appendChild(td_aporteReal_G);
        tr_aporte_G.appendChild(td_difer_G);

        saldo = (aporte_D-(total_real_mes*0.6))+(aporte_G-(total_real_mes*0.4));
        td_saldo.textContent = formateador.format(saldo);

        cajitaNu.textContent = formateador.format(cajita_ahorro);
        cdtNu.textContent = formateador.format(cdt);
        totalNu.textContent = formateador.format(cdt + cajita_ahorro);

    } catch (error) {
            console.error('Error al leer el archivo JSON:', error);
        }
}

data();