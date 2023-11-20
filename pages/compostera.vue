<template>
    <div id="zonaCompostera">
        <div class="bannerZona">
            <img src="~/assets/banners/compostera.png" alt="Compost area">
        </div>
        <div id="contenedorTitulo">
            <div id="titulo">
                Compostera
            </div>
            <div id="comentario">
                La compostera es el lugar de producción de abonos, fertilizantes y biopreparados para darle un merecido
                empujoncito a nuestras amigas plantas.
            </div>
        </div>

        <div id="contenedorPilasAbono">
            <div class="infoPilaAbono">
                <div id="headerPila">
                    <div id="tituloPila">
                        Pila de abono #1
                    </div>
                    <img src="~/assets/compostera/pilaAbono.png" alt="Compost pile">
                </div>
                <highchart :options="chartOptions" @dblclick="refreshTempData" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
interface MedicionTemperatura {
    temp: number,
    timestamp: number
}

const { data: dataTemperatura, refresh: refreshTempData } = await useFetch('api/temperatura');
const dataTemperaturaTimestamped = computed(() => {
    console.log("Recomputando datos timestamped: " + JSON.stringify(dataTemperatura.value));
    if (!dataTemperatura.value) {
        console.log("No había data aún");
        return []
    }
    const datosT = dataTemperatura.value as MedicionTemperatura[];
    const ultimoTimestamp = datosT[datosT.length - 1].timestamp;
    return datosT.map(dato => {
        return {
            timestamp: Date.now() - (ultimoTimestamp - dato.timestamp),
            temp: dato.temp

        }
    })
})
const chartOptions = computed(() => {
    console.log("Recomputando chart options");
    return {
        series: [{ data: dataTemperaturaTimestamped.value.map(dato => dato.temp) }]
    }
})




</script>
<style>
.bannerZona {
    width: 100%;
}

.bannerZona img {
    width: 100%;
}

#contenedorTitulo {
    background-color: #e1e1e1;
    padding: 25px 20px;
}

#titulo {
    margin: 20px 20px;
    font-size: 1.4rem;
}

#comentario {
    margin: 20px 20px;
    font-size: 1.1rem;
}

#contenedorPilasAbono {
    display: flex;
    flex-direction: column;

}

.infoPilaAbono {
    display: flex;
    gap: 20px;
    align-items: center;
    justify-content: space-around;
    flex-wrap: wrap;
}

#headerPila {
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-items: center;
    justify-content: center;
    flex-basis: 25%;
}

#headerPila img {
    width: min(100%, 140px);
}

#graficaPila {
    flex-grow: 1;

}

#tituloPila {
    font-size: 1.3rem;
}
</style>
