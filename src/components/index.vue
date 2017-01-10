<template>
<div class="index">
    <p>Welcome 时光笑我温暖如阳, Now is {{time}}</p>
</div>
</template>

<script>
export default {
    name: 'index',
    data() {
        return {
            time: new Date().toLocaleString()
        }
    }
}
</script>
