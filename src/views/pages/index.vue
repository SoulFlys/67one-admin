<template lang="html">
    <div class="home">
        <p>Welcome 时光笑我温暖如阳, Now is {{time}}</p>
    </div>
</template>

<script>
export default {
    data() {
        return {
            time: new Date().toLocaleString()
        }
    }
}
</script>
