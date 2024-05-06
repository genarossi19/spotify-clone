<!-- nuestro componente de svelte -->

<script lang="ts">
    const currentTime = new Date()
    const currentHour = currentTime.getHours()

    let greeting = ""

    if( currentHour < 12 && currentHour >=6) {
        greeting = "Buenos Días"
    } else if( currentHour < 18 && currentHour >= 12) {
        greeting = "Buenas Tardes"
    } else  {
        greeting = "Buenas Noches"
    }
    </script>

    <h1 class="text-3xl font-bold ">{greeting}</h1>