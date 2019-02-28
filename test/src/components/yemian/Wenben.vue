<template>
    <div class="hello">
      <helloworld></helloworld>
      <codes></codes>
    </div>
</template>

<script>
    import helloworld from "../HelloWorld";
    import codes from "../code";
    export default {
        data() {
            return {}
        },
        methods: {

        },
      components: {
        helloworld,codes
      },

    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
