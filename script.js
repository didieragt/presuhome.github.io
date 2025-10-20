const cdt = 1000000;
const cajita_ahorro = 915042;
const fondoTotal = 1800000;
let arrCarro = [
    {concepto: "Gasolina", valor:110000},
    {concepto: "Parqueo", valor:67000},
    {concepto: "Lavado",valor:0},
    {concepto: "Mecanico", valor:80000},
    {concepto: "Gasolina", valor:100000},
    {concepto: "Gasolina", valor:50000}
];
let arrServicios = [
    {concepto: "ETB", valor:79900},
    {concepto: "Vanti", valor:17520},
    {concepto: "Codensa", valor:58610},
    {concepto: "Acueducto", valor:49650},
    {concepto: "ETB", valor:79900}
];
let arrMercado = [
    {concepto: "1er Mercado", valor:517551},
    {concepto: "Huevos", valor:13000},
    {concepto: "Huevos", valor:13000},
    {concepto: "2do Mercado", valor:79000},
    {concepto: "Huevos", valor:13000}
];
let total_Ahorro = 0;
let total_pre_mes = 0;
let total_real_mes = 0;
let aporte_D = 0;
let aporte_G = 0;
let saldo = 0;
let total = 0;

let tbody = document.getElementById('tbody');
let total_pre = document.getElementById('total_pre');
let total_real = document.getElementById('total_real');
let tr_aporte_D = document.getElementById('aporte60');
let tr_aporte_G = document.getElementById('aporte40');
let td_saldo = document.getElementById('saldo');
let cajitaNu = document.getElementById('cajitaNu');
let cdtNu = document.getElementById('cdtNu');
let totalAhorro = document.getElementById('totalAhorro');
let fondo = document.getElementById('fondo');

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
            total_pre_mes += element.Presupuestado;
            total_real_mes += element.Gasto_Real;
            const tr = document.createElement('tr');
            const tdConcepto = document.createElement('td');
            const tdPresupuesto = document.createElement('td');
            const tdGastoReal = document.createElement('td');
            const tdEstado = document.createElement('td');
            tdConcepto.textContent = element.Concepto;
            tdPresupuesto.textContent = formateador.format(element.Presupuestado);
            tdGastoReal.textContent = formateador.format(element.Gasto_Real);
            tdEstado.textContent = element.Estado;
            tr.appendChild(tdConcepto);
            tr.appendChild(tdPresupuesto);
            tr.appendChild(tdGastoReal);
            tr.appendChild(tdEstado);
            tbody.appendChild(tr);

            detalles(element.Concepto,tdGastoReal,tdConcepto);

            switch(element.Estado){
                case "Completado":
                    tr.style.background = 'green';
                    tr.style.color = '#fff';
                    break;
                case "Pendiente":
                    tr.style.background = 'yellow';
                    tr.style.color = '#000';
                    break;
                case "Sobre Costo":
                    tr.style.background = 'red';
                    tr.style.color = '#000';
                    break;
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
        fondo.textContent = formateador.format(fondoTotal);
        totalAhorro.textContent = formateador.format(cdt + cajita_ahorro + fondoTotal);

    } catch (error) {
            console.error('Error al leer el archivo JSON:', error);
        }
}

function detalles(detalleConcepto,tdGastoReal,tdConcepto){

    if(detalleConcepto == "Carro" || detalleConcepto == "Servicios" || detalleConcepto == "Mercado"){
        let detalles = document.createElement('a');
        detalles.textContent = "detalles";
        detalles.href = "#";
        detalles.style.display = "block";
        detalles.style.marginTop = "5px";

        let tarjeta = document.createElement('div');
        tarjeta.style.display = "none";
        tarjeta.style.padding = "10px";
        tarjeta.style.marginTop = "8px";
        tarjeta.style.border = "1px solid #ccc";
        tarjeta.style.borderRadius = "6px";
        tarjeta.style.backgroundColor = "#000";
        tarjeta.style.color = "#fff"

        if(detalleConcepto == "Carro"){
            let contenido =``;
            total = 0;
            arrCarro.forEach(item => {
                contenido += `<p>${item.concepto}: | ${formateador.format(item.valor)}</p>`;
                total += item.valor;
                tarjeta.innerHTML = contenido;
                tdGastoReal.textContent = formateador.format(total);
            });
        }

        if(detalleConcepto == "Servicios"){
            let contenido =``;
            total = 0;
            arrServicios.forEach(item => {
                contenido += `<p>${item.concepto}: | ${formateador.format(item.valor)}</p>`;
                total += item.valor;
                tarjeta.innerHTML = contenido;
                tdGastoReal.textContent = formateador.format(total);
            });
        }

        if(detalleConcepto == "Mercado"){
            let contenido =``;
            total = 0;
            arrMercado.forEach(item => {
                contenido += `<p>${item.concepto}: | ${formateador.format(item.valor)}</p>`;
                total += item.valor;
                tarjeta.innerHTML = contenido;
                tdGastoReal.textContent = formateador.format(total);
            });
        }

        detalles.addEventListener('click', function(e){
            e.preventDefault();
            tarjeta.style.display = tarjeta.style.display === "none" ? "block" : "none";
        });

        tdConcepto.appendChild(detalles);
        tdConcepto.appendChild(tarjeta);
    }

}

data();